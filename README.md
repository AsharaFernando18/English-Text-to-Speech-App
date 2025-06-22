# English Text-to-Speech App

A **100% free** web-based English Text-to-Speech application1. **Open the application** in your web browser
2. **Check voice status** - the app will show if English voices are available
3. **Select a voice** from the dropdown (if multiple available)
4. **Enter English text** in the text area or use sample buttons
5. **Adjust speech rate** using the slider (0.1x to 2.0x)
6. **Click "Speak"** to start text-to-speech
7. **Use controls** to pause, resume, or stop playbackwith vanilla HTML, JavaScript, and Tailwind CSS. No external APIs required!

## 🌟 Features

- **Free & Open Source**: No paid APIs or subscriptions
- **English Support**: Automatically detects and uses English voices
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Browser-Based**: Uses native Web Speech API
- **Beautiful UI**: Clean design with Tailwind CSS and modern fonts (Inter, Poppins)
- **Real-time Controls**: Play, pause, stop, and speed control
- **Sample Texts**: Quick access to common English phrases
- **Voice Selection**: Choose from available English voices
- **Progress Tracking**: Visual feedback during speech playback

## 🚀 Live Demo

Simply open `index.html` in your browser to start using the app!

## 🛠️ Technology Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Styling with Tailwind CSS framework
- **JavaScript (ES6+)**: Speech Synthesis API integration
- **Google Fonts**: Inter and Poppins for modern English text rendering

## 📋 Browser Compatibility

| Browser | Desktop | Mobile | English Voice Support |
|---------|---------|--------|----------------------|
| **Chrome** | ✅ Excellent | ✅ Excellent | ✅ Best (native support) |
| **Edge** | ✅ Very Good | ✅ Good | ✅ Excellent |
| **Firefox** | ✅ Good | ✅ Good | ✅ Good |
| **Safari** | ✅ Good | ✅ Good | ✅ Good |

### 🎯 Best Experience Tips:

1. **Use Google Chrome or Microsoft Edge** for the best English voice support
2. **Ensure system volume is up** and speakers/headphones are working
3. **Allow browser permissions** if prompted for audio playback
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
3. **Select a voice** from the dropdown (if multiple available)
4. **Enter English text** in the text area or use sample buttons
5. **Adjust speech rate** using the slider (0.1x to 2.0x)
6. **Click "Speak"** to start text-to-speech
7. **Use controls** to pause, resume, or stop playback

### 🎮 Keyboard Shortcuts:
- **Ctrl/Cmd + Enter**: Start speaking
- **Spacebar**: Pause/Resume (when not typing)
- **Escape**: Stop speaking

## 🔍 Technical Details

### Speech Synthesis API Implementation
```javascript
// The app uses browser's native Speech Synthesis API
const utterance = new SpeechSynthesisUtterance(text);
utterance.voice = selectedEnglishVoice;
utterance.rate = userSelectedRate;
utterance.lang = 'en-US';
speechSynthesis.speak(utterance);
```

### English Voice Detection
```javascript
// Filters voices for English support
const englishVoices = allVoices.filter(voice => {
    return voice.lang.includes('en') || 
           voice.lang.includes('english') ||
           voice.name.toLowerCase().includes('english');
});
```

### Features Implementation:
- **Voice Loading**: Handles async voice loading across browsers
- **Progress Simulation**: Estimates progress since API doesn't provide it
- **Error Handling**: Comprehensive error management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🛠️ Customization

### Adding New Sample Texts:
```javascript
// Edit the sampleTexts object in app.js
const sampleTexts = {
    sample1: 'Good morning!',
    sample2: 'How are you today?',
    // Add your custom samples here
    sample5: 'Your new English text here'
};
```

### Styling Customization:
- Edit Tailwind classes in `index.html`
- Modify the color scheme by changing CSS class names
- Adjust font sizes, spacing, and layout as needed

### Adding New Languages:
```javascript
// Modify the voice filtering logic in loadVoices()
voices = allVoices.filter(voice => {
    return voice.lang.includes('en') || 
           voice.lang.includes('es') || // Spanish
           voice.lang.includes('fr');   // French
});
```

## 🐛 Troubleshooting

### Common Issues:

**1. No English Voice Available**
- **Windows 10/11**: English voices should be available by default
- **Chrome**: Best browser for TTS support with multiple English voices
- **Alternative**: Try Microsoft Edge which has excellent Windows integration
- **Check**: Run `window.ttsDebug.analyzeVoices()` in browser console

**2. Text Not Speaking**
- Ensure browser supports Speech Synthesis API
- Check if text area has content
- Verify browser permissions (some browsers require user interaction first)
- Try clicking the page first, then use the speak button

**3. Voice Quality Issues**
- Try different voices from the dropdown
- Adjust speech rate (slower often sounds better)
- Use Chrome or Edge for highest quality voices
- Ensure device volume is up and not muted

**4. Mobile Issues**
- **Android**: Use Chrome browser for best results
- **iOS**: Use Safari, ensure device is not on silent mode
- Ensure device volume is up and not on silent mode
- Try reloading the page if voices don't load initially

**5. Voices Not Loading**
- Refresh the page and wait a few seconds
- Try `window.ttsDebug.forceReload()` in console
- Clear browser cache and reload
- Check internet connection (some voices are cloud-based)

### Advanced Debugging:

**Voice Analysis Commands:**
```javascript
// Open browser console (F12) and run:
window.ttsDebug.listAllVoices();        // List all available voices
window.ttsDebug.analyzeVoices();        // Analyze English voice support
window.ttsDebug.testEnglishVoices();    // Test English voices
window.ttsDebug.forceReload();          // Force reload voices
```

**Common Voice Issues:**
- **"No voices found"**: Browser needs time to load voices, refresh page
- **"Synthesis failed"**: Try a different voice from the dropdown
- **"Network error"**: Cloud voices unavailable, try offline voices
- **"Not allowed"**: User interaction required, click page first

### Browser-Specific Solutions:

**Google Chrome:**
- Best overall support for English TTS
- Multiple high-quality English voices available
- Excellent cloud-based voice options
- Use Chrome version 88 or later

**Microsoft Edge:**
- Excellent support with Windows integration
- High-quality Microsoft voices
- Best performance on Windows systems
- Use Edge version 88 or later

**Firefox:**
- Good basic TTS support
- Limited voice selection compared to Chrome/Edge
- Works well for standard English text
- Try Firefox 87 or later

**Safari:**
- Good support on macOS/iOS
- Quality Apple voices on Mac systems
- iOS 14+ recommended for mobile
- macOS Big Sur or later for desktop

## 📝 File Structure

```
english-tts/
├── index.html          # Main HTML file with UI
├── app.js             # JavaScript logic and TTS functionality
└── README.md          # This documentation file
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
- Implement SSML support
- Add download/save functionality
- Create dark mode theme

## 📄 License

This project is **open source** and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google Fonts** for Inter and Poppins font families
- **Tailwind CSS** for the utility-first CSS framework
- **Web Speech API** for browser-based TTS functionality
- **Open source community** for inspiration and best practices

## 📞 Support

- 🐛 **Report bugs**: Create an issue on GitHub
- 💡 **Feature requests**: Open a discussion on GitHub
- 📧 **Questions**: Contact via repository discussions

---

**Built with ❤️ for everyone who needs accessible text-to-speech**

*Free • Open Source • Privacy Friendly*
