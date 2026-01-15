import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Volume2, 
  Settings, 
  Info, 
  Sun, 
  Moon, 
  Monitor,
  Menu,
  X
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/Button'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: Volume2 },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'About', href: '/about', icon: Info },
  ]

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }

  const ThemeIcon = themeIcons[theme]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-500 text-primary-foreground shadow-lg glow transition-all group-hover:scale-105">
                <Volume2 className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold gradient-text">VoiceFlow AI</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-blue-500 text-primary-foreground shadow-lg glow'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const themes: Array<typeof theme> = ['light', 'dark', 'system']
                  const currentIndex = themes.indexOf(theme)
                  const nextIndex = (currentIndex + 1) % themes.length
                  setTheme(themes[nextIndex])
                }}
                className="h-10 w-10 p-0 rounded-xl hover:bg-accent/50 transition-all hover:scale-105"
              >
                <ThemeIcon className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden h-10 w-10 p-0 rounded-xl hover:bg-accent/50"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/40 py-4"
            >
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-blue-500 text-primary-foreground shadow-lg'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1" id="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 glass mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                Built with <span className="text-red-500 animate-pulse-slow">❤️</span> for accessibility and modern web standards
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                © 2026 VoiceFlow AI. Open source and privacy-friendly.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="hidden sm:inline">Keyboard shortcuts:</span>
              <div className="flex space-x-2">
                <kbd className="px-3 py-1.5 bg-accent/50 rounded-lg text-xs font-mono border border-border shadow-sm">Ctrl+Enter</kbd>
                <kbd className="px-3 py-1.5 bg-accent/50 rounded-lg text-xs font-mono border border-border shadow-sm">Space</kbd>
                <kbd className="px-3 py-1.5 bg-accent/50 rounded-lg text-xs font-mono border border-border shadow-sm">Esc</kbd>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}