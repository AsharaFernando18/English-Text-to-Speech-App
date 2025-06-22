// Sinhala Text-to-Speech Application
// Global variables
let voices = [];
let currentUtterance = null;
let isPaused = false;
let isSupported = false;

// Sample texts
const sampleTexts = {
    sample1: 'සුභ උදෑසනක්! ඔබට දිනයක් සුභපතනවා.',
    sample2: 'ඔබට කෙසේද? ඔබේ සෞඛ්‍යය සම්පන්න ද?',
    sample3: 'ස්තූතියි! ඔබේ සහයෝගයට ගොඩක් පිං.',
    sample4: 'ශ්‍රී ලංකාව අපේ රට. අපේ මාතෘභූමිය ඉතාම ලස්සන.'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTTS();
    setupEventListeners();
    checkBrowserSupport();
});

// Check if browser supports Speech Synthesis
function checkBrowserSupport() {
    if ('speechSynthesis' in window) {
        isSupported = true;
        console.log('✅ Speech Synthesis API is supported');
    } else {
        isSupported = false;
        showStatus('error', 'Browser Not Supported', 
                  'Your browser does not support Text-to-Speech. Please try Google Chrome or Edge.');
        document.getElementById('speakBtn').disabled = true;
        console.log('❌ Speech Synthesis API is not supported');
    }
}

// Initialize Text-to-Speech functionality
function initializeTTS() {
    if (!isSupported) return;

    // Load voices when they become available
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Try to load voices immediately (some browsers support this)
    loadVoices();
    
    // Fallback: Keep trying to load voices for 3 seconds
    let attempts = 0;
    const maxAttempts = 30;
    const voiceLoadInterval = setInterval(() => {
        if (voices.length > 0 || attempts >= maxAttempts) {
            clearInterval(voiceLoadInterval);
            return;
        }
        loadVoices();
        attempts++;
    }, 100);
}

// Load and filter available voices
function loadVoices() {
    const allVoices = speechSynthesis.getVoices();
    console.log('🔍 Total voices found:', allVoices.length);
    
    // Filter for Sinhala voices
    voices = allVoices.filter(voice => {
        const voiceName = voice.name.toLowerCase();
        const voiceLang = voice.lang.toLowerCase();
        
        return voiceLang.includes('si') || 
               voiceLang.includes('sinhala') ||
               voiceName.includes('sinhala') ||
               voiceName.includes('සිංහල') ||
               voiceLang === 'si-lk';
    });
    
    console.log('🎯 Sinhala voices found:', voices.length);
    console.log('📋 Sinhala voices:', voices.map(v => `${v.name} (${v.lang})`));
    
    populateVoiceSelect();
    updateVoiceStatus();
}

// Populate voice selection dropdown
function populateVoiceSelect() {
    const voiceSelect = document.getElementById('voiceSelect');
    voiceSelect.innerHTML = '';
    
    if (voices.length === 0) {
        // Check if there are any voices that might work with Sinhala
        const allVoices = speechSynthesis.getVoices();
        const possibleVoices = allVoices.filter(voice => {
            const voiceName = voice.name.toLowerCase();
            return voiceName.includes('google') || 
                   voiceName.includes('chrome') ||
                   voice.lang.includes('en'); // English voices as fallback
        });
        
        if (possibleVoices.length > 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No Sinhala voice found - Will attempt with default voice';
            voiceSelect.appendChild(option);
            
            possibleVoices.slice(0, 5).forEach((voice, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = `${voice.name} (${voice.lang}) - Fallback`;
                option.dataset.voiceName = voice.name;
                option.dataset.voiceLang = voice.lang;
                voiceSelect.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No suitable voices available';
            voiceSelect.appendChild(option);
        }
    } else {
        // Add Sinhala voices
        voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
        
        // Select the first Sinhala voice by default
        voiceSelect.selectedIndex = 0;
    }
}

// Update voice status display
function updateVoiceStatus() {
    if (voices.length > 0) {
        showStatus('success', 'Sinhala Voice Available!', 
                  `Found ${voices.length} Sinhala voice(s). Ready to speak!`);
    } else {
        showStatus('warning', 'No Sinhala Voice Found', 
                  'Try installing Sinhala language pack or use Google Chrome for better support.');
    }
}

// Show status message
function showStatus(type, title, message) {
    const statusDiv = document.getElementById('voiceStatus');
    const statusIcon = document.getElementById('statusIcon');
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    
    statusDiv.className = 'mb-6 p-4 rounded-lg border-l-4';
    
    if (type === 'success') {
        statusDiv.classList.add('bg-green-50', 'border-green-400');
        statusIcon.innerHTML = '✅';
        statusTitle.className = 'font-medium text-green-800';
        statusMessage.className = 'text-sm text-green-600';
    } else if (type === 'warning') {
        statusDiv.classList.add('bg-yellow-50', 'border-yellow-400');
        statusIcon.innerHTML = '⚠️';
        statusTitle.className = 'font-medium text-yellow-800';
        statusMessage.className = 'text-sm text-yellow-600';
    } else if (type === 'error') {
        statusDiv.classList.add('bg-red-50', 'border-red-400');
        statusIcon.innerHTML = '❌';
        statusTitle.className = 'font-medium text-red-800';
        statusMessage.className = 'text-sm text-red-600';
    }
    
    statusTitle.textContent = title;
    statusMessage.textContent = message;
    statusDiv.classList.remove('hidden');
}

// Setup event listeners
function setupEventListeners() {
    // Text input character counter
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    
    textInput.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = `${count} characters`;
        
        // Enable/disable speak button based on text length
        const speakBtn = document.getElementById('speakBtn');
        speakBtn.disabled = count === 0 || !isSupported;
    });
    
    // Speech rate slider
    const rateSlider = document.getElementById('rateSlider');
    const rateValue = document.getElementById('rateValue');
    
    rateSlider.addEventListener('input', function() {
        rateValue.textContent = `${parseFloat(this.value).toFixed(1)}x`;
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to speak
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            speakText();
        }
        
        // Escape to stop
        if (e.key === 'Escape') {
            stopSpeaking();
        }
        
        // Space to pause/resume (when not focused on textarea)
        if (e.key === ' ' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            if (currentUtterance && speechSynthesis.speaking) {
                pauseResumeSpeaking();
            }
        }
    });
}

// Set sample text
function setSampleText(sampleKey) {
    const textInput = document.getElementById('textInput');
    textInput.value = sampleTexts[sampleKey];
    textInput.dispatchEvent(new Event('input')); // Trigger character count update
    textInput.focus();
}

// Main speech function
function speakText() {
    const text = document.getElementById('textInput').value.trim();
    
    if (!text) {
        alert('කරුණාකර කථනය කිරීමට පාඨයක් ඇතුළත් කරන්න | Please enter text to speak');
        return;
    }
    
    if (!isSupported) {
        alert('Your browser does not support Text-to-Speech functionality');
        return;
    }
    
    // Stop any current speech
    stopSpeaking();
    
    // Create new utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Get selected voice
    const voiceSelect = document.getElementById('voiceSelect');
    const selectedVoiceIndex = voiceSelect.value;
    
    if (selectedVoiceIndex !== '' && voices.length > 0) {
        currentUtterance.voice = voices[selectedVoiceIndex];
    } else {
        // Try to find any voice that might work
        const allVoices = speechSynthesis.getVoices();
        const fallbackVoice = allVoices.find(voice => 
            voice.name.toLowerCase().includes('google') ||
            voice.name.toLowerCase().includes('chrome')
        );
        if (fallbackVoice) {
            currentUtterance.voice = fallbackVoice;
        }
    }
    
    // Set speech parameters
    const rate = parseFloat(document.getElementById('rateSlider').value);
    currentUtterance.rate = rate;
    currentUtterance.pitch = 1;
    currentUtterance.volume = 1;
    
    // Set up event handlers
    currentUtterance.onstart = function() {
        console.log('🎙️ Speech started');
        updateButtonStates('speaking');
        updateProgress('Speaking...', 0);
    };
    
    currentUtterance.onend = function() {
        console.log('✅ Speech completed');
        updateButtonStates('idle');
        updateProgress('Completed', 100);
        setTimeout(() => updateProgress('Ready to speak', 0), 2000);
    };
    
    currentUtterance.onerror = function(event) {
        console.error('❌ Speech error:', event.error);
        updateButtonStates('idle');
        updateProgress('Error occurred', 0);
        
        let errorMessage = 'An error occurred while speaking.';
        if (event.error === 'not-allowed') {
            errorMessage = 'Speech synthesis not allowed. Please check browser permissions.';
        } else if (event.error === 'network') {
            errorMessage = 'Network error. Please check your internet connection.';
        }
        
        showStatus('error', 'Speech Error', errorMessage);
    };
    
    currentUtterance.onpause = function() {
        console.log('⏸️ Speech paused');
        updateButtonStates('paused');
    };
    
    currentUtterance.onresume = function() {
        console.log('▶️ Speech resumed');
        updateButtonStates('speaking');
    };
    
    // Simulate progress (since the API doesn't provide real progress)
    let progressInterval;
    currentUtterance.onstart = function() {
        updateButtonStates('speaking');
        let progress = 0;
        progressInterval = setInterval(() => {
            if (speechSynthesis.speaking && !speechSynthesis.paused) {
                progress += 1;
                if (progress <= 95) {
                    updateProgress('Speaking...', progress);
                }
            }
        }, (text.length * 50)); // Rough estimate based on text length
    };
    
    currentUtterance.onend = function() {
        clearInterval(progressInterval);
        updateButtonStates('idle');
        updateProgress('Completed', 100);
        setTimeout(() => updateProgress('Ready to speak', 0), 2000);
    };
    
    // Start speaking
    try {
        speechSynthesis.speak(currentUtterance);
        console.log('🚀 Speech synthesis started');
    } catch (error) {
        console.error('❌ Failed to start speech:', error);
        showStatus('error', 'Speech Failed', 'Failed to start speech synthesis.');
    }
}

// Stop speaking
function stopSpeaking() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        console.log('🛑 Speech stopped');
    }
    currentUtterance = null;
    isPaused = false;
    updateButtonStates('idle');
    updateProgress('Ready to speak', 0);
}

// Pause/Resume speaking
function pauseResumeSpeaking() {
    if (!currentUtterance || !speechSynthesis.speaking) return;
    
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
        isPaused = false;
        console.log('▶️ Speech resumed');
    } else {
        speechSynthesis.pause();
        isPaused = true;
        console.log('⏸️ Speech paused');
    }
}

// Update button states
function updateButtonStates(state) {
    const speakBtn = document.getElementById('speakBtn');
    const stopBtn = document.getElementById('stopBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const pauseIcon = document.getElementById('pauseIcon');
    const pauseText = document.getElementById('pauseText');
    
    switch (state) {
        case 'speaking':
            speakBtn.disabled = true;
            stopBtn.disabled = false;
            pauseBtn.disabled = false;
            pauseIcon.innerHTML = '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"/>';
            pauseText.textContent = 'විරාමය | Pause';
            break;
            
        case 'paused':
            speakBtn.disabled = true;
            stopBtn.disabled = false;
            pauseBtn.disabled = false;
            pauseIcon.innerHTML = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>';
            pauseText.textContent = 'දිගටම | Resume';
            break;
            
        case 'idle':
        default:
            const hasText = document.getElementById('textInput').value.trim().length > 0;
            speakBtn.disabled = !hasText || !isSupported;
            stopBtn.disabled = true;
            pauseBtn.disabled = true;
            pauseIcon.innerHTML = '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"/>';
            pauseText.textContent = 'විරාමය | Pause';
            break;
    }
}

// Update progress display
function updateProgress(text, percentage) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = text;
}

// Utility functions for debugging
function listAllVoices() {
    const allVoices = speechSynthesis.getVoices();
    console.log('🔍 All available voices:');
    allVoices.forEach((voice, index) => {
        console.log(`${index}: ${voice.name} (${voice.lang}) - ${voice.localService ? 'Local' : 'Remote'}`);
    });
}

function testSinhalaText() {
    const testText = 'ආයුබෝවන්. මේ සිංහල පාඨ කථන පරීක්ෂණයකි.';
    document.getElementById('textInput').value = testText;
    document.getElementById('textInput').dispatchEvent(new Event('input'));
}

// Export functions for debugging (attach to window)
window.ttsDebug = {
    listAllVoices,
    testSinhalaText,
    voices: () => voices,
    isSupported: () => isSupported
};

console.log('🎯 Sinhala TTS App initialized successfully!');
console.log('🛠️ Debug functions available: window.ttsDebug.listAllVoices(), window.ttsDebug.testSinhalaText()');
