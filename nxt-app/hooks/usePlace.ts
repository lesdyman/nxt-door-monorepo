import { useQuery } from '@tanstack/react-query'

import placeService from '@services/placesService'

const usePlace = (id: string | null) => {
  return useQuery({
    queryKey: ['place', id],
    queryFn: () => placeService.getPlace(id!),
    enabled: !!id,
  })
}

export default usePlace
