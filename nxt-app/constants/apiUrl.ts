import { Platform } from 'react-native'

// Android emulator's `localhost` points at the emulator itself, not the host
// machine — `10.0.2.2` is the AVD's alias for the host loopback.
const API_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'

const API_URL = `http://${API_HOST}:3000`

export default API_URL
