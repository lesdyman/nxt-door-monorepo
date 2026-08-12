import { authClient } from './authClient'

const authService = {
  async registerEmail(email: string, password: string, name: string) {
    const { data, error } = await authClient.signUp.email({ email, password, name })
    if (error) throw error
    return data
  },
  async loginEmail(email: string, password: string) {
    const { data, error } = await authClient.signIn.email({ email, password })
    if (error) throw error
    return data
  },
  async continueWithGoogle() {
    const { data, error } = await authClient.signIn.social({ provider: 'google' })
    if (error) throw error
    return data
  },
  async signOut() {
    const { error } = await authClient.signOut()
    if (error) throw error
  },
}

export default authService
