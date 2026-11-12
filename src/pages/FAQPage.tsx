import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const allFaqs = [
    {
      category: "Getting Started & Intake",
      q: "How does the first psychotherapy intake consultation work?",
      a: "The inaugural 50-minute clinical consultation is a collaborative, paced exploration. Your licensed therapist reviews your presenting concerns, developmental history, and personal therapy goals in a safe, non-judgmental environment. You are never pressured to discuss matters you are not yet ready to share."
    },
    {
      category: "Getting Started & Intake",
      q: "How often should I attend psychotherapy sessions?",
      a: "Most clients begin with once-weekly 50-minute sessions to build momentum and establish therapeutic alliance. As symptom relief and psychological regulation stabilize, sessions may be transitioned to bi-weekly or monthly maintenance consultations."
    },
    {
      category: "Confidentiality & Security",
      q: "Are my sessions, intake notes, and disclosures completely confidential?",
      a: "Yes. TheraConnect adheres strictly to statutory professional confidentiality and HIPAA-grade data protection guidelines. Disclosures are legally protected and cannot be shared with third parties, employers, or family members without your explicit written authorization, barring acute emergency safety mandates."
    },
    {
      category: "Confidentiality & Security",
      q: "Is teletherapy video encrypted?",
      a: "Yes. Our video teletherapy rooms use end-to-end WebRTC peer encryption. No recordings are ever made or stored by TheraConnect without formal written consent from both client and psychologist."
    },
    {
      category: "Fees, Payments & Insurance",
      q: "Can I receive clinical receipts for corporate insurance reimbursement?",
      a: "Yes. Following each completed appointment, you receive an itemized clinical receipt containing your clinician's professional registration credentials (e.g. RCI / BPS license numbers) for direct reimbursement submission with insurance carriers."
    },
    {
      category: "Fees, Payments & Insurance",
      q: "What is your cancellation and rescheduling policy?",
      a: "We require at least 24 hours prior notice to reschedule or cancel without incurring the session fee. This guarantees that reserved clinical hours can be offered to clients on our urgent standby list."
    },
    {
      category: "Clinical Boundaries & Crisis",
      q: "What if I experience an acute psychological emergency?",
      a: "TheraConnect provides scheduled outpatient psychotherapy and does not maintain walk-in emergency psychiatric facilities. If you are experiencing acute suicidal thoughts, psychotic symptoms, or physical crisis, please call 988 (USA/Canada), 14416 Tele-MANAS (India), or report to the nearest hospital casualty unit immediately."
    }
  ];

  const filteredFaqs = allFaqs.filter(
    f => f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          Help & Clarifications
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#173D35] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#5C6764]">
          Clear, transparent answers about our clinical protocols, confidentiality, fees, and therapeutic standards.
        </p>

        {/* Search bar */}
        <div className="relative max-w-md mx-auto pt-4">
          <Search className="w-4 h-4 text-[#5C6764] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. insurance, confidentiality)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#D1DDD0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className="bg-white border border-[#D1DDD0] rounded-xl overflow-hidden shadow-xs transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-[#EFEDE4]/30 transition-colors"
              >
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#B99A64] block mb-1">
                    {faq.category}
                  </span>
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#173D35]">
                    {faq.q}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#173D35] shrink-0 transition-transform duration-200 mt-1 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm text-[#5C6764] leading-relaxed border-t border-slate-100 font-light">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
