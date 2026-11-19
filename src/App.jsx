import React, { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import { useContentStore } from './stores/contentStore'
import { TopNav } from './components/layout/TopNav'
import { Footer } from './components/layout/Footer'
import { AdminBar } from './components/common/AdminBar'
import { ScrollToTop } from './components/common/ScrollToTop'
import { AdminLogin } from './components/admin/AdminLogin'
import { AdminPanel } from './components/admin/AdminPanel'
import { EvmCalculator } from './components/evm/EvmCalculator'
import { Annexes } from './components/chapters/Annexes'
import { PDFLibrary } from './components/pdf/PDFLibrary'
import Landing from './pages/Landing'
import GuideIndex from './pages/GuideIndex'
import Chapter from './pages/Chapter'
import { useT } from './hooks/useT'

const TITLES = {
  '/guide': 'guideTitle',
  '/calculateur': 'evmTitle',
  '/annexes': 'annexesTitle',
  '/bibliotheque': 'libraryTitle',
}

function App() {
  const { t, language } = useT()
  const { pathname, hash } = useLocation()
  const checkApi = useAuthStore((s) => s.checkApi)
  const loadFromServer = useContentStore((s) => s.loadFromServer)

  useEffect(() => {
    checkApi()
  }, [checkApi])

  // Langue et sens de lecture sur <html> : l'arabe se lit de droite à gauche.
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    const controller = new AbortController()
    loadFromServer(language, controller.signal)
    return () => controller.abort()
  }, [language, loadFromServer])

  // Chaque page s'ouvre en haut, sauf si le lien vise une section précise.
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
    if (!pathname.startsWith('/guide/')) {
      document.title = TITLES[pathname] ? `${t(TITLES[pathname])} · PMP Guide` : t('appTitle')
    }
  }, [pathname, language]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <a className="skip-link" href="#main">{t('skipToContent')}</a>
      <TopNav />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/guide" element={<GuideIndex />} />
          <Route path="/guide/:chapterId" element={<Chapter />} />
          <Route path="/calculateur" element={<EvmCalculator />} />
          <Route path="/annexes" element={<Annexes />} />
          <Route path="/bibliotheque" element={<PDFLibrary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <AdminBar />
      <ScrollToTop />
      <AdminLogin />
      <AdminPanel />
    </>
  )
}

export default App
