# සිංහල පාඨ-කථන යෙදුම | Sinhala Text-to-Speech App

A **100% free** web-based Sinhala Text-to-Speech application built with vanilla HTML, JavaScript, and Tailwind CSS. No external APIs required!

## 🌟 Features

- **Free & Open Source**: No paid APIs or subscriptions
- **Sinhala Support**: Automatically detects and uses Sinhala voices
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Browser-Based**: Uses native Web Speech API
- **Beautiful UI**: Clean design with Tailwind CSS and Noto Sans Sinhala font
- **Real-time Controls**: Play, pause, stop, and speed control
- **Sample Texts**: Quick access to common Sinhala phrases
- **Voice Selection**: Choose from available Sinhala voices
- **Progress Tracking**: Visual feedback during speech playback

## 🚀 Live Demo

Simply open `index.html` in your browser to start using the app!

## 🛠️ Technology Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Styling with Tailwind CSS framework
- **JavaScript (ES6+)**: Speech Synthesis API integration
- **Google Fonts**: Noto Sans Sinhala for proper Sinhala text rendering

## 📋 Browser Compatibility

| Browser | Desktop | Mobile | Sinhala Voice Support |
|---------|---------|--------|----------------------|
| **Chrome** | ✅ Excellent | ✅ Excellent | ✅ Best (with language pack) |
| **Edge** | ✅ Very Good | ✅ Good | ✅ Good |
| **Firefox** | ✅ Good | ✅ Good | ⚠️ Limited |
| **Safari** | ✅ Good | ✅ Good | ⚠️ Limited |

### 🎯 Best Experience Tips:

1. **Use Google Chrome** for the best Sinhala voice support
2. **Install Sinhala Language Pack** in your operating system
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
git commit -m "Initial commit: Sinhala TTS App"
git branch -M main
git remote add origin https://github.com/yourusername/sinhala-tts.git
git push -u origin main
```

## 📖 How to Use

1. **Open the application** in your web browser
2. **Check voice status** - the app will show if Sinhala voices are available
3. **Select a voice** from the dropdown (if multiple available)
4. **Enter Sinhala text** in the text area or use sample buttons
5. **Adjust speech rate** using the slider (0.1x to 2.0x)
6. **Click "කථනය කරන්න" (Speak)** to start text-to-speech
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
utterance.voice = selectedSinhalaVoice;
utterance.rate = userSelectedRate;
speechSynthesis.speak(utterance);
```

### Sinhala Voice Detection
```javascript
// Filters voices for Sinhala support
const sinhalaVoices = allVoices.filter(voice => {
    return voice.lang.includes('si') || 
           voice.lang.includes('sinhala') ||
           voice.name.toLowerCase().includes('sinhala');
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
    sample1: 'සුභ උදෑසනක්!',
    sample2: 'ඔබට කෙසේද?',
    // Add your custom samples here
    sample5: 'Your new Sinhala text here'
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
    return voice.lang.includes('si') || 
           voice.lang.includes('ta') || // Tamil
           voice.lang.includes('hi');   // Hindi
});
```

## 🐛 Troubleshooting

### Common Issues:

**1. No Sinhala Voice Available**
- Install Sinhala language pack in your OS
- Try Google Chrome browser
- Check Windows/Mac language settings

**2. Text Not Speaking**
- Ensure browser supports Speech Synthesis API
- Check if text area has content
- Verify microphone permissions (some browsers require it)

**3. Voice Sounds Wrong**
- Try different voices from the dropdown
- Adjust speech rate
- Ensure Sinhala text is properly encoded (UTF-8)

**4. Mobile Issues**
- Use Chrome on Android or Safari on iOS
- Ensure device volume is up
- Check if "Silent Mode" is disabled

### Debug Commands:
```javascript
// Open browser console and run:
window.ttsDebug.listAllVoices();  // List all available voices
window.ttsDebug.testSinhalaText(); // Load test Sinhala text
```

## 📝 File Structure

```
sinhala-tts/
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

- **Google Fonts** for Noto Sans Sinhala font
- **Tailwind CSS** for the utility-first CSS framework
- **Web Speech API** for browser-based TTS functionality
- **Sinhala Unicode Consortium** for standardization efforts

## 📞 Support

- 🐛 **Report bugs**: Create an issue on GitHub
- 💡 **Feature requests**: Open a discussion on GitHub
- 📧 **Questions**: Contact via repository discussions

---

**Built with ❤️ for the Sinhala community**

*Free • Open Source • Privacy Friendly*
