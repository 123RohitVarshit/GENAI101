'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  userId: string;
}

export default function ChatInterface({ userId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history on mount
  useEffect(() => {
    fetchChatHistory();
  }, [userId]);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`/api/chat?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.messages) {
          setMessages(data.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
        }
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          message: userMessage.content
        })
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md h-[calc(100vh-200px)] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b bg-dental-50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <Bot className="text-dental-600" size={24} />
          <div>
            <h2 className="font-semibold text-gray-800">AI Dentist</h2>
            <p className="text-sm text-gray-600">Ask me anything about your dental health</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-2">👋 Welcome! I'm your AI Dentist.</p>
            <p className="text-sm">I remember everything about your dental health.</p>
            <p className="text-sm mt-2">Try asking:</p>
            <ul className="text-sm mt-1 space-y-1">
              <li>• "How's my brushing routine looking?"</li>
              <li>• "When should I visit the dentist?"</li>
              <li>• "What toothpaste do you recommend for me?"</li>
              <li>• "I have sensitivity in my lower left tooth"</li>
            </ul>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' ? 'bg-dental-600' : 'bg-gray-200'
            }`}>
              {message.role === 'user' ? (
                <User size={16} className="text-white" />
              ) : (
                <Bot size={16} className="text-gray-600" />
              )}
            </div>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              message.role === 'user'
                ? 'bg-dental-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Bot size={16} className="text-gray-600" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dental-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-dental-600 text-white rounded-lg hover:bg-dental-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}