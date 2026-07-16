import { useRouter } from 'expo-router'
import { ChevronRight, LogOut } from 'lucide-react-native'
import { ListItem, Separator, Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'

import ITEMS from '../utils/SettingsItems'

export const SettingsMenu = () => {
  const colors = useColors()
  const router = useRouter()

  return (
    <YStack rounded={12} overflow="hidden" borderWidth={1} borderColor={colors.border}>
      {ITEMS.map((item, i) => (
        <YStack key={item.key}>
          <ListItem
            bg={colors.surfaceElevated}
            pressStyle={{ bg: colors.buttonPressedBg, borderColor: colors.borderStrong }}
            focusStyle={{ bg: colors.buttonPressedBg, borderColor: colors.borderStrong }}
            title={
              <Text color={colors.textPrimary} fontSize="$4">
                {item.title}
              </Text>
            }
            subTitle={
              <Text color={colors.textSecondary} fontSize="$2">
                {item.sub}
              </Text>
            }
            gap="$2"
            py="$4"
            px="$4"
            icon={<item.icon size={20} color={colors.textSecondary} />}
            iconAfter={<ChevronRight size={18} color={colors.textSecondary} />}
            onPress={() => router.push(item.href as never)}
          />
          {i < ITEMS.length - 1 && <Separator borderColor={colors.border} />}
        </YStack>
      ))}
      <Separator borderColor={colors.border} />
      <ListItem
        bg={colors.surfaceElevated}
        py="$4"
        px="$4"
        title={
          <Text color={colors.notificationDot} fontSize="$4">
            Sign Out
          </Text>
        }
        subTitle={
          <Text color={colors.notificationDot} fontSize="$2" opacity={0.7}>
            Log out of your resident account
          </Text>
        }
        icon={<LogOut size={20} color={colors.notificationDot} />}
        onPress={() => {}}
      />
    </YStack>
  )
}
