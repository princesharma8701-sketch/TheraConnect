import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { TheraConnectStore } from '../services/store';

export const ContactPage: React.FC = () => {
  const settings = TheraConnectStore.getSettings();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('General Consultation Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    TheraConnectStore.createContactMessage({
      fullName: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      inquiryType,
      message: message.trim()
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          Direct Clinical Communications
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#173D35] tracking-tight">
          Connect With Our Clinical Team
        </h1>
        <p className="text-sm text-[#5C6764] leading-relaxed">
          Have questions regarding session suitability, corporate insurance reimbursement, or teletherapy setup? Our administrative and intake coordinators respond within one business day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info & Clinic Location */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#EFEDE4]/60 border border-[#D1DDD0] rounded-xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-editorial font-bold text-[#173D35]">
              Clinical Pavilion & Practice
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#242B29]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#173D35] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#173D35]">Sanctuary Clinic Address:</strong>
                  <span className="text-[#5C6764] leading-relaxed">{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#173D35] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#173D35]">Intake Desk Phone:</strong>
                  <a href={`tel:${settings.phone}`} className="text-[#5C6764] hover:text-[#173D35]">{settings.phone}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#173D35] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#173D35]">Confidential Email:</strong>
                  <a href={`mailto:${settings.email}`} className="text-[#5C6764] hover:text-[#173D35]">{settings.email}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#173D35] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#173D35]">Consultation Hours:</strong>
                  <span className="text-[#5C6764]">Monday – Saturday: 09:00 AM – 08:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Crisis Helpline Alert Box */}
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl space-y-2 text-xs text-red-900">
            <div className="flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 text-red-700" />
              <span>Immediate Psychological Emergency Notice</span>
            </div>
            <p className="leading-relaxed text-red-800">
              For emergency self-harm intervention or acute psychosis, please do not use this contact form. Dial <strong>988</strong> (USA/Canada) or <strong>14416</strong> (Tele-MANAS India) or visit your nearest emergency room.
            </p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-[#D1DDD0] rounded-xl p-8 sm:p-10 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-editorial font-bold text-[#173D35]">
                Inquiry Received Privately
              </h3>
              <p className="text-sm text-[#5C6764] max-w-md mx-auto leading-relaxed">
                Thank you. Our intake coordinator has received your message and will reply securely to your provided email address within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-[#173D35] text-white text-xs font-medium rounded-md hover:bg-[#0E2722] transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-2xl font-editorial font-bold text-[#173D35]">
                Send A Confidential Inquiry
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Sen"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Inquiry Nature</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35] bg-white"
                  >
                    <option value="General Consultation Inquiry">General Consultation Inquiry</option>
                    <option value="Insurance & Reimbursement">Insurance & Reimbursement</option>
                    <option value="Teletherapy Technical Support">Teletherapy Technical Support</option>
                    <option value="Supervisory & Clinical Training">Supervisory & Clinical Training</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Message or Question *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How may our clinical staff assist you?"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Privately encrypted dispatch
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs sm:text-sm font-medium rounded-md transition-colors"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
