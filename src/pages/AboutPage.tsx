import React from 'react';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { TheraConnectStore } from '../services/store';

interface AboutPageProps {
  onNavigateBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateBooking }) => {
  const therapists = TheraConnectStore.getTherapists();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          About The Institute
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#173D35] tracking-tight">
          Where Clinical Rigour Meets Empathetic Care
        </h1>
        <p className="text-base sm:text-lg text-[#5C6764] leading-relaxed">
          TheraConnect was established to elevate outpatient psychotherapy beyond transactional telemedicine. We provide a restorative environment where healing is paced, scientifically responsible, and deeply human.
        </p>
      </div>

      {/* Hero Image & Sanctuary Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#D1DDD0] shadow-md">
          <img
            src="/src/assets/images/wellness_peaceful_sanctuary_1794478629321.jpg"
            alt="TheraConnect peaceful clinical pavilion"
            referrerPolicy="no-referrer"
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="lg:col-span-6 space-y-5">
          <div className="text-xs uppercase font-mono tracking-wider text-[#B99A64]">
            Our Foundational Philosophy
          </div>
          <h2 className="text-3xl font-editorial font-bold text-[#173D35]">
            Emotional Safety As The Catalyst For Real Change
          </h2>
          <p className="text-sm text-[#242B29] leading-relaxed">
            In modern society, psychological distress is frequently treated as an isolated defect to be quickly suppressed. At TheraConnect, we perceive anxiety, burnout, grief, and relational rupture as meaningful signals of an overburdened human system.
          </p>
          <p className="text-sm text-[#5C6764] leading-relaxed">
            By creating an environment of profound physical and psychological safety, we enable our clients to untangle defensive emotional reflexes, examine core beliefs, and reconstruct enduring self-worth.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="border-l-2 border-[#173D35] pl-3 space-y-0.5">
              <div className="text-xl font-bold font-mono-numbers text-[#173D35]">100%</div>
              <div className="text-xs text-[#5C6764]">Licensed Psychologists</div>
            </div>
            <div className="border-l-2 border-[#173D35] pl-3 space-y-0.5">
              <div className="text-xl font-bold font-mono-numbers text-[#173D35]">50 min</div>
              <div className="text-xs text-[#5C6764]">Uninterrupted Session Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Leadership & Therapists */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
            Clinical Faculty
          </div>
          <h3 className="text-3xl font-editorial font-bold text-[#173D35]">
            Supervised Clinical Psychologists
          </h3>
          <p className="text-xs sm:text-sm text-[#5C6764]">
            All clinicians hold statutory clinical qualifications, undergoing weekly peer supervision and continuing professional development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {therapists.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#D1DDD0] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-xs items-center sm:items-start text-center sm:text-left"
            >
              <img
                src={t.avatarUrl || "/src/assets/images/therapist_portrait_clinical_1794478628756.jpg"}
                alt={t.fullName}
                referrerPolicy="no-referrer"
                className="w-28 h-28 rounded-xl object-cover border border-[#D1DDD0] shrink-0"
              />
              <div className="space-y-2">
                <div className="text-xs uppercase font-mono text-[#B99A64]">
                  {t.role.replace('_', ' ')}
                </div>
                <h4 className="text-xl font-editorial font-bold text-[#173D35]">
                  {t.fullName}
                </h4>
                <p className="text-xs font-medium text-[#5C6764]">{t.designation}</p>
                <p className="text-[11px] font-mono text-[#A8B9A3]">{t.licenseNo}</p>
                <div className="pt-2">
                  <button
                    onClick={onNavigateBooking}
                    className="text-xs font-semibold text-[#173D35] hover:underline"
                  >
                    Schedule with {t.fullName.split(' ')[0]} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ethical Code & Standards */}
      <div className="bg-[#EFEDE4]/50 border border-[#D1DDD0] rounded-2xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <Award className="w-8 h-8 text-[#B99A64] mx-auto" />
          <h3 className="text-2xl font-editorial font-bold text-[#173D35]">
            Ethical Commitments & Governance
          </h3>
          <p className="text-xs text-[#5C6764]">
            Governed by statutory psychological ethics frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#242B29] max-w-5xl mx-auto">
          <div className="bg-white p-5 rounded-lg border border-[#D1DDD0] space-y-2">
            <h5 className="font-semibold text-[#173D35] text-sm">Non-Maleficence & Dignity</h5>
            <p className="text-[#5C6764] leading-relaxed">
              We pledge unconditional positive regard and safety. Clients are treated as autonomous partners in formulating their therapeutic destiny.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-[#D1DDD0] space-y-2">
            <h5 className="font-semibold text-[#173D35] text-sm">Evidence-Informed Practice</h5>
            <p className="text-[#5C6764] leading-relaxed">
              We employ interventions rooted in empirical psychological science (CBT, ACT, EFT, Polyvagal theory) without pseudoscience or unvalidated fads.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg border border-[#D1DDD0] space-y-2">
            <h5 className="font-semibold text-[#173D35] text-sm">Data & Record Isolation</h5>
            <p className="text-[#5C6764] leading-relaxed">
              Session formulations and intake disclosures are stored behind role-restricted, end-to-end encrypted databases.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
