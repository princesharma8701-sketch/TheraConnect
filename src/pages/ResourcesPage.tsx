import React, { useState } from 'react';
import { Download, Sparkles, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { TheraConnectStore } from '../services/store';
import { GroundingWidget } from '../components/GroundingWidget';

export const ResourcesPage: React.FC = () => {
  const resources = TheraConnectStore.getResources();

  // Interactive CBT Thought Log Generator State
  const [situation, setSituation] = useState('');
  const [automaticThought, setAutomaticThought] = useState('');
  const [distortion, setDistortion] = useState('Catastrophizing (Magnification)');
  const [rationalResponse, setRationalResponse] = useState('');
  const [generatedLog, setGeneratedLog] = useState<{ situation: string; thought: string; distortion: string; rational: string } | null>(null);

  const cognitiveDistortions = [
    'Catastrophizing (Magnification)',
    'All-or-Nothing / Black-and-White Thinking',
    'Emotional Reasoning ("I feel anxious, therefore danger exists")',
    'Mind Reading / Jumping to Conclusions',
    'Disqualifying the Positive',
    'Overgeneralization'
  ];

  const handleGenerateLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation || !automaticThought || !rationalResponse) return;
    setGeneratedLog({
      situation,
      thought: automaticThought,
      distortion,
      rational: rationalResponse
    });
  };

  const handleDownloadLog = () => {
    if (!generatedLog) return;
    const text = `THERACONNECT CLINICAL WORKSHEET: CBT THOUGHT RECORD
Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

1. SITUATION / TRIGGER:
${generatedLog.situation}

2. AUTOMATIC NEGATIVE THOUGHT (ANT):
${generatedLog.thought}

3. COGNITIVE DISTORTION IDENTIFIED:
${generatedLog.distortion}

4. BALANCED RATIONAL REFRAME:
${generatedLog.rational}

-----------------------------------------------------
TheraConnect Mental Health Institute | www.theraconnect.com`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CBT-Thought-Log-${Date.now().toString(36)}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          Clinical Worksheets & Instruments
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#173D35] tracking-tight">
          Evidence-Based Self-Regulation Tools
        </h1>
        <p className="text-sm sm:text-base text-[#5C6764] leading-relaxed">
          Therapeutic growth happens not only during your 50-minute clinical sessions, but through daily psychological awareness. Explore our interactive tools and downloadable clinical resources.
        </p>
      </div>

      {/* SECTION 1: INTERACTIVE SOMATIC GROUNDING */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono uppercase text-[#B99A64]">Tool 01 / Nervous System Regulation</span>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#173D35]">
            The 5-4-3-2-1 Sensory Grounding Practice
          </h2>
          <p className="text-xs text-[#5C6764]">Follow the steps to guide your autonomic nervous system from sympathetic arousal into parasympathetic calm.</p>
        </div>
        <GroundingWidget />
      </div>

      {/* SECTION 2: INTERACTIVE CBT THOUGHT RECORD GENERATOR */}
      <div className="bg-white border border-[#D1DDD0] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8 max-w-4xl mx-auto">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono uppercase text-[#B99A64]">
            <Sparkles className="w-4 h-4" />
            <span>Tool 02 / Cognitive Restructuring</span>
          </div>
          <h3 className="text-2xl font-editorial font-bold text-[#173D35]">
            Interactive CBT Cognitive Restructuring Record
          </h3>
          <p className="text-xs sm:text-sm text-[#5C6764]">
            When an automatic thought triggers anxious panic or sadness, write it down, identify its cognitive distortion, and formulate a realistic reframe.
          </p>
        </div>

        <form onSubmit={handleGenerateLog} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                1. Activating Event / Situation *
              </label>
              <input
                type="text"
                required
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="e.g. My manager scheduled an unexpected meeting tomorrow"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                2. Automatic Negative Thought (ANT) *
              </label>
              <input
                type="text"
                required
                value={automaticThought}
                onChange={(e) => setAutomaticThought(e.target.value)}
                placeholder="e.g. 'I am going to be fired and I will lose everything'"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              3. Identify Cognitive Distortion Pattern
            </label>
            <select
              value={distortion}
              onChange={(e) => setDistortion(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35] bg-white"
            >
              {cognitiveDistortions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              4. Evidence-Based Rational Reframe *
            </label>
            <textarea
              rows={2}
              required
              value={rationalResponse}
              onChange={(e) => setRationalResponse(e.target.value)}
              placeholder="e.g. 'An unscheduled meeting does not automatically equal termination. My recent performance review was positive, and I have handled difficult meetings before.'"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors"
          >
            Generate Structured Reframe
          </button>
        </form>

        {generatedLog && (
          <div className="p-6 bg-[#EFEDE4]/60 border border-[#D1DDD0] rounded-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#D1DDD0]">
              <span className="text-xs font-semibold text-[#173D35] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Balanced CBT Formulation Ready
              </span>
              <button
                onClick={handleDownloadLog}
                className="text-xs text-[#173D35] font-medium flex items-center gap-1 hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Summary</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#5C6764] block">Initial Emotion & Distortion:</span>
                <span className="font-semibold text-red-900">{generatedLog.distortion}</span>
              </div>
              <div>
                <span className="text-[#5C6764] block">Balanced Clinical Truth:</span>
                <span className="font-medium text-[#173D35] italic">"{generatedLog.rational}"</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: DOWNLOADABLE CLINICAL HANDBOOKS */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono uppercase text-[#B99A64]">Downloadable PDF Library</span>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-[#173D35]">
            Clinical Handbooks & Protocols
          </h2>
          <p className="text-xs text-[#5C6764]">Free, printable therapeutic worksheets designed by TheraConnect clinical psychologists.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-white border border-[#D1DDD0] p-6 rounded-xl flex flex-col justify-between shadow-xs hover:border-[#173D35] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5C6764]">
                  <span className="font-mono">{res.fileFormat}</span>
                  <span className="font-mono-numbers">{res.fileSize}</span>
                </div>
                <h4 className="text-lg font-editorial font-bold text-[#173D35]">
                  {res.title}
                </h4>
                <p className="text-xs text-[#5C6764] leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono-numbers text-slate-400">
                  {res.downloadCount} downloads
                </span>
                <button
                  onClick={() => {
                    TheraConnectStore.incrementResourceDownload(res.id);
                    alert(`Starting download for "${res.title}"...`);
                  }}
                  className="px-3.5 py-1.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
