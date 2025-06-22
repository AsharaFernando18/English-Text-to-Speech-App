// Modern Sinhala Text-to-Speech Application
// Enhanced with better voice detection and modern features

// Global variables
let voices = [];
let currentUtterance = null;
let isPaused = false;
let isSupported = false;
let speechCount = 0;
let totalCharsSpoken = 0;
let voicesLoaded = false;

// Enhanced sample texts
const sampleTexts = {
    sample1: 'සුභ උදෑසනක්! ඔබට දිනයක් සුභපතනවා.',
    sample2: 'ඔබට කෙසේද? ඔබේ සෞඛ්‍යය සම්පන්න ද?',
    sample3: 'ස්තූතියි! ඔබේ සහයෝගයට ගොඩක් පිං.',
    sample4: 'ශ්‍රී ලංකාව අපේ රට. අපේ මාතෘභූමිය ඉතාම ලස්සන.',
    sample5: 'විද්‍යාව හා තාක්ෂණය අපේ ජීවිතය වෙනස් කරන්නට ඇති. පරිගණක තාක්ෂණය මගින් අප පහසුවෙන් සම්බන්ධ වී කටයුතු කරන්නට හැකිය. මෙම වෙබ් යෙදුම මගින් සිංහල පාඨ කථනය කිරීම පහසු වෙයි.'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Modern Sinhala TTS...');
    checkBrowserSupport();
    initializeTTS();
    setupEventListeners();
    updateStatistics();
});

// Enhanced browser support check
function checkBrowserSupport() {
    if ('speechSynthesis' in window) {
        isSupported = true;
        console.log('✅ Speech Synthesis API is supported');
        
        // Check for enhanced features
        const features = {
            voicesChanged: 'onvoiceschanged' in speechSynthesis,
            pause: 'pause' in speechSynthesis,
            resume: 'resume' in speechSynthesis,
            cancel: 'cancel' in speechSynthesis
        };
        
        console.log('🔧 Available features:', features);
        
    } else {
        isSupported = false;
        showStatus('error', 'Browser Not Supported', 
                  'Your browser does not support Text-to-Speech. Please use Chrome, Edge, or Safari.');
        document.getElementById('speakBtn').disabled = true;
        console.log('❌ Speech Synthesis API is not supported');
    }
}

// Revolutionary voice loading system
function initializeTTS() {
    if (!isSupported) return;

    console.log('🔧 Starting enhanced voice loading...');
    
    // Multi-strategy voice loading
    const loadingStrategies = [
        loadVoicesImmediate,
        loadVoicesWithDelay,
        loadVoicesWithUserInteraction,
        loadVoicesWithPolling
    ];
    
    // Try each strategy
    loadingStrategies.forEach((strategy, index) => {
        setTimeout(() => strategy(), index * 500);
    });
    
    // Set up voice change listener
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
            console.log('🔄 Voices changed event triggered');
            setTimeout(loadVoices, 100);
        };
    }
    
    // Final fallback after 5 seconds
    setTimeout(() => {
        if (!voicesLoaded) {
            console.log('⏰ Final voice loading attempt');
            loadVoices();
        }
    }, 5000);
}

// Strategy 1: Immediate loading
function loadVoicesImmediate() {
    console.log('📥 Strategy 1: Immediate voice loading');
    loadVoices();
}

// Strategy 2: Delayed loading
function loadVoicesWithDelay() {
    console.log('📥 Strategy 2: Delayed voice loading');
    setTimeout(loadVoices, 1000);
}

// Strategy 3: User interaction trigger
function loadVoicesWithUserInteraction() {
    console.log('📥 Strategy 3: User interaction voice loading');
    
    const triggerVoiceLoad = () => {
        const utterance = new SpeechSynthesisUtterance(' ');
        utterance.volume = 0;
        speechSynthesis.speak(utterance);
        speechSynthesis.cancel();
        setTimeout(loadVoices, 100);
    };
    
    // Trigger on first user interaction
    document.addEventListener('click', triggerVoiceLoad, { once: true });
    document.addEventListener('keydown', triggerVoiceLoad, { once: true });
}

// Strategy 4: Polling
function loadVoicesWithPolling() {
    console.log('📥 Strategy 4: Polling voice loading');
    
    let attempts = 0;
    const maxAttempts = 20;
    
    const poll = setInterval(() => {
        attempts++;
        const currentVoices = speechSynthesis.getVoices();
        
        if (currentVoices.length > 0) {
            loadVoices();
            if (attempts > 3) clearInterval(poll); // Stop after a few successful loads
        }
        
        if (attempts >= maxAttempts) {
            clearInterval(poll);
            console.log('❌ Polling completed, voices may not be available');
        }
    }, 200);
}

// Enhanced voice loading and filtering
function loadVoices() {
    const allVoices = speechSynthesis.getVoices();
    
    if (allVoices.length === 0) {
        console.log('⏳ No voices available yet, will retry...');
        return;
    }
    
    console.log(`🔍 Processing ${allVoices.length} voices...`);
    voicesLoaded = true;
    
    // Advanced Sinhala voice detection
    const sinhalaVoices = allVoices.filter(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        
        // Primary Sinhala indicators
        const sinhalaIndicators = [
            lang.includes('si'),
            lang.includes('sinhala'),
            lang === 'si-lk',
            lang === 'si_lk',
            name.includes('sinhala'),
            name.includes('සිංහල')
        ];
        
        return sinhalaIndicators.some(indicator => indicator);
    });
    
    // Secondary choices (related languages)
    const fallbackVoices = allVoices.filter(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        
        return lang.includes('ta') || // Tamil
               lang.includes('hi') || // Hindi
               lang.includes('bn') || // Bengali
               (lang.includes('en') && name.includes('india')) || // Indian English
               (name.includes('google') && lang.includes('en')); // Google English
    });
    
    // Quality voices (best fallback)
    const qualityVoices = allVoices.filter(voice => {
        const name = voice.name.toLowerCase();
        
        return name.includes('google') ||
               name.includes('chrome') ||
               name.includes('natural') ||
               name.includes('enhanced') ||
               name.includes('premium');
    });
    
    // Combine voices in priority order
    voices = [...sinhalaVoices, ...fallbackVoices, ...qualityVoices];
    
    // Remove duplicates
    voices = voices.filter((voice, index, self) => 
        index === self.findIndex(v => v.name === voice.name && v.lang === voice.lang)
    );
    
    console.log(`✅ Found ${sinhalaVoices.length} Sinhala voices`);
    console.log(`🔄 Found ${fallbackVoices.length} fallback voices`);
    console.log(`⭐ Found ${qualityVoices.length} quality voices`);
    console.log(`🎯 Total selected voices: ${voices.length}`);
    
    // Update UI
    populateVoiceSelect();
    updateVoiceStatus();
    updateStatistics();
}

// Modern voice selection UI
function populateVoiceSelect() {
    const voiceSelect = document.getElementById('voiceSelect');
    voiceSelect.innerHTML = '';
    
    const allVoices = speechSynthesis.getVoices();
    
    if (allVoices.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = '🔄 Loading voices... Please wait';
        voiceSelect.appendChild(option);
        return;
    }
    
    // Group voices by type
    const sinhalaVoices = allVoices.filter(voice => 
        voice.lang.toLowerCase().includes('si') || 
        voice.name.toLowerCase().includes('sinhala')
    );
    
    const fallbackVoices = allVoices.filter(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        return !sinhalaVoices.includes(voice) && (
            lang.includes('ta') || lang.includes('hi') || lang.includes('bn') ||
            (lang.includes('en') && name.includes('india'))
        );
    });
    
    const otherVoices = allVoices.filter(voice => 
        !sinhalaVoices.includes(voice) && !fallbackVoices.includes(voice)
    );
    
    // Add Sinhala voices
    if (sinhalaVoices.length > 0) {
        const group = document.createElement('optgroup');
        group.label = '🇱🇰 Sinhala Voices (Best)';
        sinhalaVoices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = `sinhala_${index}`;
            option.textContent = `${voice.name} (${voice.lang}) ${voice.localService ? '📱' : '☁️'}`;
            option.dataset.voice = JSON.stringify(voice);
            group.appendChild(option);
        });
        voiceSelect.appendChild(group);
    }
    
    // Add fallback voices
    if (fallbackVoices.length > 0) {
        const group = document.createElement('optgroup');
        group.label = '🔄 Related Languages (Good)';
        fallbackVoices.slice(0, 10).forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = `fallback_${index}`;
            option.textContent = `${voice.name} (${voice.lang}) ${voice.localService ? '📱' : '☁️'}`;
            option.dataset.voice = JSON.stringify(voice);
            group.appendChild(option);
        });
        voiceSelect.appendChild(group);
    }
    
    // Add other voices (limited)
    if (otherVoices.length > 0) {
        const group = document.createElement('optgroup');
        group.label = '🌐 Other Voices (Limited)';
        otherVoices.slice(0, 15).forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = `other_${index}`;
            option.textContent = `${voice.name} (${voice.lang}) ${voice.localService ? '📱' : '☁️'}`;
            option.dataset.voice = JSON.stringify(voice);
            group.appendChild(option);
        });
        voiceSelect.appendChild(group);
    }
    
    // Auto-select best voice
    if (sinhalaVoices.length > 0) {
        voiceSelect.selectedIndex = 1; // First Sinhala voice (after group header)
        updateVoiceInfo();
    }
}

// Enhanced status display
function updateVoiceStatus() {
    const allVoices = speechSynthesis.getVoices();
    const sinhalaVoices = allVoices.filter(voice => 
        voice.lang.toLowerCase().includes('si') || 
        voice.name.toLowerCase().includes('sinhala')
    );
    
    const statusCard = document.getElementById('statusCard');
    const statusIcon = document.getElementById('statusIcon');
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    
    statusCard.classList.remove('hidden');
    
    if (sinhalaVoices.length > 0) {
        statusIcon.className = 'w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl';
        statusIcon.innerHTML = '✅';
        statusTitle.textContent = 'සිංහල හඬ ලබා ගත හැක!';
        statusMessage.textContent = `${sinhalaVoices.length} Sinhala voice(s) detected. Perfect for Sinhala text!`;
    } else if (voices.length > 0) {
        statusIcon.className = 'w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-xl';
        statusIcon.innerHTML = '⚠️';
        statusTitle.textContent = 'විකල්ප හඬ භාවිතා වේ';
        statusMessage.textContent = `${voices.length} alternative voice(s) available. Quality may vary for Sinhala text.`;
    } else {
        statusIcon.className = 'w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-xl';
        statusIcon.innerHTML = '❌';
        statusTitle.textContent = 'හඬ නොමැත';
        statusMessage.textContent = 'No voices detected. Please install Sinhala language pack and restart browser.';
    }
}

// Voice information display
function updateVoiceInfo() {
    const voiceSelect = document.getElementById('voiceSelect');
    const voiceDetails = document.getElementById('voiceDetails');
    
    if (voiceSelect.value) {
        const selectedOption = voiceSelect.options[voiceSelect.selectedIndex];
        if (selectedOption.dataset.voice) {
            const voice = JSON.parse(selectedOption.dataset.voice);
            voiceDetails.innerHTML = `
                <div class="space-y-2">
                    <div><strong>Name:</strong> ${voice.name}</div>
                    <div><strong>Language:</strong> ${voice.lang}</div>
                    <div><strong>Type:</strong> ${voice.localService ? 'Local Device' : 'Cloud Service'}</div>
                    <div><strong>Default:</strong> ${voice.default ? 'Yes' : 'No'}</div>
                </div>
            `;
        }
    } else {
        voiceDetails.textContent = 'Select a voice to see details';
    }
}

// Enhanced event listeners
function setupEventListeners() {
    // Text input with real-time feedback
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    
    textInput.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = `${count} characters`;
        
        // Update speak button state
        const speakBtn = document.getElementById('speakBtn');
        speakBtn.disabled = count === 0 || !isSupported;
        
        // Word count for longer texts
        if (count > 100) {
            const words = this.value.trim().split(/\s+/).length;
            charCount.textContent = `${count} characters, ${words} words`;
        }
    });
    
    // Voice selection change
    const voiceSelect = document.getElementById('voiceSelect');
    voiceSelect.addEventListener('change', updateVoiceInfo);
    
    // Speech rate slider
    const rateSlider = document.getElementById('rateSlider');
    const rateValue = document.getElementById('rateValue');
    
    rateSlider.addEventListener('input', function() {
        rateValue.textContent = `${parseFloat(this.value).toFixed(1)}x`;
    });
    
    // Refresh voices button
    const refreshBtn = document.getElementById('refreshVoicesBtn');
    refreshBtn.addEventListener('click', function() {
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Refreshing...</span>';
        setTimeout(() => {
            initializeTTS();
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> <span>Reload Voices</span>';
        }, 1000);
    });
    
    // Clear text button
    const clearBtn = document.getElementById('clearTextBtn');
    clearBtn.addEventListener('click', function() {
        textInput.value = '';
        textInput.dispatchEvent(new Event('input'));
        textInput.focus();
    });
    
    // Help button
    const helpBtn = document.getElementById('helpBtn');
    helpBtn.addEventListener('click', showHelpModal);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            speakText();
        }
        
        if (e.key === 'Escape') {
            stopSpeaking();
        }
        
        if (e.key === ' ' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            if (currentUtterance && speechSynthesis.speaking) {
                pauseResumeSpeaking();
            }
        }
    });
}

// Enhanced sample text setting
function setSampleText(sampleKey) {
    const textInput = document.getElementById('textInput');
    textInput.value = sampleTexts[sampleKey];
    textInput.dispatchEvent(new Event('input'));
    textInput.focus();
    
    // Add visual feedback
    const button = event.target;
    const originalBg = button.className;
    button.className = button.className.replace('bg-white/10', 'bg-green-500/30');
    setTimeout(() => {
        button.className = originalBg;
    }, 200);
}

// Revolutionary speech synthesis
function speakText() {
    const text = document.getElementById('textInput').value.trim();
    
    if (!text) {
        showNotification('කරුණාකර පාඨයක් ඇතුළත් කරන්න | Please enter text to speak', 'warning');
        return;
    }
    
    if (!isSupported) {
        showNotification('Your browser does not support Text-to-Speech', 'error');
        return;
    }
    
    // Stop any current speech
    stopSpeaking();
    
    // Create utterance with enhanced settings
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Get selected voice
    const voiceSelect = document.getElementById('voiceSelect');
    const selectedOption = voiceSelect.options[voiceSelect.selectedIndex];
    
    if (selectedOption && selectedOption.dataset.voice) {
        const voice = JSON.parse(selectedOption.dataset.voice);
        currentUtterance.voice = voice;
        console.log('🎙️ Using voice:', voice.name);
    } else {
        // Auto-select best voice
        const bestVoice = getBestVoice();
        if (bestVoice) {
            currentUtterance.voice = bestVoice;
            console.log('🤖 Auto-selected voice:', bestVoice.name);
        }
    }
    
    // Enhanced speech parameters
    const rate = parseFloat(document.getElementById('rateSlider').value);
    currentUtterance.rate = rate;
    currentUtterance.pitch = 1.0;
    currentUtterance.volume = 1.0;
    currentUtterance.lang = 'si-LK';
    
    // Advanced event handlers
    setupSpeechEvents(text);
    
    // Start speaking
    try {
        speechSynthesis.speak(currentUtterance);
        console.log('🚀 Speech started:', text.substring(0, 50) + '...');
        
        // Update statistics
        speechCount++;
        totalCharsSpoken += text.length;
        updateStatistics();
        
    } catch (error) {
        console.error('❌ Speech failed:', error);
        showNotification('Speech synthesis failed. Please try again.', 'error');
    }
}

// Get best available voice
function getBestVoice() {
    const allVoices = speechSynthesis.getVoices();
    
    // Priority order
    const priorities = [
        // Sinhala voices
        voice => voice.lang.toLowerCase().includes('si') || voice.name.toLowerCase().includes('sinhala'),
        // Regional voices
        voice => voice.lang.toLowerCase().includes('ta') || voice.lang.toLowerCase().includes('hi'),
        // Quality English voices
        voice => voice.name.toLowerCase().includes('google') && voice.lang.toLowerCase().includes('en'),
        // Any voice
        voice => true
    ];
    
    for (const priority of priorities) {
        const voice = allVoices.find(priority);
        if (voice) return voice;
    }
    
    return null;
}

// Enhanced speech event handling
function setupSpeechEvents(text) {
    let progressInterval;
    
    currentUtterance.onstart = function() {
        console.log('🎙️ Speech started');
        updateButtonStates('speaking');
        updateProgress('කථනය කරමින්... | Speaking...', 0);
        
        // Smart progress estimation
        const estimatedDuration = (text.length / 10) * (2 - parseFloat(document.getElementById('rateSlider').value)) * 1000;
        let progress = 0;
        
        progressInterval = setInterval(() => {
            if (speechSynthesis.speaking && !speechSynthesis.paused) {
                progress += (100 / (estimatedDuration / 100));
                if (progress <= 95) {
                    updateProgress('කථනය කරමින්... | Speaking...', Math.min(progress, 95));
                }
            }
        }, 100);
    };
    
    currentUtterance.onend = function() {
        console.log('✅ Speech completed');
        clearInterval(progressInterval);
        updateButtonStates('idle');
        updateProgress('සම්පූර්ණයි | Completed', 100);
        setTimeout(() => updateProgress('Ready', 0), 2000);
        showNotification('Speech completed successfully!', 'success');
    };
    
    currentUtterance.onerror = function(event) {
        console.error('❌ Speech error:', event.error);
        clearInterval(progressInterval);
        updateButtonStates('idle');
        updateProgress('Error occurred', 0);
        
        const errorMessages = {
            'not-allowed': 'Speech not allowed. Please check permissions.',
            'network': 'Network error. Check your connection.',
            'synthesis-failed': 'Speech synthesis failed. Try another voice.',
            'language-not-supported': 'Language not supported. Install Sinhala language pack.'
        };
        
        const message = errorMessages[event.error] || 'An error occurred during speech synthesis.';
        showNotification(message, 'error');
    };
    
    currentUtterance.onpause = function() {
        console.log('⏸️ Speech paused');
        updateButtonStates('paused');
        clearInterval(progressInterval);
    };
    
    currentUtterance.onresume = function() {
        console.log('▶️ Speech resumed');
        updateButtonStates('speaking');
    };
}

// Enhanced control functions
function stopSpeaking() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        console.log('🛑 Speech stopped');
    }
    currentUtterance = null;
    isPaused = false;
    updateButtonStates('idle');
    updateProgress('Ready', 0);
}

function pauseResumeSpeaking() {
    if (!currentUtterance || !speechSynthesis.speaking) return;
    
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
        isPaused = false;
        showNotification('Speech resumed', 'info');
    } else {
        speechSynthesis.pause();
        isPaused = true;
        showNotification('Speech paused', 'info');
    }
}

// Test current voice
function testCurrentVoice() {
    const voiceSelect = document.getElementById('voiceSelect');
    const testText = 'ආයුබෝවන්. මේ හඬ පරීක්ෂණයකි.';
    
    if (voiceSelect.value) {
        const originalText = document.getElementById('textInput').value;
        document.getElementById('textInput').value = testText;
        speakText();
        
        // Restore original text after a delay
        setTimeout(() => {
            document.getElementById('textInput').value = originalText;
            document.getElementById('textInput').dispatchEvent(new Event('input'));
        }, 3000);
    } else {
        showNotification('Please select a voice first', 'warning');
    }
}

// Audio download functionality
function downloadAudio() {
    showNotification('Audio download feature coming soon!', 'info');
}

// Enhanced UI updates
function updateButtonStates(state) {
    const speakBtn = document.getElementById('speakBtn');
    const stopBtn = document.getElementById('stopBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const pauseIcon = document.getElementById('pauseIcon');
    const pauseText = document.getElementById('pauseText');
    
    // Reset all buttons
    [speakBtn, stopBtn, pauseBtn].forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    });
    
    switch (state) {
        case 'speaking':
            speakBtn.disabled = true;
            pauseIcon.className = 'fas fa-pause';
            pauseText.textContent = 'විරාම';
            break;
            
        case 'paused':
            speakBtn.disabled = true;
            pauseIcon.className = 'fas fa-play';
            pauseText.textContent = 'දිගටම';
            break;
            
        case 'idle':
        default:
            const hasText = document.getElementById('textInput').value.trim().length > 0;
            speakBtn.disabled = !hasText || !isSupported;
            stopBtn.disabled = true;
            pauseBtn.disabled = true;
            pauseIcon.className = 'fas fa-pause';
            pauseText.textContent = 'විරාම';
            break;
    }
    
    // Apply disabled styles
    [speakBtn, stopBtn, pauseBtn].forEach(btn => {
        if (btn.disabled) {
            btn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    });
}

function updateProgress(text, percentage) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = text;
}

function updateStatistics() {
    const allVoices = speechSynthesis.getVoices();
    const sinhalaVoices = allVoices.filter(voice => 
        voice.lang.toLowerCase().includes('si') || 
        voice.name.toLowerCase().includes('sinhala')
    );
    
    document.getElementById('totalVoicesCount').textContent = allVoices.length;
    document.getElementById('sinhalaVoicesCount').textContent = sinhalaVoices.length;
    document.getElementById('speechCount').textContent = speechCount;
    document.getElementById('totalCharsSpoken').textContent = totalCharsSpoken.toLocaleString();
}

// Modern notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transform transition-all duration-300 translate-x-full`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-black',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type]}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Help modal
function showHelpModal() {
    showNotification('Help: Use Ctrl+Enter to speak, Esc to stop, Space to pause/resume', 'info');
}

// Enhanced debugging tools
const debugTools = {
    listAllVoices() {
        const allVoices = speechSynthesis.getVoices();
        console.table(allVoices.map(voice => ({
            name: voice.name,
            lang: voice.lang,
            local: voice.localService,
            default: voice.default
        })));
    },
    
    analyzeVoices() {
        const allVoices = speechSynthesis.getVoices();
        const analysis = {
            total: allVoices.length,
            sinhala: allVoices.filter(v => v.lang.toLowerCase().includes('si')).length,
            local: allVoices.filter(v => v.localService).length,
            remote: allVoices.filter(v => !v.localService).length,
            languages: [...new Set(allVoices.map(v => v.lang))].sort()
        };
        console.log('Voice Analysis:', analysis);
        return analysis;
    },
    
    testSinhalaVoices() {
        const sinhalaVoices = speechSynthesis.getVoices().filter(v => 
            v.lang.toLowerCase().includes('si') || 
            v.name.toLowerCase().includes('sinhala')
        );
        
        console.log(`Found ${sinhalaVoices.length} Sinhala voices:`);
        sinhalaVoices.forEach(voice => {
            console.log(`- ${voice.name} (${voice.lang})`);
        });
    },
    
    forceReload() {
        console.log('🔄 Force reloading voices...');
        voicesLoaded = false;
        initializeTTS();
    }
};

// Export debug tools
window.ttsDebug = debugTools;

// Initialize page
console.log('🎯 Modern Sinhala TTS App loaded successfully!');
console.log('🛠️ Debug tools: window.ttsDebug');
console.log('📊 Available methods: listAllVoices, analyzeVoices, testSinhalaVoices, forceReload');
