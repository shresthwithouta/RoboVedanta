'use client';

import { useEffect, useState } from 'react';
import { 
  School, 
  Users, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Trash2, 
  Eye, 
  RefreshCw, 
  GraduationCap, 
  DollarSign, 
  LayoutDashboard, 
  MessageSquare, 
  UserPlus, 
  Clock,
  ArrowRight,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('schools'); // 'schools', 'programs', 'messages'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    totalEstimate: 0
  });

  const endpoints = {
    schools: '/api/school-registrations',
    programs: '/api/program-registrations',
    messages: '/api/contact'
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoints[activeTab]);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        
        // Calculate stats specific to each data type
        if (activeTab === 'schools') {
          const pending = result.data.filter(r => r.status === 'pending').length;
          const totalEstimate = result.data.reduce((sum, r) => sum + (r.estimatedQuote || 0), 0);
          setStats({ total: result.data.length, pending, totalEstimate });
        } else if (activeTab === 'programs') {
          const pending = result.data.filter(r => r.status === 'pending').length;
          const totalEstimate = result.data.reduce((sum, r) => sum + (r.estimatedQuote || 0), 0);
          setStats({ total: result.data.length, pending, totalEstimate });
        } else {
          const unread = result.data.filter(m => m.status === 'unread').length;
          setStats({ total: result.data.length, pending: unread, totalEstimate: 0 });
        }
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) return;

    try {
      const response = await fetch(`${endpoints[activeTab]}?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        fetchData();
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const menuItems = [
    { id: 'schools', label: 'School Queries', icon: <School size={20} />, description: 'Institutional program inquiries' },
    { id: 'programs', label: 'Student Enrollments', icon: <UserPlus size={20} />, description: 'Individual course registrations' },
    { id: 'messages', label: 'Contact Messages', icon: <MessageSquare size={20} />, description: 'General website inquiries' }
  ];

  return (
    <div className="flex min-h-screen bg-primary-500 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-primary-600 border-r border-white/10 flex flex-col pt-8 overflow-y-auto">
        <div className="px-8 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-accent-500/20">
              <LayoutDashboard size={24} className="text-primary-900" />
            </div>
            <h1 className="text-2xl font-heading font-black text-white tracking-tighter">Admin Panel</h1>
          </div>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest pl-1">RoboVedanta Management</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-start gap-4 p-4 rounded-3xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-accent-500 text-primary-900 shadow-xl shadow-accent-500/10' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className={`mt-1 transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? 'text-primary-900' : 'text-accent-500'}`}>
                {item.icon}
              </div>
              <div className="text-left">
                <div className="font-black text-sm tracking-tight">{item.label}</div>
                <div className={`text-[10px] font-medium leading-tight mt-0.5 ${activeTab === item.id ? 'text-primary-900/60' : 'text-white/30'}`}>
                  {item.description}
                </div>
              </div>
              {activeTab === item.id && (
                <div className="ml-auto mt-1">
                  <ArrowRight size={14} className="text-primary-900" />
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <div className="bg-primary-500/50 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-3 mb-2 text-accent-500">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span className="text-[10px] font-black uppercase tracking-widest">Auto Synchronized</span>
            </div>
            <p className="text-[10px] text-white/40 leading-relaxed font-medium">
              Data is fetched in real-time from RoboVedanta's MongoDB instance.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-24 border-b border-white/10 bg-primary-500/50 backdrop-blur-xl flex items-center justify-between px-10 shrink-0">
          <div>
            <h2 className="text-2xl font-heading font-black text-white tracking-tight">
              {menuItems.find(i => i.id === activeTab).label}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Live Database Connection</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <button
              onClick={fetchData}
              disabled={loading}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold flex items-center gap-2 transition-all border border-white/10"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Refresh Data
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-500 to-accent-600 border-2 border-white/10 flex items-center justify-center font-black text-primary-900 shadow-lg">
              SV
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-10 scrollbar-thin scrollbar-thumb-white/10">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Volume', value: stats.total, icon: <Inbox />, color: 'text-accent-500', bg: 'bg-accent-500/10' },
                { label: activeTab === 'messages' ? 'Unread Messages' : 'Pending Action', value: stats.pending, icon: <Clock />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                { label: 'Platform Utilization', value: stats.total > 0 ? 'High' : 'Low', icon: <TrendingUp />, color: 'text-green-500', bg: 'bg-green-500/10' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-primary-600/50 border border-white/10 rounded-3xl p-6 hover:border-accent-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</div>
                      <div className="text-3xl font-heading font-black text-white">{stat.value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* List Table */}
            <div className="bg-primary-600/50 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-heading font-black text-white">Recent Submissions</h3>
                <div className="text-[10px] font-black text-accent-500 tracking-widest uppercase bg-accent-500/10 px-3 py-1 rounded-full">
                  Updated just now
                </div>
              </div>

              {loading ? (
                <div className="py-24 text-center">
                  <div className="inline-block relative">
                    <RefreshCw size={64} className="text-accent-500 animate-spin opacity-20" />
                    <RefreshCw size={32} className="text-accent-500 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="mt-6 text-white/40 font-bold uppercase tracking-widest text-xs">Streaming from Database...</p>
                </div>
              ) : data.length === 0 ? (
                <div className="py-24 text-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Inbox size={40} className="text-white/20" />
                  </div>
                  <h4 className="text-white font-black text-lg mb-2">No entries found</h4>
                  <p className="text-white/40 text-sm font-medium">When data is submitted through public forms, it will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5 border-b border-white/5">
                      <tr className="text-left text-white/40 font-black text-[10px] uppercase tracking-[0.2em]">
                        <th className="px-8 py-5">Identifier</th>
                        <th className="px-8 py-5">Communication</th>
                        <th className="px-8 py-5">Specifics</th>
                        <th className="px-8 py-5">Submited At</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data.map((item, idx) => (
                        <motion.tr
                          key={item._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="hover:bg-white/[0.03] group transition-all duration-300"
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-accent-500/10 text-accent-500 rounded-2xl flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform duration-300">
                                {activeTab === 'schools' ? <School size={20} /> : activeTab === 'programs' ? <GraduationCap size={20} /> : <Mail size={20} />}
                              </div>
                              <div>
                                <div className="text-white font-black text-sm group-hover:text-accent-500 transition-colors">
                                  {item.schoolName || item.studentName || item.name}
                                </div>
                                <div className="text-white/30 text-[10px] uppercase tracking-widest font-bold mt-0.5">
                                  {item.board || item.programType || item.subject}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-white/80 text-sm font-bold">{item.contactPerson || item.parentName || item.email}</div>
                            <div className="text-white/30 text-[10px] font-medium mt-1 uppercase tracking-wider">{item.phone || item.email}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-white/80 text-sm font-bold">
                              {activeTab === 'schools' ? `Grade ${item.selectedGrade}` : activeTab === 'programs' ? `Grade ${item.grade}` : 'Message'}
                            </div>
                            <div className="text-white/30 text-[10px] font-medium mt-1 uppercase tracking-wider">
                              {activeTab === 'messages' ? 'Click to view' : `₹${(item.estimatedQuote || 0).toLocaleString('en-IN')}`}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                               {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="text-white/20 text-[10px] mt-0.5">
                              {new Date(item.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={() => setSelectedItem(item)}
                                className="p-3 bg-accent-500/10 text-accent-500 rounded-xl hover:bg-accent-500 hover:text-primary-900 transition-all duration-300"
                              >
                                <Eye size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                              >
                                <Trash2 size={18} />
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
        </main>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-primary-600 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-full"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="p-10 flex flex-col h-full overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-white/10">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-accent-500/10 text-accent-500 rounded-3xl flex items-center justify-center shadow-inner">
                       {activeTab === 'schools' ? <School size={40} /> : activeTab === 'programs' ? <GraduationCap size={40} /> : <MessageSquare size={40} />}
                    </div>
                    <div>
                      <h4 className="text-3xl font-heading font-black text-white tracking-tighter mb-2">
                         {selectedItem.schoolName || selectedItem.studentName || selectedItem.name}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-accent-500/10 text-accent-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent-500/20">
                          {activeTab.slice(0, -1)} Portal Entry
                        </span>
                        <span className="text-white/30 text-[10px] font-bold">Entry ID: {selectedItem._id?.slice(-8)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all border border-white/10"
                  >
                    <Eye size={20} className="rotate-45" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-10">
                    <section>
                      <h5 className="text-[10px] font-black text-accent-500 uppercase tracking-[0.2em] mb-6">Subject Information</h5>
                      <div className="grid grid-cols-1 gap-6">
                        <InfoItem label="Primary Name" value={selectedItem.schoolName || selectedItem.studentName || selectedItem.name} icon={<Users />} />
                        <InfoItem label="Classification" value={selectedItem.board || selectedItem.programType || selectedItem.subject} icon={<LayoutDashboard />} />
                        {selectedItem.grade && <InfoItem label="Grade Level" value={`Grade ${selectedItem.grade}`} icon={<GraduationCap />} />}
                        {selectedItem.selectedGrade && <InfoItem label="Applied Grade" value={`Level ${selectedItem.selectedGrade}`} icon={<GraduationCap />} />}
                      </div>
                    </section>

                    <section>
                      <h5 className="text-[10px] font-black text-accent-500 uppercase tracking-[0.2em] mb-6">Communication Vectors</h5>
                      <div className="grid grid-cols-1 gap-6 text-xl">
                        <InfoItem label="Direct Contact" value={selectedItem.contactPerson || selectedItem.parentName || 'Direct'} icon={<Users />} />
                        <InfoItem label="Email Gateway" value={selectedItem.email} icon={<Mail />} />
                        <InfoItem label="Phone Connection" value={selectedItem.phone || 'Not Provided'} icon={<Phone />} />
                      </div>
                    </section>
                  </div>

                  <div className="space-y-10">
                    <section>
                      <h5 className="text-[10px] font-black text-accent-500 uppercase tracking-[0.2em] mb-6">Logistical Details</h5>
                      <div className="grid grid-cols-1 gap-6">
                        {selectedItem.city && <InfoItem label="Geographical Location" value={`${selectedItem.city}, ${selectedItem.state}`} icon={<MapPin />} />}
                        {selectedItem.address && <InfoItem label="Detailed Address" value={selectedItem.address} icon={<MapPin />} />}
                        {activeTab !== 'messages' && <InfoItem label="Financial Estimate" value={`₹${(selectedItem.estimatedQuote || 0).toLocaleString('en-IN')}`} icon={<DollarSign />} />}
                        {selectedItem.numberOfStudents && <InfoItem label="Student Volume" value={`${selectedItem.numberOfStudents} Registered`} icon={<Users />} />}
                      </div>
                    </section>

                    {selectedItem.message && (
                      <section>
                         <h5 className="text-[10px] font-black text-accent-500 uppercase tracking-[0.2em] mb-6">Special Instructions / Message</h5>
                         <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-white/70 text-sm leading-relaxed font-medium">
                            "{selectedItem.message}"
                         </div>
                      </section>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-10 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                     <div className="flex flex-col">
                        <span className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Created At</span>
                        <span className="text-white font-bold">{new Date(selectedItem.createdAt).toLocaleString('en-IN')}</span>
                     </div>
                     <div className="flex flex-col border-l border-white/10 pl-6">
                        <span className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Current Status</span>
                        <span className="text-accent-500 font-bold uppercase tracking-widest text-xs">{selectedItem.status}</span>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="px-8 py-4 bg-accent-500 text-primary-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent-400 transition-all shadow-xl shadow-accent-500/20">
                      Update Record
                    </button>
                    <button 
                      onClick={() => {
                        handleDelete(selectedItem._id);
                        setSelectedItem(null);
                      }}
                      className="px-8 py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-400 transition-all shadow-xl shadow-red-500/20"
                    >
                      Purge Data
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoItem({ label, value, icon }) {
  return (
    <div className="flex items-start gap-4 group/item">
      <div className="mt-1 text-white/20 group-hover/item:text-accent-500 transition-colors shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{label}</div>
        <div className="text-white font-bold tracking-tight">{value}</div>
      </div>
    </div>
  );
}
