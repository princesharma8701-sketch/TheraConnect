import {
  AdminUser,
  Service,
  Client,
  IntakeForm,
  Appointment,
  Payment,
  BlogPost,
  Testimonial,
  Resource,
  Subscriber,
  ContactMessage,
  ClinicSettings,
  AppointmentStatus,
  PaymentStatus,
  Modality
} from '../types';

import {
  initialTherapists,
  initialServices,
  initialTestimonials,
  initialResources,
  initialBlogPosts
} from '../../prisma/seed';

// Storage keys
const STORAGE_PREFIX = 'theraconnect_v1_';
const KEYS = {
  SERVICES: `${STORAGE_PREFIX}services`,
  THERAPISTS: `${STORAGE_PREFIX}therapists`,
  CLIENTS: `${STORAGE_PREFIX}clients`,
  INTAKE_FORMS: `${STORAGE_PREFIX}intake_forms`,
  APPOINTMENTS: `${STORAGE_PREFIX}appointments`,
  PAYMENTS: `${STORAGE_PREFIX}payments`,
  BLOG_POSTS: `${STORAGE_PREFIX}blog_posts`,
  TESTIMONIALS: `${STORAGE_PREFIX}testimonials`,
  RESOURCES: `${STORAGE_PREFIX}resources`,
  SUBSCRIBERS: `${STORAGE_PREFIX}subscribers`,
  CONTACT_MESSAGES: `${STORAGE_PREFIX}contact_messages`,
  SETTINGS: `${STORAGE_PREFIX}settings`,
  ADMIN_SESSION: `${STORAGE_PREFIX}admin_session`
};

// Initial Default Settings
const defaultSettings: ClinicSettings = {
  clinicName: "TheraConnect Mental Health Institute",
  tagline: "Thoughtful Care. Meaningful Change.",
  emergencyHelpline: "988 (Suicide & Crisis Lifeline) / India Tele-MANAS: 14416",
  emergencyNotice: "If you or someone you know is in acute danger or experiencing a life-threatening psychological emergency, please call your local emergency services or 988 immediately. TheraConnect does not provide walk-in acute emergency resuscitation.",
  phone: "+91 (0) 11 4920 8820",
  email: "care@theraconnect.com",
  address: "TheraConnect Clinical Pavilion, 4th Floor, Vasant Sanctuary, New Delhi 110070",
  defaultTherapistName: "Dr. Elena Vance, Ph.D.",
  defaultTherapistTitle: "Clinical Director & Senior Psychologist (RCI / PSY-2016-4192)",
  razorpayKeyId: "rzp_test_tc99104829124",
  razorpaySecretConfigured: true,
  calendlyUsername: "theraconnect-care",
  demoPaymentMode: true,
  allowClientCancellations: true
};

// Initial Seed Clients
const seedClients: Client[] = [
  {
    id: "cli-101",
    fullName: "Aarav Mehra",
    email: "aarav.mehra@example.com",
    phoneNumber: "+91 98210 49120",
    emergencyContactName: "Sunita Mehra (Mother)",
    emergencyContactPhone: "+91 98210 49121",
    notes: "Client referred for generalized anxiety and somatic tension. Responding well to CBT thought logs.",
    createdAt: "2026-09-12T10:00:00Z"
  },
  {
    id: "cli-102",
    fullName: "Priyanka Sen",
    email: "priyanka.sen@example.com",
    phoneNumber: "+91 98104 22391",
    emergencyContactName: "Rohan Sen (Spouse)",
    emergencyContactPhone: "+91 98104 22392",
    notes: "Presenting with occupational burnout and impostor feelings. Working through boundary formulation.",
    createdAt: "2026-10-04T14:30:00Z"
  },
  {
    id: "cli-103",
    fullName: "Devika Rao",
    email: "devika.rao@example.com",
    phoneNumber: "+91 97112 88421",
    emergencyContactName: "Kabir Rao (Brother)",
    emergencyContactPhone: "+91 97112 88422",
    notes: "Couples therapy client with partner. Focused on de-escalating attachment triggers.",
    createdAt: "2026-10-18T11:15:00Z"
  }
];

// Initial Seed Intake Forms
const seedIntakes: IntakeForm[] = [
  {
    id: "intk-001",
    clientId: "cli-101",
    appointmentId: "apt-101",
    presentingConcerns: "Persistent palpitations, racing thoughts regarding career stability, sleep latency > 2 hours.",
    previousTherapyHistory: "Attended university counseling 4 years ago for 3 sessions.",
    currentMedications: "None.",
    symptomSeverity: 4,
    sleepAndEnergyRating: "Fragmented sleep, mid-day lethargy",
    safetyScreeningResponse: false,
    riskLevel: "LOW",
    consentSignedAt: "2026-10-25T09:15:00Z",
    consentSignatureName: "Aarav Mehra",
    confidentialityAccepted: true,
    cancellationAgreed: true,
    createdAt: "2026-10-25T09:15:00Z"
  },
  {
    id: "intk-002",
    clientId: "cli-102",
    appointmentId: "apt-102",
    presentingConcerns: "Chronic emotional exhaustion, difficulty disengaging from work emails, boundary collapse.",
    previousTherapyHistory: "None. First time seeking psychotherapy.",
    currentMedications: "None.",
    symptomSeverity: 3,
    sleepAndEnergyRating: "Low morning vitality, physical fatigue",
    safetyScreeningResponse: false,
    riskLevel: "LOW",
    consentSignedAt: "2026-11-01T15:20:00Z",
    consentSignatureName: "Priyanka Sen",
    confidentialityAccepted: true,
    cancellationAgreed: true,
    createdAt: "2026-11-01T15:20:00Z"
  }
];

// Initial Seed Appointments
const seedAppointments: Appointment[] = [
  {
    id: "apt-101",
    referenceCode: "TC-2026-4081",
    clientId: "cli-101",
    clientName: "Aarav Mehra",
    clientEmail: "aarav.mehra@example.com",
    clientPhone: "+91 98210 49120",
    serviceId: "srv-anx-02",
    serviceTitle: "Anxiety & Panic Counselling",
    therapistId: "usr-dr-elena",
    therapistName: "Dr. Elena Vance, Ph.D.",
    status: "CONFIRMED",
    modality: "ONLINE_VIDEO",
    scheduledDate: "2026-11-15",
    timeSlot: "11:00 AM - 11:50 AM",
    videoMeetingUrl: "https://meet.theraconnect.com/session/tc-4081-secure",
    clinicRoom: "Online Clinical Room Alpha",
    clientNotes: "Please focus on somatic exercises for panic during travel.",
    clinicalNotes: "Client reported 30% reduction in panic intensity using 5-4-3-2-1 anchor. Next session: cognitive restructuring.",
    priceAmount: 2400,
    currency: "INR",
    paymentStatus: "SUCCESS",
    paymentId: "pay-101",
    intakeFormId: "intk-001",
    createdAt: "2026-10-25T09:20:00Z"
  },
  {
    id: "apt-102",
    referenceCode: "TC-2026-5120",
    clientId: "cli-102",
    clientName: "Priyanka Sen",
    clientEmail: "priyanka.sen@example.com",
    clientPhone: "+91 98104 22391",
    serviceId: "srv-str-04",
    serviceTitle: "Burnout & Stress Management",
    therapistId: "usr-marcus-chen",
    therapistName: "Marcus Chen, M.Sc.",
    status: "CONFIRMED",
    modality: "IN_CLINIC",
    scheduledDate: "2026-11-16",
    timeSlot: "03:00 PM - 03:50 PM",
    videoMeetingUrl: undefined,
    clinicRoom: "Therapy Suite 2B (Quiet Garden Wing)",
    clientNotes: "First session in-clinic.",
    clinicalNotes: "Intake completed. Established therapeutic goals and boundary contracts.",
    priceAmount: 2200,
    currency: "INR",
    paymentStatus: "SUCCESS",
    paymentId: "pay-102",
    intakeFormId: "intk-002",
    createdAt: "2026-11-01T15:25:00Z"
  },
  {
    id: "apt-103",
    referenceCode: "TC-2026-6218",
    clientId: "cli-103",
    clientName: "Devika Rao",
    clientEmail: "devika.rao@example.com",
    clientPhone: "+91 97112 88421",
    serviceId: "srv-rel-05",
    serviceTitle: "Couples & Relationship Counselling",
    therapistId: "usr-dr-elena",
    therapistName: "Dr. Elena Vance, Ph.D.",
    status: "PENDING",
    modality: "ONLINE_VIDEO",
    scheduledDate: "2026-11-18",
    timeSlot: "05:00 PM - 06:15 PM",
    videoMeetingUrl: "https://meet.theraconnect.com/session/tc-6218-couples",
    clinicRoom: "Online Clinical Room Beta",
    clientNotes: "Partner will join from Bangalore office.",
    clinicalNotes: "",
    priceAmount: 3600,
    currency: "INR",
    paymentStatus: "PENDING",
    createdAt: "2026-11-10T11:00:00Z"
  }
];

// Initial Seed Payments
const seedPayments: Payment[] = [
  {
    id: "pay-101",
    appointmentId: "apt-101",
    appointmentReference: "TC-2026-4081",
    clientId: "cli-101",
    clientName: "Aarav Mehra",
    amount: 2400,
    currency: "INR",
    status: "SUCCESS",
    razorpayOrderId: "order_TC4081_RZP90",
    razorpayPaymentId: "pay_TC4081_K98J32",
    paymentMethod: "UPI (Google Pay)",
    receiptUrl: "/receipts/TC-2026-4081.pdf",
    paidAt: "2026-10-25T09:22:00Z",
    createdAt: "2026-10-25T09:20:00Z"
  },
  {
    id: "pay-102",
    appointmentId: "apt-102",
    appointmentReference: "TC-2026-5120",
    clientId: "cli-102",
    clientName: "Priyanka Sen",
    amount: 2200,
    currency: "INR",
    status: "SUCCESS",
    razorpayOrderId: "order_TC5120_RZP44",
    razorpayPaymentId: "pay_TC5120_M28F10",
    paymentMethod: "Card (Mastercard •••• 4190)",
    receiptUrl: "/receipts/TC-2026-5120.pdf",
    paidAt: "2026-11-01T15:26:00Z",
    createdAt: "2026-11-01T15:25:00Z"
  }
];

// Initial Seed Contact Messages
const seedContactMessages: ContactMessage[] = [
  {
    id: "msg-01",
    fullName: "Sunita Kapoor",
    email: "sunita.k@example.com",
    phone: "+91 99100 12345",
    inquiryType: "Insurance & Coverage",
    message: "Does TheraConnect provide standard clinical reimbursement receipts with therapist RCI license numbers for corporate insurance claims?",
    isRead: true,
    isReplied: true,
    createdAt: "2026-11-08T09:10:00Z"
  },
  {
    id: "msg-02",
    fullName: "Vikram Singhania",
    email: "vikram.s@example.com",
    phone: "+91 98711 55678",
    inquiryType: "Appointment Scheduling",
    message: "Are weekend morning consultation slots available with Dr. Vance for individual psychotherapy? Looking to start next month.",
    isRead: false,
    isReplied: false,
    createdAt: "2026-11-11T16:45:00Z"
  }
];

// Helper to safely load JSON from storage
function loadItem<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return defaultValue;
    return JSON.parse(data) as T;
  } catch (err) {
    console.error(`Error loading ${key} from storage:`, err);
    return defaultValue;
  }
}

// Helper to save JSON
function saveItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

export class TheraConnectStore {
  // SERVICES
  static getServices(): Service[] {
    return loadItem<Service[]>(KEYS.SERVICES, initialServices as Service[]);
  }

  static getServiceBySlug(slug: string): Service | undefined {
    const services = this.getServices();
    return services.find(s => s.slug === slug || s.id === slug);
  }

  // THERAPISTS
  static getTherapists(): AdminUser[] {
    return loadItem<AdminUser[]>(KEYS.THERAPISTS, initialTherapists as unknown as AdminUser[]);
  }

  // APPOINTMENTS
  static getAppointments(): Appointment[] {
    return loadItem<Appointment[]>(KEYS.APPOINTMENTS, seedAppointments);
  }

  static getAppointmentById(id: string): Appointment | undefined {
    return this.getAppointments().find(a => a.id === id || a.referenceCode === id);
  }

  static createAppointment(data: Omit<Appointment, 'id' | 'referenceCode' | 'createdAt'>): Appointment {
    const appointments = this.getAppointments();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      referenceCode: `TC-2026-${randomCode}`,
      createdAt: new Date().toISOString()
    };
    appointments.unshift(newAppointment);
    saveItem(KEYS.APPOINTMENTS, appointments);

    // Also ensure client exists in directory
    this.upsertClient({
      fullName: newAppointment.clientName,
      email: newAppointment.clientEmail,
      phoneNumber: newAppointment.clientPhone
    });

    return newAppointment;
  }

  static updateAppointmentStatus(id: string, status: AppointmentStatus, clinicalNotes?: string): Appointment | null {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(a => a.id === id || a.referenceCode === id);
    if (index === -1) return null;

    appointments[index].status = status;
    if (clinicalNotes !== undefined) {
      appointments[index].clinicalNotes = clinicalNotes;
    }
    saveItem(KEYS.APPOINTMENTS, appointments);
    return appointments[index];
  }

  // CLIENTS
  static getClients(): Client[] {
    return loadItem<Client[]>(KEYS.CLIENTS, seedClients);
  }

  static getClientById(id: string): Client | undefined {
    return this.getClients().find(c => c.id === id || c.email === id);
  }

  static upsertClient(data: { fullName: string; email: string; phoneNumber: string; notes?: string }): Client {
    const clients = this.getClients();
    const existingIndex = clients.findIndex(c => c.email.toLowerCase() === data.email.toLowerCase());
    if (existingIndex >= 0) {
      clients[existingIndex] = {
        ...clients[existingIndex],
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        notes: data.notes || clients[existingIndex].notes
      };
      saveItem(KEYS.CLIENTS, clients);
      return clients[existingIndex];
    } else {
      const newClient: Client = {
        id: `cli-${Date.now()}`,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        notes: data.notes || 'First registered through booking portal',
        createdAt: new Date().toISOString()
      };
      clients.unshift(newClient);
      saveItem(KEYS.CLIENTS, clients);
      return newClient;
    }
  }

  // INTAKE FORMS
  static getIntakeForms(): IntakeForm[] {
    return loadItem<IntakeForm[]>(KEYS.INTAKE_FORMS, seedIntakes);
  }

  static getIntakeByAppointmentId(appointmentId: string): IntakeForm | undefined {
    return this.getIntakeForms().find(i => i.appointmentId === appointmentId);
  }

  static createIntakeForm(data: Omit<IntakeForm, 'id' | 'createdAt'>): IntakeForm {
    const intakes = this.getIntakeForms();
    const newIntake: IntakeForm = {
      ...data,
      id: `intk-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    intakes.unshift(newIntake);
    saveItem(KEYS.INTAKE_FORMS, intakes);

    // Link to appointment if given
    if (data.appointmentId) {
      const appointments = this.getAppointments();
      const aptIndex = appointments.findIndex(a => a.id === data.appointmentId || a.referenceCode === data.appointmentId);
      if (aptIndex >= 0) {
        appointments[aptIndex].intakeFormId = newIntake.id;
        saveItem(KEYS.APPOINTMENTS, appointments);
      }
    }

    return newIntake;
  }

  // PAYMENTS
  static getPayments(): Payment[] {
    return loadItem<Payment[]>(KEYS.PAYMENTS, seedPayments);
  }

  static createPayment(data: Omit<Payment, 'id' | 'createdAt'>): Payment {
    const payments = this.getPayments();
    const newPayment: Payment = {
      ...data,
      id: `pay-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    payments.unshift(newPayment);
    saveItem(KEYS.PAYMENTS, payments);

    // Update appointment status to confirmed and paymentStatus to SUCCESS
    const appointments = this.getAppointments();
    const aptIndex = appointments.findIndex(a => a.id === data.appointmentId || a.referenceCode === data.appointmentReference);
    if (aptIndex >= 0) {
      appointments[aptIndex].paymentStatus = data.status;
      appointments[aptIndex].paymentId = newPayment.id;
      if (data.status === 'SUCCESS') {
        appointments[aptIndex].status = 'CONFIRMED';
      }
      saveItem(KEYS.APPOINTMENTS, appointments);
    }

    return newPayment;
  }

  static refundPayment(paymentId: string): Payment | null {
    const payments = this.getPayments();
    const index = payments.findIndex(p => p.id === paymentId);
    if (index === -1) return null;

    payments[index].status = 'REFUNDED';
    saveItem(KEYS.PAYMENTS, payments);

    // Update linked appointment
    const appointments = this.getAppointments();
    const aptIndex = appointments.findIndex(a => a.id === payments[index].appointmentId);
    if (aptIndex >= 0) {
      appointments[aptIndex].paymentStatus = 'REFUNDED';
      appointments[aptIndex].status = 'CANCELLED';
      saveItem(KEYS.APPOINTMENTS, appointments);
    }

    return payments[index];
  }

  // BLOG POSTS
  static getBlogPosts(): BlogPost[] {
    return loadItem<BlogPost[]>(KEYS.BLOG_POSTS, initialBlogPosts as BlogPost[]);
  }

  static getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.getBlogPosts().find(b => b.slug === slug || b.id === slug);
  }

  static createBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
    const posts = this.getBlogPosts();
    const newPost: BlogPost = {
      ...post,
      id: `blog-${Date.now()}`
    };
    posts.unshift(newPost);
    saveItem(KEYS.BLOG_POSTS, posts);
    return newPost;
  }

  static updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = this.getBlogPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    posts[index] = { ...posts[index], ...updates };
    saveItem(KEYS.BLOG_POSTS, posts);
    return posts[index];
  }

  static deleteBlogPost(id: string): boolean {
    const posts = this.getBlogPosts();
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length === posts.length) return false;
    saveItem(KEYS.BLOG_POSTS, filtered);
    return true;
  }

  // TESTIMONIALS
  static getTestimonials(): Testimonial[] {
    return loadItem<Testimonial[]>(KEYS.TESTIMONIALS, initialTestimonials as Testimonial[]);
  }

  static toggleTestimonialApproval(id: string): boolean {
    const testimonials = this.getTestimonials();
    const item = testimonials.find(t => t.id === id);
    if (!item) return false;
    item.isApproved = !item.isApproved;
    saveItem(KEYS.TESTIMONIALS, testimonials);
    return true;
  }

  // RESOURCES
  static getResources(): Resource[] {
    return loadItem<Resource[]>(KEYS.RESOURCES, initialResources as Resource[]);
  }

  static incrementResourceDownload(id: string): void {
    const resources = this.getResources();
    const res = resources.find(r => r.id === id);
    if (res) {
      res.downloadCount += 1;
      saveItem(KEYS.RESOURCES, resources);
    }
  }

  // SUBSCRIBERS
  static getSubscribers(): Subscriber[] {
    return loadItem<Subscriber[]>(KEYS.SUBSCRIBERS, [
      { id: "sub-1", email: "dr.meenakshi@mentalhealth.org", source: "footer_newsletter", createdAt: "2026-10-14" },
      { id: "sub-2", email: "karan.malhotra@zenith.in", source: "resources_page", createdAt: "2026-11-02" },
      { id: "sub-3", email: "ananya.singh@campuscare.edu", source: "blog_page", createdAt: "2026-11-09" }
    ]);
  }

  static addSubscriber(email: string, source: string = "footer"): { success: boolean; message: string } {
    const subscribers = this.getSubscribers();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: "Please provide a valid email address." };
    }
    if (subscribers.some(s => s.email === cleanEmail)) {
      return { success: true, message: "You are already subscribed to TheraConnect insights." };
    }
    subscribers.unshift({
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      source,
      createdAt: new Date().toISOString().split('T')[0]
    });
    saveItem(KEYS.SUBSCRIBERS, subscribers);
    return { success: true, message: "Thank you for subscribing to our clinical newsletter." };
  }

  // CONTACT MESSAGES
  static getContactMessages(): ContactMessage[] {
    return loadItem<ContactMessage[]>(KEYS.CONTACT_MESSAGES, seedContactMessages);
  }

  static createContactMessage(data: Omit<ContactMessage, 'id' | 'isRead' | 'isReplied' | 'createdAt'>): ContactMessage {
    const messages = this.getContactMessages();
    const newMsg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      isRead: false,
      isReplied: false,
      createdAt: new Date().toISOString()
    };
    messages.unshift(newMsg);
    saveItem(KEYS.CONTACT_MESSAGES, messages);
    return newMsg;
  }

  static markMessageRead(id: string): void {
    const messages = this.getContactMessages();
    const item = messages.find(m => m.id === id);
    if (item) {
      item.isRead = true;
      saveItem(KEYS.CONTACT_MESSAGES, messages);
    }
  }

  static markMessageReplied(id: string): void {
    const messages = this.getContactMessages();
    const item = messages.find(m => m.id === id);
    if (item) {
      item.isReplied = true;
      item.isRead = true;
      saveItem(KEYS.CONTACT_MESSAGES, messages);
    }
  }

  // SETTINGS
  static getSettings(): ClinicSettings {
    return loadItem<ClinicSettings>(KEYS.SETTINGS, defaultSettings);
  }

  static updateSettings(updates: Partial<ClinicSettings>): ClinicSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    saveItem(KEYS.SETTINGS, updated);
    return updated;
  }

  // ADMIN AUTHENTICATION
  static isAdminAuthenticated(): boolean {
    const session = localStorage.getItem(KEYS.ADMIN_SESSION);
    if (!session) return false;
    try {
      const parsed = JSON.parse(session);
      return Boolean(parsed.token && parsed.expiresAt > Date.now());
    } catch {
      return false;
    }
  }

  static getAdminUser(): AdminUser | null {
    if (!this.isAdminAuthenticated()) return null;
    const session = localStorage.getItem(KEYS.ADMIN_SESSION);
    if (!session) return null;
    try {
      const parsed = JSON.parse(session);
      return parsed.user;
    } catch {
      return null;
    }
  }

  static adminLogin(email: string, password: string): { success: boolean; message: string; user?: AdminUser } {
    const cleanEmail = email.trim().toLowerCase();
    // Default admin credentials: admin@theraconnect.com / theraconnect2026 or dr.elena@theraconnect.com
    if ((cleanEmail === 'admin@theraconnect.com' || cleanEmail === 'dr.elena@theraconnect.com') && (password === 'theraconnect2026' || password === 'admin123')) {
      const user: AdminUser = {
        id: "usr-dr-elena",
        email: cleanEmail,
        fullName: "Dr. Elena Vance, Ph.D.",
        role: "CLINICAL_DIRECTOR",
        designation: "Clinical Director & Senior Psychologist",
        licenseNo: "RCI / PSY-2016-4192",
        avatarUrl: "/src/assets/images/therapist_portrait_clinical_1794478628756.jpg",
        createdAt: "2024-01-01T00:00:00Z"
      };

      const session = {
        token: `tc_jwt_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        user,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      localStorage.setItem(KEYS.ADMIN_SESSION, JSON.stringify(session));
      return { success: true, message: "Authentication successful", user };
    }

    return { success: false, message: "Invalid credentials. Use admin@theraconnect.com and theraconnect2026 for demo access." };
  }

  static adminLogout(): void {
    localStorage.removeItem(KEYS.ADMIN_SESSION);
  }
}
