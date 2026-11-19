import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Chapitres marqués comme lus, gardés dans le navigateur du lecteur.
export const useProgressStore = create(
  persist(
    (set) => ({
      done: {},
      toggle: (id) => set((state) => ({ done: { ...state.done, [id]: !state.done[id] } })),
    }),
    { name: 'pmp-progress' }
  )
)
