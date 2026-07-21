import axios from 'axios'

import API_URL from '@constants/apiUrl'
import Place from '@constants/Place'

const BASE_URL = `${API_URL}/places`

const placesService = {
  getPlaces: async (): Promise<Place[]> => {
    const response = await axios.get<Place[]>(BASE_URL)
    return response.data
  },
  getPlace: async (placeId: string): Promise<Place> => {
    const response = await axios.get<Place>(`${BASE_URL}/${placeId}`)
    return response.data
  },
}

export default placesService
