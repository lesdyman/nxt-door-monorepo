import { Stack } from 'expo-router'

import OrderHistory from '@components/order-history/OrderHistory'

export default function OrderHistoryScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <OrderHistory />
    </>
  )
}
