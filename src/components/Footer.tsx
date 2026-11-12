import React, { useState } from 'react';
import { TheraConnectStore } from '../services/store';
import { ShieldCheck, Mail, ArrowRight, HeartHandshake } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<{ message: string; success: boolean } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const res = TheraConnectStore.addSubscriber(email, 'footer');
    setSubscribeStatus(res);
    if (res.success) setEmail('');
    setTimeout(() => setSubscribeStatus(null), 5000);
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#173D35] text-[#EFEDE4] pt-16 pb-12 border-t border-[#205046]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#205046]">
          
          {/* Brand & Editorial Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-3xl font-editorial font-semibold tracking-tight text-[#FFFFFF]">
              TheraConnect
            </div>
            <p className="text-sm text-[#DCE5D9] max-w-sm leading-relaxed">
              Thoughtful Care. Meaningful Change. A private clinical institute offering evidence-informed psychotherapy, psychological evaluation, and compassionate emotional guidance.
            </p>
            <div className="pt-2 text-xs text-[#A8B9A3] space-y-1">
              <p>Clinical Registration: RCI / PSY-2016-4192</p>
              <p>HIPAA & Digital Data Protection Compliant Architecture</p>
              <p>New Delhi · London · Telehealth Worldwide</p>
            </div>
          </div>

          {/* Clinical Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#DFC9A0] font-semibold">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-sm text-[#EFEDE4]/80">
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Individual Psychotherapy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Anxiety & Panic Counselling
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Depression & Mood Care
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Burnout & Stress Recovery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Couples & Relational Therapy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">
                  Encrypted Teletherapy
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation & Patient Care */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#DFC9A0] font-semibold">
              Patient Care
            </h4>
            <ul className="space-y-2 text-sm text-[#EFEDE4]/80">
              <li>
                <button onClick={() => navigateTo('booking')} className="hover:text-white transition-colors">
                  Book an Appointment
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('confirmation')} className="hover:text-white transition-colors">
                  Lookup Booking Status
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('resources')} className="hover:text-white transition-colors">
                  Self-Regulation Worksheets
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-white transition-colors">
                  Clinical Journal & Studies
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
                  Confidentiality Standards
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Thoughtful Inquiries */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-[#DFC9A0] font-semibold">
              Clinical Insights
            </h4>
            <p className="text-xs text-[#DCE5D9] leading-relaxed">
              Receive monthly peer-informed psychoeducation and mental health tools in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-[#0E2722]/60 border border-[#205046] rounded-md text-white placeholder-[#A8B9A3]/60 focus:outline-none focus:border-[#DFC9A0] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#A8B9A3] hover:bg-[#DCE5D9] text-[#173D35] rounded transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribeStatus && (
                <p className={`text-xs ${subscribeStatus.success ? 'text-[#A8B9A3]' : 'text-red-300'}`}>
                  {subscribeStatus.message}
                </p>
              )}
            </form>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('admin')}
                className="text-xs text-[#A8B9A3] hover:text-[#DFC9A0] flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Therapist Portal Login</span>
              </button>
            </div>
          </div>

        </div>

        {/* Ethical Healthcare & Emergency Notice */}
        <div className="pt-8 pb-4 text-xs text-[#A8B9A3]/80 leading-relaxed space-y-2">
          <p>
            <strong className="text-[#DFC9A0]">Emergency Notice:</strong> TheraConnect is an outpatient clinical psychotherapy and counseling service. We do not provide acute crisis emergency intervention. If you are experiencing suicidal thoughts, self-harm impulses, or severe psychiatric distress, please contact national crisis hotlines immediately (dial <a href="tel:988" className="text-white underline">988</a> in the US/Canada, or <a href="tel:14416" className="text-white underline">14416</a> Tele-MANAS in India) or report to the nearest hospital emergency room.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 text-xs text-[#EFEDE4]/60">
            <p>© {new Date().getFullYear()} TheraConnect Institute for Mental Healthcare. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
                Privacy & Data Protection
              </button>
              <span>·</span>
              <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
                Terms of Care & Consent
              </button>
              <span>·</span>
              <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                Clinic Location
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
