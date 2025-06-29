import { Voice, SpeechOptions, AudioGenerationOptions, TTSSettings } from '@/types/tts'

export class TTSService {
  private synthesis: SpeechSynthesis
  private currentUtterance: SpeechSynthesisUtterance | null = null
  private voices: SpeechSynthesisVoice[] = []

  constructor() {
    this.synthesis = window.speechSynthesis
    this.loadBrowserVoices()
  }

  private async loadBrowserVoices(): Promise<void> {
    return new Promise((resolve) => {
      const loadVoices = () => {
        this.voices = this.synthesis.getVoices()
        if (this.voices.length > 0) {
          resolve()
        }
      }

      loadVoices()
      
      if (this.voices.length === 0) {
        this.synthesis.addEventListener('voiceschanged', loadVoices)
        // Fallback timeout
        setTimeout(resolve, 1000)
      }
    })
  }

  async getVoices(): Promise<Voice[]> {
    await this.loadBrowserVoices()
    
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
    const maleIndicators = ['male', 'man', 'david', 'mark', 'alex', 'daniel', 'james', 'john', 'michael', 'robert', 'william']
    const femaleIndicators = ['female', 'woman', 'zira', 'hazel', 'susan', 'samantha', 'victoria', 'karen', 'sarah', 'emma', 'olivia']
    
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
        // Stop any current speech
        this.stop()

        const utterance = new SpeechSynthesisUtterance(text)
        
        // Find the browser voice
        if (options.voice) {
          const browserVoice = this.voices.find(v => 
            v.name === options.voice!.name && v.lang === options.voice!.lang
          )
          if (browserVoice) {
            utterance.voice = browserVoice
          }
        }

        // Apply settings
        utterance.rate = options.settings.rate
        utterance.pitch = options.settings.pitch
        utterance.volume = options.settings.volume
        utterance.lang = options.settings.language

        // Word boundary tracking
        let wordIndex = 0
        const words = text.split(/\s+/)
        
        utterance.onboundary = (event) => {
          if (event.name === 'word' && options.onWordBoundary) {
            options.onWordBoundary(wordIndex)
            wordIndex++
          }
        }

        utterance.onend = () => {
          this.currentUtterance = null
          options.onEnd?.()
          resolve()
        }

        utterance.onerror = (event) => {
          this.currentUtterance = null
          const error = `Speech synthesis error: ${event.error}`
          options.onError?.(error)
          reject(new Error(error))
        }

        this.currentUtterance = utterance
        this.synthesis.speak(utterance)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown speech error'
        options.onError?.(message)
        reject(error)
      }
    })
  }

  pause(): void {
    if (this.synthesis.speaking) {
      this.synthesis.pause()
    }
  }

  resume(): void {
    if (this.synthesis.paused) {
      this.synthesis.resume()
    }
  }

  stop(): void {
    this.synthesis.cancel()
    this.currentUtterance = null
  }

  async generateAudio(text: string, options: AudioGenerationOptions): Promise<string> {
    // For browser-based TTS, we'll create a simple audio recording
    // In a real implementation, you'd integrate with cloud TTS services
    
    return new Promise((resolve, reject) => {
      try {
        // Create a temporary utterance for audio generation
        const utterance = new SpeechSynthesisUtterance(text)
        
        if (options.voice) {
          const browserVoice = this.voices.find(v => 
            v.name === options.voice!.name && v.lang === options.voice!.lang
          )
          if (browserVoice) {
            utterance.voice = browserVoice
          }
        }

        utterance.rate = options.settings.rate
        utterance.pitch = options.settings.pitch
        utterance.volume = options.settings.volume

        // For demo purposes, create a data URL
        // In production, you'd use MediaRecorder API or cloud services
        const audioContext = new AudioContext()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 1)
        
        // Create a dummy audio URL for demo
        const dummyAudioUrl = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
        
        resolve(dummyAudioUrl)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Cloud TTS integration methods (for future implementation)
  private async callElevenLabsAPI(text: string, voiceId: string, settings: TTSSettings): Promise<string> {
    // Implementation for ElevenLabs API
    throw new Error('ElevenLabs integration not implemented yet')
  }

  private async callGoogleTTSAPI(text: string, voice: string, settings: TTSSettings): Promise<string> {
    // Implementation for Google Cloud TTS API
    throw new Error('Google TTS integration not implemented yet')
  }

  private async callAmazonPollyAPI(text: string, voice: string, settings: TTSSettings): Promise<string> {
    // Implementation for Amazon Polly API
    throw new Error('Amazon Polly integration not implemented yet')
  }

  private async callAzureTTSAPI(text: string, voice: string, settings: TTSSettings): Promise<string> {
    // Implementation for Azure Cognitive Services TTS API
    throw new Error('Azure TTS integration not implemented yet')
  }
}