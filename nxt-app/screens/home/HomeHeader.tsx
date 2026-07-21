import { useRouter } from 'expo-router'
import { Search } from 'lucide-react-native'
import { Text, XStack, YStack } from 'tamagui'

import BellIcon from '@components/BellIcon'
import Header from '@components/Header'
import HeaderIconButton from '@components/HeaderIconButton'
import useColors from '@constants/useColors'

interface Props {
  openSearchClick: () => void
  placeName: string
}

const HomeHeader: React.FC<Props> = ({ openSearchClick, placeName }) => {
  const colors = useColors()
  const router = useRouter()

  return (
    <Header>
      <YStack>
        <Text fontSize={12} color={colors.accent} fontWeight="400" letterSpacing={0.6}>
          {placeName.toLocaleUpperCase()}
        </Text>
        <Text fontSize={28} fontWeight="600" color={colors.textPrimary}>
          Hello, Olexander!
        </Text>
      </YStack>
      <XStack gap="$2">
        <HeaderIconButton
          icon={<Search width={16} height={20} color={colors.textPrimary} />}
          onPress={openSearchClick}
        />
        <HeaderIconButton icon={<BellIcon />} onPress={() => router.push('/info-center')} />
      </XStack>
    </Header>
  )
}

export default HomeHeader
