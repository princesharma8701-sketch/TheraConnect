import React from 'react';
import { X, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectBooking: (serviceId: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  isOpen,
  onClose,
  onSelectBooking
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#F8F7F2] rounded-xl shadow-2xl border border-[#D1DDD0] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#173D35] px-6 py-5 text-white flex items-start justify-between">
          <div className="space-y-1 pr-6">
            <span className="text-xs uppercase font-mono text-[#DFC9A0] tracking-wider">
              Clinical Specialisation
            </span>
            <h3 className="text-2xl font-editorial font-bold text-white leading-tight">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#DCE5D9]">
              {service.shortTagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-full transition-colors shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#5C6764] font-semibold mb-2">
              Clinical Description & Scope
            </h4>
            <p className="text-sm text-[#242B29] leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Evidence-informed frameworks */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#5C6764] font-semibold mb-2.5">
              Therapeutic Methodologies & Modalities
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.clinicalFocus.map((focus) => (
                <span
                  key={focus}
                  className="px-3 py-1 bg-[#EFEDE4] border border-[#D1DDD0] text-xs font-medium text-[#173D35] rounded-md"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          {/* Session Parameters */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-white border border-[#D1DDD0]/80 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[#EFEDE4] text-[#173D35] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-[#5C6764]">Session Length</div>
                <div className="text-sm font-semibold text-[#173D35] font-mono-numbers">
                  {service.durationMinutes} Minutes
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-[#EFEDE4] text-[#173D35] flex items-center justify-center shrink-0">
                <span className="font-editorial text-sm font-bold text-[#173D35]">₹</span>
              </div>
              <div>
                <div className="text-[11px] text-[#5C6764]">Consultation Fee</div>
                <div className="text-sm font-semibold text-[#173D35] font-mono-numbers">
                  ₹{service.priceAmount.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">INR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Guarantee / What's Included */}
          <div className="space-y-2 text-xs text-[#242B29]/90">
            <h4 className="text-xs uppercase tracking-wider text-[#5C6764] font-semibold mb-2">
              Every Consultation Includes:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Strict statutory therapist-patient confidentiality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Encrypted HD telehealth video or clinic suite</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Tailored psychoeducational worksheets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Official clinical receipt with license number</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#EFEDE4]/80 px-6 py-4 border-t border-[#D1DDD0] flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-[#5C6764] hover:text-[#173D35] font-medium transition-colors"
          >
            Back to Services
          </button>
          <button
            onClick={() => {
              onClose();
              onSelectBooking(service.id);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs sm:text-sm font-medium rounded-md shadow-xs transition-colors"
          >
            <span>Book This Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
