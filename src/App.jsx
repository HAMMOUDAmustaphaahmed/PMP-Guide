import React, { useEffect } from 'react'
import { useAuthStore } from './stores/authStore'
import { useContentStore } from './stores/contentStore'
import { Sidebar } from './components/layout/Sidebar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/hero/Hero'
import { ChapterCard } from './components/chapters/ChapterCard'
import { Annexes } from './components/chapters/Annexes'
import { EvmCalculator } from './components/evm/EvmCalculator'
import { PDFLibrary } from './components/pdf/PDFLibrary'
import { AdminBar } from './components/common/AdminBar'
import { ScrollToTop } from './components/common/ScrollToTop'
import { AdminLogin } from './components/admin/AdminLogin'
import { AdminPanel } from './components/admin/AdminPanel'
import { useCurrentContent } from './hooks/useCurrentContent'
import { useT } from './hooks/useT'

function App() {
  const content = useCurrentContent()
  const { t, language } = useT()
  const checkApi = useAuthStore((s) => s.checkApi)
  const loadFromServer = useContentStore((s) => s.loadFromServer)

  useEffect(() => {
    checkApi()
  }, [checkApi])

  // Langue et sens de lecture sur <html> : l'arabe se lit de droite à gauche.
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.title = t('appTitle')
    const controller = new AbortController()
    loadFromServer(language, controller.signal)
    return () => controller.abort()
  }, [language]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="app">
      <a className="skip-link" href="#main">{t('skipToContent')}</a>
      <Sidebar />
      <main id="main" tabIndex={-1}>
        <Hero />
        {content.chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
        <EvmCalculator />
        <Annexes />
        <PDFLibrary />
        <Footer />
      </main>
      <AdminBar />
      <ScrollToTop />
      <AdminLogin />
      <AdminPanel />
    </div>
  )
}

export default App
