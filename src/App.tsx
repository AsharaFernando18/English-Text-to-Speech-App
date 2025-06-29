import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { TTSProvider } from '@/contexts/TTSContext'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import SettingsPage from '@/pages/SettingsPage'
import AboutPage from '@/pages/AboutPage'

function App() {
  return (
    <ThemeProvider>
      <TTSProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Layout>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                className: 'bg-card text-card-foreground border border-border',
              }}
            />
          </div>
        </Router>
      </TTSProvider>
    </ThemeProvider>
  )
}

export default App