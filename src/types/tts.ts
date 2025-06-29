export interface Voice {
  id: string
  name: string
  lang: string
  gender: 'male' | 'female' | 'neutral'
  accent: string
  provider: 'browser' | 'elevenlabs' | 'google' | 'amazon' | 'azure'
  quality: 'standard' | 'premium' | 'neural'
  localService?: boolean
}

export interface TTSSettings {
  rate: number // 0.1 - 2.0
  pitch: number // 0.0 - 2.0
  volume: number // 0.0 - 1.0
  provider: 'browser' | 'elevenlabs' | 'google' | 'amazon' | 'azure'
  language: string
  accent: 'us' | 'uk' | 'au' | 'in' | 'ca'
  gender: 'male' | 'female' | 'neutral'
}

export type SpeechState = 'idle' | 'speaking' | 'paused' | 'loading'

export interface SpeechOptions {
  voice?: Voice | null
  settings: TTSSettings
  onWordBoundary?: (wordIndex: number) => void
  onEnd?: () => void
  onError?: (error: string) => void
}

export interface AudioGenerationOptions {
  voice?: Voice | null
  settings: TTSSettings
  format?: 'mp3' | 'wav' | 'ogg'
}

export interface TTSProvider {
  name: string
  id: string
  apiKey?: string
  baseUrl?: string
  supportedLanguages: string[]
  supportedFormats: string[]
  maxCharacters: number
  rateLimits: {
    requestsPerMinute: number
    charactersPerMonth: number
  }
}