import { useRouter } from 'expo-router'
import { Search } from 'lucide-react-native'
import { Text, XStack } from 'tamagui'

import BellIcon from '@components/shared/BellIcon'
import HeaderIconButton from '@components/shared/HeaderIconButton'
import useColors from '@constants/useColors'

import { useSearch } from '../../contexts/SearchContext'

interface Props {
  title: string
  searchFilter: string
}

const TabHeader: React.FC<Props> = ({ title, searchFilter }) => {
  const colors = useColors()
  const { openSearch } = useSearch()
  const router = useRouter()

  return (
    <>
      <Text fontSize={20} lineHeight={28} color={colors.textPrimary}>
        {title}
      </Text>
      <XStack gap="$2" items="center">
        <HeaderIconButton
          icon={<Search width={16} height={20} color={colors.textPrimary} />}
          onPress={() => openSearch([searchFilter])}
        />
        <HeaderIconButton icon={<BellIcon />} onPress={() => router.push('/info-center')} />
      </XStack>
    </>
  )
}

export default TabHeader
