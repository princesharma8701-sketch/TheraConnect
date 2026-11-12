import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  Video,
  MapPin,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  ArrowLeft,
  Download,
  CalendarCheck
} from 'lucide-react';
import { TheraConnectStore } from '../services/store';
import { Service, AdminUser, Modality, Appointment } from '../types';
import { RazorpayModal } from '../components/RazorpayModal';

interface BookingPageProps {
  initialServiceId?: string;
  onBookingComplete?: (appointment: Appointment) => void;
  onNavigateHome?: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialServiceId,
  onBookingComplete,
  onNavigateHome
}) => {
  const services = TheraConnectStore.getServices();
  const therapists = TheraConnectStore.getTherapists();
  const settings = TheraConnectStore.getSettings();

  // Mode: direct scheduler vs Calendly embed
  const [bookingMode, setBookingMode] = useState<'direct' | 'calendly'>('direct');

  // Step flow: 1: Service & Modality, 2: Therapist & Slot, 3: Client Info & Intake, 4: Payment / Confirmation
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || services[0]?.id || '');
  const [modality, setModality] = useState<Modality>('ONLINE_VIDEO');
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>(therapists[0]?.id || '');
  
  // Date & Slot selection
  const today = new Date();
  const dates = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(dates[0].iso);
  const timeSlots = [
    '10:00 AM - 10:50 AM',
    '11:30 AM - 12:20 PM',
    '02:00 PM - 02:50 PM',
    '03:30 PM - 04:20 PM',
    '05:00 PM - 05:50 PM',
    '06:30 PM - 07:20 PM'
  ];
  const [selectedSlot, setSelectedSlot] = useState<string>(timeSlots[0]);

  // Client Details & Clinical Intake
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [presentingConcerns, setPresentingConcerns] = useState('');
  const [previousTherapy, setPreviousTherapy] = useState('');
  const [symptomSeverity, setSymptomSeverity] = useState<number>(3);
  const [safetyCrisisResponse, setSafetyCrisisResponse] = useState<boolean>(false);
  const [consentAgreed, setConsentAgreed] = useState<boolean>(false);
  const [signatureName, setSignatureName] = useState<string>('');

  // Payment / Razorpay
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];
  const selectedTherapist = therapists.find(t => t.id === selectedTherapistId) || therapists[0];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      setValidationError('Please complete your name, email, and primary telephone number.');
      return;
    }

    if (!consentAgreed) {
      setValidationError('You must acknowledge and accept the clinical consent and confidentiality policies to proceed.');
      return;
    }

    if (!signatureName.trim()) {
      setValidationError('Please provide your typed legal name as your digital consent signature.');
      return;
    }

    // Open Razorpay Checkout Modal
    setIsRazorpayOpen(true);
  };

  // Called when payment succeeds (or demo checkout succeeds)
  const handlePaymentSuccess = (paymentDetails: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    method: string;
  }) => {
    setIsRazorpayOpen(false);

    // 1. Create Appointment
    const newAppointment = TheraConnectStore.createAppointment({
      clientId: `cli-${Date.now()}`,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      therapistId: selectedTherapist.id,
      therapistName: selectedTherapist.fullName,
      status: 'CONFIRMED',
      modality,
      scheduledDate: selectedDate,
      timeSlot: selectedSlot,
      videoMeetingUrl: modality === 'ONLINE_VIDEO' ? `https://meet.theraconnect.com/session/${Date.now().toString(36)}` : undefined,
      clinicRoom: modality === 'IN_CLINIC' ? 'Therapy Suite 2A (Quiet Courtyard Wing)' : undefined,
      clientNotes: presentingConcerns.substring(0, 200),
      clinicalNotes: 'Initial intake completed. Awaiting first clinical consultation.',
      priceAmount: selectedService.priceAmount,
      currency: selectedService.currency,
      paymentStatus: 'SUCCESS',
      paymentId: paymentDetails.razorpayPaymentId
    });

    // 2. Create Intake Record
    TheraConnectStore.createIntakeForm({
      clientId: newAppointment.clientId,
      appointmentId: newAppointment.id,
      presentingConcerns,
      previousTherapyHistory: previousTherapy || 'None reported',
      currentMedications: 'None reported',
      symptomSeverity,
      sleepAndEnergyRating: 'Reported during intake form',
      safetyScreeningResponse: safetyCrisisResponse,
      riskLevel: safetyCrisisResponse ? 'CRISIS_TRIGGERED' : symptomSeverity >= 4 ? 'ELEVATED' : 'LOW',
      consentSignedAt: new Date().toISOString(),
      consentSignatureName: signatureName,
      confidentialityAccepted: true,
      cancellationAgreed: true
    });

    // 3. Create Payment record
    TheraConnectStore.createPayment({
      appointmentId: newAppointment.id,
      appointmentReference: newAppointment.referenceCode,
      clientId: newAppointment.clientId,
      clientName: newAppointment.clientName,
      amount: selectedService.priceAmount,
      currency: selectedService.currency,
      status: 'SUCCESS',
      razorpayOrderId: paymentDetails.razorpayOrderId,
      razorpayPaymentId: paymentDetails.razorpayPaymentId,
      paymentMethod: paymentDetails.method,
      paidAt: new Date().toISOString()
    });

    setCreatedAppointment(newAppointment);
    setStep(4);
    if (onBookingComplete) onBookingComplete(newAppointment);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Generate .ics calendar download
  const handleDownloadCalendar = () => {
    if (!createdAppointment) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TheraConnect//Clinical Appointments//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:TheraConnect: ${createdAppointment.serviceTitle} with ${createdAppointment.therapistName}
DESCRIPTION:Reference Code: ${createdAppointment.referenceCode}\\nModality: ${createdAppointment.modality}\\n${createdAppointment.videoMeetingUrl ? 'Meeting URL: ' + createdAppointment.videoMeetingUrl : 'Location: ' + (createdAppointment.clinicRoom || 'TheraConnect Clinic')}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${createdAppointment.referenceCode}-TheraConnect.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Editorial Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="text-xs uppercase font-mono tracking-widest text-[#B99A64] mb-2">
          Clinical Scheduling Portal
        </div>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-[#173D35] tracking-tight">
          Reserve Your Therapeutic Consultation
        </h1>
        <p className="mt-3 text-sm text-[#5C6764] leading-relaxed">
          Select your dedicated service, preferred clinical psychologist, and confidential session modality.
        </p>

        {/* Mode Selector (Direct vs Calendly Integration) */}
        <div className="mt-6 inline-flex p-1 bg-[#EFEDE4] rounded-lg border border-[#D1DDD0]">
          <button
            type="button"
            onClick={() => setBookingMode('direct')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
              bookingMode === 'direct'
                ? 'bg-white text-[#173D35] shadow-xs'
                : 'text-[#5C6764] hover:text-[#242B29]'
            }`}
          >
            Direct Clinical Scheduler (Instant)
          </button>
          <button
            type="button"
            onClick={() => setBookingMode('calendly')}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
              bookingMode === 'calendly'
                ? 'bg-white text-[#173D35] shadow-xs'
                : 'text-[#5C6764] hover:text-[#242B29]'
            }`}
          >
            Calendly Schedule View
          </button>
        </div>
      </div>

      {bookingMode === 'calendly' ? (
        /* Calendly Integration Mode */
        <div className="bg-white rounded-xl border border-[#D1DDD0] p-8 shadow-xs max-w-3xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#173D35] text-white flex items-center justify-center mx-auto">
            <CalendarIcon className="w-6 h-6 text-[#DFC9A0]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-editorial font-bold text-[#173D35]">
              Calendly Clinical Booking Interface
            </h3>
            <p className="text-sm text-[#5C6764] max-w-md mx-auto">
              Connected to clinical calendar handle: <span className="font-mono font-medium text-[#173D35]">calendly.com/{settings.calendlyUsername}</span>
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-6 bg-[#F8F7F2] space-y-4 text-left text-xs text-[#242B29]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-medium">Active Calendly Webhook Sync</span>
              <span className="text-emerald-700 font-medium">Ready & Configured</span>
            </div>
            <p>
              In production, Calendly embeds directly using <code className="bg-white px-1 py-0.5 border rounded">react-calendly</code> with automatic booking confirmation webhooks mapped to our <code className="bg-white px-1 py-0.5 border rounded">Appointment</code> Prisma model.
            </p>
            <p className="text-slate-500">
              For immediate final-year project demonstration with live intake forms and Razorpay checkout, switch back to the <strong>Direct Clinical Scheduler</strong>.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setBookingMode('direct')}
              className="px-6 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors"
            >
              Switch to Direct Clinical Booking
            </button>
          </div>
        </div>
      ) : (
        /* Direct Multi-Step Clinical Flow */
        <div className="bg-white rounded-xl border border-[#D1DDD0] shadow-xs overflow-hidden">
          
          {/* Step Progress Indicators */}
          <div className="bg-[#EFEDE4]/60 px-6 py-4 border-b border-[#D1DDD0] flex items-center justify-between">
            {[
              { num: 1, title: 'Service & Modality' },
              { num: 2, title: 'Clinician & Time' },
              { num: 3, title: 'Intake & Consent' },
              { num: 4, title: 'Confirmation' }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-medium ${
                    step === s.num
                      ? 'bg-[#173D35] text-white'
                      : step > s.num
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#D1DDD0] text-[#5C6764]'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className={`hidden sm:inline text-xs font-medium ${step === s.num ? 'text-[#173D35]' : 'text-[#5C6764]'}`}>
                  {s.title}
                </span>
                {idx < 3 && <div className="hidden sm:block w-8 h-[1px] bg-[#D1DDD0] mx-2" />}
              </div>
            ))}
          </div>

          {/* STEP 1: SERVICE & MODALITY */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="p-6 sm:p-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-editorial font-bold text-[#173D35]">
                  1. Select Clinical Specialisation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((svc) => (
                    <label
                      key={svc.id}
                      className={`relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                        selectedServiceId === svc.id
                          ? 'border-[#173D35] bg-[#173D35]/5 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={svc.id}
                        checked={selectedServiceId === svc.id}
                        onChange={() => setSelectedServiceId(svc.id)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div className="font-semibold text-sm text-[#173D35]">{svc.title}</div>
                        <div className="font-mono-numbers text-xs font-bold text-[#173D35]">
                          ₹{svc.priceAmount}
                        </div>
                      </div>
                      <p className="text-xs text-[#5C6764] mt-1.5 line-clamp-2 leading-relaxed">
                        {svc.shortTagline}
                      </p>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>{svc.durationMinutes} Minutes</span>
                        <span className="text-[#173D35] font-medium">
                          {selectedServiceId === svc.id ? 'Selected' : 'Select'}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Modality Selection */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xl font-editorial font-bold text-[#173D35]">
                  2. Choose Session Modality
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'ONLINE_VIDEO', label: 'Encrypted Telehealth', desc: 'Secure HD video from your home', icon: Video },
                    { id: 'IN_CLINIC', label: 'In-Clinic Pavilion', desc: 'Quiet therapy suite in New Delhi', icon: MapPin },
                    { id: 'AUDIO_CONSULT', label: 'Audio Consultation', desc: 'Private voice session', icon: PhoneCall }
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = modality === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setModality(m.id as Modality)}
                        className={`p-4 border rounded-lg text-left transition-all ${
                          isSelected
                            ? 'border-[#173D35] bg-[#173D35]/5 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-md bg-[#EFEDE4] text-[#173D35] flex items-center justify-center mb-2">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-semibold text-[#173D35]">{m.label}</div>
                        <p className="text-[11px] text-[#5C6764] mt-0.5">{m.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-2"
                >
                  <span>Continue to Clinician & Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: THERAPIST & DATE/SLOT */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="p-6 sm:p-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-editorial font-bold text-[#173D35]">
                  Select Clinical Psychologist
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {therapists.map((t) => (
                    <label
                      key={t.id}
                      className={`flex items-start gap-3.5 p-4 border rounded-xl cursor-pointer transition-all ${
                        selectedTherapistId === t.id
                          ? 'border-[#173D35] bg-[#173D35]/5 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="therapist"
                        value={t.id}
                        checked={selectedTherapistId === t.id}
                        onChange={() => setSelectedTherapistId(t.id)}
                        className="sr-only"
                      />
                      <img
                        src="/src/assets/images/therapist_portrait_clinical_1794478628756.jpg"
                        alt={t.fullName}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border border-[#D1DDD0] shrink-0"
                      />
                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold text-[#173D35]">{t.fullName}</div>
                        <p className="text-xs text-[#5C6764]">{t.designation}</p>
                        <p className="text-[11px] font-mono text-[#A8B9A3]">{t.licenseNo}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date selection strip */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xl font-editorial font-bold text-[#173D35]">
                  Available Consultation Dates
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setSelectedDate(d.iso)}
                      className={`p-3 border rounded-lg text-center transition-all ${
                        selectedDate === d.iso
                          ? 'border-[#173D35] bg-[#173D35] text-white shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="text-[11px] uppercase tracking-wider">{d.dayName}</div>
                      <div className="text-lg font-bold font-mono-numbers my-0.5">{d.dateNum}</div>
                      <div className="text-[10px]">{d.monthName}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot pills */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xl font-editorial font-bold text-[#173D35]">
                  Select Time Slot ({selectedService.durationMinutes} mins)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 border rounded-md text-xs font-mono-numbers transition-all ${
                        selectedSlot === slot
                          ? 'border-[#173D35] bg-[#173D35]/10 text-[#173D35] font-semibold'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs text-[#5C6764] hover:text-[#173D35] flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-2"
                >
                  <span>Continue to Client Intake</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: CLIENT INTAKE & INFORMED CONSENT */}
          {step === 3 && (
            <form onSubmit={handleStep3Submit} className="p-6 sm:p-8 space-y-8">
              
              {/* Client Contact Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-editorial font-bold text-[#173D35]">
                  1. Client Identification Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Maya Sharma"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="maya@example.com"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Telephone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 98110 00000"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Emergency Contact Person</label>
                    <input
                      type="text"
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      placeholder="Name & Relationship (e.g., Mother, Partner)"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Emergency Telephone</label>
                    <input
                      type="tel"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      placeholder="+91 98110 00001"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>
                </div>
              </div>

              {/* Clinical Intake Questions */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xl font-editorial font-bold text-[#173D35]">
                  2. Clinical Background & Presenting Concerns
                </h3>
                
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    What primary emotional difficulties or goals bring you to psychotherapy at this time?
                  </label>
                  <textarea
                    rows={3}
                    value={presentingConcerns}
                    onChange={(e) => setPresentingConcerns(e.target.value)}
                    placeholder="Briefly describe what you are experiencing (e.g., persistent anxiety regarding health, sleep disruptions, work burnout)..."
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Previous Psychotherapy or Psychiatric History (if any)
                  </label>
                  <input
                    type="text"
                    value={previousTherapy}
                    onChange={(e) => setPreviousTherapy(e.target.value)}
                    placeholder="e.g. Attended CBT counseling in 2023, or None"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">
                    Current Distress / Severity Rating: <span className="font-bold text-[#173D35]">{symptomSeverity}/5</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={symptomSeverity}
                    onChange={(e) => setSymptomSeverity(Number(e.target.value))}
                    className="w-full accent-[#173D35]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>1: Mild Tension</span>
                    <span>3: Moderate Distress</span>
                    <span>5: Significant Disruption</span>
                  </div>
                </div>

                {/* Safety Screening Question */}
                <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-lg space-y-2">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-900 font-medium">
                      Clinical Safety & Triage Protocol:
                    </div>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    TheraConnect is a scheduled outpatient psychotherapy practice and is not equipped for acute psychiatric emergency resuscitation.
                  </p>
                  <label className="flex items-center gap-2 text-xs text-amber-950 font-medium pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={safetyCrisisResponse}
                      onChange={(e) => setSafetyCrisisResponse(e.target.checked)}
                      className="rounded text-amber-700 focus:ring-amber-600"
                    />
                    <span>I confirm that I am not currently experiencing acute suicidal impulses requiring emergency hospital intervention.</span>
                  </label>
                </div>
              </div>

              {/* Informed Consent & Digital Signature */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xl font-editorial font-bold text-[#173D35]">
                  3. Informed Consent & Confidentiality Agreement
                </h3>

                <div className="p-4 bg-[#EFEDE4]/40 border border-[#D1DDD0] rounded-lg text-xs text-[#242B29] space-y-2.5 max-h-36 overflow-y-auto">
                  <p>
                    <strong>Therapeutic Confidentiality:</strong> All clinical discussions, diagnostic formulations, and session notes are strictly confidential in accordance with the Mental Healthcare Act and relevant psychological ethics codes. Disclosures are permitted only under statutory exceptions (e.g. imminent danger to self or others, child protection mandates).
                  </p>
                  <p>
                    <strong>Cancellations & Rescheduling:</strong> Session slots are reserved exclusively for you. Please notify the clinic at least 24 hours in advance to reschedule without fee forfeiture.
                  </p>
                  <p>
                    <strong>Telehealth Security:</strong> Online video consultations are routed through end-to-end encrypted rooms. Sessions may not be recorded by either party without written bilateral consent.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-2.5 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentAgreed}
                      onChange={(e) => setConsentAgreed(e.target.checked)}
                      className="mt-0.5 rounded text-[#173D35] focus:ring-[#173D35]"
                    />
                    <span>
                      I have read, understood, and accept the TheraConnect Clinical Consent, Data Protection, and Cancellation terms.
                    </span>
                  </label>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Digital Legal Signature (Type your full name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={signatureName}
                      onChange={(e) => setSignatureName(e.target.value)}
                      placeholder="e.g. Maya Sharma"
                      className="w-full sm:w-80 px-3 py-2 text-sm font-editorial italic border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#173D35]"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Timestamped upon submission: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              {validationError && (
                <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-md">
                  {validationError}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs text-[#5C6764] hover:text-[#173D35] flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#DFC9A0]" />
                  <span>Proceed to Payment (₹{selectedService.priceAmount})</span>
                </button>
              </div>

            </form>
          )}

          {/* STEP 4: CONFIRMATION SCREEN */}
          {step === 4 && createdAppointment && (
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#B99A64]">
                  Appointment Confirmed & Scheduled
                </span>
                <h3 className="text-3xl font-editorial font-bold text-[#173D35]">
                  We Look Forward to Welcoming You
                </h3>
                <p className="text-sm text-[#5C6764] max-w-md mx-auto">
                  A confirmation email and calendar invitation have been registered for <strong>{createdAppointment.clientEmail}</strong>.
                </p>
              </div>

              {/* Reference Card */}
              <div className="max-w-md mx-auto bg-[#EFEDE4]/60 border border-[#D1DDD0] rounded-xl p-6 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#D1DDD0]">
                  <span className="text-xs text-[#5C6764]">Reference Code</span>
                  <span className="text-sm font-mono font-bold text-[#173D35]">
                    {createdAppointment.referenceCode}
                  </span>
                </div>
                <div className="text-xs space-y-1.5 text-[#242B29]">
                  <div className="flex justify-between">
                    <span className="text-[#5C6764]">Service:</span>
                    <span className="font-semibold">{createdAppointment.serviceTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6764]">Clinician:</span>
                    <span className="font-semibold">{createdAppointment.therapistName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6764]">Scheduled Date:</span>
                    <span className="font-mono-numbers">{createdAppointment.scheduledDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6764]">Time Slot:</span>
                    <span className="font-mono-numbers">{createdAppointment.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6764]">Modality:</span>
                    <span>{createdAppointment.modality}</span>
                  </div>
                  {createdAppointment.videoMeetingUrl && (
                    <div className="pt-2 border-t border-[#D1DDD0]/60">
                      <span className="text-[#5C6764] block mb-1">Encrypted Video Link:</span>
                      <a
                        href={createdAppointment.videoMeetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#173D35] font-mono underline break-all"
                      >
                        {createdAppointment.videoMeetingUrl}
                      </a>
                    </div>
                  )}
                  {createdAppointment.clinicRoom && (
                    <div className="pt-2 border-t border-[#D1DDD0]/60">
                      <span className="text-[#5C6764] block">Consultation Suite:</span>
                      <span className="font-medium text-[#173D35]">{createdAppointment.clinicRoom}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleDownloadCalendar}
                  className="px-5 py-2.5 bg-[#EFEDE4] hover:bg-[#D1DDD0] text-[#173D35] text-xs font-medium rounded-md transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS Calendar Event</span>
                </button>
                <button
                  onClick={onNavigateHome}
                  className="px-6 py-2.5 bg-[#173D35] hover:bg-[#0E2722] text-white text-xs font-medium rounded-md transition-colors"
                >
                  Return to Homepage
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* Razorpay Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        amount={selectedService.priceAmount}
        orderReference={`TC-APT-${Date.now().toString(36).toUpperCase()}`}
        clientName={clientName}
        clientEmail={clientEmail}
        serviceTitle={selectedService.title}
        onSuccess={handlePaymentSuccess}
        onFailure={(msg) => setValidationError(msg)}
      />

    </div>
  );
};
