import React, { useState, useRef, useEffect } from 'react';
import { generateResponse } from '@/lib/chatbot';
import { FaRobot, FaUser, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatbotComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm Friday, Sohom's AI assistant. I can tell you about Sohom's background, skills, projects, and more. How can I help you today?",
      isUser: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setIsTyping(true);

    // Store the input before clearing it
    const userInput = input;

    // Clear input immediately
    setInput('');

    try {
      // Get response from our simple chatbot
      const response = generateResponse(userInput);

      // Simulate typing delay for a more natural feel
      setTimeout(() => {
        // Add bot response
        setMessages(prev => [...prev, { text: response, isUser: false }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating response:', error);

      // Provide a simple fallback response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "I can tell you about Sohom's background, skills, projects, and more. What would you like to know?",
          isUser: false
        }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaRobot className="h-6 w-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col rounded-lg bg-background shadow-2xl border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg bg-gradient-to-r from-primary to-indigo-600 p-4 text-primary-foreground">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: 0 }}
                className="bg-white/20 p-2 rounded-full"
              >
                <FaRobot className="h-5 w-5" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold">Friday</h3>
                <p className="text-xs text-primary-foreground/80">Sohom's AI Assistant</p>
              </div>
            </div>
            <motion.button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 hover:bg-white/20 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/20 backdrop-blur-sm">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && (
                      <div className="flex-shrink-0 bg-primary/10 p-1.5 rounded-full">
                        <FaRobot className="h-3.5 w-3.5 text-primary" />
                      </div>
                    )}
                    <div className={`whitespace-pre-wrap ${!message.isUser ? 'text-gray-800 dark:text-gray-200' : ''}`}>
                      {message.text.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i !== message.text.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                    {message.isUser && (
                      <div className="flex-shrink-0 bg-white/20 p-1.5 rounded-full">
                        <FaUser className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
            {isTyping && (
              <motion.div
                className="mb-4 flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="max-w-[80%] rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0 bg-primary/10 p-1.5 rounded-full">
                      <FaRobot className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about Sohom..."
                className="flex-1 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200"
                disabled={isTyping}
              />
              <motion.button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground hover:shadow-md disabled:opacity-50 transition-all duration-200"
                disabled={isTyping || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane className="h-4 w-4" />
              </motion.button>
            </div>
          </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing indicator styles */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        .typing-indicator span {
          height: 6px;
          width: 6px;
          margin: 0 1px;
          background-color: #7B82FE;
          border-radius: 50%;
          display: inline-block;
          opacity: 0.6;
          animation: typing 1.5s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.3s;
        }
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.6s;
        }
        @keyframes typing {
          0% {
            transform: translateY(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-5px);
            opacity: 1;
          }
          100% {
            transform: translateY(0px);
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
};

export default ChatbotComponent;