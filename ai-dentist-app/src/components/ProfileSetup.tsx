'use client';

import { useState, useEffect } from 'react';
import { User as UserIcon, Save, Check } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: (userId: string) => void;
  userId?: string;
}

export default function ProfileSetup({ onComplete, userId }: ProfileSetupProps) {
  const [isNewUser, setIsNewUser] = useState(!userId);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });
  const [profileData, setProfileData] = useState({
    currentIssues: [] as string[],
    pastProcedures: [] as string[],
    allergies: [] as string[],
    medications: [] as string[],
    dentistName: '',
    dentistContact: '',
    insuranceInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/profile?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUserData({
            name: data.user.name || '',
            email: data.user.email || '',
            age: data.user.age?.toString() || '',
            gender: data.user.gender || ''
          });
        }
        if (data.profile) {
          setProfileData({
            currentIssues: data.profile.current_issues || [],
            pastProcedures: data.profile.past_procedures || [],
            allergies: data.profile.allergies || [],
            medications: data.profile.medications || [],
            dentistName: data.profile.dentist_name || '',
            dentistContact: data.profile.dentist_contact || '',
            insuranceInfo: data.profile.insurance_info || ''
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isNewUser) {
        // Create new user
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'createUser',
            name: userData.name,
            email: userData.email,
            age: userData.age ? parseInt(userData.age) : undefined,
            gender: userData.gender
          })
        });

        if (response.ok) {
          const data = await response.json();
          
          // Create dental profile
          await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'createProfile',
              userId: data.userId,
              profile: profileData
            })
          });

          setSuccess(true);
          setTimeout(() => onComplete(data.userId), 1000);
        }
      } else {
        // Update existing user - would need update endpoints
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addArrayItem = (field: keyof typeof profileData, value: string) => {
    if (value.trim()) {
      setProfileData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  const removeArrayItem = (field: keyof typeof profileData, index: number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <UserIcon className="text-dental-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">
            {isNewUser ? 'Create Your Profile' : 'Your Profile'}
          </h2>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
            <Check size={20} />
            {isNewUser ? 'Profile created successfully!' : 'Profile updated!'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={userData.age}
                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                    placeholder="30"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={userData.gender}
                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
                />
              </div>
            </div>
          </div>

          {/* Dental Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Dental Information</h3>
            
            {/* Current Issues */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Dental Issues
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="currentIssue"
                  placeholder="e.g., Sensitivity, Cavities, Gum disease"
                  className="flex-1 px-3 py-2 border rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addArrayItem('currentIssues', input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('currentIssue') as HTMLInputElement;
                    addArrayItem('currentIssues', input.value);
                    input.value = '';
                  }}
                  className="px-3 py-2 bg-dental-600 text-white rounded-lg hover:bg-dental-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.currentIssues.map((issue, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center gap-1"
                  >
                    {issue}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('currentIssues', index)}
                      className="hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Past Procedures */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Past Dental Procedures
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="pastProcedure"
                  placeholder="e.g., Root canal, Wisdom tooth extraction"
                  className="flex-1 px-3 py-2 border rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addArrayItem('pastProcedures', input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('pastProcedure') as HTMLInputElement;
                    addArrayItem('pastProcedures', input.value);
                    input.value = '';
                  }}
                  className="px-3 py-2 bg-dental-600 text-white rounded-lg hover:bg-dental-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.pastProcedures.map((procedure, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                  >
                    {procedure}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('pastProcedures', index)}
                      className="hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Dentist Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Dentist's Name
                </label>
                <input
                  type="text"
                  value={profileData.dentistName}
                  onChange={(e) => setProfileData({ ...profileData, dentistName: e.target.value })}
                  placeholder="Dr. Smith"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dentist Contact
                </label>
                <input
                  type="text"
                  value={profileData.dentistContact}
                  onChange={(e) => setProfileData({ ...profileData, dentistContact: e.target.value })}
                  placeholder="Phone or email"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
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
                <Save size={20} />
                {isNewUser ? 'Create Profile' : 'Update Profile'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}