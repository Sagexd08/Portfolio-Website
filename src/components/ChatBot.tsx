import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, Trash2, Copy, Download, ExternalLink, Search, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { generateResponse } from '@/lib/gemini';
import { useTheme } from 'next-themes';

// Friday AI Assistant - Enhanced with Google's Gemini API
// This uses the Gemini Pro model to provide advanced conversational capabilities

// Typing animation component
interface TypingAnimationProps {
  text: string;
  speed?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className="whitespace-pre-line">
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block h-4 w-2 animate-pulse bg-primary"></span>
      )}
    </div>
  );
};

// Message component
interface MessageProps {
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser, isTyping = false }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-2 mt-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 10.5C7 9.11929 8.11929 8 9.5 8C10.8807 8 12 9.11929 12 10.5C12 11.8807 10.8807 13 9.5 13C8.11929 13 7 11.8807 7 10.5Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M12 10.5C12 9.11929 13.1193 8 14.5 8C15.8807 8 17 9.11929 17 10.5C17 11.8807 15.8807 13 14.5 13C13.1193 13 12 11.8807 12 10.5Z" fill="currentColor" fillOpacity="0.2" />
          </svg>
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary/10 text-foreground'
        }`}
      >
        {isTyping ? (
          <TypingAnimation text={text} />
        ) : (
          <div className="whitespace-pre-line">{text}</div>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 ml-2 mt-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <circle cx="12" cy="8" r="4" fill="currentColor" />
            <path d="M20 18C20 14.6863 16.4183 12 12 12C7.58172 12 4 14.6863 4 18V20H20V18Z" fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Friday, Sohom's AI assistant. I've been upgraded with new capabilities!\n\n• I can now fetch real-time information from Sohom's GitHub and LinkedIn profiles\n• I can scrape web content from URLs you provide\n• I've been configured to provide more personalized answers based on your questions\n\nAsk me about Sohom's projects, skills, or provide a URL to explore. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Quick responses for common interactions
  const getQuickResponse = (text: string): string | null => {
    const lowerText = text.toLowerCase();

    if (/^(hello|hi|hey)(\s|$)/i.test(lowerText)) {
      return "Hello! I'm Friday, Sohom's AI assistant. How can I help you today?";
    }

    if (/^(thanks|thank you)/i.test(lowerText)) {
      return "You're welcome! Is there anything else you'd like to know about Sohom?";
    }

    if (/^(bye|goodbye)/i.test(lowerText)) {
      return "Goodbye! Feel free to chat again if you have more questions about Sohom.";
    }

    return null;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');

    // Check for quick responses first
    const quickResponse = getQuickResponse(userMessage);

    // Process response
    setIsTyping(true);

    try {
      let response;

      if (quickResponse) {
        // Use quick response for common interactions
        response = quickResponse;
        // Short delay for natural feel
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        // Use Gemini API for more complex queries
        response = await generateResponse(userMessage);
      }

      // Add bot response
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error('Error generating response:', error);

      // Create a more helpful error message
      let errorMessage = "I'm having trouble processing your request right now.";

      if (error instanceof Error) {
        if (error.message.includes("network") || error.message.includes("fetch")) {
          errorMessage = "I'm having trouble connecting to my knowledge base due to network issues. Please check your internet connection and try again.";
        } else if (error.message.includes("timeout")) {
          errorMessage = "The request timed out. Please try again in a moment.";
        } else if (error.message.includes("API")) {
          errorMessage = "There seems to be an issue with my API connection. I can still answer general questions about Sohom.";
        }
      }

      setMessages(prev => [...prev, {
        text: errorMessage,
        isUser: false
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 overflow-hidden rounded-lg bg-background/80 shadow-xl backdrop-blur-lg sm:w-96"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
          >
            {/* Chat header */}
            <div className="border-b border-border/40 bg-background/90 p-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Friday AI Assistant</h3>
                <span className="flex items-center gap-1 text-xs text-yellow-400">
                  <Sparkles className="h-3 w-3" />
                  <span>Gemini</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ask me about Sohom's skills, projects, GitHub repos, LinkedIn profile, or provide a URL to explore
              </p>
            </div>

            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <Message
                  key={index}
                  text={message.text}
                  isUser={message.isUser}
                />
              ))}

              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="flex-shrink-0 mr-2 mt-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 10.5C7 9.11929 8.11929 8 9.5 8C10.8807 8 12 9.11929 12 10.5C12 11.8807 10.8807 13 9.5 13C8.11929 13 7 11.8807 7 10.5Z" fill="currentColor" fillOpacity="0.2" />
                      <path d="M12 10.5C12 9.11929 13.1193 8 14.5 8C15.8807 8 17 9.11929 17 10.5C17 11.8807 15.8807 13 14.5 13C13.1193 13 12 11.8807 12 10.5Z" fill="currentColor" fillOpacity="0.2" />
                    </svg>
                  </div>
                  <div className="rounded-lg bg-secondary/10 px-4 py-2 text-foreground">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="border-t border-border/40 bg-background/90 p-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask Friday about Sohom..."
                  className="flex-1 rounded-md border border-purple-500/20 bg-white/5 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-300 ${!input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md hover:shadow-purple-500/20'}`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
