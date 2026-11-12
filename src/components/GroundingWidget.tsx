import React, { useState } from 'react';
import { Eye, Hand, Ear, Wind, Heart, RotateCcw, Check, Sparkles } from 'lucide-react';

export const GroundingWidget: React.FC = () => {
  const steps = [
    {
      count: 5,
      sense: "Sight",
      instruction: "Look around you and observe 5 things you can see.",
      subtext: "Notice the pattern on the wall, the way light hits the floor, a shadow, an object on your desk.",
      icon: Eye,
      itemsDefault: ["", "", "", "", ""]
    },
    {
      count: 4,
      sense: "Touch",
      instruction: "Notice 4 things you can physically feel right now.",
      subtext: "The texture of your clothes, the temperature of the air on your hands, your feet grounded on the floor.",
      icon: Hand,
      itemsDefault: ["", "", "", ""]
    },
    {
      count: 3,
      sense: "Hearing",
      instruction: "Listen for 3 distinct sounds in your environment.",
      subtext: "A distant vehicle, the hum of a computer fan, birds outside, or your own slow breath.",
      icon: Ear,
      itemsDefault: ["", "", ""]
    },
    {
      count: 2,
      sense: "Smell",
      instruction: "Identify 2 things you can smell or scents you find comforting.",
      subtext: "Fresh morning air, coffee, rain, wool, or eucalyptus essential oil.",
      icon: Wind,
      itemsDefault: ["", ""]
    },
    {
      count: 1,
      sense: "Heart & Taste",
      instruction: "Acknowledge 1 positive truth or taste something grounding.",
      subtext: "For instance: 'In this present second, my body is safe and I am breathing steadily.'",
      icon: Heart,
      itemsDefault: [""]
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = steps[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompleted(false);
  };

  return (
    <div className="bg-[#EFEDE4]/60 border border-[#D1DDD0] rounded-xl p-6 sm:p-8 max-w-xl mx-auto shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-[#D1DDD0]/70 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B99A64]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#173D35]">
            Interactive Somatic Tool
          </span>
        </div>
        <span className="text-xs font-mono text-[#5C6764]">
          {completed ? 'Complete' : `Step ${currentStep + 1} of 5`}
        </span>
      </div>

      {!completed ? (
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#173D35] text-[#EFEDE4] flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-[#DFC9A0]" />
            </div>
            <div>
              <div className="text-xs text-[#5C6764] uppercase font-mono tracking-wider">
                {step.count} Things for {step.sense}
              </div>
              <h4 className="text-lg font-editorial font-bold text-[#173D35] mt-0.5">
                {step.instruction}
              </h4>
              <p className="text-xs sm:text-sm text-[#242B29]/80 mt-1 leading-relaxed">
                {step.subtext}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#D1DDD0]/50 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#173D35] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleReset}
              className="text-xs text-[#5C6764] hover:text-[#173D35] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
            >
              <span>{currentStep === steps.length - 1 ? 'Complete Exercise' : 'Next Grounding Step'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-editorial font-bold text-[#173D35]">
            Nervous System Centered
          </h4>
          <p className="text-sm text-[#242B29]/80 max-w-sm mx-auto leading-relaxed">
            Take a slow deep inhalation through your nose, hold gently for four seconds, and release a soft sigh through your mouth. Your physiology has received evidence of safety.
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2 bg-[#173D35] text-white text-xs font-medium rounded-md hover:bg-[#0E2722] transition-colors"
          >
            Practice Again
          </button>
        </div>
      )}
    </div>
  );
};
