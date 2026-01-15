# 🎙️ VoiceFlow AI - Modern Text-to-Speech Application

A contemporary, feature-rich text-to-speech web application built with React, TypeScript, and Tailwind CSS. Transform your text into natural, expressive speech with AI-powered voices.

![VoiceFlow AI](https://img.shields.io/badge/VoiceFlow-AI-purple?style=flat-square)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5.0.0-green?style=flat-square)

## ✨ Features

### Core Functionality
- 🎤 **Text-to-Speech Synthesis** - Convert any text to natural-sounding speech
- 🎵 **Multiple Voices** - Choose from various AI-powered voices with different accents and genders
- ⚙️ **Voice Customization** - Adjust speech rate, pitch, and volume
- 📥 **File Upload** - Import text from .txt, .pdf, .doc, and .docx files
- 💾 **Audio Download** - Download synthesized speech as audio files
- ⌨️ **Keyboard Shortcuts** - Quick controls (Ctrl+Enter to speak, Space to pause, Esc to stop)

### Modern Design
- 🌈 **Glassmorphism Effects** - Semi-transparent blurred backgrounds with modern appeal
- 🎨 **Gradient UI** - Beautiful purple-to-blue gradient theme throughout
- ✨ **Smooth Animations** - Engaging transitions and hover effects
- 🌓 **Dark Mode Support** - Full light/dark theme toggle
- 📱 **Fully Responsive** - Optimized for all device sizes
- ♿ **Accessibility First** - WCAG compliant with proper keyboard navigation

### Advanced Features
- 📊 **Real-time Statistics** - Character count, word count, voice selection info
- 🎯 **Quick Sample Texts** - Pre-loaded examples for quick testing
- 🌊 **Audio Visualization** - Dynamic wave animation during playback
- 🔌 **Multiple Providers** - Support for various TTS service providers
- 🎨 **Interactive UI Elements** - Rounded buttons, modern sliders, polished cards

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AsharaFernando18/English-Text-to-Speech-App.git
cd English-Text-to-Speech-App
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

## 📦 Project Structure

```
src/
├── components/
│   ├── Layout.tsx              # Main app layout with header/footer
│   └── ui/
│       ├── Button.tsx          # Custom button component
│       ├── Card.tsx            # Card component with styling
│       ├── Input.tsx           # Input field component
│       ├── Select.tsx          # Select dropdown component
│       ├── Slider.tsx          # Range slider component
│       └── Textarea.tsx        # Text area component
├── contexts/
│   ├── ThemeContext.tsx        # Theme management (light/dark)
│   └── TTSContext.tsx          # TTS state and logic
├── pages/
│   ├── HomePage.tsx            # Main application interface
│   ├── SettingsPage.tsx        # Settings and configuration
│   └── AboutPage.tsx           # About page
├── services/
│   └── tts.ts                  # Text-to-speech API service
├── types/
│   └── tts.ts                  # TypeScript type definitions
├── lib/
│   └── utils.ts                # Utility functions
├── App.tsx                     # Root component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles and animations
```

## 🎨 Design Highlights

### Modern Color Scheme
- **Primary**: Purple (#A855F7) with blue accents
- **Background**: Light gradient (240° 10% 98%) to darker purple
- **Dark Mode**: Deep blue-black background with vibrant accents

### Component Styling
- **Rounded Corners**: All components use `rounded-xl` or `rounded-2xl` for modern feel
- **Glassmorphism**: Header and footer with semi-transparent backgrounds and blur effects
- **Gradients**: Gradient buttons, text effects, and visual depth
- **Animations**: Scale transforms, fade-ins, wave effects, and smooth transitions

### Interactive Elements
- 🔘 Buttons with hover scale and shadow effects
- 🎚️ Sliders with gradient thumb and hover animations
- 📝 Input fields with smooth transitions
- 🎴 Cards with shadow elevation and hover lift effects

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📋 Configuration Files

- **vite.config.ts** - Vite build configuration
- **tailwind.config.js** - Tailwind CSS customization
- **tsconfig.json** - TypeScript configuration
- **postcss.config.js** - PostCSS plugins configuration

## 🎯 Key Technologies

| Technology | Purpose |
|---|---|
| **React 18.2** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **React Router** | Navigation |
| **Zustand** | State management |
| **Lucide React** | Modern icons |

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color schemes
- Focus indicators on interactive elements
- Screen reader friendly

## 🔐 Privacy & Security

- Client-side processing (no data stored on servers)
- No tracking or analytics
- All data stays in your browser
- Open source and auditable code

## 📝 Recent Updates (v2.0)

### Modernization Release
- 🎨 Completely redesigned UI with contemporary aesthetic
- 💜 New purple/blue gradient color scheme
- ✨ Added glassmorphism effects
- 🎬 Enhanced animations and transitions
- 🌈 Gradient text and buttons
- 📱 Improved responsive design
- 🎙️ Rebranded to "VoiceFlow AI"
- 🚀 Better performance optimizations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Ashara Fernando**
- GitHub: [@AsharaFernando18](https://github.com/AsharaFernando18)

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- All contributors and users

## 📞 Support

For support, email your queries or create an issue on GitHub.

## 🗺️ Roadmap

- [ ] Voice cloning feature
- [ ] Multiple language support
- [ ] Advanced audio effects
- [ ] Cloud backup for favorites
- [ ] Mobile app version
- [ ] API documentation
- [ ] Plugin system

---

**Made with ❤️ for accessibility and modern web standards**

© 2026 VoiceFlow AI. All rights reserved.
