import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { TTSService } from '@/services/tts'
import { Voice, TTSSettings, SpeechState } from '@/types/tts'
import toast from 'react-hot-toast'

interface TTSState {
  voices: Voice[]
  selectedVoice: Voice | null
  settings: TTSSettings
  speechState: SpeechState
  isLoading: boolean
  error: string | null
  currentText: string
  highlightedWordIndex: number
  audioUrl: string | null
}

type TTSAction =
  | { type: 'SET_VOICES'; payload: Voice[] }
  | { type: 'SET_SELECTED_VOICE'; payload: Voice }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<TTSSettings> }
  | { type: 'SET_SPEECH_STATE'; payload: SpeechState }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_TEXT'; payload: string }
  | { type: 'SET_HIGHLIGHTED_WORD'; payload: number }
  | { type: 'SET_AUDIO_URL'; payload: string | null }

const initialState: TTSState = {
  voices: [],
  selectedVoice: null,
  settings: {
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    provider: 'browser',
    language: 'en-US',
    accent: 'us',
    gender: 'female'
  },
  speechState: 'idle',
  isLoading: false,
  error: null,
  currentText: '',
  highlightedWordIndex: -1,
  audioUrl: null
}

function ttsReducer(state: TTSState, action: TTSAction): TTSState {
  switch (action.type) {
    case 'SET_VOICES':
      return { ...state, voices: action.payload }
    case 'SET_SELECTED_VOICE':
      return { ...state, selectedVoice: action.payload }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } }
    case 'SET_SPEECH_STATE':
      return { ...state, speechState: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_CURRENT_TEXT':
      return { ...state, currentText: action.payload }
    case 'SET_HIGHLIGHTED_WORD':
      return { ...state, highlightedWordIndex: action.payload }
    case 'SET_AUDIO_URL':
      return { ...state, audioUrl: action.payload }
    default:
      return state
  }
}

interface TTSContextType extends TTSState {
  speak: (text: string) => Promise<void>
  pause: () => void
  resume: () => void
  stop: () => void
  updateSettings: (settings: Partial<TTSSettings>) => void
  selectVoice: (voice: Voice) => void
  loadVoices: () => Promise<void>
  downloadAudio: (text: string) => Promise<void>
}

const TTSContext = createContext<TTSContextType | undefined>(undefined)

export function TTSProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ttsReducer, initialState)
  const ttsService = new TTSService()

  useEffect(() => {
    loadVoices()
    
    // Cleanup on unmount
    return () => {
      ttsService.stop()
    }
  }, [])

  // Monitor speech state changes
  useEffect(() => {
    const interval = setInterval(() => {
      const currentState = ttsService.getSpeechState()
      if (currentState !== state.speechState) {
        dispatch({ type: 'SET_SPEECH_STATE', payload: currentState })
        
        if (currentState === 'idle' && state.speechState !== 'idle') {
          dispatch({ type: 'SET_HIGHLIGHTED_WORD', payload: -1 })
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [state.speechState])

  const loadVoices = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const voices = await ttsService.getVoices()
      dispatch({ type: 'SET_VOICES', payload: voices })
      
      // Auto-select first English voice if none selected
      if (voices.length > 0 && !state.selectedVoice) {
        const preferredVoice = voices.find(v => 
          v.lang.startsWith('en') && v.gender === 'female'
        ) || voices.find(v => v.lang.startsWith('en')) || voices[0]
        
        if (preferredVoice) {
          dispatch({ type: 'SET_SELECTED_VOICE', payload: preferredVoice })
        }
      }
      
      console.log(`Loaded ${voices.length} voices`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load voices'
      dispatch({ type: 'SET_ERROR', payload: message })
      console.error('Voice loading error:', error)
      toast.error(message)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const speak = async (text: string) => {
    if (!text.trim()) {
      toast.error('Please enter some text to speak')
      return
    }

    if (text.length > 5000) {
      toast.error('Text is too long. Maximum 5000 characters allowed.')
      return
    }

    try {
      // Stop any current speech first
      ttsService.stop()
      
      dispatch({ type: 'SET_CURRENT_TEXT', payload: text })
      dispatch({ type: 'SET_SPEECH_STATE', payload: 'speaking' })
      dispatch({ type: 'SET_ERROR', payload: null })
      dispatch({ type: 'SET_HIGHLIGHTED_WORD', payload: -1 })

      await ttsService.speak(text, {
        voice: state.selectedVoice,
        settings: state.settings,
        onWordBoundary: (wordIndex) => {
          dispatch({ type: 'SET_HIGHLIGHTED_WORD', payload: wordIndex })
        },
        onEnd: () => {
          dispatch({ type: 'SET_SPEECH_STATE', payload: 'idle' })
          dispatch({ type: 'SET_HIGHLIGHTED_WORD', payload: -1 })
          console.log('Speech completed successfully')
        },
        onError: (error) => {
          dispatch({ type: 'SET_ERROR', payload: error })
          dispatch({ type: 'SET_SPEECH_STATE', payload: 'idle' })
          dispatch({ type: 'SET_HIGHLIGHTED_WORD', payload: -1 })
          
          // Only show toast for non-interruption errors
          if (!error.includes('interrupted') && !error.includes('canceled')) {
            toast.error(error)
          }
        }
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Speech failed'
      dispatch({ type: 'SET_ERROR', payload: message })
      dispatch({ type: 'SET_SPEECH_STATE', payload: 'idle' })
      dispatch({ type: 'SET_HIGHLIGHTED_WORD', payload: -1 })
      
      console.error('Speech error:', error)
      
      // Only show toast for non-interruption errors
      if (!message.includes('interrupted') && !message.includes('canceled')) {
        toast.error(message)
      }
    }
  }

  const pause = () => {
    try {
      if (state.speechState === 'speaking') {
        ttsService.pause()
        dispatch({ type: 'SET_SPEECH_STATE', payload: 'paused' })
      } else if (state.speechState === 'paused') {
        ttsService.resume()
        dispatch({ type: 'SET_SPEECH_STATE', payload: 'speaking' })
      }
    } catch (error) {
      console.error('Pause/Resume error:', error)
      toast.error('Failed to pause/resume speech')
    }
  }

  const resume = () => {
    try {
      ttsService.resume()
      dispatch({ type: 'SET_SPEECH_STATE', payload: 'speaking' })
    } catch (error) {
      console.error('Resume error:', error)
      toast.error('Failed to resume speech')
    }
  }

  const stop = () => {
    try {
      ttsService.stop()
      dispatch({ type: 'SET_SPEECH_STATE', payload: 'idle' })
      dispatch({ type: 'SET_HIGHLIGHTED_WORD', payload: -1 })
    } catch (error) {
      console.error('Stop error:', error)
      // Force state reset even if stop fails
      dispatch({ type: 'SET_SPEECH_STATE', payload: 'idle' })
      dispatch({ type: 'SET_HIGHLIGHTED_WORD', payload: -1 })
    }
  }

  const updateSettings = (newSettings: Partial<TTSSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings })
  }

  const selectVoice = (voice: Voice) => {
    dispatch({ type: 'SET_SELECTED_VOICE', payload: voice })
  }

  const downloadAudio = async (text: string) => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert')
      return
    }

    if (text.length > 5000) {
      toast.error('Text is too long for audio generation')
      return
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      const audioUrl = await ttsService.generateAudio(text, {
        voice: state.selectedVoice,
        settings: state.settings
      })
      
      dispatch({ type: 'SET_AUDIO_URL', payload: audioUrl })
      
      // Trigger download
      const link = document.createElement('a')
      link.href = audioUrl
      link.download = `tts-audio-${Date.now()}.wav`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up URL after download
      setTimeout(() => {
        URL.revokeObjectURL(audioUrl)
        dispatch({ type: 'SET_AUDIO_URL', payload: null })
      }, 1000)
      
      toast.success('Audio downloaded successfully!')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Download failed'
      console.error('Download error:', error)
      toast.error(message)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const contextValue: TTSContextType = {
    ...state,
    speak,
    pause,
    resume,
    stop,
    updateSettings,
    selectVoice,
    loadVoices,
    downloadAudio
  }

  return (
    <TTSContext.Provider value={contextValue}>
      {children}
    </TTSContext.Provider>
  )
}

export function useTTS() {
  const context = useContext(TTSContext)
  if (context === undefined) {
    throw new Error('useTTS must be used within a TTSProvider')
  }
  return context
}