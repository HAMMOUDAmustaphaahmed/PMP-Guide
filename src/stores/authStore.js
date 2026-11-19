import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { api } from '../lib/api'

// Aucun identifiant côté navigateur : le serveur vérifie le mot de passe
// et renvoie un jeton signé, gardé le temps de la session seulement.
export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      isAdmin: false,
      // 'unknown' | 'ready' | 'unconfigured' | 'offline'
      apiStatus: 'unknown',

      checkApi: async () => {
        try {
          const health = await api.health()
          set({ apiStatus: health.admin_configured ? 'ready' : 'unconfigured' })
        } catch {
          set({ apiStatus: 'offline', token: null, isAdmin: false })
          return
        }
        const { token } = get()
        if (!token) return
        try {
          await api.me(token)
        } catch {
          set({ token: null, isAdmin: false })
        }
      },

      // Retourne null en cas de succès, sinon une clé de message d'erreur.
      login: async (username, password) => {
        try {
          const { token } = await api.login(username, password)
          set({ token, isAdmin: true, apiStatus: 'ready' })
          return null
        } catch (error) {
          if (error.status === 401) return 'incorrect'
          if (error.status === 429) return 'tooManyAttempts'
          if (error.status === 503) return 'adminUnconfigured'
          return 'apiOffline'
        }
      },

      logout: () => set({ token: null, isAdmin: false }),
    }),
    {
      name: 'pmp-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ token, isAdmin }) => ({ token, isAdmin }),
    }
  )
)
