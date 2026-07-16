import { useMemo, useState } from 'react'

import { BellOff } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, View, YStack } from 'tamagui'

import useColors from '@constants/useColors'

import infoMessages from '../../data/infoMessages'
import FilterBar from './components/FilterBar'
import InfoCenterHeader from './components/InfoCenterHeader'
import MessageCard from './components/MessageCard'

const InfoCenter = () => {
  const colors = useColors()
  const [selectedType, setSelectedType] = useState<string>('all')

  const messagesSorted = useMemo(() => {
    return [...infoMessages].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }, [])

  const messagesToDisplay = useMemo(() => {
    if (selectedType === 'all') {
      return messagesSorted
    }
    if (selectedType === 'info') {
      return messagesSorted.filter((message) => message.type === 'info')
    }
    if (selectedType === 'marketplace') {
      return messagesSorted.filter((message) => message.type === 'market')
    }
    return []
  }, [messagesSorted, selectedType])

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.background }}>
      <InfoCenterHeader />

      <FilterBar selectedType={selectedType} setSelectedType={setSelectedType} />

      <ScrollView>
        {messagesToDisplay.length > 0 ? (
          messagesToDisplay.map((message) => (
            <View key={message.id}>
              <MessageCard message={message} />
            </View>
          ))
        ) : (
          <YStack flex={1} items="center" justify="center" gap="$2" px="$4">
            <BellOff color={colors.textSecondary} size={32} />
            <Text color={colors.textSecondary} fontSize={15} text="center">
              No notifications yet
            </Text>
          </YStack>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default InfoCenter
