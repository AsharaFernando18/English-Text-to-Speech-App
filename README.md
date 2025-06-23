# Modern English Text-to-Speech App

A **100% free** web-based English Text-to-Speech application built with vanilla HTML, JavaScript, and Tailwind CSS. No external APIs required!

## 🌟 Features

- **Free & Open Source**: No paid APIs or subscriptions
- **English Voice Optimization**: Automatically detects and prioritizes English voices
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Browser-Based**: Uses native Web Speech API
- **Modern UI**: Clean design with Inter and Poppins fonts
- **Real-time Controls**: Play, pause, stop, and speed control
- **Sample Texts**: Quick access to common English phrases
- **Smart Voice Selection**: Intelligently categorizes and filters available voices
- **Progress Tracking**: Visual feedback during speech playback
- **Voice Visualization**: Audio waveform display during playback

## 🚀 Live Demo

Simply open `index.html` in your browser to start using the app!

## 🛠️ Technology Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Styling with Tailwind CSS framework
- **JavaScript (ES6+)**: Speech Synthesis API integration
- **Google Fonts**: Noto Sans Sinhala for proper Sinhala text rendering

## 📋 Browser Compatibility

| Browser | Desktop | Mobile | English Voice Support |
|---------|---------|--------|----------------------|
| **Chrome** | ✅ Excellent | ✅ Excellent | ✅ Best (multiple voices) |
| **Edge** | ✅ Very Good | ✅ Good | ✅ Good |
| **Firefox** | ✅ Good | ✅ Good | ✅ Limited |
| **Safari** | ✅ Good | ✅ Good | ✅ Limited |

### 🎯 Best Experience Tips:

1. **Use Google Chrome** for the best English voice support
2. **Allow page interactions** before using TTS (Chrome security feature)
3. **Enable microphone permissions** if prompted (not required for TTS)
4. **Use latest browser versions** for optimal performance

## 🔧 Setup & Installation

### Option 1: Simple File Opening
```bash
# Clone or download the files
# Open index.html in your browser
```

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🌐 Deployment to GitHub Pages

1. **Create a GitHub repository**
2. **Upload all files** to the repository
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save settings
4. **Access your app** at: `https://yourusername.github.io/repository-name`

### Quick Deploy Commands:
```bash
git init
git add .
git commit -m "Initial commit: English TTS App"
git branch -M main
git remote add origin https://github.com/yourusername/english-tts.git
git push -u origin main
```

## 📖 How to Use

1. **Open the application** in your web browser
2. **Check voice status** - the app will show if English voices are available
3. **Select a voice** from the dropdown menu
4. **Enter English text** in the text area or use sample buttons
5. **Adjust speech rate** using the slider (0.1x to 2.0x)
6. **Click "Speak"** to start text-to-speech
7. **Use controls** to pause, resume, or stop playback
8. **Test voices** using the test voice button

### 🎮 Keyboard Shortcuts:
- **Ctrl/Cmd + Enter**: Start speaking
- **Spacebar**: Pause/Resume (when not typing)
- **Escape**: Stop speaking

## 🔍 Technical Details

### Speech Synthesis API Implementation
```javascript
// The app uses browser's native Speech Synthesis API
const utterance = new SpeechSynthesisUtterance(text);
utterance.voice = selectedVoice;
utterance.rate = userSelectedRate;
utterance.lang = 'en-US'; // Set to English
speechSynthesis.speak(utterance);
```

### English Voice Detection
```javascript
// Filters voices for English support
const englishVoices = allVoices.filter(voice => {
    const lang = voice.lang.toLowerCase();
    return lang.includes('en') || 
           lang.includes('english') ||
           voice.name.toLowerCase().includes('english');
});
```

### Features Implementation:
- **Multi-strategy Voice Loading**: Handles async voice loading across browsers
- **Voice Categorization**: Groups voices by quality and language
- **Progress Visualization**: Visual feedback during speech with waveform
- **Error Handling**: Comprehensive error management with user feedback
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support

## 🛠️ Customization

### Adding New Sample Texts:
```javascript
// Edit the sampleTexts object in app.js
const sampleTexts = {
    sample1: 'Good morning! Have a wonderful day ahead.',
    sample2: 'How are you today? I hope you are doing well.',
    // Add your custom samples here
    sample6: 'Your new English text here'
};
```

### Styling Customization:
- Edit Tailwind classes in `index.html`
- Modify the color scheme by changing CSS class names
- Adjust font sizes, spacing, and layout as needed

### Adding New Languages:
```javascript
// Modify the voice filtering logic in loadVoices()
voices = [...englishVoices, ...otherVoices.filter(voice => {
    const lang = voice.lang.toLowerCase();
    return lang.includes('fr') || // French
           lang.includes('de') || // German
           lang.includes('es');   // Spanish
})];
```

## 🐛 Troubleshooting

### Common Issues:

**1. No English Voices Available**
- **Chrome**: Navigate to chrome://settings/content/sound to ensure permissions
- **Windows**: Ensure English is set as the system language or installed as an additional language
- **macOS/iOS**: Check System Preferences → Language & Region
- **Check**: Use the "Analyze Voices" debug button to check available voices

**2. Text Not Speaking**
- Ensure browser supports Speech Synthesis API
- Check if text area has content
- Verify browser permissions (Chrome requires user interaction first)
- Try clicking the page first, then use the speak button

**3. Voice Sounds Robotic**
- Try different voices from the dropdown
- Adjust speech rate (slower often sounds better)
- Premium voices (marked with ⭐) usually sound more natural
- Some browsers have better voice quality than others

**4. Mobile Issues**
- **Android**: Use Chrome browser for best results
- **iOS**: Use Safari for best results
- Ensure device volume is up and not on silent mode
- Try reloading the page if voices don't load initially

**5. Voices Not Loading**
- Click the "Reload Voices" button
- Refresh the page and wait a few seconds
- Try clicking the "Test Voice" button
- Clear browser cache and reload
- Check internet connection (some voices are cloud-based)

### Advanced Debugging:

**Voice Analysis Commands:**
```javascript
// Open browser console (F12) and run:
window.ttsDebug.listAllVoices();        // List all available voices
window.ttsDebug.analyzeVoices();        // Analyze voice capabilities
window.ttsDebug.testTTS("Hello world"); // Test speech with a sample text
window.ttsDebug.forceReloadVoices();    // Force reload voices
```

**Common Voice Issues:**
- **"No voices found"**: Browser needs time to load voices, try the reload button
- **"Synthesis failed"**: Try another voice or browser
- **"Network error"**: Cloud voices unavailable, try offline voices
- **"Not allowed"**: User interaction required, click page first

### Browser-Specific Solutions:

**Google Chrome:**
- Best overall support
- Turn on "Allow sites to play sound" in settings
- First user interaction must be a click on the page (security feature)

**Microsoft Edge:**
- Good support on Windows
- Based on Chromium, so similar to Chrome
- Use Edge version 88 or later

**Firefox:**
- Limited TTS support compared to Chrome
- May work better with extensions
- Try Firefox 87 or later

**Safari:**
- Basic support on macOS/iOS
- Requires macOS Catalina or later for best results
- iOS 14+ recommended

## 📝 File Structure

```
english-tts/
├── index.html          # Main HTML file with UI
├── app.js              # JavaScript logic and TTS functionality
└── README.md           # This documentation file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions:
- Add more sample texts
- Improve voice detection algorithm
- Add text highlighting during speech
- Implement SSML support for more natural speech
- Add full audio download functionality
- Create dark/light theme toggle

## 📄 License

This project is **open source** and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google Fonts** for Inter and Poppins fonts
- **Tailwind CSS** for the utility-first CSS framework
- **Web Speech API** for browser-based TTS functionality
- **Font Awesome** for icons

## 📞 Support

- 🐛 **Report bugs**: Create an issue on GitHub
- 💡 **Feature requests**: Open a discussion on GitHub
- 📧 **Questions**: Contact via repository discussions

---

**Built with ❤️ for accessibility and language technology**

*Free • Open Source • Privacy Friendly*
