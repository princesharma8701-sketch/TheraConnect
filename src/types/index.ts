// TheraConnect Types and Domain Definitions

export type Role = 'SUPER_ADMIN' | 'CLINICAL_DIRECTOR' | 'THERAPIST' | 'CASE_MANAGER';

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'RESCHEDULED' | 'CANCELLED';

export type Modality = 'ONLINE_VIDEO' | 'IN_CLINIC' | 'AUDIO_CONSULT';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export type IntakeRiskLevel = 'LOW' | 'MODERATE' | 'ELEVATED' | 'CRISIS_TRIGGERED';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  designation: string;
  licenseNo: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTagline: string;
  description: string;
  clinicalFocus: string[];
  durationMinutes: number;
  priceAmount: number; // in INR
  currency: string;
  isFeatured?: boolean;
}

export interface Client {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
  createdAt: string;
}

export interface IntakeForm {
  id: string;
  clientId: string;
  appointmentId?: string;
  presentingConcerns: string;
  previousTherapyHistory: string;
  currentMedications?: string;
  symptomSeverity: number; // 1-5 scale
  sleepAndEnergyRating: string;
  safetyScreeningResponse: boolean; // if true, crisis banner shown
  riskLevel: IntakeRiskLevel;
  consentSignedAt: string;
  consentSignatureName: string;
  confidentialityAccepted: boolean;
  cancellationAgreed: boolean;
  createdAt: string;
}

export interface Appointment {
  id: string;
  referenceCode: string; // e.g. TC-8921
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceTitle: string;
  therapistId: string;
  therapistName: string;
  status: AppointmentStatus;
  modality: Modality;
  scheduledDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM - 10:50 AM"
  videoMeetingUrl?: string;
  clinicRoom?: string;
  clientNotes?: string;
  clinicalNotes?: string;
  priceAmount: number;
  currency: string;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  intakeFormId?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  appointmentId: string;
  appointmentReference: string;
  clientId: string;
  clientName: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentMethod: string;
  receiptUrl?: string;
  paidAt?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  authorId: string;
  authorName: string;
  publishedAt: string;
  imageUrl?: string;
  isPublished: boolean;
}

export interface Testimonial {
  id: string;
  clientInitials: string;
  serviceName: string;
  duration: string;
  content: string;
  isDemo: boolean;
  isApproved: boolean;
  rating: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  fileFormat: string;
  fileSize: string;
  downloadCount: number;
  downloadUrl: string;
}

export interface Subscriber {
  id: string;
  email: string;
  source: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: string;
}

export interface ClinicSettings {
  clinicName: string;
  tagline: string;
  emergencyHelpline: string;
  emergencyNotice: string;
  phone: string;
  email: string;
  address: string;
  defaultTherapistName: string;
  defaultTherapistTitle: string;
  razorpayKeyId: string;
  razorpaySecretConfigured: boolean;
  calendlyUsername: string;
  demoPaymentMode: boolean;
  allowClientCancellations: boolean;
}
