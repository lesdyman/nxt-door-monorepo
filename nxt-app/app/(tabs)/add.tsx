import { View } from 'react-native'

// expo-router requires a file per Tabs.Screen for the route to resolve, but this
// screen never actually mounts: the "add" tab's tabBarButton (see (tabs)/_layout.tsx)
// intercepts the press and pushes /new-post instead of navigating here.
export default function AddScreen() {
  return <View />
}
