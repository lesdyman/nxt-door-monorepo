import { createContext, useContext, useState } from 'react'

interface SearchContextType {
  isSearchOpen: boolean
  activeFilters: string[]
  openSearch: (initialFilters?: string[]) => void
  closeSearch: () => void
  toggleFilter: (filter: string) => void
}

const SearchContext = createContext<SearchContextType>({
  isSearchOpen: false,
  activeFilters: [],
  openSearch: () => {},
  closeSearch: () => {},
  toggleFilter: () => {},
})

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const openSearch = (filters: string[] = []) => {
    setActiveFilters(filters)
    setIsSearchOpen(true)
  }

  const closeSearch = () => setIsSearchOpen(false)

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  return (
    <SearchContext.Provider
      value={{ isSearchOpen, activeFilters, openSearch, closeSearch, toggleFilter }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)
