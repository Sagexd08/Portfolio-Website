import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { generateResponse } from '@/lib/gemini';

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
      setMessages(prev => [...prev, {
        text: "I apologize, but I'm having trouble processing your request at the moment. This could be due to a connection issue or a limitation in my current configuration. Could you try rephrasing your question or asking about a different topic? I'm here to help with information about Sohom's skills, projects, or anything else you'd like to know.",
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
                <div className="relative h-6 w-6 overflow-hidden">
                  <Image
                    src="/assets/gemini-icon.svg"
                    alt="Gemini AI"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-medium">Friday AI Assistant</h3>
                <span className="flex items-center gap-1 text-xs bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text font-semibold">
                  <Sparkles className="h-3 w-3 text-blue-400" />
                  <span>Powered by Gemini</span>
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
                  placeholder="Type your message..."
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  onClick={handleSendMessage}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
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
