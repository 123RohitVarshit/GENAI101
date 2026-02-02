'use client';

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import RoutineTracker from '@/components/RoutineTracker';
import VisitTracker from '@/components/VisitTracker';
import ProfileSetup from '@/components/ProfileSetup';
import { MessageSquare, Calendar, FileText, User } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'routine' | 'visits' | 'profile'>('chat');
  const [userId, setUserId] = useState<string | null>(null);

  const handleUserCreated = (id: string) => {
    setUserId(id);
    localStorage.setItem('aiDentistUserId', id);
  };

  // Check for existing user on mount
  if (typeof window !== 'undefined' && !userId) {
    const savedUserId = localStorage.getItem('aiDentistUserId');
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }

  if (!userId) {
    return <ProfileSetup onComplete={handleUserCreated} />;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-dental-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-dental-600 text-2xl">🦷</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Dentist</h1>
              <p className="text-sm text-dental-100">Your Personal Dental Assistant</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-md min-h-[calc(100vh-80px)] p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('chat')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'chat'
                    ? 'bg-dental-100 text-dental-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <MessageSquare size={20} />
                <span className="font-medium">Chat with AI</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('routine')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'routine'
                    ? 'bg-dental-100 text-dental-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Calendar size={20} />
                <span className="font-medium">Daily Routine</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('visits')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'visits'
                    ? 'bg-dental-100 text-dental-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <FileText size={20} />
                <span className="font-medium">Doctor Visits</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-dental-100 text-dental-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <User size={20} />
                <span className="font-medium">My Profile</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'chat' && <ChatInterface userId={userId} />}
          {activeTab === 'routine' && <RoutineTracker userId={userId} />}
          {activeTab === 'visits' && <VisitTracker userId={userId} />}
          {activeTab === 'profile' && <ProfileSetup userId={userId} onComplete={() => {}} />}
        </div>
      </div>
    </main>
  );
}