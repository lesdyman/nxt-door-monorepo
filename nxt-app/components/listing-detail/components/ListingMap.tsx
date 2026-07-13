import { Linking, Platform, TouchableOpacity, View } from 'react-native'

import MapView, { Marker } from 'react-native-maps'

interface Props {
  latitude: number
  longitude: number
}

const ListingMap: React.FC<Props> = ({ latitude, longitude }) => {
  const openInMaps = () => {
    const url = Platform.select({
      ios: `maps://?ll=${latitude},${longitude}&q=Location`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
    })
    if (url) Linking.openURL(url)
  }

  return (
    <TouchableOpacity onPress={openInMaps} activeOpacity={0.9}>
      <View style={{ borderRadius: 12, overflow: 'hidden', height: 250 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          userInterfaceStyle="dark"
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
        >
          <Marker coordinate={{ latitude, longitude }} />
        </MapView>
      </View>
    </TouchableOpacity>
  )
}

export default ListingMap
