export const marketingServices = [
  {
    title: "Social media management",
    text: "Strategy, content calendars, daily publishing and monthly reporting.",
  },
  {
    title: "Content and video production",
    text: "Scriptwriting, on-site filming, editing, motion graphics, photography and design, with on-camera hosts.",
  },
  {
    title: "Paid advertising",
    text: "Meta, TikTok, Google Ads and Telegram Ads — targeting, A/B testing and budget optimisation for lower cost per lead.",
  },
  {
    title: "Analytics and conversion tracking",
    text: "GA4, Google Tag Manager and pixels tracking calls, WhatsApp and Telegram clicks, enquiries and form submissions.",
  },
  {
    title: "Community management",
    text: "Fast replies to comments and messages, livestreams and Q&A, with sensitive questions escalated to you.",
  },
  {
    title: "YouTube and long-form",
    text: "Channel strategy and long-form storytelling that builds retention and organic growth.",
  },
  {
    title: "Branding and identity",
    text: "Logos, visual identity, brand guidelines and launch assets.",
  },
  {
    title: "Influencer collaborations",
    text: "The right creators, briefed and managed.",
  },
  {
    title: "Training",
    text: "Digital marketing, content and paid ads training for in-house teams — in person or on Chekela.",
  },
] as const;

export const marketingProcess = [
  { step: "01", title: "Audit", text: "We review your channels, audience, competitors and results to set a clear baseline." },
  { step: "02", title: "Strategy", text: "We agree goals, audiences, platform roles, content pillars and KPIs with you in writing." },
  { step: "03", title: "Create", text: "Our studio produces designs, videos and copy in your brand voice, in Amharic, English or both." },
  { step: "04", title: "Publish & engage", text: "Scheduled publishing and active community management: comments, messages and replies." },
  { step: "05", title: "Amplify", text: "Paid campaigns and creator partnerships extend your reach beyond existing followers." },
  { step: "06", title: "Measure & improve", text: "Monthly reports from platform analytics, with clear actions for the next month." },
] as const;

export const marketingResults = [
  {
    account: "Lavish Medical Spa, Addis Ababa",
    platform: "TikTok",
    results: ["13M views", "317K likes", "35K shares", "5,777 comments"],
  },
  {
    account: "Lavish Medical Spa, Addis Ababa",
    platform: "Facebook & Instagram",
    results: ["4.2M views", "59.7K interactions", "40.3K page visits", "7.5K new follows"],
  },
  {
    account: "Lavish Medical Spa, Dire Dawa",
    platform: "TikTok",
    results: ["3.9M views", "138K likes", "15K shares"],
  },
  {
    account: "Peniel Training Institute",
    platform: "Facebook & Instagram",
    results: ["8.3M views", "18.7K link clicks", "32.7K page visits"],
  },
  {
    account: "Peniel Training Institute",
    platform: "TikTok",
    results: ["2.2M views", "152K likes", "12K shares"],
  },
  {
    account: "Apex Financial Solutions",
    platform: "Facebook & Instagram",
    results: ["3.4M views", "51.7K interactions", "11.2K new follows"],
  },
  {
    account: "Apex Financial Solutions",
    platform: "TikTok",
    results: ["2.3M views", "129K likes", "12K shares"],
  },
] as const;

export const languageExamples = [
  { client: "Lavish Medical Spa", languages: "Amharic, Afaan Oromoo, Somali" },
  { client: "BeMaleda Trading", languages: "Amharic, Afaan Oromoo, Tigrigna" },
  { client: "Gursha Hub", languages: "Amharic, Afaan Oromoo" },
  { client: "Phi Engineering", languages: "Amharic, Afaan Oromoo" },
  { client: "Union Specialty Dental Clinic", languages: "Tigrigna" },
] as const;

export const healthClients = [
  { name: "Lavish Medical Spa", logo: "/logos/clients/lavish.jpg" },
  { name: "Fikreselam General Hospital" },
  { name: "Harme Medical Center", logo: "/logos/clients/harme.jpg" },
  { name: "Union Specialty Dental Clinic" },
  { name: "Radiant Health Club", logo: "/logos/clients/radiant.jpg" },
] as const;

export const showcase = [
  {
    title: "Master Henok",
    image: "/images/marketing/instagram-01.png",
    href: "https://instagram.com/blue_ocean_creatives",
  },
  {
    title: "In-house social creative",
    image: "/images/marketing/instagram-02.png",
    href: "https://instagram.com/blue_ocean_creatives",
  },
  {
    title: "In-house social creative",
    image: "/images/marketing/instagram-03.png",
    href: "https://instagram.com/blue_ocean_creatives",
  },
  {
    title: "In-house social creative",
    image: "/images/marketing/instagram-04.png",
    href: "https://www.tiktok.com/@blue_ocean_creatives",
  },
  {
    title: "On location",
    image: "/images/team/team-dsc.jpg",
    href: "https://instagram.com/blue_ocean_creatives",
  },
] as const;

export const erpStats = [
  { value: "329", label: "Features" },
  { value: "21", label: "Modules" },
  { value: "56", label: "Standard reports" },
  { value: "23", label: "Permission types" },
  { value: "8", label: "Industry verticals" },
] as const;

export const erpModules = [
  {
    id: "operations",
    title: "Operations",
    items: [
      "Procurement",
      "Inventory",
      "Production",
      "Quality",
      "Maintenance",
      "Dispatch",
      "Fleet",
      "Returnable containers",
    ],
  },
  {
    id: "commercial",
    title: "Commercial",
    items: ["Sales", "POS", "Customers", "Credit", "Cheques", "Agents", "Truck sales"],
  },
  {
    id: "corporate",
    title: "Corporate",
    items: [
      "Finance",
      "Ethiopian tax",
      "Budget",
      "HR",
      "Biometric attendance",
      "Payroll",
      "Dashboards",
    ],
  },
] as const;

export const erpDifferences = [
  "Dispatch under real control: six gates, four departments, no step can be skipped.",
  "Waste caught the same shift, not at month end.",
  "Your paper quality forms, digitised field by field.",
  "Attendance to payroll in one flow, with biometric clock-in.",
  "Ethiopian VAT, excise and withholding as settings.",
  "English and Amharic interfaces; Telegram alerts and approvals.",
] as const;

export const painPoints = [
  "Stock figures that never match physical count",
  "Production losses nobody can explain",
  "Credit customers nobody is chasing",
  "Attendance and payroll done by hand",
  "Month-end reports that take a week",
] as const;

export const otherSystems = [
  {
    title: "Odoo implementation",
    text: "For clients who prefer an international platform — configuration, custom modules, migration and training. Nova Water and Nokdes Trading run on Odoo systems we delivered.",
  },
  {
    title: "Stock and financial management",
    text: "Live stock, sales and branch control for shops, wholesalers and supermarkets. 100+ businesses, 96 branches.",
  },
  {
    title: "Industry systems",
    text: "Restaurants and cafés, bakeries, supermarkets, EV charging stations, import and distribution, job shops.",
  },
  {
    title: "Custom software, web and mobile",
    text: "Operational systems, portals, mobile apps and websites built around your process.",
  },
] as const;

export const systemProjects = [
  {
    client: "Konel Natural Purified Water, Dire Dawa",
    system: "Blue Ocean ERP for a 24-hour, three-shift bottling plant",
    reference: "Feb 2026",
    href: "/work/konel",
  },
  {
    client: "Nova Water (Melayan Manufacturing), Sebeta",
    system: "Odoo ERP for manufacturing, procurement and quality, in three months",
    reference: "Nov 2025",
    href: "/work/nova-water",
  },
  {
    client: "Wow Energy Services (Smart Gas)",
    system: "Customised ERP for LPG distribution",
    reference: "Feb 2026",
    href: "/work/wow-energy",
  },
  {
    client: "Vector Advertising & Manufacturing",
    system: "Full-scale ERP for a job-order manufacturer",
    reference: "Feb 2026",
  },
  {
    client: "Apex Financial Solutions",
    system: "ERP plus the Apex Tax School training platform",
    reference: "2026",
    href: "/work/apex",
  },
  {
    client: "Nokdes Trading",
    system: "Odoo B2B wholesale and supplier platform",
    reference: "Jan 2025",
  },
  {
    client: "Raphon Advertising",
    system: "ERP for projects, inventory, procurement, finance, HR and CRM",
    reference: "Jun 2025",
  },
] as const;

export const implementationSteps = [
  { title: "Discover", text: "On-site workshops with each department to map current processes, documents and pain points." },
  { title: "Design", text: "Requirements become system design, workflows, roles and approval chains." },
  { title: "Configure & build", text: "The platform is configured and client-specific features are built in iterations, with regular demonstrations." },
  { title: "Migrate & integrate", text: "Items, customers, suppliers and opening balances are cleaned and loaded." },
  { title: "Test / UAT", text: "Your own staff test real scenarios. Every issue is logged, prioritised and closed." },
  { title: "Train & go live", text: "Role-based training on site, a parallel run where needed, and go-live support." },
  { title: "Support & improve", text: "Post-launch support, issue resolution, enhancements and periodic reviews." },
] as const;

export const faqs = [
  {
    question: "How long does implementation take?",
    answer:
      "It depends on modules, sites and how ready your data is. We agree a timeline in writing before we start; Nova Water’s ERP was delivered in three months.",
  },
  {
    question: "Can it run across several branches and cities?",
    answer:
      "Yes. It is web-based and built for multi-branch, multi-warehouse and multi-company operations.",
  },
  {
    question: "Can you bring in our existing data?",
    answer:
      "Yes. We clean and load items, customers, suppliers and opening balances, and you sign off the migration before go-live.",
  },
  {
    question: "Do you train our staff?",
    answer: "Yes. Every implementation includes role-based training on site and user guides.",
  },
  {
    question: "Can it be adapted to our process?",
    answer:
      "Yes. We own the platform, so our engineers configure workflows and build features for your operation.",
  },
  {
    question: "How is it priced?",
    answer:
      "By modules, users and sites. After a free requirements session we send a fixed-price proposal.",
  },
] as const;

export const chekelaFeatures = [
  "Grade 9–12 lessons, quizzes and exams",
  "Matriculation revision with past national exam questions",
  "Professional courses (web and mobile development, digital marketing)",
  "AI tutor in English, Amharic, Afaan Oromoo, Tigrigna and Somali",
  "Exams generated from photos",
  "Planner, communities, offline videos and leaderboard",
] as const;

export const chekelaStats = [
  { value: "87,890", label: "Learners" },
  { value: "43", label: "Courses" },
  { value: "28.3K", label: "Monthly active Android users" },
  { value: "105.8K", label: "TikTok followers" },
] as const;

export const homeResults = [
  {
    value: "13M",
    label: "TikTok views in 12 months",
    client: "Lavish Medical Spa",
    href: "/work/lavish-medical-spa",
  },
  {
    value: "8.3M",
    label: "Meta views · 18.7K link clicks",
    client: "Peniel Training Institute",
    href: "/work/peniel",
  },
  {
    value: "24/7",
    label: "Blue Ocean ERP in a three-shift bottling plant",
    client: "Konel Natural Purified Water",
    href: "/work/konel",
  },
] as const;

export const interestOptions = [
  "Digital marketing",
  "Blue Ocean ERP demo",
  "Odoo",
  "Stock management",
  "Custom software",
  "Training",
  "Other",
] as const;

export const contactPreferences = ["Phone", "Telegram", "Email"] as const;
