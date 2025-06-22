// Modern English Text-to-Speech Application
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
    sample1: 'Good morning! Have a wonderful day ahead.',
    sample2: 'How are you today? I hope you are doing well.',
    sample3: 'Thank you so much for using this application.',
    sample4: 'Welcome to our modern text-to-speech application.',
    sample5: 'Technology and science continue to change our lives in amazing ways. Computer technology allows us to connect and work together easily. This web application makes text-to-speech conversion simple and accessible for everyone.'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Modern English TTS...');
    
    // Force a delay to ensure DOM is fully loaded
    setTimeout(() => {
        checkBrowserSupport();
        initializeTTS();
        setupEventListeners();
        updateStatistics();
        
        // Initialize Chrome workaround
        initializeChromeWorkaround();
        
        // Initialize text input with default content
        const textInput = document.getElementById('textInput');
        if (textInput) {
            textInput.dispatchEvent(new Event('input'));
            console.log('📝 Text input initialized with default content');
        } else {
            console.error('❌ Text input not found during initialization');
        }
        
        // Add a test button to the page for debugging
        addDebugButton();
        
        // Apply initial styling to select dropdown
        setTimeout(styleSelectOptions, 500);
        
        // Show help notifications
        showInitialHelp();
        
        // Extra check to make sure voices are loaded
        setTimeout(() => {
            if (!voicesLoaded) {
                console.log('⚠️ Voices not loaded yet. Trying again...');
                initializeTTS();
            }
        }, 2000);
        
        console.log('🎯 Initialization complete');
    }, 100);
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
    try {
        const allVoices = speechSynthesis.getVoices();
        
        if (allVoices.length === 0) {
            console.log('⏳ No voices available yet, will retry...');
            return;
        }
        
        console.log(`🔍 Processing ${allVoices.length} voices...`);
        voicesLoaded = true;
      // Advanced English voice detection
    const englishVoices = allVoices.filter(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        
        // Primary English indicators
        const englishIndicators = [
            lang.includes('en'),
            lang.includes('english'),
            lang === 'en-us',
            lang === 'en-gb',
            lang === 'en-au',
            lang === 'en-ca',
            lang === 'en-in',
            name.includes('english')
        ];
        
        return englishIndicators.some(indicator => indicator);
    });
    
    // Quality voices (best choices)
    const qualityVoices = allVoices.filter(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        
        return (lang.includes('en') && (
            name.includes('google') ||
            name.includes('chrome') ||
            name.includes('natural') ||
            name.includes('enhanced') ||
            name.includes('premium') ||
            name.includes('neural')
        ));
    });
    
    // Fallback voices (other languages that might work)
    const fallbackVoices = allVoices.filter(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        
        return !englishVoices.includes(voice) && !qualityVoices.includes(voice) && (
            lang.includes('es') || // Spanish
            lang.includes('fr') || // French
            lang.includes('de') || // German
            lang.includes('it') || // Italian
            name.includes('microsoft') ||
            name.includes('apple')
        );
    });
      // Combine voices in priority order
    voices = [...englishVoices, ...qualityVoices, ...fallbackVoices];
    
    // Remove duplicates
    voices = voices.filter((voice, index, self) => 
        index === self.findIndex(v => v.name === voice.name && v.lang === voice.lang)
    );
    
    console.log(`✅ Found ${englishVoices.length} English voices`);
    console.log(`⭐ Found ${qualityVoices.length} quality voices`);
    console.log(`🔄 Found ${fallbackVoices.length} fallback voices`);
    console.log(`🎯 Total selected voices: ${voices.length}`);
      // Update UI
    populateVoiceSelect();
    updateVoiceStatus();
    updateStatistics();
    
    } catch (error) {
        console.error('❌ Error loading voices:', error);
        showNotification('Error loading voices. Please refresh the page.', 'error');
    }
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
    const englishVoices = allVoices.filter(voice => 
        voice.lang.toLowerCase().includes('en') || 
        voice.name.toLowerCase().includes('english')
    );
    
    const qualityVoices = allVoices.filter(voice => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        return !englishVoices.includes(voice) && lang.includes('en') && (
            name.includes('google') || name.includes('chrome') || 
            name.includes('natural') || name.includes('enhanced')
        );
    });
    
    const otherVoices = allVoices.filter(voice => 
        !englishVoices.includes(voice) && !qualityVoices.includes(voice)
    );
    
    // Add English voices
    if (englishVoices.length > 0) {
        const group = document.createElement('optgroup');
        group.label = '�� English Voices (Best)';
        englishVoices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = `english_${index}`;
            option.textContent = `${voice.name} (${voice.lang}) ${voice.localService ? '📱' : '☁️'}`;
            option.dataset.voice = JSON.stringify(voice);
            group.appendChild(option);
        });
        voiceSelect.appendChild(group);
    }
    
    // Add quality voices
    if (qualityVoices.length > 0) {
        const group = document.createElement('optgroup');
        group.label = '⭐ Premium Voices (Great)';
        qualityVoices.slice(0, 10).forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = `quality_${index}`;
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
    }    // Auto-select best voice
    if (englishVoices.length > 0) {
        voiceSelect.selectedIndex = 1; // First English voice (after group header)
        updateVoiceInfo();
    }
    
    // Apply custom styling for better visibility
    setTimeout(styleSelectOptions, 100);
}

// Enhanced status display
function updateVoiceStatus() {
    const allVoices = speechSynthesis.getVoices();
    const englishVoices = allVoices.filter(voice => 
        voice.lang.toLowerCase().includes('en') || 
        voice.name.toLowerCase().includes('english')
    );
    
    const statusCard = document.getElementById('statusCard');
    const statusIcon = document.getElementById('statusIcon');
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    
    statusCard.classList.remove('hidden');
    
    if (englishVoices.length > 0) {
        statusIcon.className = 'w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl';
        statusIcon.innerHTML = '✅';
        statusTitle.textContent = 'English Voices Available!';
        statusMessage.textContent = `${englishVoices.length} English voice(s) detected. Perfect for English text!`;
    } else if (voices.length > 0) {
        statusIcon.className = 'w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-xl';
        statusIcon.innerHTML = '⚠️';
        statusTitle.textContent = 'Alternative Voices Available';
        statusMessage.textContent = `${voices.length} alternative voice(s) available. Quality may vary for English text.`;
    } else {
        statusIcon.className = 'w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-xl';
        statusIcon.innerHTML = '❌';
        statusTitle.textContent = 'No Voices Available';
        statusMessage.textContent = 'No voices detected. Please check your browser settings and restart.';
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
    
    if (!textInput || !charCount) {
        console.error('❌ Critical UI elements not found');
        return;
    }
    
    textInput.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = `${count} characters`;
        
        // Update speak button state
        const speakBtn = document.getElementById('speakBtn');
        if (speakBtn) {
            speakBtn.disabled = count === 0 || !isSupported;
            console.log(`🔘 Speak button enabled: ${!speakBtn.disabled}`);
        }
        
        // Word count for longer texts
        if (count > 100) {
            const words = this.value.trim().split(/\s+/).length;
            charCount.textContent = `${count} characters, ${words} words`;
        }
    });
    
    // Attach event handlers to speech control buttons
    const speakBtn = document.getElementById('speakBtn');
    if (speakBtn) {
        console.log('🔘 Attaching event handler to Speak button');
        speakBtn.addEventListener('click', speakText);
    }
    
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
        console.log('🔘 Attaching event handler to Pause button');
        pauseBtn.addEventListener('click', pauseResumeSpeaking);
    }
    
    const stopBtn = document.getElementById('stopBtn');
    if (stopBtn) {
        console.log('🔘 Attaching event handler to Stop button');
        stopBtn.addEventListener('click', stopSpeaking);
    }
    
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        console.log('🔘 Attaching event handler to Download button');
        downloadBtn.addEventListener('click', downloadAudio);
    }
    
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
    
    // Sample text buttons
    const sampleButtons = document.querySelectorAll('.sample-button');
    sampleButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const sampleKey = this.getAttribute('data-sample');
            setSampleText(sampleKey, event);
        });
    });
    
    // Test voice button event listener
    const testVoiceBtn = document.getElementById('testVoiceBtn');
    if (testVoiceBtn) {
        testVoiceBtn.addEventListener('click', testCurrentVoice);
    }
}

// Function to show status messages
function showStatus(type, title, message) {
    const statusCard = document.getElementById('statusCard');
    const statusIcon = document.getElementById('statusIcon');
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    
    if (!statusCard || !statusIcon || !statusTitle || !statusMessage) {
        console.error('❌ Status card elements not found');
        return;
    }
    
    statusCard.classList.remove('hidden');
    
    // Set icon based on type
    switch (type) {
        case 'success':
            statusIcon.className = 'w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl';
            statusIcon.innerHTML = '✅';
            break;
        case 'warning':
            statusIcon.className = 'w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-xl';
            statusIcon.innerHTML = '⚠️';
            break;
        case 'error':
            statusIcon.className = 'w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-xl';
            statusIcon.innerHTML = '❌';
            break;
        case 'info':
        default:
            statusIcon.className = 'w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl';
            statusIcon.innerHTML = 'ℹ️';
            break;
    }
    
    statusTitle.textContent = title;
    statusMessage.textContent = message;
}

// Enhanced sample text setting
function setSampleText(sampleKey, event) {
    const textInput = document.getElementById('textInput');
    textInput.value = sampleTexts[sampleKey];
    textInput.dispatchEvent(new Event('input'));
    textInput.focus();
    
    // Add visual feedback
    let button;
    if (event && event.target) {
        button = event.target.closest('.sample-button'); // Get the button element
    } else {
        button = document.querySelector(`[data-sample="${sampleKey}"]`);
    }
    
    if (button) {
        const originalBg = button.className;
        button.className = button.className.replace('bg-white/10', 'bg-green-500/30');
        setTimeout(() => {
            button.className = originalBg;
        }, 200);
    }
}

// Add detailed logging for speech synthesis
function speakText() {
    console.log('🎯 speakText() function called');
    
    const textInput = document.getElementById('textInput');
    if (!textInput) {
        console.error('❌ Text input element not found');
        showNotification('Text input element not found', 'error');
        return;
    }
    
    const text = textInput.value.trim();
    console.log('📝 Text to speak:', text);
    
    if (!text) {
        console.log('⚠️ No text provided');
        showNotification('Please enter text to speak', 'warning');
        return;
    }
    
    if (!isSupported) {
        console.error('❌ Speech synthesis not supported');
        showNotification('Your browser does not support Text-to-Speech', 'error');
        return;
    }
    
    console.log('✅ All checks passed, proceeding with speech synthesis');
    
    // Browser compatibility check
    if (!window.speechSynthesis) {
        console.error('❌ SpeechSynthesis API not available in window object');
        showNotification('Speech synthesis is not supported in this browser', 'error');
        return;
    }
    
    // Log speech synthesis state
    console.log('💬 Speech Synthesis State:', {
        speaking: speechSynthesis.speaking,
        paused: speechSynthesis.paused,
        pending: speechSynthesis.pending
    });
    
    // Stop any current speech
    try {
        if (speechSynthesis.speaking) {
            console.log('🛑 Cancelling current speech');
            speechSynthesis.cancel();
        }
        stopSpeaking();
    } catch (error) {
        console.error('❌ Error stopping previous speech:', error);
    }
    
    // Create utterance with enhanced settings
    try {
        currentUtterance = new SpeechSynthesisUtterance(text);
        console.log('✅ Created new utterance object');
    } catch (error) {
        console.error('❌ Error creating utterance:', error);
        showNotification('Error creating speech utterance', 'error');
        return;
    }
    
    // Get selected voice
    const voiceSelect = document.getElementById('voiceSelect');
    const selectedOption = voiceSelect.options[voiceSelect.selectedIndex];
    
    try {
        if (selectedOption && selectedOption.dataset.voice) {
            const voiceData = selectedOption.dataset.voice;
            console.log('🔍 Selected voice data:', voiceData);
            
            try {
                const voice = JSON.parse(voiceData);
                currentUtterance.voice = voice;
                console.log('🎙️ Using voice:', voice.name);
            } catch (parseError) {
                console.error('❌ Error parsing voice data:', parseError);
                showNotification('Error with selected voice. Trying a fallback voice.', 'warning');
                
                // Auto-select best voice as fallback
                const bestVoice = getBestVoice();
                if (bestVoice) {
                    currentUtterance.voice = bestVoice;
                    console.log('🤖 Using fallback voice:', bestVoice.name);
                }
            }
        } else {
            // Auto-select best voice
            console.log('⚠️ No voice selected, using auto-selection');
            const bestVoice = getBestVoice();
            if (bestVoice) {
                currentUtterance.voice = bestVoice;
                console.log('🤖 Auto-selected voice:', bestVoice.name);
            } else {
                console.warn('⚠️ No voice available, using browser default');
            }
        }
    } catch (voiceError) {
        console.error('❌ Error setting voice:', voiceError);
    }
      
    // Enhanced speech parameters
    try {
        const rate = parseFloat(document.getElementById('rateSlider').value);
        currentUtterance.rate = rate;
        currentUtterance.pitch = 1.0;
        currentUtterance.volume = 1.0;
        currentUtterance.lang = 'en-US'; // Set to English
        
        console.log('🔧 Speech parameters:', {
            rate: currentUtterance.rate,
            pitch: currentUtterance.pitch,
            volume: currentUtterance.volume,
            lang: currentUtterance.lang
        });
    } catch (paramError) {
        console.error('❌ Error setting speech parameters:', paramError);
    }
    
    // Advanced event handlers
    try {
        setupSpeechEvents(text);
        console.log('✅ Speech events set up');
    } catch (eventError) {
        console.error('❌ Error setting up speech events:', eventError);
    }
    
    // Check if we have a voice to use
    console.log('🔍 Current voice to be used:', currentUtterance.voice ? 
                currentUtterance.voice.name : 'No voice selected (browser default)');
    
    // Start speaking
    try {
        showNotification('Starting speech...', 'info');
        speechSynthesis.speak(currentUtterance);
        console.log('🚀 Speech started for text:', text.substring(0, 50) + '...');
        
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
    
    if (allVoices.length === 0) {
        console.warn('⚠️ No voices available to select from');
        return null;
    }
      
    // Try to find English voices first
    const englishVoices = allVoices.filter(voice => 
        voice.lang.toLowerCase().includes('en') || 
        voice.name.toLowerCase().includes('english')
    );
    
    if (englishVoices.length > 0) {
        console.log('✅ Selected English voice:', englishVoices[0].name);
        return englishVoices[0];
    }
    
    // Try to find quality voices
    const qualityVoices = allVoices.filter(voice => {
        const name = voice.name.toLowerCase();
        return name.includes('google') || 
               name.includes('chrome') || 
               name.includes('natural') ||
               name.includes('premium');
    });
    
    if (qualityVoices.length > 0) {
        console.log('✅ Selected quality voice:', qualityVoices[0].name);
        return qualityVoices[0];
    }
    
    // Fall back to any voice
    if (allVoices.length > 0) {
        console.log('⚠️ Using fallback voice:', allVoices[0].name);
        return allVoices[0];
    }
    
    console.error('❌ No suitable voice found');
    return null;
}

// Enhanced speech event handling
function setupSpeechEvents(text) {
    let progressInterval;
    
    currentUtterance.onstart = function() {
        console.log('🎙️ Speech started');
        updateButtonStates('speaking');
        updateProgress('Speaking...', 0);
        
        // Smart progress estimation
        const estimatedDuration = (text.length / 10) * (2 - parseFloat(document.getElementById('rateSlider').value)) * 1000;
        let progress = 0;
        
        progressInterval = setInterval(() => {
            if (speechSynthesis.speaking && !speechSynthesis.paused) {
                progress += (100 / (estimatedDuration / 100));
                if (progress <= 95) {
                    updateProgress('Speaking...', Math.min(progress, 95));
                }
            }
        }, 100);
    };
    
    currentUtterance.onend = function() {
        console.log('✅ Speech completed');
        clearInterval(progressInterval);
        updateButtonStates('idle');        updateProgress('Completed', 100);
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
            'language-not-supported': 'Language not supported. Please try a different voice.'
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

// Chrome-specific workaround for speech synthesis issues
function initializeChromeWorkaround() {
    console.log('🔧 Initializing Chrome-specific workaround');
    
    // Chrome requires a user interaction to fully initialize speech synthesis
    // This workaround creates a silent utterance to "wake up" the speech synthesis system
    document.addEventListener('click', function chromeWorkaround() {
        // Only do this once
        document.removeEventListener('click', chromeWorkaround);
        
        console.log('👆 User interaction detected, initializing speech synthesis');
        
        // Create a silent utterance
        const silentUtterance = new SpeechSynthesisUtterance('.');
        silentUtterance.volume = 0; // Silent
        silentUtterance.rate = 1;
        silentUtterance.pitch = 1;
        silentUtterance.lang = 'en-US';
        
        // Set up event listeners
        silentUtterance.onstart = () => console.log('✅ Chrome workaround: Silent utterance started');
        silentUtterance.onend = () => {
            console.log('✅ Chrome workaround: Silent utterance ended, speech synthesis is now ready');
            // Reload voices after the workaround
            setTimeout(() => {
                loadVoices();
                console.log('🔄 Voices reloaded after Chrome workaround');
            }, 300);
        };
        silentUtterance.onerror = (e) => console.error('❌ Chrome workaround error:', e);
        
        // Speak and then immediately cancel to initialize the system
        speechSynthesis.speak(silentUtterance);
        setTimeout(() => {
            speechSynthesis.cancel();
            console.log('🔄 Chrome workaround: Speech cancelled, synthesis system initialized');
        }, 100);
    }, { once: false }); // Allow it to run more than once if needed
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
    const testText = 'Hello! This is a voice test. How do you like this voice?';
    
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
    
    switch (state) {        case 'speaking':
            speakBtn.disabled = true;
            pauseIcon.className = 'fas fa-pause';
            pauseText.textContent = 'Pause';
            break;
            
        case 'paused':
            speakBtn.disabled = true;
            pauseIcon.className = 'fas fa-play';
            pauseText.textContent = 'Resume';
            break;
            
        case 'idle':
        default:
            const hasText = document.getElementById('textInput').value.trim().length > 0;
            speakBtn.disabled = !hasText || !isSupported;
            stopBtn.disabled = true;
            pauseBtn.disabled = true;
            pauseIcon.className = 'fas fa-pause';
            pauseText.textContent = 'Pause';
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
    const englishVoices = allVoices.filter(voice => 
        voice.lang.toLowerCase().includes('en') || 
        voice.name.toLowerCase().includes('english')
    );
    
    document.getElementById('totalVoicesCount').textContent = allVoices.length;
    document.getElementById('englishVoicesCount').textContent = englishVoices.length;
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

// Show initial help notification
function showInitialHelp() {
    setTimeout(() => {
        showNotification('Click anywhere on the page first to activate text-to-speech, then click the Speak button', 'info');
    }, 1500);
    
    setTimeout(() => {
        showNotification('If speech doesn\'t work, try clicking the "Test TTS" button in the bottom right', 'info');
    }, 4000);
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
            english: allVoices.filter(v => v.lang.toLowerCase().includes('en')).length,
            local: allVoices.filter(v => v.localService).length,
            remote: allVoices.filter(v => !v.localService).length,
            languages: [...new Set(allVoices.map(v => v.lang))].sort()
        };
        console.log('Voice Analysis:', analysis);
        return analysis;
    },
    
    testEnglishVoices() {
        const englishVoices = speechSynthesis.getVoices().filter(v => 
            v.lang.toLowerCase().includes('en') || 
            v.name.toLowerCase().includes('english')
        );
        
        console.log(`Found ${englishVoices.length} English voices:`);
        englishVoices.forEach(voice => {
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

// Simple test function to verify TTS is working
function testTTS() {
    console.log('🧪 Testing TTS functionality...');
    
    if (!window.speechSynthesis) {
        console.error('❌ SpeechSynthesis not available');
        return false;
    }
    
    const testUtterance = new SpeechSynthesisUtterance('Hello, this is a test.');
    testUtterance.lang = 'en-US';
    testUtterance.rate = 1;
    testUtterance.pitch = 1;
    testUtterance.volume = 1;
    
    testUtterance.onstart = () => console.log('✅ TTS Test started successfully');
    testUtterance.onend = () => console.log('✅ TTS Test completed successfully');
    testUtterance.onerror = (e) => console.error('❌ TTS Test failed:', e);
    
    try {
        speechSynthesis.speak(testUtterance);
        console.log('📢 TTS test utterance sent to synthesis');
        return true;
    } catch (error) {
        console.error('❌ Error in TTS test:', error);
        return false;
    }
}

// Add debug button for testing
function addDebugButton() {
    const debugButton = document.createElement('button');
    debugButton.textContent = '🧪 Test TTS';
    debugButton.className = 'fixed bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg z-50';
    debugButton.onclick = testTTS;
    document.body.appendChild(debugButton);
    console.log('🛠️ Debug button added');
}

// Enhanced select styling function
function styleSelectOptions() {
    const voiceSelect = document.getElementById('voiceSelect');
    if (!voiceSelect) return;
    
    // Apply enhanced dark theme styling
    voiceSelect.style.cssText = `
        background-color: rgba(30, 30, 30, 0.95) !important;
        color: white !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        font-size: 14px !important;
        font-family: 'Inter', 'Poppins', system-ui, sans-serif !important;
    `;
    
    // Enhanced option styling
    Array.from(voiceSelect.options).forEach((option, index) => {
        option.style.cssText = `
            background-color: rgba(30, 30, 30, 0.98) !important;
            color: ${option.value ? 'white' : '#94a3b8'} !important;
            padding: 12px 16px !important;
            font-size: 14px !important;
            border: none !important;
        `;
        
        // Add hover effect through JavaScript since CSS might not work
        option.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'rgba(59, 130, 246, 0.4) !important';
        });
        
        option.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'rgba(30, 30, 30, 0.98) !important';
        });
    });
    
    // Enhanced optgroup styling
    Array.from(voiceSelect.querySelectorAll('optgroup')).forEach(optgroup => {
        optgroup.style.cssText = `
            background-color: rgba(15, 15, 15, 0.99) !important;
            color: #60a5fa !important;
            font-weight: bold !important;
            font-size: 13px !important;
            padding: 8px 12px !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        `;
    });
    
    console.log('🎨 Select dropdown enhanced with better visibility');
}

// Initialize page
console.log('🎯 Modern English TTS App loaded successfully!');
console.log('🛠️ Debug tools: window.ttsDebug');
console.log('📊 Available methods: listAllVoices, analyzeVoices, testEnglishVoices, forceReload');

styleSelectOptions();

showInitialHelp();
