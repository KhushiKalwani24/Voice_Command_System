import React, { useState, useEffect } from 'react';
import { Moon, Sun, Mic, MicOff, Github } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    // Apply the theme class to the body
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setTranscript(command);
        
        // Handle commands
        if (command.includes('github')) {
          window.open('https://github.com', '_blank');
        } else if (command.includes('contacts')) {
          // For demo purposes, we'll just show an alert
          alert('Opening contacts...');
        } else if (command.includes('about')) {
          alert('Opening about page...');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-blue-900 text-white' : 'bg-pink-100 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="max-w-md mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Voice Command System
          </h1>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={startListening}
              className={`p-4 rounded-full ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              {isListening ? <MicOff size={24} /> : <Mic size={24} />}
            </button>

            <p className="text-gray-700 text-center">
              {isListening ? 'Listening...' : 'Click the mic to start'}
            </p>

            {transcript && (
              <p className="text-sm text-gray-600 text-center mt-2">
                Last command: {transcript}
              </p>
            )}

            <div className="mt-8 text-gray-700">
              <h2 className="font-semibold mb-2">Available Commands:</h2>
              <ul className="list-disc list-inside">
                <li>"Open Github"</li>
                <li>"Open Contacts"</li>
                <li>"Open About"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;