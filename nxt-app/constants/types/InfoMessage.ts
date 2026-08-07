type BaseInfoMessage = {
  id: string
  message: string
  isRead: boolean
  createdAt: Date
}

type InfoMessage = BaseInfoMessage & {
  type: 'info'
  title: string
}

type MarketMessage = BaseInfoMessage & {
  type: 'market'
  fromId: string
} & (
    | { subtype: 'chat'; chatId: number }
    | { subtype: 'offer'; listingId: number }
    | { subtype: 'review'; reviewId: number; listingId: number }
  )

export type infoMessage = InfoMessage | MarketMessage
