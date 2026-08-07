import { Platform, useColorScheme } from 'react-native'

import * as AppleAuthentication from 'expo-apple-authentication'

interface Props {
  buttonType?: AppleAuthentication.AppleAuthenticationButtonType
  onPress?: () => void
}

const AppleLoginButton: React.FC<Props> = ({
  buttonType = AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN,
  onPress = () => {},
}) => {
  const colorScheme = useColorScheme()

  if (Platform.OS !== 'ios') return null

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={buttonType}
      buttonStyle={
        colorScheme === 'light'
          ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
          : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
      }
      cornerRadius={22}
      style={{ height: 48, width: '100%' }}
      onPress={onPress}
    />
  )
}

export default AppleLoginButton
