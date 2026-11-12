// TheraConnect - Prisma Database Seeding Script
// Populates clinical services, therapists, verified demo testimonials, psychoeducation resources, and blog articles

export const initialTherapists = [
  {
    id: "usr-dr-elena",
    email: "dr.elena@theraconnect.com",
    fullName: "Dr. Elena Vance, Ph.D.",
    role: "CLINICAL_DIRECTOR",
    designation: "Clinical Director & Senior Psychologist",
    licenseNo: "RCI/PSY-2016-4192",
    avatarUrl: "/src/assets/images/therapist_portrait_clinical_1794478628756.jpg",
  },
  {
    id: "usr-marcus-chen",
    email: "marcus.chen@theraconnect.com",
    fullName: "Marcus Chen, M.Sc.",
    role: "THERAPIST",
    designation: "Cognitive Behavioural Specialist",
    licenseNo: "BPS-Chartered 91204",
    avatarUrl: "/src/assets/images/therapist_portrait_clinical_1794478628756.jpg",
  }
];

export const initialServices = [
  {
    id: "srv-ind-01",
    slug: "individual-therapy",
    title: "Individual Psychotherapy",
    shortTagline: "Deep, 1-on-1 therapeutic exploration tailored to your inner life.",
    description: "A collaborative clinical process grounded in psychodynamic and evidence-based methods. We explore emotional patterns, unresolved relational trauma, self-worth difficulties, and life transitions in a warm, confidential sanctuary.",
    clinicalFocus: ["CBT", "Psychodynamic", "Existential Inquiry"],
    durationMinutes: 50,
    priceAmount: 2400,
    currency: "INR",
    isFeatured: true,
  },
  {
    id: "srv-anx-02",
    slug: "anxiety-counselling",
    title: "Anxiety & Panic Counselling",
    shortTagline: "Deconstruct chronic worry, social apprehension, and somatic panic.",
    description: "Structured somatic and cognitive restructuring strategies designed to regulate the nervous system, dismantle catastrophic forecasting, and rebuild emotional resilience.",
    clinicalFocus: ["Exposure & Response Prevention", "Somatic Grounding", "ACT"],
    durationMinutes: 50,
    priceAmount: 2400,
    currency: "INR",
    isFeatured: true,
  },
  {
    id: "srv-dep-03",
    slug: "depression-counselling",
    title: "Depression & Mood Therapy",
    shortTagline: "Gentle, non-judgmental guidance through depressive fatigue and emotional numbness.",
    description: "Navigate persistent depressive episodes with compassionate pacing. We focus on behavioral activation, emotional rediscovery, and self-compassion frameworks to restore vitality.",
    clinicalFocus: ["Behavioral Activation", "Compassion Focused Therapy", "Interpersonal Psychotherapy"],
    durationMinutes: 50,
    priceAmount: 2400,
    currency: "INR",
    isFeatured: true,
  },
  {
    id: "srv-str-04",
    slug: "stress-management",
    title: "Burnout & Stress Management",
    shortTagline: "Restorative psychological care for high-pressure professionals and caregivers.",
    description: "Examine boundary erosion, executive burnout, work-life distress, and autonomic nervous system fatigue. Develop sustainable lifestyle rituals and psychological boundaries.",
    clinicalFocus: ["Mindfulness-Based Stress Reduction (MBSR)", "Polyvagal Theory", "Boundary Work"],
    durationMinutes: 50,
    priceAmount: 2200,
    currency: "INR",
    isFeatured: false,
  },
  {
    id: "srv-rel-05",
    slug: "relationship-counselling",
    title: "Couples & Relationship Counselling",
    shortTagline: "Foster empathetic attunement, clear communication, and secure attachment.",
    description: "Support for couples and individuals experiencing recurring conflict, attachment distress, trust fractures, or emotional estrangement. Cultivate mutual understanding and genuine connection.",
    clinicalFocus: ["Emotionally Focused Therapy (EFT)", "Gottman Method Principles", "Attachment Science"],
    durationMinutes: 75,
    priceAmount: 3600,
    currency: "INR",
    isFeatured: true,
  },
  {
    id: "srv-onl-06",
    slug: "online-teletherapy",
    title: "Secure Telehealth & Online Therapy",
    shortTagline: "Encrypted, high-definition clinical sessions from the quiet of your home.",
    description: "High-standard clinical sessions conducted over end-to-end encrypted video. Complete with digital therapeutic worksheets, session summaries, and flexible scheduling across time zones.",
    clinicalFocus: ["HIPAA-Compliant Video", "Digital Care Plans", "Asynchronous Clinical Check-ins"],
    durationMinutes: 50,
    priceAmount: 2400,
    currency: "INR",
    isFeatured: false,
  }
];

export const initialTestimonials = [
  {
    id: "tst-01",
    clientInitials: "R. M.",
    serviceName: "Individual Psychotherapy",
    duration: "8 Months of Care",
    content: "TheraConnect created a space where I never felt rushed or pathologized. For the first time in years, I can understand the roots of my chronic worry without feeling overwhelmed by it.",
    isDemo: true,
    isApproved: true,
    rating: 5,
  },
  {
    id: "tst-02",
    clientInitials: "A. K.",
    serviceName: "Burnout & Stress Management",
    duration: "4 Months of Care",
    content: "As a senior software engineer facing severe occupational burnout, having structured sessions and somatic tools grounded me. My sleep returned and my sense of self was restored.",
    isDemo: true,
    isApproved: true,
    rating: 5,
  },
  {
    id: "tst-03",
    clientInitials: "P. & S. T.",
    serviceName: "Couples Counselling",
    duration: "6 Months of Care",
    content: "We were having the same defensive argument every weekend. The therapist helped us uncover the underlying attachment vulnerabilities. It fundamentally changed how we listen to one another.",
    isDemo: true,
    isApproved: true,
    rating: 5,
  }
];

export const initialResources = [
  {
    id: "res-01",
    title: "CBT Cognitive Thought Record",
    description: "A structured clinical exercise to identify automatic negative thoughts, test cognitive distortions, and generate balanced rational perspectives.",
    category: "Clinical Worksheet",
    fileFormat: "PDF",
    fileSize: "1.4 MB",
    downloadCount: 382,
    downloadUrl: "#download-cbt-record",
  },
  {
    id: "res-02",
    title: "5-4-3-2-1 Somatic Grounding Guide",
    description: "An evidence-based grounding protocol to regulate sympathetic nervous system arousal during acute anxiety or panic flare-ups.",
    category: "Crisis Regulation Guide",
    fileFormat: "PDF",
    fileSize: "840 KB",
    downloadCount: 519,
    downloadUrl: "#download-grounding-guide",
  },
  {
    id: "res-03",
    title: "Sleep Architecture & Circadian Hygiene",
    description: "A comprehensive psychoeducational handbook on stimulus control, sleep restriction foundations, and evening cognitive deceleration.",
    category: "Psychoeducational Guide",
    fileFormat: "PDF",
    fileSize: "2.1 MB",
    downloadCount: 294,
    downloadUrl: "#download-sleep-hygiene",
  },
  {
    id: "res-04",
    title: "Emotional Granularity & Feelings Wheel",
    description: "An expanded psychological vocabulary chart assisting clients in pinpointing nuanced emotional states beyond primary distress.",
    category: "Self-Reflection Tool",
    fileFormat: "Interactive Tool",
    fileSize: "1.1 MB",
    downloadCount: 647,
    downloadUrl: "#download-feelings-wheel",
  }
];

export const initialBlogPosts = [
  {
    id: "blog-01",
    slug: "neurobiology-of-chronic-anxiety",
    title: "The Neurobiology of Chronic Anxiety: Moving Beyond 'Just Relax'",
    excerpt: "Why platitudes fail when the amygdala has learned hypervigilance, and how somatic recalibration gradually restores autonomic safety.",
    category: "Clinical Neurobiology",
    readTime: "6 min read",
    authorId: "usr-dr-elena",
    authorName: "Dr. Elena Vance, Ph.D.",
    publishedAt: "2026-10-18",
    imageUrl: "/src/assets/images/hero_therapy_consultation_1794478627706.jpg",
    content: `When individuals experience prolonged distress, the nervous system adapts by skewing its predictive models toward threat. The sympathetic nervous system remains primed for mobilization, interpreting ambiguous social signals or subtle physical sensations as urgent hazards.

In clinical psychotherapy, we understand that telling someone with generalized anxiety to 'relax' or 'stop overthinking' is biologically counter-productive. Cognitive processing resides in the prefrontal cortex, which becomes downregulated when the amygdala perceives immediate existential threat.

Effective treatment requires a bottom-up and top-down dual approach. Somatic grounding, diaphragmatic vagal pacing, and interoceptive awareness signal visceral safety to the brainstem. Once physiological arousal stabilizes, cognitive restructuring through CBT or Acceptance and Commitment Therapy (ACT) can re-evaluate catastrophic forecasting without triggering defensive reflex arcs.`
  },
  {
    id: "blog-02",
    slug: "first-therapy-session-what-to-expect",
    title: "Demystifying the Intake: What Truly Happens in Your First Session",
    excerpt: "A transparent walkthrough of the initial clinical consultation, confidentiality boundaries, and building collaborative therapeutic rapport.",
    category: "Therapy Foundations",
    readTime: "4 min read",
    authorId: "usr-dr-elena",
    authorName: "Dr. Elena Vance, Ph.D.",
    publishedAt: "2026-10-24",
    imageUrl: "/src/assets/images/wellness_peaceful_sanctuary_1794478629321.jpg",
    content: `Many clients approach their inaugural therapy appointment with understandable trepidation. Popular culture often portrays therapy as an interrogative examination or a passive monologue. 

In modern compassionate practice, the first appointment—termed the clinical intake—is fundamentally a collaborative conversation. We explore what brings you to care today, identify current stressors, review your developmental context, and clarify what meaningful change looks like for you.

You retain agency at every moment. You are never obligated to disclose deep trauma before you feel secure. Furthermore, strict legal and ethical confidentiality protects your disclosures, creating a sanctuary free from judgment.`
  },
  {
    id: "blog-03",
    slug: "burnout-vs-depression-clinical-distinctions",
    title: "Occupational Burnout vs. Clinical Depression: Key Nuances",
    excerpt: "Understanding the subtle clinical boundary between workplace exhaustion and pervasive unipolar depressive episodes.",
    category: "Diagnostic Clarity",
    readTime: "5 min read",
    authorId: "usr-marcus-chen",
    authorName: "Marcus Chen, M.Sc.",
    publishedAt: "2026-11-02",
    imageUrl: "/src/assets/images/counseling_session_space_1794478629822.jpg",
    content: `While occupational burnout and Major Depressive Disorder share somatic hallmarks such as fatigue, executive dysfunction, and insomnia, their etiology and clinical trajectories differ significantly.

Burnout is context-specific. It is primarily driven by prolonged mismatch between human capacity and systemic occupational demands: lack of autonomy, values incongruence, or unsustainable workloads. Often, when removed from the toxic work environment, a burned-out individual retains hedonic capacity (the ability to enjoy non-work passions).

Conversely, clinical depression features pervasive anhedonia—a loss of pleasure across all life domains, accompanied by existential guilt, worthlessness, and psychomotor changes irrespective of setting. Accurate formulation dictates whether the therapeutic focus centers on workplace boundaries and nervous system rest, or structured behavioral activation and clinical mood stabilization.`
  }
];

export async function main() {
  console.log("🌱 TheraConnect Database Seed Prepared.");
}
