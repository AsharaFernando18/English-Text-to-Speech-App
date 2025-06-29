import { Voice, SpeechOptions, AudioGenerationOptions, TTSSettings } from '@/types/tts'

export class TTSService {
  private synthesis: SpeechSynthesis
  private currentUtterance: SpeechSynthesisUtterance | null = null
  private voices: SpeechSynthesisVoice[] = []
  private isInitialized: boolean = false
  private speechQueue: SpeechSynthesisUtterance[] = []
  private currentWordIndex: number = 0

  constructor() {
    this.synthesis = window.speechSynthesis
    this.initializeService()
  }

  private async initializeService(): Promise<void> {
    // Clear any existing speech
    this.synthesis.cancel()
    
    // Load voices with retry mechanism
    await this.loadBrowserVoices()
    this.isInitialized = true
  }

  private async loadBrowserVoices(): Promise<void> {
    return new Promise((resolve) => {
      let attempts = 0
      const maxAttempts = 5
      
      const loadVoices = () => {
        this.voices = this.synthesis.getVoices()
        attempts++
        
        if (this.voices.length > 0) {
          console.log(`Loaded ${this.voices.length} voices`)
          resolve()
        } else if (attempts < maxAttempts) {
          // Retry after a short delay
          setTimeout(loadVoices, 100)
        } else {
          console.warn('Could not load voices after multiple attempts')
          resolve()
        }
      }

      // Initial load
      loadVoices()
      
      // Listen for voices changed event
      this.synthesis.addEventListener('voiceschanged', loadVoices, { once: true })
    })
  }

  async getVoices(): Promise<Voice[]> {
    if (!this.isInitialized) {
      await this.initializeService()
    }
    
    const browserVoices: Voice[] = this.voices.map((voice, index) => ({
      id: `browser-${index}`,
      name: voice.name,
      lang: voice.lang,
      gender: this.detectGender(voice.name),
      accent: this.detectAccent(voice.lang, voice.name),
      provider: 'browser',
      quality: voice.localService ? 'standard' : 'premium',
      localService: voice.localService
    }))

    // Filter for English voices and sort by quality
    const englishVoices = browserVoices
      .filter(voice => voice.lang.toLowerCase().includes('en'))
      .sort((a, b) => {
        if (a.quality === 'premium' && b.quality === 'standard') return -1
        if (a.quality === 'standard' && b.quality === 'premium') return 1
        return a.name.localeCompare(b.name)
      })

    return englishVoices
  }

  private detectGender(voiceName: string): 'male' | 'female' | 'neutral' {
    const name = voiceName.toLowerCase()
    const maleIndicators = ['male', 'man', 'david', 'mark', 'alex', 'daniel', 'james', 'john', 'michael', 'robert', 'william', 'thomas']
    const femaleIndicators = ['female', 'woman', 'zira', 'hazel', 'susan', 'samantha', 'victoria', 'karen', 'sarah', 'emma', 'olivia', 'anna', 'helen']
    
    if (maleIndicators.some(indicator => name.includes(indicator))) return 'male'
    if (femaleIndicators.some(indicator => name.includes(indicator))) return 'female'
    return 'neutral'
  }

  private detectAccent(lang: string, voiceName: string): string {
    const langLower = lang.toLowerCase()
    const nameLower = voiceName.toLowerCase()
    
    if (langLower.includes('gb') || nameLower.includes('british') || nameLower.includes('uk')) return 'uk'
    if (langLower.includes('au') || nameLower.includes('australian')) return 'au'
    if (langLower.includes('in') || nameLower.includes('indian')) return 'in'
    if (langLower.includes('ca') || nameLower.includes('canadian')) return 'ca'
    return 'us'
  }

  async speak(text: string, options: SpeechOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Ensure service is initialized
        if (!this.isInitialized) {
          reject(new Error('TTS service not initialized'))
          return
        }

        // Clean and validate text
        const cleanText = text.trim()
        if (!cleanText) {
          reject(new Error('No text provided'))
          return
        }

        // Stop any current speech gracefully
        this.stop()

        // Wait a moment to ensure previous speech is fully stopped
        setTimeout(() => {
          try {
            const utterance = new SpeechSynthesisUtterance(cleanText)
            
            // Find and set the browser voice
            if (options.voice) {
              const browserVoice = this.voices.find(v => 
                v.name === options.voice!.name && v.lang === options.voice!.lang
              )
              if (browserVoice) {
                utterance.voice = browserVoice
              }
            }

            // Apply settings with validation
            utterance.rate = Math.max(0.1, Math.min(2.0, options.settings.rate))
            utterance.pitch = Math.max(0.0, Math.min(2.0, options.settings.pitch))
            utterance.volume = Math.max(0.0, Math.min(1.0, options.settings.volume))
            utterance.lang = options.settings.language

            // Reset word tracking
            this.currentWordIndex = 0
            const words = cleanText.split(/\s+/).filter(word => word.length > 0)
            
            // Enhanced word boundary tracking
            utterance.onboundary = (event) => {
              try {
                if (event.name === 'word' && options.onWordBoundary) {
                  if (this.currentWordIndex < words.length) {
                    options.onWordBoundary(this.currentWordIndex)
                    this.currentWordIndex++
                  }
                }
              } catch (error) {
                console.warn('Word boundary error:', error)
              }
            }

            // Success handler
            utterance.onend = () => {
              try {
                this.currentUtterance = null
                this.currentWordIndex = 0
                options.onEnd?.()
                resolve()
              } catch (error) {
                console.warn('Speech end handler error:', error)
                resolve()
              }
            }

            // Error handler with detailed error information
            utterance.onerror = (event) => {
              try {
                this.currentUtterance = null
                this.currentWordIndex = 0
                
                let errorMessage = 'Speech synthesis failed'
                
                switch (event.error) {
                  case 'interrupted':
                    errorMessage = 'Speech was interrupted. Please try again.'
                    break
                  case 'canceled':
                    errorMessage = 'Speech was canceled'
                    break
                  case 'not-allowed':
                    errorMessage = 'Speech synthesis not allowed. Please check browser permissions.'
                    break
                  case 'network':
                    errorMessage = 'Network error occurred during speech synthesis'
                    break
                  case 'synthesis-failed':
                    errorMessage = 'Speech synthesis failed. Please try a different voice.'
                    break
                  case 'synthesis-unavailable':
                    errorMessage = 'Speech synthesis is not available'
                    break
                  case 'text-too-long':
                    errorMessage = 'Text is too long for speech synthesis'
                    break
                  default:
                    errorMessage = `Speech error: ${event.error}`
                }
                
                console.error('Speech synthesis error:', event.error, event)
                options.onError?.(errorMessage)
                reject(new Error(errorMessage))
              } catch (error) {
                console.error('Error in error handler:', error)
                reject(new Error('Speech synthesis failed'))
              }
            }

            // Start handler
            utterance.onstart = () => {
              console.log('Speech started successfully')
            }

            // Store current utterance
            this.currentUtterance = utterance

            // Start speaking with error handling
            try {
              this.synthesis.speak(utterance)
              
              // Fallback timeout to prevent hanging
              setTimeout(() => {
                if (this.currentUtterance === utterance && this.synthesis.speaking) {
                  console.warn('Speech timeout - forcing completion')
                  this.stop()
                  options.onEnd?.()
                  resolve()
                }
              }, 30000) // 30 second timeout
              
            } catch (speakError) {
              console.error('Error starting speech:', speakError)
              this.currentUtterance = null
              reject(new Error('Failed to start speech synthesis'))
            }
            
          } catch (utteranceError) {
            console.error('Error creating utterance:', utteranceError)
            reject(new Error('Failed to create speech utterance'))
          }
        }, 100) // Small delay to ensure clean state
        
      } catch (error) {
        console.error('Speech setup error:', error)
        const message = error instanceof Error ? error.message : 'Unknown speech error'
        options.onError?.(message)
        reject(error)
      }
    })
  }

  pause(): void {
    try {
      if (this.synthesis.speaking && !this.synthesis.paused) {
        this.synthesis.pause()
        console.log('Speech paused')
      }
    } catch (error) {
      console.error('Error pausing speech:', error)
    }
  }

  resume(): void {
    try {
      if (this.synthesis.paused) {
        this.synthesis.resume()
        console.log('Speech resumed')
      }
    } catch (error) {
      console.error('Error resuming speech:', error)
    }
  }

  stop(): void {
    try {
      // Cancel all speech
      this.synthesis.cancel()
      
      // Clear current utterance
      this.currentUtterance = null
      this.currentWordIndex = 0
      
      // Clear any queued utterances
      this.speechQueue = []
      
      console.log('Speech stopped')
    } catch (error) {
      console.error('Error stopping speech:', error)
    }
  }

  // Get current speech state
  getSpeechState(): 'idle' | 'speaking' | 'paused' {
    try {
      if (this.synthesis.speaking) {
        return this.synthesis.paused ? 'paused' : 'speaking'
      }
      return 'idle'
    } catch (error) {
      console.error('Error getting speech state:', error)
      return 'idle'
    }
  }

  async generateAudio(text: string, options: AudioGenerationOptions): Promise<string> {
    // For browser-based TTS, we'll create a simple audio recording
    // In a real implementation, you'd integrate with cloud TTS services
    
    return new Promise((resolve, reject) => {
      try {
        // Validate input
        if (!text.trim()) {
          reject(new Error('No text provided for audio generation'))
          return
        }

        // For demo purposes, create a data URL
        // In production, you'd use MediaRecorder API or cloud services
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        
        // Create a simple tone as placeholder
        const duration = Math.min(text.length * 0.1, 10) // Max 10 seconds
        const sampleRate = audioContext.sampleRate
        const numSamples = duration * sampleRate
        const buffer = audioContext.createBuffer(1, numSamples, sampleRate)
        const channelData = buffer.getChannelData(0)
        
        // Generate a simple tone
        for (let i = 0; i < numSamples; i++) {
          channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.1
        }
        
        // Convert to WAV format (simplified)
        const wavData = this.bufferToWav(buffer)
        const blob = new Blob([wavData], { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(blob)
        
        resolve(audioUrl)
      } catch (error) {
        console.error('Audio generation error:', error)
        reject(new Error('Failed to generate audio'))
      }
    })
  }

  private bufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const length = buffer.length
    const arrayBuffer = new ArrayBuffer(44 + length * 2)
    const view = new DataView(arrayBuffer)
    const channelData = buffer.getChannelData(0)
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }
    
    writeString(0, 'RIFF')
    view.setUint32(4, 36 + length * 2, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, 1, true)
    view.setUint32(24, buffer.sampleRate, true)
    view.setUint32(28, buffer.sampleRate * 2, true)
    view.setUint16(32, 2, true)
    view.setUint16(34, 16, true)
    writeString(36, 'data')
    view.setUint32(40, length * 2, true)
    
    // Convert float samples to 16-bit PCM
    let offset = 44
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]))
      view.setInt16(offset, sample * 0x7FFF, true)
      offset += 2
    }
    
    return arrayBuffer
  }

  // Cloud TTS integration methods (for future implementation)
  private async callElevenLabsAPI(text: string, voiceId: string, settings: TTSSettings): Promise<string> {
    throw new Error('ElevenLabs integration requires API key configuration')
  }

  private async callGoogleTTSAPI(text: string, voice: string, settings: TTSSettings): Promise<string> {
    throw new Error('Google TTS integration requires API key configuration')
  }

  private async callAmazonPollyAPI(text: string, voice: string, settings: TTSSettings): Promise<string> {
    throw new Error('Amazon Polly integration requires API key configuration')
  }

  private async callAzureTTSAPI(text: string, voice: string, settings: TTSSettings): Promise<string> {
    throw new Error('Azure TTS integration requires API key configuration')
  }
}