import { ReactNode, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import VoiceCommands from '@/components/ai/VoiceCommands';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const toggleVoiceCommands = () => {
    setVoiceEnabled(prev => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />

      {/* Voice Commands */}
      <VoiceCommands enabled={voiceEnabled} />

      {/* Voice Commands Toggle Button */}
      <button
        onClick={toggleVoiceCommands}
        className="fixed bottom-20 right-6 z-50 bg-dark-darker p-2 rounded-full shadow-lg hover:bg-dark-lighter transition-colors"
        title={voiceEnabled ? "Disable voice commands" : "Enable voice commands"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-light ${voiceEnabled ? 'text-primary' : 'text-light/50'}`}
        >
          {voiceEnabled ? (
            <>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </>
          ) : (
            <>
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
};

export default Layout;