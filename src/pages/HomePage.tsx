import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { 
  Play, 
  Pause, 
  Square, 
  Download, 
  Upload, 
  FileText,
  Mic,
  Volume2,
  RotateCcw,
  Zap
} from 'lucide-react'
import { useTTS } from '@/contexts/TTSContext'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Slider } from '@/components/ui/Slider'
import { readFileAsText, validateTextLength } from '@/lib/utils'
import toast from 'react-hot-toast'

const sampleTexts = {
  greeting: "Hello! Welcome to our modern Text-to-Speech application. This advanced system can convert any text into natural-sounding speech.",
  demo: "This is a demonstration of our high-quality text-to-speech technology. You can adjust the speed, pitch, and choose from various voices to customize your experience.",
  technical: "Our application uses cutting-edge neural networks and artificial intelligence to generate human-like speech patterns with proper intonation and emphasis.",
  story: "Once upon a time, in a world where technology and magic coexisted, there was an application that could bring written words to life through the power of speech synthesis."
}

export default function HomePage() {
  const {
    voices,
    selectedVoice,
    settings,
    speechState,
    isLoading,
    highlightedWordIndex,
    speak,
    pause,
    resume,
    stop,
    updateSettings,
    selectVoice,
    downloadAudio
  } = useTTS()

  const [text, setText] = useState(sampleTexts.greeting)
  const [charCount, setCharCount] = useState(0)
  const [words, setWords] = useState<string[]>([])

  useEffect(() => {
    setCharCount(text.length)
    setWords(text.split(/\s+/).filter(word => word.length > 0))
  }, [text])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    try {
      const content = await readFileAsText(file)
      if (!validateTextLength(content)) {
        toast.error('File is too large. Maximum 5000 characters allowed.')
        return
      }
      setText(content)
      toast.success('File loaded successfully!')
    } catch (error) {
      toast.error('Failed to read file. Please try again.')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handleSpeak = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to speak')
      return
    }

    if (!validateTextLength(text)) {
      toast.error('Text is too long. Maximum 5000 characters allowed.')
      return
    }

    await speak(text)
  }

  const handlePause = () => {
    if (speechState === 'speaking') {
      pause()
    } else if (speechState === 'paused') {
      resume()
    }
  }

  const handleStop = () => {
    stop()
  }

  const handleDownload = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert')
      return
    }
    await downloadAudio(text)
  }

  const handleSampleText = (key: keyof typeof sampleTexts) => {
    setText(sampleTexts[key])
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'Enter':
            e.preventDefault()
            handleSpeak()
            break
          case ' ':
            e.preventDefault()
            handlePause()
            break
        }
      } else if (e.key === 'Escape') {
        handleStop()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [speechState, text])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>AI-Powered Voice Synthesis</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 animate-in">
            VoiceFlow AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your text into natural, expressive speech with our advanced AI-powered voices.
            <br className="hidden md:inline" />
            Perfect for accessibility, content creation, and learning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Text Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="shadow-xl border-primary/10 hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    Text Input
                    <span className="ml-auto text-sm font-normal text-muted-foreground">
                      {charCount}/5000 characters
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* File Upload */}
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragActive
                        ? 'border-primary bg-primary/10 scale-105 shadow-lg'
                        : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/20'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className={`inline-block p-4 rounded-full mb-3 transition-all ${
                      isDragActive ? 'bg-primary/20 scale-110' : 'bg-accent/50'
                    }`}>
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {isDragActive
                        ? 'Drop your file here...'
                        : 'Drag & drop a text file, or click to select'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports .txt, .pdf, .doc, .docx files (max 10MB)
                    </p>
                  </div>

                  {/* Text Area with Highlighting */}
                  <div className="relative">
                    <Textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter your text here..."
                      className="min-h-[200px] text-base leading-relaxed"
                      maxLength={5000}
                    />
                    
                    {/* Text Highlighting Overlay */}
                    {speechState === 'speaking' && highlightedWordIndex >= 0 && (
                      <div className="absolute inset-0 pointer-events-none p-3 text-base leading-relaxed whitespace-pre-wrap">
                        {words.map((word, index) => (
                          <span
                            key={index}
                            className={`${
                              index === highlightedWordIndex
                                ? 'bg-primary/30 text-primary-foreground rounded px-1'
                                : 'text-transparent'
                            }`}
                          >
                            {word}{' '}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Sample Texts */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Quick Samples:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(sampleTexts).map(([key]) => (
                        <Button
                          key={key}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSampleText(key as keyof typeof sampleTexts)}
                          className="text-xs rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-xl border-primary/10 hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Volume2 className="h-5 w-5 text-primary" />
                    </div>
                    Speech Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <Button
                      onClick={handleSpeak}
                      disabled={isLoading || speechState === 'speaking'}
                      className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:scale-105 transition-all rounded-xl"
                    >
                      {isLoading ? (
                        <div className="spinner" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      Speak
                    </Button>

                    <Button
                      onClick={handlePause}
                      disabled={speechState === 'idle'}
                      variant="outline"
                      className="flex items-center gap-2 rounded-xl hover:bg-primary/10 hover:border-primary transition-all"
                    >
                      <Pause className="h-4 w-4" />
                      {speechState === 'paused' ? 'Resume' : 'Pause'}
                    </Button>

                    <Button
                      onClick={handleStop}
                      disabled={speechState === 'idle'}
                      variant="outline"
                      className="flex items-center gap-2 rounded-xl hover:bg-primary/10 hover:border-primary transition-all"
                    >
                      <Square className="h-4 w-4" />
                      Stop
                    </Button>

                    <Button
                      onClick={handleDownload}
                      disabled={isLoading || !text.trim()}
                      variant="outline"
                      className="flex items-center gap-2 rounded-xl hover:bg-primary/10 hover:border-primary transition-all"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>

                  {/* Audio Visualization */}
                  {speechState === 'speaking' && (
                    <div className="flex items-center justify-center space-x-1 mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="wave-bar" />
                      ))}
                    </div>
                  )}

                  {/* Settings */}
                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voice Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-xl border-primary/10 hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mic className="h-5 w-5 text-primary" />
                    </div>
                    Voice Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={selectedVoice?.id || ''}
                    onChange={(e) => {
                      const voice = voices.find(v => v.id === e.target.value)
                      if (voice) selectVoice(voice)
                    }}
                    className="rounded-xl"
                  >
                    <option value="">Select a voice...</option>
                    {voices.map((voice) => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} ({voice.accent.toUpperCase()}) - {voice.gender}
                        {voice.quality === 'premium' && ' ⭐'}
                      </option>
                    ))}
                  </Select>

                  {selectedVoice && (
                    <div className="p-4 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl text-sm border border-primary/10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-lg bg-primary/10">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-semibold text-foreground">Voice Details</span>
                      </div>
                      <div className="space-y-2 text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Language:</span>
                          <span className="font-medium text-foreground">{selectedVoice.lang}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Accent:</span>
                          <span className="font-medium text-foreground">{selectedVoice.accent.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gender:</span>
                          <span className="font-medium text-foreground">{selectedVoice.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quality:</span>
                          <span className="font-medium text-foreground capitalize">{selectedVoice.quality}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Provider:</span>
                          <span className="font-medium text-foreground">{selectedVoice.provider}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => speak("Hello, this is a test of the selected voice.")}
                    disabled={!selectedVoice || speechState === 'speaking'}
                    variant="outline"
                    className="w-full rounded-xl hover:bg-primary/10 hover:border-primary transition-all"
                  >
                    Test Voice
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-xl border-primary/10 hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-accent/30 transition-colors">
                    <span className="text-sm text-muted-foreground">Available Voices:</span>
                    <span className="font-semibold text-lg text-primary">{voices.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-accent/30 transition-colors">
                    <span className="text-sm text-muted-foreground">Current Text Length:</span>
                    <span className="font-semibold text-lg">{charCount}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-accent/30 transition-colors">
                    <span className="text-sm text-muted-foreground">Word Count:</span>
                    <span className="font-semibold text-lg">{words.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-accent/30 transition-colors">
                    <span className="text-sm text-muted-foreground">Speech State:</span>
                    <span className={`font-semibold text-lg capitalize ${
                      speechState === 'speaking' ? 'text-green-500' :
                      speechState === 'paused' ? 'text-yellow-500' :
                      'text-muted-foreground'
                    }`}>
                      {speechState}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="shadow-xl border-primary/10 hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={() => setText('')}
                    variant="outline"
                    className="w-full justify-start rounded-xl hover:bg-primary/10 hover:border-primary transition-all"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear Text
                  </Button>
                  <Button
                    onClick={() => updateSettings({ rate: 1.0, pitch: 1.0, volume: 1.0 })}
                    variant="outline"
                    className="w-full justify-start rounded-xl hover:bg-primary/10 hover:border-primary transition-all"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}