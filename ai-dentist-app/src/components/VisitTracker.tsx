'use client';

import { useState, useEffect } from 'react';
import { Plus, FileText, Calendar, MapPin, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

interface VisitTrackerProps {
  userId: string;
}

interface DoctorVisit {
  id: string;
  visit_date: string;
  doctor_name: string;
  clinic_name: string;
  procedure_done: string;
  diagnosis: string;
  recommendations: string;
  next_appointment: string;
  cost: number;
  notes: string;
}

export default function VisitTracker({ userId }: VisitTrackerProps) {
  const [visits, setVisits] = useState<DoctorVisit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [expandedVisit, setExpandedVisit] = useState<string | null>(null);
  const [newVisit, setNewVisit] = useState({
    visitDate: new Date().toISOString().split('T')[0],
    doctorName: '',
    clinicName: '',
    procedureDone: '',
    diagnosis: '',
    recommendations: '',
    nextAppointment: '',
    cost: '',
    notes: ''
  });

  useEffect(() => {
    fetchVisits();
  }, [userId]);

  const fetchVisits = async () => {
    try {
      const response = await fetch(`/api/visit?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setVisits(data.visits || []);
      }
    } catch (error) {
      console.error('Failed to fetch visits:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          visit: {
            ...newVisit,
            cost: newVisit.cost ? parseFloat(newVisit.cost) : null
          }
        })
      });

      if (response.ok) {
        setShowForm(false);
        setNewVisit({
          visitDate: new Date().toISOString().split('T')[0],
          doctorName: '',
          clinicName: '',
          procedureDone: '',
          diagnosis: '',
          recommendations: '',
          nextAppointment: '',
          cost: '',
          notes: ''
        });
        fetchVisits();
      }
    } catch (error) {
      console.error('Failed to save visit:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="text-dental-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Doctor Visits</h2>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-dental-600 text-white rounded-lg hover:bg-dental-700 transition-colors"
          >
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Add Visit'}
          </button>
        </div>

        {/* Add Visit Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visit Date *
                </label>
                <input
                  type="date"
                  value={newVisit.visitDate}
                  onChange={(e) => setNewVisit({ ...newVisit, visitDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Next Appointment
                </label>
                <input
                  type="date"
                  value={newVisit.nextAppointment}
                  onChange={(e) => setNewVisit({ ...newVisit, nextAppointment: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  value={newVisit.doctorName}
                  onChange={(e) => setNewVisit({ ...newVisit, doctorName: e.target.value })}
                  placeholder="Dr. Smith"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clinic Name
                </label>
                <input
                  type="text"
                  value={newVisit.clinicName}
                  onChange={(e) => setNewVisit({ ...newVisit, clinicName: e.target.value })}
                  placeholder="Smile Dental Care"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Procedure Done
              </label>
              <input
                type="text"
                value={newVisit.procedureDone}
                onChange={(e) => setNewVisit({ ...newVisit, procedureDone: e.target.value })}
                placeholder="Cleaning, Filling, Extraction, etc."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagnosis
              </label>
              <textarea
                value={newVisit.diagnosis}
                onChange={(e) => setNewVisit({ ...newVisit, diagnosis: e.target.value })}
                placeholder="Doctor's diagnosis..."
                className="w-full px-3 py-2 border rounded-lg h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recommendations
              </label>
              <textarea
                value={newVisit.recommendations}
                onChange={(e) => setNewVisit({ ...newVisit, recommendations: e.target.value })}
                placeholder="Doctor's recommendations..."
                className="w-full px-3 py-2 border rounded-lg h-20 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost ($)
                </label>
                <input
                  type="number"
                  value={newVisit.cost}
                  onChange={(e) => setNewVisit({ ...newVisit, cost: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dental-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={newVisit.notes}
                onChange={(e) => setNewVisit({ ...newVisit, notes: e.target.value })}
                placeholder="Any other information..."
                className="w-full px-3 py-2 border rounded-lg h-20 resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-dental-600 text-white rounded-lg font-semibold hover:bg-dental-700 transition-colors"
              >
                Save Visit Record
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Visits List */}
        <div className="space-y-4">
          {visits.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText size={48} className="mx-auto mb-2 opacity-30" />
              <p>No doctor visits recorded yet.</p>
              <p className="text-sm">Add your first visit to keep track of your dental history.</p>
            </div>
          ) : (
            visits.map((visit) => (
              <div
                key={visit.id}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedVisit(expandedVisit === visit.id ? null : visit.id)}
                  className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-dental-600" />
                    <span className="font-medium">{visit.visit_date}</span>
                    {visit.doctor_name && (
                      <span className="text-gray-600">- {visit.doctor_name}</span>
                    )}
                  </div>
                  {expandedVisit === visit.id ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </button>
                
                {expandedVisit === visit.id && (
                  <div className="p-4 space-y-3">
                    {visit.clinic_name && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />
                        <span>{visit.clinic_name}</span>
                      </div>
                    )}
                    
                    {visit.procedure_done && (
                      <div>
                        <span className="font-medium text-gray-700">Procedure:</span>
                        <p className="text-gray-600">{visit.procedure_done}</p>
                      </div>
                    )}
                    
                    {visit.diagnosis && (
                      <div>
                        <span className="font-medium text-gray-700">Diagnosis:</span>
                        <p className="text-gray-600">{visit.diagnosis}</p>
                      </div>
                    )}
                    
                    {visit.recommendations && (
                      <div>
                        <span className="font-medium text-gray-700">Recommendations:</span>
                        <p className="text-gray-600">{visit.recommendations}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-4 text-sm">
                      {visit.next_appointment && (
                        <div className="flex items-center gap-1 text-dental-600">
                          <Calendar size={14} />
                          <span>Next: {visit.next_appointment}</span>
                        </div>
                      )}
                      {visit.cost && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <DollarSign size={14} />
                          <span>${visit.cost}</span>
                        </div>
                      )}
                    </div>
                    
                    {visit.notes && (
                      <div className="pt-2 border-t">
                        <span className="font-medium text-gray-700">Notes:</span>
                        <p className="text-gray-600 text-sm">{visit.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}