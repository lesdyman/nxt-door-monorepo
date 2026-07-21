import { Alert } from 'react-native'

import useDeleteListing from './useDeleteListing'

const useConfirmDeleteListing = () => {
  const deleteListing = useDeleteListing()

  const confirmDelete = (id: number, onDeleted?: () => void) => {
    Alert.alert('Delete listing', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteListing.mutateAsync(id)
          onDeleted?.()
        },
      },
    ])
  }

  return { confirmDelete, isPending: deleteListing.isPending }
}

export default useConfirmDeleteListing
