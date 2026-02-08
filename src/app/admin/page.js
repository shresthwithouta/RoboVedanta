'use client';

import { useEffect, useState } from 'react';
import { School, Users, Calendar, Mail, Phone, MapPin, Trash2, Eye, RefreshCw, GraduationCap, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    totalEstimate: 0
  });

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/school-registrations');
      const data = await response.json();

      if (data.success) {
        setRegistrations(data.data);
        
        // Calculate stats
        const pending = data.data.filter(r => r.status === 'pending').length;
        const totalEstimate = data.data.reduce((sum, r) => sum + (r.estimatedQuote || 0), 0);
        
        setStats({
          total: data.data.length,
          pending,
          totalEstimate
        });
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;

    try {
      const response = await fetch(`/api/school-registrations?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        fetchRegistrations();
      } else {
        alert('Failed to delete registration');
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Failed to delete registration');
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-400 via-primary-400 to-primary-500">
      {/* Header */}
      <div className="bg-primary-500 border-b border-accent-500/30 sticky top-0 z-10 backdrop-blur-sm bg-primary-500/95">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-black text-white mb-2">Admin Dashboard</h1>
              <p className="text-white/60">Manage school registrations</p>
            </div>
            <button
              onClick={fetchRegistrations}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-accent-500 text-primary-900 rounded-xl font-bold hover:bg-accent-400 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-600/50 border border-accent-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center">
                <School size={24} className="text-accent-500" />
              </div>
              <div>
                <div className="text-white/60 text-sm font-bold">Total Registrations</div>
                <div className="text-3xl font-heading font-black text-white">{stats.total}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-primary-600/50 border border-accent-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Calendar size={24} className="text-orange-500" />
              </div>
              <div>
                <div className="text-white/60 text-sm font-bold">Pending</div>
                <div className="text-3xl font-heading font-black text-white">{stats.pending}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary-600/50 border border-accent-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <DollarSign size={24} className="text-green-500" />
              </div>
              <div>
                <div className="text-white/60 text-sm font-bold">Total Estimated Revenue</div>
                <div className="text-3xl font-heading font-black text-white">
                  ₹{stats.totalEstimate.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Registrations Table */}
        <div className="bg-primary-600/50 border border-accent-500/20 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-heading font-black text-white">School Registrations</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw size={48} className="text-accent-500 animate-spin mx-auto mb-4" />
              <p className="text-white/60">Loading registrations...</p>
            </div>
          ) : registrations.length === 0 ? (
            <div className="p-12 text-center">
              <School size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No registrations yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-500/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-bold text-sm">School</th>
                    <th className="px-6 py-4 text-left text-white font-bold text-sm">Contact</th>
                    <th className="px-6 py-4 text-left text-white font-bold text-sm">Location</th>
                    <th className="px-6 py-4 text-left text-white font-bold text-sm">Tutors</th>
                    <th className="px-6 py-4 text-left text-white font-bold text-sm">Grade</th>
                    <th className="px-6 py-4 text-left text-white font-bold text-sm">Quote</th>
                    <th className="px-6 py-4 text-left text-white font-bold text-sm">Date</th>
                    <th className="px-6 py-4 text-left text-white font-bold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg, idx) => (
                    <motion.tr
                      key={reg._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-t border-white/5 hover:bg-primary-500/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent-500/20 rounded-full flex items-center justify-center shrink-0">
                            <School size={20} className="text-accent-500" />
                          </div>
                          <div>
                            <div className="text-white font-bold">{reg.schoolName}</div>
                            <div className="text-white/60 text-xs">{reg.board}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white text-sm">{reg.contactPerson}</div>
                        <div className="text-white/60 text-xs">{reg.email}</div>
                        <div className="text-white/60 text-xs">{reg.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white text-sm">{reg.city}, {reg.state}</div>
                        <div className="text-white/60 text-xs">{reg.pincode}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white text-sm">
                          {reg.selectedTutorIds && reg.selectedTutorIds.length > 0 
                            ? `${reg.selectedTutorIds.length} tutor${reg.selectedTutorIds.length > 1 ? 's' : ''} selected`
                            : reg.selectedTutorId || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white text-sm">Grade {reg.selectedGrade || 'N/A'}</div>
                        <div className="text-white/60 text-xs">{reg.numberOfStudents || 0} students</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-accent-400 font-bold">
                          ₹{(reg.estimatedQuote || 0).toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white/60 text-xs">
                          {new Date(reg.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedRegistration(reg)}
                            className="p-2 bg-accent-500/20 hover:bg-accent-500 text-accent-500 hover:text-primary-900 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(reg._id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary-500 border border-accent-500/30 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setSelectedRegistration(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            >
              ×
            </button>

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center">
                  <School size={32} className="text-accent-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-heading font-black text-white">{selectedRegistration.schoolName}</h2>
                  <p className="text-accent-400">{selectedRegistration.board} Board</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-black text-white mb-4">Contact Information</h3>
                  
                  <div className="flex items-start gap-3">
                    <Users size={20} className="text-accent-500 mt-0.5" />
                    <div>
                      <div className="text-white/60 text-xs">Contact Person</div>
                      <div className="text-white">{selectedRegistration.contactPerson}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-accent-500 mt-0.5" />
                    <div>
                      <div className="text-white/60 text-xs">Email</div>
                      <div className="text-white">{selectedRegistration.email}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-accent-500 mt-0.5" />
                    <div>
                      <div className="text-white/60 text-xs">Phone</div>
                      <div className="text-white">{selectedRegistration.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-accent-500 mt-0.5" />
                    <div>
                      <div className="text-white/60 text-xs">Address</div>
                      <div className="text-white">
                        {selectedRegistration.address}<br />
                        {selectedRegistration.city}, {selectedRegistration.state} {selectedRegistration.pincode}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Program Details */}
                <div className="space-y-4">
                  <h3 className="text-xl font-heading font-black text-white mb-4">Program Details</h3>
                  
                  <div className="flex items-start gap-3">
                    <GraduationCap size={20} className="text-accent-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-white/60 text-xs mb-2">Selected Tutors</div>
                      {selectedRegistration.selectedTutorIds && selectedRegistration.selectedTutorIds.length > 0 ? (
                        <div className="space-y-1">
                          {selectedRegistration.selectedTutorIds.map((tutorId, idx) => (
                            <div key={idx} className="text-white bg-primary-600/30 px-3 py-1 rounded-lg text-sm">
                              • {tutorId}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-white">{selectedRegistration.selectedTutorId || 'Not selected'}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <School size={20} className="text-accent-500 mt-0.5" />
                    <div>
                      <div className="text-white/60 text-xs">Grade Level</div>
                      <div className="text-white">Grade {selectedRegistration.selectedGrade || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users size={20} className="text-accent-500 mt-0.5" />
                    <div>
                      <div className="text-white/60 text-xs">Number of Students</div>
                      <div className="text-white">{selectedRegistration.numberOfStudents || 'N/A'}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign size={20} className="text-accent-500 mt-0.5" />
                    <div>
                      <div className="text-white/60 text-xs">Estimated Quote</div>
                      <div className="text-accent-400 font-bold text-xl">
                        ₹{(selectedRegistration.estimatedQuote || 0).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedRegistration.message && (
                <div className="mt-6 p-4 bg-primary-600/50 border border-white/10 rounded-xl">
                  <div className="text-white/60 text-xs mb-2">Additional Message</div>
                  <div className="text-white">{selectedRegistration.message}</div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-white/60">
                    Registered on: {new Date(selectedRegistration.createdAt).toLocaleString('en-IN')}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedRegistration.status === 'pending' 
                      ? 'bg-orange-500/20 text-orange-500' 
                      : 'bg-green-500/20 text-green-500'
                  }`}>
                    {selectedRegistration.status}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
