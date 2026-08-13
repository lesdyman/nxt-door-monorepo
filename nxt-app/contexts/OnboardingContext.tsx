import { createContext, useContext, useState } from 'react'

type OnboardingData = {
  placeId: string | null
  name: string
  email: string
  avatarUrl: string | null
}

type OnboardingContextValue = {
  data: OnboardingData
  setPlaceId: (placeId: string) => void
  setProfile: (name: string, email: string) => void
  setAvatarUrl: (avatarUrl: string) => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>({
    placeId: null,
    name: '',
    email: '',
    avatarUrl: null,
  })

  const setPlaceId = (placeId: string) => setData((prev) => ({ ...prev, placeId }))
  const setProfile = (name: string, email: string) => setData((prev) => ({ ...prev, name, email }))
  const setAvatarUrl = (avatarUrl: string) => setData((prev) => ({ ...prev, avatarUrl }))

  return (
    <OnboardingContext.Provider value={{ data, setPlaceId, setProfile, setAvatarUrl }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}
