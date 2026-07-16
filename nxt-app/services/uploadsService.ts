import axios from 'axios'

const BASE_URL = 'http://localhost:3000/uploads'

const uploadsService = {
  uploadImage: async (uri: string): Promise<string> => {
    const formData = new FormData()
    formData.append('file', { uri, name: 'photo.jpg', type: 'image/jpeg' } as unknown as Blob)
    const response = await axios.post(BASE_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.url
  },
}

export default uploadsService
