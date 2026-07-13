# Next Door

A neighborhood marketplace mobile app built with Expo and React Native. Residents of the same complex can list, browse, and exchange items — all within their building community.

## Tech Stack

- **React Native** 0.85 / **React** 19
- **Expo** ~56 with **expo-router** (file-based navigation)
- **Tamagui** v2 — UI components & theming
- **react-native-maps** — listing location display
- **expo-image-picker** — photo & screenshot uploads
- **lucide-react-native** — icons
- **TypeScript** ~6.0

## Project Structure

```
app/
  (tabs)/
    index.tsx          # Home feed
    listings/          # Browse listings (stack: list → detail)
    orders/            # Browse requests (stack: list → detail)
    add.tsx            # New post trigger
    profile.tsx        # User profile & settings
  listing/[id].tsx      # Listing detail (full takeover, tab bar hidden)
  edit-listing/[id].tsx # Edit an owned listing
  users/[id].tsx        # Author profile
  info-center.tsx       # Notifications (system + marketplace messages)
  my-listings.tsx       # "My Posts" — manage your own listings
  order-history.tsx     # Past closed transactions
  saved.tsx             # Saved / bookmarked listings
  help.tsx              # Report an Issue form
  new-post.tsx          # New listing modal

components/
  author-details/      # Author profile (posts & reviews tabs)
  edit-listing/         # Edit listing form (multi-photo editor, currency select)
  help/                 # Report an Issue form (category sheet, screenshot upload)
  home/                 # Home screen components
  info-center/          # Notifications center (filters, read/unread state)
  listing-detail/       # Detail screen (ImageCarousel, ListingMap, etc.)
  my-listings/          # "My Posts" list, search, per-listing card
  new-post/             # Post form (PhotoPicker, CategorySelect, etc.)
  order-history/        # Past-transactions list & card
  profile/               # Profile & SettingsMenu
  request-sheet/         # Request/order bottom sheet
  saved/                 # Saved listings list & row
  shared/                # AnimatedTabBar, Header, BackHeader, BrandButton,
                          # Post, SearchModal, FilterBar, PickupMap

data/                   # Mock data: listings, users, reviews, places,
                         # info messages, issue categories, saved ids
contexts/                # SearchContext, TabBarContext
```

## Getting Started

**Prerequisites:** Node.js, Expo CLI, iOS Simulator or Android Emulator (or Expo Go).

```bash
npm install
npm start          # starts Expo dev server
npm run ios        # run on iOS simulator
npm run android    # run on Android emulator
```

## Code Quality

```bash
npm run lint       # ESLint
npm run format     # Prettier
```

Husky + lint-staged run ESLint and Prettier automatically on every commit.

## Status

Work in progress, running entirely on mock data (`data/`) — no backend yet. Implemented so far:

- [x] Home feed with search & filters
- [x] Listings/Orders browse + detail screen
- [x] New listing form (photos, category, price)
- [x] Animated tab bar (hide/show on scroll)
- [x] User & author profiles (posts, reviews, settings menu)
- [x] Map view for listing location
- [x] Request/order flow (bottom sheet)
- [x] Notifications / Info Center (system + marketplace messages, read/unread indicator, filters)
- [x] My Posts (manage own listings — search, edit/promote/delete actions)
- [x] Edit Listing screen (multi-photo editor, sold/deactivate toggles)
- [x] Order History (past closed transactions)
- [x] Saved listings (bookmarked items)
- [x] Report an Issue (category picker, description, screenshot upload)
- [ ] Authentication
- [ ] Chat
- [ ] Push notifications
- [ ] Backend integration (all actions above are currently UI-only / stubbed)
