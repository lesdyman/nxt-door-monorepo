import { useRef, useState } from 'react'
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

import { Check, ChevronDown } from 'lucide-react-native'
import { Text, YStack } from 'tamagui'

import useColors from '@constants/useColors'
import CATEGORY_EMOJI from '@utils/categoryEmoji'

const CATEGORIES = Object.keys(CATEGORY_EMOJI)

interface Props {
  category: string
  setCategory: (category: string) => void
}

const CategorySelect: React.FC<Props> = ({ category, setCategory }) => {
  const colors = useColors()
  const [open, setOpen] = useState(false)
  const [layout, setLayout] = useState({ top: 0, left: 0, width: 0 })
  const triggerRef = useRef<View>(null)

  const openDropdown = () => {
    triggerRef.current?.measure((_fx, _fy, width, _height, px, py) => {
      setLayout({ top: py + _height + 4, left: px, width })
      setOpen(true)
    })
  }

  const select = (value: string) => {
    setCategory(value)
    setOpen(false)
  }

  return (
    <YStack gap="$2">
      <Text fontSize={14} fontWeight="500" lineHeight={20} color={colors.textPrimary}>
        Category
      </Text>

      <TouchableOpacity ref={triggerRef} onPress={openDropdown} activeOpacity={1}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.surface,
            borderColor: open ? colors.borderFocus : colors.border,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            height: 44,
          }}
        >
          <Text fontSize={14} color={category ? colors.textPrimary : colors.textSecondary}>
            {category || 'Select a category'}
          </Text>
          <ChevronDown size={14} color={colors.textSecondary} />
        </View>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="none" onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  position: 'absolute',
                  top: layout.top,
                  left: layout.left,
                  width: layout.width,
                  backgroundColor: colors.tabBarBg,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                {CATEGORIES.map((label) => (
                  <TouchableOpacity
                    key={label}
                    onPress={() => select(label)}
                    activeOpacity={0.7}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 12,
                      height: 44,
                      backgroundColor:
                        label === category ? colors.surfaceElevated : colors.tabBarBg,
                    }}
                  >
                    <Text fontSize={14} lineHeight={20} color={colors.textPrimary}>
                      {label}
                    </Text>
                    {label === category && <Check size={14} color={colors.brand} />}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </YStack>
  )
}

export default CategorySelect
