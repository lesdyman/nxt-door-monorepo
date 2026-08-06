import { infoMessage } from '@constants/types/InfoMessage'

const infoMessages: infoMessage[] = [
  {
    id: 'msg-1',
    type: 'info',
    title: 'Profile Update',
    message: 'Your profile changes have been saved.',
    isRead: true,
    createdAt: new Date('2026-06-30T09:12:00Z'),
  },
  {
    id: 'msg-2',
    type: 'info',
    title: 'System Update',
    message: 'New app update is available. Update now for the latest features.',
    isRead: false,
    createdAt: new Date('2026-07-01T08:00:00Z'),
  },
  {
    id: 'msg-3',
    type: 'market',
    subtype: 'chat',
    message: 'Mykhailo Petrenko sent you a new message.',
    fromId: '1002',
    chatId: 501,
    isRead: false,
    createdAt: new Date('2026-07-01T14:32:00Z'),
  },
  {
    id: 'msg-4',
    type: 'market',
    subtype: 'offer',
    message: 'Andrii Bondarenko responded to your listing "Freshly roasted coffee beans".',
    fromId: '1003',
    listingId: 1,
    isRead: false,
    createdAt: new Date('2026-07-02T07:45:00Z'),
  },
  {
    id: 'msg-5',
    type: 'market',
    subtype: 'review',
    message: 'Nataliia Shevchenko left you a 5-star review.',
    fromId: '1004',
    reviewId: 2,
    listingId: 5,
    isRead: true,
    createdAt: new Date('2026-06-14T15:10:00Z'),
  },
]

export default infoMessages
