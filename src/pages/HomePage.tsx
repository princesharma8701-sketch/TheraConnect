import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  ArrowRight,
  Heart,
  ChevronDown,
  Clock,
  CheckCircle2,
  Lock,
  Download,
  Users,
  Brain,
  Sparkles,
  FileText
} from 'lucide-react';
import { TheraConnectStore } from '../services/store';
import { Service } from '../types';
import { GroundingWidget } from '../components/GroundingWidget';

interface HomePageProps {
  onNavigate: (tab: string, serviceId?: string) => void;
  onOpenServiceModal: (service: Service) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenServiceModal }) => {
  const services = TheraConnectStore.getServices();
  const therapists = TheraConnectStore.getTherapists();
  const testimonials = TheraConnectStore.getTestimonials();
  const resources = TheraConnectStore.getResources();
  const blogPosts = TheraConnectStore.getBlogPosts();

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    const res = TheraConnectStore.addSubscriber(newsletterEmail, 'home_cta');
    setNewsletterMsg(res.message);
    if (res.success) setNewsletterEmail('');
    setTimeout(() => setNewsletterMsg(null), 5000);
  };

  const faqs = [
    {
      q: "How does the first psychotherapy intake consultation work?",
      a: "The inaugural 50-minute clinical consultation is a collaborative, paced exploration. Your licensed therapist reviews your presenting concerns, developmental history, and personal therapy goals in a safe, non-judgmental environment. You are never pressured to discuss matters you are not yet ready to share."
    },
    {
      q: "Are my sessions, intake notes, and disclosures completely confidential?",
      a: "Yes. TheraConnect adheres strictly to statutory professional confidentiality and HIPAA-grade data protection guidelines. Disclosures are legally protected and cannot be shared with third parties, employers, or family members without your explicit written authorization, barring acute emergency safety mandates."
    },
    {
      q: "Can I receive clinical receipts for corporate insurance reimbursement?",
      a: "Yes. Following each completed appointment, you receive an itemized clinical receipt containing your clinician's professional registration credentials (e.g. RCI / BPS license numbers) for direct reimbursement submission with insurance carriers."
    },
    {
      q: "What is the difference between clinical psychotherapy and psychiatry?",
      a: "Clinical psychotherapy addresses cognitive, emotional, behavioral, and relational patterns through talk therapy and somatic recalibration without pharmacological intervention. If your formulation indicates benefit from medication, we provide collaborative referrals to trusted psychiatric physicians."
    },
    {
      q: "Can I switch between online video teletherapy and in-clinic sessions?",
      a: "Absolutely. Our hybrid care framework allows you to attend sessions at our peaceful New Delhi clinical sanctuary or connect via our end-to-end encrypted video platform when traveling or preferring the comfort of your home."
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* 02. HERO SECTION - SOPHISTICATED SPLIT-SCREEN EDITORIAL */}
      <section className="pt-6 sm:pt-12 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Side: Editorial Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Small uppercase label */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B99A64]">
              <span>Mental Wellness</span>
              <span className="text-[#A8B9A3]">·</span>
              <span>Professional Care</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-bold text-[#173D35] leading-[1.08] tracking-tight">
              Your Mental Wellbeing Deserves Thoughtful Care.
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-[#5C6764] max-w-xl leading-relaxed">
              Discover a more compassionate approach to mental wellness through personalised therapy, professional guidance and a safe space to grow.
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('booking')}
                className="px-6 py-3.5 bg-[#173D35] hover:bg-[#0E2722] active:scale-[0.98] text-white text-sm font-medium rounded-md shadow-xs transition-all flex items-center gap-2"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#DFC9A0]" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3.5 bg-[#EFEDE4] hover:bg-[#D1DDD0] text-[#173D35] text-sm font-medium rounded-md transition-all"
              >
                Explore Our Services
              </button>
            </div>

            {/* Trust-oriented supporting line */}
            <div className="pt-3 text-xs text-[#5C6764] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A8B9A3] shrink-0" />
              <span>Confidential clinical consultations led by licensed clinical psychologists.</span>
            </div>

          </div>

          {/* Right Side: Natural High-Quality Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D1DDD0] shadow-xl bg-white aspect-[4/3] lg:aspect-[3/4]">
              <img
                src="/src/assets/images/hero_therapy_consultation_1794478627706.jpg"
                alt="TheraConnect tranquil therapy sanctuary"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs p-3 bg-black/40 backdrop-blur-md rounded-lg border border-white/20">
                <span className="font-semibold block text-white/95">Consultation Sanctuary Suite</span>
                <span className="text-white/80 text-[11px]">Designed for emotional safety, privacy, and calm reflection.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Refined Trust Strip Below Hero */}
        <div className="mt-14 pt-8 border-t border-[#D1DDD0]/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-xs uppercase font-mono tracking-wider text-[#B99A64]">01 / Ethics</div>
            <div className="text-sm font-semibold text-[#173D35]">Confidential Care</div>
            <p className="text-xs text-[#5C6764]">Strict statutory privacy protocols</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase font-mono tracking-wider text-[#B99A64]">02 / Standards</div>
            <div className="text-sm font-semibold text-[#173D35]">Professional Guidance</div>
            <p className="text-xs text-[#5C6764]">Licensed, accredited clinicians</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase font-mono tracking-wider text-[#B99A64]">03 / Formulation</div>
            <div className="text-sm font-semibold text-[#173D35]">Personalised Sessions</div>
            <p className="text-xs text-[#5C6764]">Tailored evidence-based plans</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs uppercase font-mono tracking-wider text-[#B99A64]">04 / Flexibility</div>
            <div className="text-sm font-semibold text-[#173D35]">Online Accessibility</div>
            <p className="text-xs text-[#5C6764]">Encrypted teletherapy worldwide</p>
          </div>
        </div>

      </section>

      {/* 03. INTRODUCTION SECTION: "Care that begins with understanding." */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-block text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          Clinical Philosophy
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-[#173D35] leading-tight">
          "Care that begins with understanding."
        </h2>
        <p className="text-base sm:text-lg text-[#5C6764] leading-relaxed max-w-2xl mx-auto font-light">
          We believe healing cannot be rushed or standardized. Mental healthcare is an intimate human endeavor combining scientific rigor with profound empathy. Our clinical focus centers on honoring your unique lived experience while equipping you with durable tools for psychological flourishing.
        </p>
      </section>

      {/* 04. ABOUT THE THERAPIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFEDE4]/60 border border-[#D1DDD0] rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#D1DDD0] shadow-md aspect-[3/4] max-w-sm mx-auto">
                <img
                  src="/src/assets/images/therapist_portrait_clinical_1794478628756.jpg"
                  alt="Dr. Elena Vance, Clinical Director"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
                Meet Our Clinical Director
              </div>
              <h3 className="text-3xl font-editorial font-bold text-[#173D35]">
                Dr. Elena Vance, Ph.D.
              </h3>
              <div className="text-xs text-[#5C6764] font-mono">
                Licensed Clinical Psychologist · RCI Registration: PSY-2016-4192
              </div>
              <p className="text-sm text-[#242B29] leading-relaxed">
                With over a decade of clinical practice across inpatient tertiary hospitals and outpatient psychotherapy institutes, Dr. Vance founded TheraConnect to bridge clinical depth with warmth and dignity. Her work integrates Cognitive Behavioural Therapy (CBT), Acceptance and Commitment Therapy (ACT), and psychodynamic reflection.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3 bg-white border border-[#D1DDD0] rounded-lg">
                  <div className="font-semibold text-[#173D35]">Academic Qualifications</div>
                  <div className="text-[#5C6764] mt-0.5">Ph.D. in Clinical Psychology, M.Phil in Medical & Social Psychology</div>
                </div>
                <div className="p-3 bg-white border border-[#D1DDD0] rounded-lg">
                  <div className="font-semibold text-[#173D35]">Specialist Focus</div>
                  <div className="text-[#5C6764] mt-0.5">Anxiety disorders, executive burnout, trauma integration, grief</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#173D35] hover:underline"
                >
                  <span>Read full clinical biography & methodology</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 05. OUR APPROACH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
            Methodology & Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#173D35]">
            A Compassionate, Evidence-Informed Framework
          </h2>
          <p className="text-sm text-[#5C6764]">
            How we translate psychological science into restorative daily practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-[#D1DDD0] p-8 rounded-xl space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-md bg-[#EFEDE4] text-[#173D35] flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#B99A64]" />
            </div>
            <h4 className="text-xl font-editorial font-bold text-[#173D35]">
              Empathetic Attunement
            </h4>
            <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
              Therapy is not an advice column; it is a relational sanctuary. We listen with clinical precision to help you illuminate implicit beliefs and emotional burdens in an atmosphere of unconditional respect.
            </p>
          </div>

          <div className="bg-white border border-[#D1DDD0] p-8 rounded-xl space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-md bg-[#EFEDE4] text-[#173D35] flex items-center justify-center">
              <Brain className="w-5 h-5 text-[#B99A64]" />
            </div>
            <h4 className="text-xl font-editorial font-bold text-[#173D35]">
              Neurobiological Safety
            </h4>
            <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
              We integrate nervous system regulation, somatic grounding, and cognitive reframing so your physiological baseline calms before challenging long-standing psychological patterns.
            </p>
          </div>

          <div className="bg-white border border-[#D1DDD0] p-8 rounded-xl space-y-4 shadow-xs">
            <div className="w-10 h-10 rounded-md bg-[#EFEDE4] text-[#173D35] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#B99A64]" />
            </div>
            <h4 className="text-xl font-editorial font-bold text-[#173D35]">
              Total Privacy Guarantee
            </h4>
            <p className="text-xs sm:text-sm text-[#5C6764] leading-relaxed">
              Your clinical documentation is strictly encrypted and protected. We operate on a foundation of ethical confidentiality, ensuring your therapeutic journey remains solely yours.
            </p>
          </div>
        </div>
      </section>

      {/* 06. THERAPY SERVICES (Editorial layout for 6 services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
              Comprehensive Care
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#173D35]">
              Specialised Clinical Services
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-semibold text-[#173D35] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>View detailed clinical syllabi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className="bg-white border border-[#D1DDD0] rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#173D35] transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5C6764]">
                  <span className="font-mono">0{i + 1}</span>
                  <span className="font-mono-numbers font-semibold text-[#173D35]">₹{svc.priceAmount} INR</span>
                </div>
                <h4 className="text-xl font-editorial font-bold text-[#173D35] group-hover:text-[#0E2722] transition-colors">
                  {svc.title}
                </h4>
                <p className="text-xs text-[#5C6764] leading-relaxed">
                  {svc.shortTagline}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {svc.clinicalFocus.slice(0, 2).map((focus) => (
                    <span
                      key={focus}
                      className="px-2.5 py-0.5 bg-[#EFEDE4] text-[11px] text-[#173D35] rounded font-medium"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onOpenServiceModal(svc)}
                  className="text-[#5C6764] hover:text-[#173D35] font-medium"
                >
                  Clinical Details
                </button>
                <button
                  onClick={() => onNavigate('booking', svc.id)}
                  className="px-3.5 py-1.5 bg-[#173D35] hover:bg-[#0E2722] text-white font-medium rounded transition-colors"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 07. WHY THERACONNECT (Bento Editorial Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#EFEDE4]/40 border border-[#D1DDD0] rounded-2xl p-8 sm:p-12">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
              Distinction & Quality
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#173D35]">
              Why Discerning Clients Choose TheraConnect
            </h2>
            <p className="text-sm text-[#5C6764] leading-relaxed">
              We refuse to operate as a high-volume, impersonal algorithm matching service. Every client is assigned to a credentialed clinical psychologist with dedicated supervisory oversight and continuing education.
            </p>

            <div className="space-y-3.5 text-xs text-[#242B29]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#173D35] shrink-0 mt-0.5" />
                <div>
                  <strong>Protected 50-Minute Hours:</strong> Full therapeutic sessions without rushed timers or fragmented attention.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#173D35] shrink-0 mt-0.5" />
                <div>
                  <strong>Integrated Psychoeducational Tools:</strong> Access our clinical worksheets, sleep architectures, and grounding tools between sessions.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#173D35] shrink-0 mt-0.5" />
                <div>
                  <strong>Simplified Transparent Booking:</strong> Real-time availability, clear session costs, and zero hidden cancellation traps.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="px-6 py-3 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors"
              >
                Schedule an Appointment
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden border border-[#D1DDD0] shadow-lg">
              <img
                src="/src/assets/images/wellness_peaceful_sanctuary_1794478629321.jpg"
                alt="TheraConnect tranquil garden pavilion"
                referrerPolicy="no-referrer"
                className="w-full h-80 lg:h-96 object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 08. HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
            Your Clinical Pathway
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#173D35]">
            How It Works: Four Thoughtful Steps
          </h2>
          <p className="text-sm text-[#5C6764]">
            From your first inquiry to ongoing therapeutic progress.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Discover', desc: 'Browse our specialized services and learn about our evidence-informed clinical approaches.' },
            { step: '02', title: 'Connect', desc: 'Select your preferred licensed clinical psychologist and convenient consultation time slot.' },
            { step: '03', title: 'Book & Intake', desc: 'Complete our confidential client intake form, sign informed consent, and confirm securely.' },
            { step: '04', title: 'Begin Journey', desc: 'Join your private video room or visit our clinic suite to begin meaningful change.' }
          ].map((item) => (
            <div key={item.step} className="bg-white border border-[#D1DDD0] p-6 rounded-xl space-y-3 shadow-xs">
              <div className="text-xs font-mono font-bold text-[#B99A64]">{item.step}</div>
              <h4 className="text-lg font-editorial font-bold text-[#173D35]">{item.title}</h4>
              <p className="text-xs text-[#5C6764] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 09. FEATURED RESOURCES & INTERACTIVE GROUNDING TOOL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
            Self-Regulation & Psychoeducation
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#173D35]">
            Therapeutic Tools & Clinical Worksheets
          </h2>
          <p className="text-sm text-[#5C6764]">
            Evidence-based instruments you can engage with immediately or download for your personal reflection.
          </p>
        </div>

        {/* Interactive Grounding Tool Showcase */}
        <GroundingWidget />

        {/* Downloadable worksheets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-white border border-[#D1DDD0] p-5 rounded-lg flex flex-col justify-between shadow-xs hover:border-[#173D35] transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#5C6764]">
                  <span className="font-mono uppercase">{res.fileFormat}</span>
                  <span className="font-mono-numbers">{res.fileSize}</span>
                </div>
                <h4 className="text-base font-editorial font-bold text-[#173D35]">
                  {res.title}
                </h4>
                <p className="text-xs text-[#5C6764] line-clamp-2">
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
                    alert(`Downloading "${res.title}" (${res.fileFormat})`);
                  }}
                  className="px-3 py-1 bg-[#EFEDE4] hover:bg-[#D1DDD0] text-[#173D35] text-xs font-medium rounded transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. TESTIMONIALS (With ethical demo disclaimer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
            Client Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#173D35]">
            Voices of Healing & Growth
          </h2>
          <p className="text-xs text-[#5C6764] italic">
            *In accordance with clinical healthcare ethics and patient data protection, client initials and composite case reflections are presented to safeguard confidentiality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#D1DDD0] p-7 rounded-xl flex flex-col justify-between shadow-xs space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5C6764]">
                  <span className="font-mono font-bold text-[#173D35]">{t.clientInitials}</span>
                  <span className="text-[11px] uppercase tracking-wider bg-[#EFEDE4] px-2 py-0.5 rounded text-[#5C6764]">
                    Demo Case
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#242B29] leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-[#5C6764] flex justify-between">
                <span>{t.serviceName}</span>
                <span>{t.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
            Clarity & Guidance
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#173D35]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-white border border-[#D1DDD0] rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#EFEDE4]/30 transition-colors"
                >
                  <span className="font-editorial text-base sm:text-lg font-bold text-[#173D35]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#173D35] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C6764] leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. CONSULTATION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#173D35] text-white rounded-2xl p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[#DFC9A0]">
              Take The Next Step
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-white leading-tight">
              Taking the first step can change everything.
            </h2>
            <p className="text-sm sm:text-base text-[#DCE5D9] leading-relaxed">
              Begin with a gentle, confidential consultation. Our licensed therapists are ready to accompany your journey with thoughtfulness and respect.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('booking')}
                className="px-8 py-3.5 bg-[#B99A64] hover:bg-[#DFC9A0] text-[#173D35] text-sm font-semibold rounded-md shadow-xs transition-colors"
              >
                Book Your Consultation
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-[#205046] hover:bg-[#205046]/80 text-white text-sm font-medium rounded-md transition-colors"
              >
                Inquire with Clinic Staff
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. NEWSLETTER SECTION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
          Clinical Bulletin
        </div>
        <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-[#173D35]">
          Stay Informed on Mental Health Science
        </h3>
        <p className="text-xs sm:text-sm text-[#5C6764] max-w-md mx-auto">
          Read our monthly synthesis of psychiatric neuroscience, nervous system regulation exercises, and psychological research.
        </p>

        <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2 pt-2">
          <input
            type="email"
            required
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-2.5 text-xs bg-white border border-[#D1DDD0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors shrink-0"
          >
            Subscribe
          </button>
        </form>
        {newsletterMsg && (
          <p className="text-xs text-[#173D35] font-medium">{newsletterMsg}</p>
        )}
      </section>

    </div>
  );
};
