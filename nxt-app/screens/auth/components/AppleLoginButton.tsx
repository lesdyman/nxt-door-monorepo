import { Platform, useColorScheme } from 'react-native'

import * as AppleAuthentication from 'expo-apple-authentication'

const AppleLoginButton = () => {
  const colorScheme = useColorScheme()

  if (Platform.OS !== 'ios') return null

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={
        colorScheme === 'light'
          ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
          : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
      }
      cornerRadius={22}
      style={{ height: 48, width: '100%' }}
      onPress={() => {}}
    />
  )
}

export default AppleLoginButton
