import { Bookmark, BookOpen, HelpCircle, Tag } from 'lucide-react-native'

const ITEMS = [
  {
    key: 'listings',
    icon: Tag,
    title: 'My Posts',
    sub: 'Manage items you are selling or giving away',
    href: '/my-listings',
  },
  {
    key: 'orders',
    icon: BookOpen,
    title: 'Order History',
    sub: 'View all past neighborhood transactions',
    href: '/order-history',
  },
  {
    key: 'saved',
    icon: Bookmark,
    title: 'Saved',
    sub: "Track listings you're interested in",
    href: '/saved',
  },
  {
    key: 'help',
    icon: HelpCircle,
    title: 'Help & Support',
    sub: 'Report an issue or contact concierge',
    href: '/help',
  },
] as const

export default ITEMS
