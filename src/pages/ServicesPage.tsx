import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { TheraConnectStore } from '../services/store';
import { Service } from '../types';

interface ServicesPageProps {
  onSelectBooking: (serviceId: string) => void;
  onOpenServiceModal: (service: Service) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectBooking,
  onOpenServiceModal
}) => {
  const services = TheraConnectStore.getServices();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          Clinical Offerings
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#173D35] tracking-tight">
          Specialised Psychotherapy & Counselling
        </h1>
        <p className="text-sm sm:text-base text-[#5C6764] leading-relaxed">
          Every human mind is unique. Our clinical programs combine established therapeutic modalities—such as Cognitive Behavioural Therapy (CBT), Acceptance and Commitment Therapy (ACT), and Emotionally Focused Therapy (EFT)—tailored to your circumstances.
        </p>
      </div>

      {/* Services Grid with Asymmetric Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.map((svc, idx) => (
          <div
            key={svc.id}
            className="bg-white border border-[#D1DDD0] rounded-xl p-8 flex flex-col justify-between shadow-xs hover:border-[#173D35] transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#B99A64]">
                  CLINICAL PROGRAM 0{idx + 1}
                </span>
                <span className="text-sm font-mono-numbers font-bold text-[#173D35]">
                  ₹{svc.priceAmount.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">/ session</span>
                </span>
              </div>

              <h3 className="text-2xl font-editorial font-bold text-[#173D35]">
                {svc.title}
              </h3>

              <p className="text-sm font-medium text-[#173D35]/80">
                {svc.shortTagline}
              </p>

              <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
                {svc.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono uppercase text-[#5C6764] tracking-wider">
                  Therapeutic Frameworks
                </div>
                <div className="flex flex-wrap gap-2">
                  {svc.clinicalFocus.map((focus) => (
                    <span
                      key={focus}
                      className="px-2.5 py-1 bg-[#EFEDE4] text-xs font-medium text-[#173D35] rounded-md"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#5C6764]">
                <Clock className="w-4 h-4 text-[#A8B9A3]" />
                <span className="font-mono-numbers">{svc.durationMinutes} Minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenServiceModal(svc)}
                  className="text-xs font-medium text-[#5C6764] hover:text-[#173D35]"
                >
                  Clinical Syllabi
                </button>
                <button
                  onClick={() => onSelectBooking(svc.id)}
                  className="px-4 py-2 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Ethics Callout */}
      <div className="bg-[#EFEDE4]/60 border border-[#D1DDD0] rounded-xl p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
        <div className="w-14 h-14 rounded-full bg-[#173D35] text-[#DFC9A0] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-editorial font-bold text-[#173D35]">
            Individualized Clinical Intake & Formulation
          </h4>
          <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
            Not sure which clinical stream fits your needs? Reserve a general consultation. Your clinical psychologist will assess your symptoms and construct a tailored therapeutic roadmap.
          </p>
        </div>
        <button
          onClick={() => onSelectBooking(services[0]?.id || '')}
          className="px-5 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md shrink-0 whitespace-nowrap transition-colors"
        >
          Book Initial Intake
        </button>
      </div>

    </div>
  );
};
