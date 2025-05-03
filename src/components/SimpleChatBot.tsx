import React, { useState, useRef, useEffect } from 'react';
import { generateResponse } from '@/lib/simple-bot';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

interface Message {
  text: string;
  isUser: boolean;
}

const SimpleChatBot: React.FC = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setIsTyping(true);
    
    try {
      // Get response from our simple bot (no API calls)
      const response = generateResponse(input);
      
      // Simulate typing delay for a more natural feel
      setTimeout(() => {
        // Add bot response
        setMessages(prev => [...prev, { text: response, isUser: false }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Provide a fallback response
      setMessages(prev => [...prev, {
        text: "I can tell you about Sohom's background, skills, projects, and more. What would you like to know?",
        isUser: false
      }]);
      setIsTyping(false);
    }
    
    // Clear input
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <FaRobot className="h-6 w-6" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col rounded-lg bg-background shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-lg bg-primary p-4 text-primary-foreground">
            <div className="flex items-center space-x-2">
              <FaRobot className="h-6 w-6" />
              <h3 className="text-lg font-medium">Friday</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-primary-foreground/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && (
                      <FaRobot className="mt-1 h-4 w-4 text-primary" />
                    )}
                    <div className="whitespace-pre-wrap">
                      {message.text.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i !== message.text.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                    {message.isUser && (
                      <FaUser className="mt-1 h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[80%] rounded-lg bg-muted p-3">
                  <div className="flex items-center space-x-2">
                    <FaRobot className="h-4 w-4 text-primary" />
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about Sohom..."
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                disabled={isTyping || !input.trim()}
              >
                <FaPaperPlane className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Typing indicator styles */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 1px;
          background-color: #7B82FE;
          border-radius: 50%;
          display: inline-block;
          opacity: 0.4;
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
            opacity: 0.4;
          }
          50% {
            transform: translateY(-5px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0px);
            opacity: 0.4;
          }
        }
      `}</style>
    </>
  );
};

export default SimpleChatBot;
