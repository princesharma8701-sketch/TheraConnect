import React, { useState } from 'react';
import { Phone, AlertCircle, X } from 'lucide-react';

export const CrisisBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#173D35] text-[#EFEDE4] px-4 py-2.5 text-xs sm:text-sm border-b border-[#205046]/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="flex items-center gap-1.5 font-medium text-[#DFC9A0] shrink-0">
            <AlertCircle className="w-4 h-4 text-[#DFC9A0]" />
            Immediate Crisis Support:
          </span>
          <span className="text-[#EFEDE4]/90">
            If you are in immediate distress or having thoughts of self-harm, please reach out to 24/7 helplines:
          </span>
          <span className="inline-flex items-center gap-2 font-mono-numbers font-medium text-[#FFFFFF]">
            <a href="tel:988" className="underline hover:text-[#DFC9A0] transition-colors">988 (USA/CAN)</a>
            <span className="text-[#A8B9A3]">·</span>
            <a href="tel:14416" className="underline hover:text-[#DFC9A0] transition-colors">Tele-MANAS: 14416 (India)</a>
            <span className="text-[#A8B9A3]">·</span>
            <a href="tel:9999666555" className="underline hover:text-[#DFC9A0] transition-colors">Vandrevala: +91 9999 666 555</a>
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#EFEDE4]/70 hover:text-white transition-colors p-1 shrink-0"
          title="Dismiss crisis banner"
          aria-label="Dismiss crisis notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
