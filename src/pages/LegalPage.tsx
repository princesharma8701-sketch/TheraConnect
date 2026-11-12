import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'consent' | 'cancellation'>('privacy');

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          Governance & Ethics
        </div>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#173D35] tracking-tight">
          Clinical Policies & Data Protection
        </h1>
        <p className="text-sm text-[#5C6764]">
          Our statutory obligations under the Mental Healthcare Act, professional clinical guidelines, and digital patient privacy laws.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-1 p-1 bg-[#EFEDE4] rounded-lg max-w-md mx-auto border border-[#D1DDD0]">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'privacy' ? 'bg-white text-[#173D35] shadow-xs' : 'text-[#5C6764] hover:text-[#242B29]'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('consent')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'consent' ? 'bg-white text-[#173D35] shadow-xs' : 'text-[#5C6764] hover:text-[#242B29]'
          }`}
        >
          Informed Consent
        </button>
        <button
          onClick={() => setActiveTab('cancellation')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'cancellation' ? 'bg-white text-[#173D35] shadow-xs' : 'text-[#5C6764] hover:text-[#242B29]'
          }`}
        >
          Cancellation Terms
        </button>
      </div>

      <div className="bg-white border border-[#D1DDD0] rounded-xl p-8 sm:p-12 shadow-xs text-xs sm:text-sm text-[#242B29] leading-relaxed space-y-6 font-light">
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
              TheraConnect Data Privacy & HIPAA-Aligned Architecture
            </h2>
            <p>
              Last Updated: November 2026. TheraConnect Clinical Institute is committed to treating your personal, psychological, and financial records with the utmost confidentiality.
            </p>
            <h4 className="font-semibold text-[#173D35] text-base pt-2">1. Scope of Personal Health Information (PHI)</h4>
            <p>
              We collect identifying particulars (name, email, phone, emergency contact) and clinical intake disclosures solely to assess therapeutic suitability, deliver evidence-informed psychotherapy, and generate lawful billing documentation.
            </p>
            <h4 className="font-semibold text-[#173D35] text-base pt-2">2. Data Isolation & Encryption</h4>
            <p>
              All psychological notes are decoupled from public databases and secured using AES-256 at rest and TLS 1.3 in transit. We never sell, lease, or monetize client data under any circumstances.
            </p>
            <h4 className="font-semibold text-[#173D35] text-base pt-2">3. Exceptions to Confidentiality</h4>
            <p>
              Under clinical licensing regulations, statutory disclosure is mandated solely if:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>A client expresses imminent intent to harm themselves or another identifiable individual.</li>
              <li>A disclosure involves the ongoing abuse or neglect of a minor, disabled person, or vulnerable elder.</li>
              <li>A formal court subpoena is ordered by a judge in criminal proceedings.</li>
            </ul>
          </div>
        )}

        {activeTab === 'consent' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
              Clinical Informed Consent & Treatment Agreement
            </h2>
            <p>
              Psychotherapy is a collaborative therapeutic intervention aimed at addressing emotional, behavioral, and relational distress.
            </p>
            <h4 className="font-semibold text-[#173D35] text-base pt-2">1. Nature of the Therapeutic Alliance</h4>
            <p>
              While clinical psychotherapy has demonstrated empirical efficacy in alleviating depression, panic, and anxiety, progress requires active emotional engagement. In early phases of therapy, discussing difficult developmental memories may occasionally elicit temporary distress before emotional resolution occurs.
            </p>
            <h4 className="font-semibold text-[#173D35] text-base pt-2">2. Client Autonomy & Right to Terminate</h4>
            <p>
              You maintain total agency to determine the topics discussed, refuse specific exercises, and discontinue care at any point. We encourage discussing planned termination with your clinician to ensure thoughtful consolidation.
            </p>
          </div>
        )}

        {activeTab === 'cancellation' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-editorial font-bold text-[#173D35]">
              Cancellation & Rescheduling Policies
            </h2>
            <p>
              To maintain the integrity of our clinical practice and ensure equitable access for waiting clients, we enforce the following guidelines:
            </p>
            <h4 className="font-semibold text-[#173D35] text-base pt-2">1. The 24-Hour Notice Policy</h4>
            <p>
              Appointments cancelled or rescheduled with at least 24 hours prior notice receive a 100% full credit or refund to the original payment method without penalty.
            </p>
            <h4 className="font-semibold text-[#173D35] text-base pt-2">2. Late Cancellations & No-Shows</h4>
            <p>
              Cancellations made within 24 hours of the reserved hour forfeit the consultation fee, as clinical hours cannot be reassigned on short notice.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
