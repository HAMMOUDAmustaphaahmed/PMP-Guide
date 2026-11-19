import { create } from 'zustand'

export const useUiStore = create((set) => ({
  sidebarOpen: false,
  loginOpen: false,
  adminPanelOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setLoginOpen: (loginOpen) => set({ loginOpen }),
  setAdminPanelOpen: (adminPanelOpen) => set({ adminPanelOpen }),
}))
