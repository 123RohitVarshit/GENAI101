'use client';

import { useState } from 'react';
import { Check, Calendar, Clock, Droplets, AlertCircle } from 'lucide-react';

interface RoutineTrackerProps {
  userId: string;
}

export default function RoutineTracker({ userId }: RoutineTrackerProps) {
  const [routine, setRoutine] = useState({
    date: new Date().toISOString().split('T')[0],
    brushingMorning: false,
    brushingNight: false,
    brushingDuration: 2,
    flossed: false,
    mouthwashUsed: false,
    waterIntake: 8,
    sugaryFoods: 2,
    painOrDiscomfort: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, routine })
      });

      if (response.ok) {
        const data = await response.json();
        setFeedback(data.analysis);
        // Reset form for next day
        setRoutine(prev => ({
          ...prev,
          date: new Date().toISOString().split('T')[0],
          brushingMorning: false,
          brushingNight: false,
          flossed: false,
          mouthwashUsed: false,
          painOrDiscomfort: '',
          notes: ''
        }));
      }
    } catch (error) {
      console.error('Failed to save routine:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="text-dental-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Daily Dental Routine</h2>
        </div>

        {feedback && (
          <div className="mb-6 p-4 bg-dental-50 border border-dental-200 rounded-lg">
            <h3 className="font-semibold text-dental-800 mb-2">🤖 AI Feedback:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{feedback}</p>
            <button
              onClick={() => setFeedback(null)}
              className="mt-3 text-sm text-dental-600 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={routine.date}
              onChange={(e) => setRoutine({ ...routine, date: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
              required
            />
          </div>

          {/* Brushing */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Clock size={18} /> Brushing
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={routine.brushingMorning}
                  onChange={(e) => setRoutine({ ...routine, brushingMorning: e.target.checked })}
                  className="w-5 h-5 text-dental-600 rounded"
                />
                <span>Morning brushing</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={routine.brushingNight}
                  onChange={(e) => setRoutine({ ...routine, brushingNight: e.target.checked })}
                  className="w-5 h-5 text-dental-600 rounded"
                />
                <span>Night brushing</span>
              </label>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Brushing duration (minutes)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={routine.brushingDuration}
                  onChange={(e) => setRoutine({ ...routine, brushingDuration: parseInt(e.target.value) })}
                  className="w-full"
                />
                <span className="text-sm text-gray-600">{routine.brushingDuration} minutes</span>
              </div>
            </div>
          </div>

          {/* Other Care */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Additional Care</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={routine.flossed}
                  onChange={(e) => setRoutine({ ...routine, flossed: e.target.checked })}
                  className="w-5 h-5 text-dental-600 rounded"
                />
                <span>Flossed today</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={routine.mouthwashUsed}
                  onChange={(e) => setRoutine({ ...routine, mouthwashUsed: e.target.checked })}
                  className="w-5 h-5 text-dental-600 rounded"
                />
                <span>Used mouthwash</span>
              </label>
            </div>
          </div>

          {/* Habits */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Droplets size={18} /> Daily Habits
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Water intake (glasses)
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={routine.waterIntake}
                  onChange={(e) => setRoutine({ ...routine, waterIntake: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Sugary foods/drinks consumed
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={routine.sugaryFoods}
                  onChange={(e) => setRoutine({ ...routine, sugaryFoods: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Issues */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <AlertCircle size={18} /> Any Issues?
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Pain or discomfort (if any)
                </label>
                <textarea
                  value={routine.painOrDiscomfort}
                  onChange={(e) => setRoutine({ ...routine, painOrDiscomfort: e.target.value })}
                  placeholder="Describe any pain, sensitivity, or discomfort..."
                  className="w-full px-3 py-2 border rounded-lg h-20 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Additional notes
                </label>
                <textarea
                  value={routine.notes}
                  onChange={(e) => setRoutine({ ...routine, notes: e.target.value })}
                  placeholder="Any other observations..."
                  className="w-full px-3 py-2 border rounded-lg h-20 resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-dental-600 text-white rounded-lg font-semibold hover:bg-dental-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                Saving...
              </>
            ) : (
              <>
                <Check size={20} />
                Save Daily Log
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}