document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const micButton = document.getElementById('mic-button');
    const statusText = document.getElementById('status-text');
    const transcriptText = document.getElementById('transcript');
    
    let isListening = false;

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        document.body.classList.toggle('light');
    });

    // Voice Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (recognition) {
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            isListening = true;
            micButton.classList.add('listening');
            statusText.textContent = 'Listening...';
        };

        recognition.onend = () => {
            isListening = false;
            micButton.classList.remove('listening');
            statusText.textContent = 'Click the mic to start';
        };

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase().trim();
            transcriptText.textContent = `Last command: ${command}`;
            
            // Handle commands
            const executeCommand = () => {
                if (command.includes('open github')) {
                    window.open('https://github.com', '_blank');
                } else if (command.includes('open google')) {
                    window.open('https://www.google.com', '_blank');
                } else if (command.includes('open chatgpt')) {
                    window.open('https://chat.openai.com', '_blank');
                } else if (command.includes('open linkedin')) {
                    window.open('https://www.linkedin.com', '_blank');
                } else if (command.includes('show time')) {
                    const now = new Date();
                    alert(`Current time: ${now.toLocaleTimeString()}`);
                } else if (command.includes('open map')) {
                    window.open('https://www.google.com/maps', '_blank');
                } else if (command.includes('open calculator')) {
                    window.open('https://www.google.com/search?q=calculator', '_blank');
                } else if (command.includes('open youtube')) {
                    window.open('https://www.youtube.com', '_blank');
                } else if (command.includes('open spotify')) {
                    window.open('https://open.spotify.com', '_blank');
                } else {
                    statusText.textContent = 'Command not recognized. Try again.';
                }
            };

            // Execute command with a slight delay to ensure proper handling
            setTimeout(executeCommand, 100);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            isListening = false;
            micButton.classList.remove('listening');
            statusText.textContent = 'Error occurred. Try again.';
        };

        // Mic Button Click Handler
        micButton.addEventListener('click', () => {
            if (!isListening) {
                recognition.start();
            } else {
                recognition.stop();
            }
        });
    } else {
        statusText.textContent = 'Speech recognition not supported in this browser';
        micButton.disabled = true;
        micButton.style.backgroundColor = '#ccc';
    }
});