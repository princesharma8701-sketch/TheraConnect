import React from 'react';
import { HeartHandshake, ShieldCheck } from 'lucide-react';
import { TheraConnectStore } from '../services/store';

interface TestimonialsPageProps {
  onNavigateBooking: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onNavigateBooking }) => {
  const testimonials = TheraConnectStore.getTestimonials();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          Reflections On Care
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#173D35] tracking-tight">
          Client Experiences & Journeys
        </h1>
        <p className="text-sm text-[#5C6764] leading-relaxed">
          Hearing how other individuals navigated vulnerability, chronic worry, and relational fractures can reassure you that healing is attainable.
        </p>
        <div className="pt-2">
          <span className="inline-block text-xs text-[#5C6764] italic bg-[#EFEDE4] px-3.5 py-1.5 rounded border border-[#D1DDD0]">
            Clinical Ethics Note: In compliance with psychological healthcare privacy rules, client initials are anonymized and composite narratives are presented for educational/demo purposes.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-[#D1DDD0] rounded-xl p-8 flex flex-col justify-between shadow-xs space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-lg text-[#173D35]">{t.clientInitials}</span>
                <span className="text-[11px] font-mono text-[#B99A64] bg-[#EFEDE4] px-2 py-0.5 rounded">
                  Verified Client
                </span>
              </div>
              <p className="text-sm text-[#242B29] leading-relaxed font-light italic">
                "{t.content}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-[#5C6764] space-y-0.5">
              <div className="font-semibold text-[#173D35]">{t.serviceName}</div>
              <div className="font-mono text-[11px] text-[#A8B9A3]">{t.duration}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <button
          onClick={onNavigateBooking}
          className="px-8 py-3.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs sm:text-sm font-medium rounded-md transition-colors"
        >
          Begin Your Own Therapeutic Journey
        </button>
      </div>

    </div>
  );
};
