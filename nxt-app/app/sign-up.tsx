import { Stack } from 'expo-router'

import SignUp from '@screens/sign-up/SignUp'

export default function SignUpScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SignUp />
    </>
  )
}
