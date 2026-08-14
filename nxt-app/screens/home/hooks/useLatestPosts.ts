import useListings from '@hooks/useListings'

const useLatestPosts = () => {
  const offers = useListings({ side: 'offer', limit: 5 })
  const requests = useListings({ side: 'order', limit: 3 })

  return {
    offers: offers.data ?? [],
    requests: requests.data ?? [],
    isOffersLoading: offers.isLoading,
    isRequestsLoading: requests.isLoading,
  }
}

export default useLatestPosts
