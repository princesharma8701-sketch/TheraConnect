import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  CreditCard,
  BookOpen,
  MessageSquare,
  FileText,
  Mail,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Download,
  ShieldCheck,
  RefreshCw,
  Clock,
  MapPin,
  Video
} from 'lucide-react';
import { TheraConnectStore } from '../services/store';
import {
  Appointment,
  AppointmentStatus,
  Client,
  Payment,
  BlogPost,
  Testimonial,
  Resource,
  ContactMessage,
  Subscriber,
  ClinicSettings,
  IntakeForm
} from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onNavigateHome }) => {
  const adminUser = TheraConnectStore.getAdminUser();

  // Active module
  const [activeModule, setActiveModule] = useState<
    'overview' | 'appointments' | 'clients' | 'payments' | 'blog' | 'testimonials' | 'resources' | 'subscribers' | 'messages' | 'settings'
  >('overview');

  // Refresh trigger to re-render data from store
  const [refreshCount, setRefreshCount] = useState(0);
  const triggerRefresh = () => setRefreshCount(c => c + 1);

  // Data fetching
  const appointments = TheraConnectStore.getAppointments();
  const clients = TheraConnectStore.getClients();
  const payments = TheraConnectStore.getPayments();
  const blogPosts = TheraConnectStore.getBlogPosts();
  const testimonials = TheraConnectStore.getTestimonials();
  const resources = TheraConnectStore.getResources();
  const subscribers = TheraConnectStore.getSubscribers();
  const contactMessages = TheraConnectStore.getContactMessages();
  const settings = TheraConnectStore.getSettings();

  // Appointments filter & search
  const [aptStatusFilter, setAptStatusFilter] = useState<string>('ALL');
  const [aptSearch, setAptSearch] = useState<string>('');
  const [selectedAppointmentIntake, setSelectedAppointmentIntake] = useState<{
    appointment: Appointment;
    intake?: IntakeForm;
  } | null>(null);

  // Clients search
  const [clientSearch, setClientSearch] = useState<string>('');

  // Blog creation modal state
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogCategory, setBlogCategory] = useState('Clinical Neurobiology');
  const [blogContent, setBlogContent] = useState('');

  // Settings state
  const [settingsForm, setSettingsForm] = useState<ClinicSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = aptStatusFilter === 'ALL' || a.status === aptStatusFilter;
    const matchesSearch =
      a.clientName.toLowerCase().includes(aptSearch.toLowerCase()) ||
      a.referenceCode.toLowerCase().includes(aptSearch.toLowerCase()) ||
      a.serviceTitle.toLowerCase().includes(aptSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered Clients
  const filteredClients = clients.filter(c =>
    c.fullName.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(clientSearch.toLowerCase())
  );

  // Appointment Status Handlers
  const handleUpdateStatus = (id: string, status: AppointmentStatus) => {
    TheraConnectStore.updateAppointmentStatus(id, status);
    triggerRefresh();
  };

  // Refund Handler
  const handleRefund = (paymentId: string) => {
    if (confirm('Are you sure you want to issue a full refund for this transaction? This will update the linked appointment to CANCELLED.')) {
      TheraConnectStore.refundPayment(paymentId);
      triggerRefresh();
    }
  };

  // Blog Handlers
  const handleOpenBlogCreate = () => {
    setEditingPostId(null);
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogCategory('Clinical Neurobiology');
    setBlogContent('');
    setIsBlogModalOpen(true);
  };

  const handleOpenBlogEdit = (p: BlogPost) => {
    setEditingPostId(p.id);
    setBlogTitle(p.title);
    setBlogExcerpt(p.excerpt);
    setBlogCategory(p.category);
    setBlogContent(p.content);
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) return;

    if (editingPostId) {
      TheraConnectStore.updateBlogPost(editingPostId, {
        title: blogTitle,
        excerpt: blogExcerpt,
        category: blogCategory,
        content: blogContent
      });
    } else {
      const slug = blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      TheraConnectStore.createBlogPost({
        slug,
        title: blogTitle,
        excerpt: blogExcerpt,
        content: blogContent,
        category: blogCategory,
        readTime: '5 min read',
        authorId: adminUser?.id || 'usr-dr-elena',
        authorName: adminUser?.fullName || 'Dr. Elena Vance, Ph.D.',
        publishedAt: new Date().toISOString().split('T')[0],
        imageUrl: '/src/assets/images/hero_therapy_consultation_1794478627706.jpg',
        isPublished: true
      });
    }

    setIsBlogModalOpen(false);
    triggerRefresh();
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm('Delete this article from the clinical journal?')) {
      TheraConnectStore.deleteBlogPost(id);
      triggerRefresh();
    }
  };

  // Testimonial Toggle
  const handleToggleTestimonial = (id: string) => {
    TheraConnectStore.toggleTestimonialApproval(id);
    triggerRefresh();
  };

  // Subscribers Export
  const handleExportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Email,Source,JoinedDate\n" + 
      subscribers.map(s => `"${s.id}","${s.email}","${s.source}","${s.createdAt}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TheraConnect-Subscribers-${Date.now().toString(36)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    TheraConnectStore.updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 4000);
    triggerRefresh();
  };

  // Metrics Calculations for Overview
  const totalRevenue = payments
    .filter(p => p.status === 'SUCCESS')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAppointments = appointments.filter(a => a.status === 'PENDING').length;
  const confirmedAppointments = appointments.filter(a => a.status === 'CONFIRMED').length;

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex flex-col">
      
      {/* Top Header */}
      <header className="bg-[#173D35] text-white px-6 py-4 flex items-center justify-between border-b border-[#205046]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-2xl font-bold tracking-tight">TheraConnect</span>
            <span className="text-[11px] uppercase font-mono px-2 py-0.5 bg-[#A8B9A3]/20 text-[#DFC9A0] rounded">
              Clinical Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={onNavigateHome}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#205046] hover:bg-[#205046]/80 text-[#DCE5D9] rounded transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 border-l border-[#205046] pl-4">
            <div className="text-right hidden md:block">
              <div className="font-semibold text-white">{adminUser?.fullName || 'Dr. Elena Vance'}</div>
              <div className="text-[11px] text-[#A8B9A3]">{adminUser?.designation || 'Clinical Director'}</div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-[#205046] rounded-md transition-colors text-white/80 hover:text-white"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar + Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-[#D1DDD0] p-4 space-y-1 shrink-0 overflow-y-auto">
          {[
            { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard },
            { id: 'appointments', label: 'Appointments', count: appointments.length, icon: CalendarCheck },
            { id: 'clients', label: 'Clients Directory', count: clients.length, icon: Users },
            { id: 'payments', label: 'Payments & Revenue', icon: CreditCard },
            { id: 'blog', label: 'Blog & Articles', count: blogPosts.length, icon: BookOpen },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
            { id: 'resources', label: 'Psychoeducation Tools', count: resources.length, icon: FileText },
            { id: 'subscribers', label: 'Newsletter Subscribers', count: subscribers.length, icon: Mail },
            { id: 'messages', label: 'Contact Messages', count: contactMessages.filter(m => !m.isRead).length, icon: Mail },
            { id: 'settings', label: 'Clinic Settings', icon: SettingsIcon }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#173D35] text-white shadow-xs'
                    : 'text-[#242B29]/80 hover:bg-[#EFEDE4]/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#DFC9A0]' : 'text-[#5C6764]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono-numbers ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EFEDE4] text-[#173D35]'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Workspace Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-6xl">
          
          {/* MODULE 1: OVERVIEW */}
          {activeModule === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
                  Clinical Operations Overview
                </h2>
                <p className="text-xs text-[#5C6764]">
                  Real-time metrics, appointment trends, and clinical caseload status.
                </p>
              </div>

              {/* Analytics Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#D1DDD0] p-5 rounded-xl shadow-xs space-y-1">
                  <div className="text-xs text-[#5C6764]">Total Consultations</div>
                  <div className="text-2xl font-bold font-mono-numbers text-[#173D35]">
                    {appointments.length}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{confirmedAppointments} confirmed active</span>
                  </div>
                </div>

                <div className="bg-white border border-[#D1DDD0] p-5 rounded-xl shadow-xs space-y-1">
                  <div className="text-xs text-[#5C6764]">Active Client Base</div>
                  <div className="text-2xl font-bold font-mono-numbers text-[#173D35]">
                    {clients.length}
                  </div>
                  <div className="text-[11px] text-[#5C6764]">Registered in directory</div>
                </div>

                <div className="bg-white border border-[#D1DDD0] p-5 rounded-xl shadow-xs space-y-1">
                  <div className="text-xs text-[#5C6764]">Gross Clinical Revenue</div>
                  <div className="text-2xl font-bold font-mono-numbers text-[#173D35]">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">Razorpay verified</div>
                </div>

                <div className="bg-white border border-[#D1DDD0] p-5 rounded-xl shadow-xs space-y-1">
                  <div className="text-xs text-[#5C6764]">Pending Approvals</div>
                  <div className="text-2xl font-bold font-mono-numbers text-[#B99A64]">
                    {pendingAppointments}
                  </div>
                  <div className="text-[11px] text-amber-700">Awaiting slot confirmation</div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white border border-[#D1DDD0] rounded-xl overflow-hidden shadow-xs space-y-3">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-base font-editorial font-bold text-[#173D35]">
                    Upcoming Patient Schedule
                  </h3>
                  <button
                    onClick={() => setActiveModule('appointments')}
                    className="text-xs text-[#173D35] hover:underline"
                  >
                    View All Appointments →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#EFEDE4]/50 text-[#5C6764] font-medium border-b border-slate-100">
                      <tr>
                        <th className="p-3 pl-5">Ref Code</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Service</th>
                        <th className="p-3">Date & Slot</th>
                        <th className="p-3">Modality</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 pr-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[#242B29]">
                      {appointments.slice(0, 4).map((apt) => (
                        <tr key={apt.id} className="hover:bg-[#EFEDE4]/20">
                          <td className="p-3 pl-5 font-mono font-medium">{apt.referenceCode}</td>
                          <td className="p-3 font-semibold">{apt.clientName}</td>
                          <td className="p-3 text-[#5C6764]">{apt.serviceTitle}</td>
                          <td className="p-3 font-mono-numbers">{apt.scheduledDate} · {apt.timeSlot}</td>
                          <td className="p-3">{apt.modality}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              apt.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                              apt.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="p-3 pr-5 text-right">
                            <button
                              onClick={() => {
                                const intake = TheraConnectStore.getIntakeByAppointmentId(apt.id);
                                setSelectedAppointmentIntake({ appointment: apt, intake });
                              }}
                              className="text-xs text-[#173D35] hover:underline"
                            >
                              View Intake
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 2: APPOINTMENTS */}
          {activeModule === 'appointments' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
                    Appointments & Session Scheduling
                  </h2>
                  <p className="text-xs text-[#5C6764]">
                    Review client bookings, manage status, and read clinical intake assessments.
                  </p>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#D1DDD0]">
                <div className="flex items-center gap-1 overflow-x-auto">
                  {['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setAptStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        aptStatusFilter === st
                          ? 'bg-[#173D35] text-white'
                          : 'text-[#5C6764] hover:bg-[#EFEDE4]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={aptSearch}
                    onChange={(e) => setAptSearch(e.target.value)}
                    placeholder="Search by client or code..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white border border-[#D1DDD0] rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#EFEDE4]/50 text-[#5C6764] font-medium border-b border-slate-100">
                      <tr>
                        <th className="p-3 pl-5">Reference</th>
                        <th className="p-3">Client Information</th>
                        <th className="p-3">Therapist & Service</th>
                        <th className="p-3">Schedule</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3 pr-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[#242B29]">
                      {filteredAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-[#EFEDE4]/20">
                          <td className="p-3 pl-5 font-mono font-medium">{apt.referenceCode}</td>
                          <td className="p-3">
                            <div className="font-semibold">{apt.clientName}</div>
                            <div className="text-[11px] text-[#5C6764]">{apt.clientEmail}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-[#173D35]">{apt.serviceTitle}</div>
                            <div className="text-[11px] text-[#5C6764]">{apt.therapistName}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-mono-numbers">{apt.scheduledDate}</div>
                            <div className="text-[11px] text-[#5C6764]">{apt.timeSlot}</div>
                          </td>
                          <td className="p-3">
                            <select
                              value={apt.status}
                              onChange={(e) => handleUpdateStatus(apt.id, e.target.value as AppointmentStatus)}
                              className="text-xs border border-slate-200 rounded px-2 py-1 bg-white font-medium"
                            >
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="PENDING">PENDING</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                              apt.paymentStatus === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              ₹{apt.priceAmount} ({apt.paymentStatus})
                            </span>
                          </td>
                          <td className="p-3 pr-5 text-right space-x-2">
                            <button
                              onClick={() => {
                                const intake = TheraConnectStore.getIntakeByAppointmentId(apt.id);
                                setSelectedAppointmentIntake({ appointment: apt, intake });
                              }}
                              className="text-xs text-[#173D35] font-semibold hover:underline"
                            >
                              Clinical Notes
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 3: CLIENTS DIRECTORY */}
          {activeModule === 'clients' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
                    Clients Directory
                  </h2>
                  <p className="text-xs text-[#5C6764]">
                    Registered patients, emergency contact information, and caseload notes.
                  </p>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    placeholder="Search clients..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredClients.map((c) => {
                  const clientApts = appointments.filter(a => a.clientId === c.id || a.clientEmail === c.email);
                  return (
                    <div key={c.id} className="bg-white border border-[#D1DDD0] rounded-xl p-5 shadow-xs space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-base font-semibold text-[#173D35]">{c.fullName}</h4>
                          <div className="text-xs text-[#5C6764]">{c.email} · {c.phoneNumber}</div>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 bg-[#EFEDE4] text-[#173D35] rounded">
                          {clientApts.length} Sessions
                        </span>
                      </div>

                      {c.emergencyContactName && (
                        <div className="text-xs text-[#5C6764] bg-slate-50 p-2.5 rounded">
                          <strong>Emergency Contact:</strong> {c.emergencyContactName} ({c.emergencyContactPhone || 'N/A'})
                        </div>
                      )}

                      <div className="text-xs text-[#242B29] leading-relaxed">
                        <span className="text-[#5C6764] block font-medium mb-0.5">Therapeutic Formulation:</span>
                        {c.notes || 'Registered through booking scheduler'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODULE 4: PAYMENTS */}
          {activeModule === 'payments' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
                  Razorpay Payment Records & Receipts
                </h2>
                <p className="text-xs text-[#5C6764]">
                  Transactions, verified signatures, receipts, and refund issuances.
                </p>
              </div>

              <div className="bg-white border border-[#D1DDD0] rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EFEDE4]/50 text-[#5C6764] font-medium border-b border-slate-100">
                    <tr>
                      <th className="p-3 pl-5">Payment ID</th>
                      <th className="p-3">Ref Code</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Rail / Method</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 pr-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-[#EFEDE4]/20">
                        <td className="p-3 pl-5 font-mono text-slate-700">{p.razorpayPaymentId || p.id}</td>
                        <td className="p-3 font-mono font-medium">{p.appointmentReference}</td>
                        <td className="p-3 font-semibold">{p.clientName}</td>
                        <td className="p-3 font-mono-numbers font-bold text-[#173D35]">₹{p.amount}</td>
                        <td className="p-3 text-slate-600">{p.paymentMethod}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            p.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-3 pr-5 text-right">
                          {p.status === 'SUCCESS' && (
                            <button
                              onClick={() => handleRefund(p.id)}
                              className="text-xs text-red-600 hover:underline font-medium"
                            >
                              Refund
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 5: BLOG MANAGEMENT */}
          {activeModule === 'blog' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
                    Clinical Journal CMS
                  </h2>
                  <p className="text-xs text-[#5C6764]">
                    Publish peer-informed psychoeducational articles.
                  </p>
                </div>
                <button
                  onClick={handleOpenBlogCreate}
                  className="px-4 py-2 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write Article</span>
                </button>
              </div>

              <div className="space-y-3">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-[#D1DDD0] p-4 rounded-xl flex items-center justify-between shadow-xs gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-[#5C6764]">
                        <span className="font-semibold text-[#173D35]">{post.category}</span>
                        <span>·</span>
                        <span>{post.publishedAt}</span>
                      </div>
                      <h4 className="text-base font-editorial font-bold text-[#173D35]">
                        {post.title}
                      </h4>
                      <p className="text-xs text-[#5C6764] line-clamp-1">{post.excerpt}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenBlogEdit(post)}
                        className="p-1.5 text-slate-500 hover:text-[#173D35] rounded hover:bg-[#EFEDE4]"
                        title="Edit article"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(post.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                        title="Delete article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 6: TESTIMONIALS */}
          {activeModule === 'testimonials' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
                  Testimonials & Patient Feedback
                </h2>
                <p className="text-xs text-[#5C6764]">
                  Moderate approved client testimonials with strict clinical anonymization.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-white border border-[#D1DDD0] p-5 rounded-xl shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#173D35]">{t.clientInitials}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        t.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {t.isApproved ? 'Approved on Site' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 italic">"{t.content}"</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="text-slate-500">{t.serviceName}</span>
                      <button
                        onClick={() => handleToggleTestimonial(t.id)}
                        className="text-xs text-[#173D35] font-semibold hover:underline"
                      >
                        {t.isApproved ? 'Unpublish' : 'Approve & Publish'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 7: RESOURCES */}
          {activeModule === 'resources' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
                  Psychoeducation Tools & Downloadable Worksheets
                </h2>
                <p className="text-xs text-[#5C6764]">
                  Review active clinical instruments and track patient download analytics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((r) => (
                  <div key={r.id} className="bg-white border border-[#D1DDD0] p-5 rounded-xl shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-[#B99A64]">{r.category}</span>
                      <span className="text-xs font-mono font-bold text-[#173D35]">{r.downloadCount} downloads</span>
                    </div>
                    <h4 className="text-base font-editorial font-bold text-[#173D35]">{r.title}</h4>
                    <p className="text-xs text-[#5C6764]">{r.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 8: SUBSCRIBERS */}
          {activeModule === 'subscribers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
                    Newsletter Subscribers
                  </h2>
                  <p className="text-xs text-[#5C6764]">
                    Clients and healthcare practitioners receiving monthly clinical research.
                  </p>
                </div>
                <button
                  onClick={handleExportSubscribers}
                  className="px-4 py-2 bg-[#EFEDE4] hover:bg-[#D1DDD0] text-[#173D35] text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV</span>
                </button>
              </div>

              <div className="bg-white border border-[#D1DDD0] rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EFEDE4]/50 text-[#5C6764] font-medium border-b border-slate-100">
                    <tr>
                      <th className="p-3 pl-5">Email Address</th>
                      <th className="p-3">Source Channel</th>
                      <th className="p-3 pr-5 text-right">Subscription Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-[#EFEDE4]/20">
                        <td className="p-3 pl-5 font-semibold text-[#173D35]">{sub.email}</td>
                        <td className="p-3 text-slate-500 font-mono text-[11px]">{sub.source}</td>
                        <td className="p-3 pr-5 text-right font-mono-numbers text-slate-600">{sub.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 9: CONTACT MESSAGES */}
          {activeModule === 'messages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
                  Patient Inquiries & Communications Inbox
                </h2>
                <p className="text-xs text-[#5C6764]">
                  Confidential questions submitted via the public contact portal.
                </p>
              </div>

              <div className="space-y-4">
                {contactMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-white border p-5 rounded-xl shadow-xs space-y-3 ${
                      !msg.isRead ? 'border-[#173D35] ring-1 ring-[#173D35]/20' : 'border-[#D1DDD0]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#173D35]">{msg.fullName}</span>
                          {!msg.isRead && (
                            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#5C6764]">{msg.email} · {msg.phone || 'No phone'}</div>
                      </div>
                      <span className="text-[11px] font-mono text-[#B99A64] bg-[#EFEDE4] px-2 py-0.5 rounded">
                        {msg.inquiryType}
                      </span>
                    </div>

                    <p className="text-xs text-[#242B29] leading-relaxed bg-[#EFEDE4]/30 p-3 rounded-md">
                      "{msg.message}"
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="text-slate-400 font-mono-numbers">{msg.createdAt.split('T')[0]}</span>
                      <div className="flex items-center gap-2">
                        {!msg.isRead && (
                          <button
                            onClick={() => {
                              TheraConnectStore.markMessageRead(msg.id);
                              triggerRefresh();
                            }}
                            className="text-xs text-[#173D35] hover:underline"
                          >
                            Mark Read
                          </button>
                        )}
                        <a
                          href={`mailto:${msg.email}?subject=TheraConnect Follow-up: ${msg.inquiryType}`}
                          onClick={() => {
                            TheraConnectStore.markMessageReplied(msg.id);
                            triggerRefresh();
                          }}
                          className="px-3 py-1 bg-[#173D35] text-white text-xs font-medium rounded hover:bg-[#0E2722]"
                        >
                          Reply by Email
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 10: SETTINGS */}
          {activeModule === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div>
                <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
                  Clinic Governance & Integrations Settings
                </h2>
                <p className="text-xs text-[#5C6764]">
                  Configure Razorpay gateway credentials, Calendly username, clinic address, and emergency hotlines.
                </p>
              </div>

              {settingsSaved && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-md flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Settings updated and saved successfully!</span>
                </div>
              )}

              <div className="bg-white border border-[#D1DDD0] rounded-xl p-6 space-y-4 shadow-xs">
                <h3 className="text-base font-editorial font-bold text-[#173D35]">
                  1. Razorpay Gateway Configuration
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Razorpay Key ID</label>
                    <input
                      type="text"
                      value={settingsForm.razorpayKeyId}
                      onChange={(e) => setSettingsForm({ ...settingsForm, razorpayKeyId: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Payment Mode</label>
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={settingsForm.demoPaymentMode}
                        onChange={(e) => setSettingsForm({ ...settingsForm, demoPaymentMode: e.target.checked })}
                        className="rounded text-[#173D35]"
                      />
                      <span className="text-xs text-slate-700">Sandbox / Demo Checkout Simulation Enabled</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#D1DDD0] rounded-xl p-6 space-y-4 shadow-xs">
                <h3 className="text-base font-editorial font-bold text-[#173D35]">
                  2. Calendly Integration Handle
                </h3>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Calendly Link / Handle</label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 text-xs text-slate-500 rounded-l-md">
                      calendly.com/
                    </span>
                    <input
                      type="text"
                      value={settingsForm.calendlyUsername}
                      onChange={(e) => setSettingsForm({ ...settingsForm, calendlyUsername: e.target.value })}
                      className="flex-1 px-3 py-2 text-xs font-mono border border-slate-200 rounded-r-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#D1DDD0] rounded-xl p-6 space-y-4 shadow-xs">
                <h3 className="text-base font-editorial font-bold text-[#173D35]">
                  3. Emergency Disclaimer & Clinic Information
                </h3>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Emergency Notice Banner Text</label>
                  <textarea
                    rows={2}
                    value={settingsForm.emergencyNotice}
                    onChange={(e) => setSettingsForm({ ...settingsForm, emergencyNotice: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Clinic Phone</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Clinic Email</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors"
              >
                Save All Clinic Settings
              </button>
            </form>
          )}

        </main>
      </div>

      {/* Clinical Intake & Notes Modal */}
      {selectedAppointmentIntake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-[#F8F7F2] rounded-xl shadow-2xl border border-[#D1DDD0] max-h-[90vh] flex flex-col overflow-hidden">
            <div className="bg-[#173D35] px-6 py-4 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-[#DFC9A0]">
                  Clinical Chart & Session Form
                </span>
                <h3 className="text-lg font-bold">
                  {selectedAppointmentIntake.appointment.clientName} ({selectedAppointmentIntake.appointment.referenceCode})
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppointmentIntake(null)}
                className="text-white/70 hover:text-white p-1 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#242B29]">
              {selectedAppointmentIntake.intake ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-white border border-[#D1DDD0] rounded-lg">
                    <div>
                      <span className="text-[#5C6764] block">Severity Score:</span>
                      <span className="font-bold text-[#173D35] text-sm font-mono-numbers">
                        {selectedAppointmentIntake.intake.symptomSeverity}/5
                      </span>
                    </div>
                    <div>
                      <span className="text-[#5C6764] block">Triage Risk Level:</span>
                      <span className="font-bold text-emerald-800">
                        {selectedAppointmentIntake.intake.riskLevel}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-[#173D35] block mb-1">Presenting Concerns:</span>
                    <p className="p-3 bg-white border border-[#D1DDD0] rounded leading-relaxed">
                      {selectedAppointmentIntake.intake.presentingConcerns}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-[#173D35] block mb-1">Previous Psychotherapy History:</span>
                    <p className="p-3 bg-white border border-[#D1DDD0] rounded leading-relaxed">
                      {selectedAppointmentIntake.intake.previousTherapyHistory}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <strong>Digital Consent Timestamp:</strong> {selectedAppointmentIntake.intake.consentSignedAt}
                    <br />
                    <strong>Signer:</strong> {selectedAppointmentIntake.intake.consentSignatureName}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500 bg-white rounded border border-[#D1DDD0]">
                  No clinical intake questionnaire has been filed for this appointment yet.
                </div>
              )}

              {/* Therapist Session Notes Editor */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className="font-semibold text-[#173D35] block">
                  Therapist Session Notes & Progress Notes:
                </label>
                <textarea
                  rows={4}
                  defaultValue={selectedAppointmentIntake.appointment.clinicalNotes || ''}
                  onChange={(e) => {
                    selectedAppointmentIntake.appointment.clinicalNotes = e.target.value;
                  }}
                  placeholder="Record clinical interventions, homework assignments, or diagnostic formulation..."
                  className="w-full p-3 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                />
                <button
                  onClick={() => {
                    TheraConnectStore.updateAppointmentStatus(
                      selectedAppointmentIntake.appointment.id,
                      selectedAppointmentIntake.appointment.status,
                      selectedAppointmentIntake.appointment.clinicalNotes
                    );
                    alert('Session clinical notes saved to secure record.');
                    triggerRefresh();
                  }}
                  className="px-4 py-2 bg-[#173D35] text-white rounded font-medium text-xs hover:bg-[#0E2722]"
                >
                  Save Clinical Notes
                </button>
              </div>
            </div>

            <div className="bg-[#EFEDE4]/80 px-6 py-3 border-t border-[#D1DDD0] flex justify-end">
              <button
                onClick={() => setSelectedAppointmentIntake(null)}
                className="px-4 py-1.5 bg-[#173D35] text-white text-xs font-medium rounded hover:bg-[#0E2722]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Article Editor Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-[#F8F7F2] rounded-xl shadow-2xl border border-[#D1DDD0] max-h-[90vh] flex flex-col overflow-hidden">
            <div className="bg-[#173D35] px-6 py-4 text-white flex items-center justify-between">
              <h3 className="text-lg font-editorial font-bold">
                {editingPostId ? 'Edit Article' : 'Compose Clinical Article'}
              </h3>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-full"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="e.g. Cognitive Flexibility Under Acute Stress"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#173D35] bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#173D35] bg-white text-xs"
                  >
                    <option value="Clinical Neurobiology">Clinical Neurobiology</option>
                    <option value="Therapy Foundations">Therapy Foundations</option>
                    <option value="Diagnostic Clarity">Diagnostic Clarity</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    disabled
                    value={adminUser?.fullName || 'Dr. Elena Vance, Ph.D.'}
                    className="w-full px-3 py-2 border border-slate-200 rounded bg-slate-100 text-slate-600 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  placeholder="1-2 sentences summarizing the clinical premise..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#173D35] bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Article Content *</label>
                <textarea
                  rows={8}
                  required
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="Write evidence-informed analysis, clinical implications, and therapeutic frameworks..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#173D35] bg-white text-xs font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#173D35] text-white rounded font-medium hover:bg-[#0E2722]"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
