import { Review } from '@constants/types/Review'
import useListingDetails from '@hooks/useListingDetails'
import useUser from '@hooks/useUser'

import ReviewCard from './ReviewCard'

interface Props {
  review: Review
  onPressListing: (listingId: number) => void
}

const ReviewCardContainer: React.FC<Props> = ({ review, onPressListing }) => {
  const { data: reviewer } = useUser(review.reviewerId)
  const { data: listing } = useListingDetails(review.listingId)

  if (!reviewer || !listing) return null

  return (
    <ReviewCard
      review={review}
      reviewer={{ name: reviewer.name, avatar: reviewer.avatar }}
      listingTitle={listing.title}
      onPressListing={() => onPressListing(listing.id)}
    />
  )
}

export default ReviewCardContainer
