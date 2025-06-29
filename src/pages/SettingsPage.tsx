import { motion } from 'framer-motion'
import { Settings, Volume2, Mic, Globe, Zap, Shield } from 'lucide-react'
import { useTTS } from '@/contexts/TTSContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Slider } from '@/components/ui/Slider'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function SettingsPage() {
  const { settings, updateSettings, voices } = useTTS()

  const providers = [
    { id: 'browser', name: 'Browser (Free)', description: 'Built-in browser voices' },
    { id: 'elevenlabs', name: 'ElevenLabs (Premium)', description: 'High-quality AI voices' },
    { id: 'google', name: 'Google Cloud TTS', description: 'Google WaveNet voices' },
    { id: 'amazon', name: 'Amazon Polly', description: 'AWS neural voices' },
    { id: 'azure', name: 'Microsoft Azure', description: 'Azure Cognitive Services' },
  ]

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'en-AU', name: 'English (Australia)' },
    { code: 'en-IN', name: 'English (India)' },
    { code: 'en-CA', name: 'English (Canada)' },
  ]

  const accents = [
    { code: 'us', name: 'American' },
    { code: 'uk', name: 'British' },
    { code: 'au', name: 'Australian' },
    { code: 'in', name: 'Indian' },
    { code: 'ca', name: 'Canadian' },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-4">
            <Settings className="h-8 w-8" />
            Settings & Configuration
          </h1>
          <p className="text-muted-foreground">
            Customize your text-to-speech experience with advanced settings and preferences.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {/* Voice Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Voice Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <Select
                      value={settings.language}
                      onChange={(e) => updateSettings({ language: e.target.value })}
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Accent</label>
                    <Select
                      value={settings.accent}
                      onChange={(e) => updateSettings({ accent: e.target.value as any })}
                    >
                      {accents.map((accent) => (
                        <option key={accent.code} value={accent.code}>
                          {accent.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gender Preference</label>
                    <Select
                      value={settings.gender}
                      onChange={(e) => updateSettings({ gender: e.target.value as any })}
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="neutral">Neutral</option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Provider</label>
                    <Select
                      value={settings.provider}
                      onChange={(e) => updateSettings({ provider: e.target.value as any })}
                    >
                      {providers.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Audio Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Audio Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Slider
                  label="Speech Rate"
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={settings.rate}
                  onChange={(e) => updateSettings({ rate: parseFloat(e.target.value) })}
                />

                <Slider
                  label="Pitch"
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.pitch}
                  onChange={(e) => updateSettings({ pitch: parseFloat(e.target.value) })}
                />

                <Slider
                  label="Volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) => updateSettings({ volume: parseFloat(e.target.value) })}
                />

                <div className="flex gap-2">
                  <Button
                    onClick={() => updateSettings({ rate: 1.0, pitch: 1.0, volume: 1.0 })}
                    variant="outline"
                  >
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Provider Configuration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Provider Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {providers.map((provider) => (
                    <div
                      key={provider.id}
                      className={`p-4 border rounded-lg ${
                        settings.provider === provider.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{provider.name}</h3>
                        <Button
                          size="sm"
                          variant={settings.provider === provider.id ? 'default' : 'outline'}
                          onClick={() => updateSettings({ provider: provider.id as any })}
                        >
                          {settings.provider === provider.id ? 'Active' : 'Select'}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {provider.description}
                      </p>
                      
                      {provider.id !== 'browser' && (
                        <div className="space-y-2">
                          <Input
                            placeholder="API Key"
                            type="password"
                            className="text-sm"
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter your {provider.name} API key to enable this provider
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Advanced Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Text Length</label>
                    <Input
                      type="number"
                      value="5000"
                      readOnly
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum characters per speech request
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Audio Format</label>
                    <Select defaultValue="mp3">
                      <option value="mp3">MP3</option>
                      <option value="wav">WAV</option>
                      <option value="ogg">OGG</option>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Accessibility</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Enable keyboard shortcuts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Show text highlighting during speech</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Auto-pause on window blur</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}