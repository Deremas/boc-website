export const company = {
  name: "Blue Ocean Creatives",
  legalName: "Blue Pixel Trading PLC",
  tin: "0089705016",
  established: "April 2023",
  phone: "+251 911 061 348",
  phoneTel: "+251911061348",
  phoneAlt: "+251 966 336 503",
  phoneAltTel: "+251966336503",
  email: "contact@blueoceancreatives.com",
  emailCoo: "coo@blueoceancreatives.com",
  address:
    "Beyene Tebelue (BT) Building, 3rd Floor, Office 301, Axum Hotel Street, Haya Hulet, Addis Ababa",
  mapUrl:
    "https://www.google.com/maps/place/Blue+Ocean+Creatives/@9.0153711,38.7833628,17z/data=!4m6!3m5!1s0x6139501b1ecfd047:0x96a57a593b117e55!8m2!3d9.0153711!4d38.7833628",
  mapEmbed:
    "https://maps.google.com/maps?cid=10855217000508128853&z=17&output=embed",
  locations: [
    {
      city: "Addis Ababa",
      role: "Headquarters",
      detail:
        "Leadership, engineering, ERP implementation, the creative studio and account management.",
      staff: "15+",
    },
    {
      city: "Dire Dawa",
      role: "IT and social media",
      detail:
        "On-site ERP implementation and support for manufacturers in the east, plus Somali and Afaan Oromoo hosts.",
      staff: "5+",
    },
    {
      city: "Adama",
      role: "Production",
      detail:
        "Resident production team since April 2025, including Lavish Medical Spa Adama and regional content.",
      staff: "3+",
    },
  ],
  staff: "23+",
  telegram: "https://t.me/Blue_Ocean_Creatives",
  chekelaUrl: "https://chkela.com",
  chekelaPlayUrl:
    "https://play.google.com/store/apps/details?id=com.chkela.v1&hl=en",
  chekelaAppStoreUrl: "https://apps.apple.com/ke/app/chkela/id6738397728",
  profilePdf: "/documents/blue-ocean-company-profile.pdf",
} as const;

export const proof = [
  { value: "50+", label: "Social media accounts" },
  { value: "100+", label: "Business systems deployed" },
  { value: "81K", label: "Followers on our own TikTok" },
  { value: "87,890", label: "Chekela learners" },
  { value: "5", label: "Content languages" },
] as const;

export const languages = [
  "Amharic",
  "Afaan Oromoo",
  "Somali",
  "Tigrigna",
  "English",
] as const;

export const why = [
  {
    title: "On the ground in three cities",
    text: "Teams in Addis Ababa, Dire Dawa and Adama shoot, host, implement and support in person.",
  },
  {
    title: "Five content languages",
    text: "Amharic, Afaan Oromoo, Somali, Tigrigna and English — not translated as an afterthought.",
  },
  {
    title: "We own our platform",
    text: "Blue Ocean ERP is built by our own engineers, so it adapts to your process.",
  },
  {
    title: "Results you can check",
    text: "Every number on this site comes from platform analytics or a signed client letter.",
  },
] as const;

export const values = [
  {
    title: "Ownership",
    text: "We treat every client’s operation as if it were our own. When something breaks, we fix it first and explain it after.",
  },
  {
    title: "Clarity",
    text: "Plain language, clear scopes and visible progress. No jargon and no surprises.",
  },
  {
    title: "Evidence",
    text: "We report what the data shows. Every result we claim can be traced to a record, a system or a signed letter.",
  },
  {
    title: "Closeness",
    text: "We work where our clients work: on the factory floor, in the warehouse and at the shop counter.",
  },
  {
    title: "Craft",
    text: "Clean engineering and good design matter, because people use our work every day.",
  },
] as const;

export const leadership = [
  {
    name: "Dawit Lake Netere",
    role: "Co-Founder & CEO",
    image: "/images/team/profile-1.webp",
    bio: "Sets strategy, partnerships and growth from Warsaw. Previously a ServiceNow consultant at Deloitte Central Europe, he co-founded and exited LearnGo and co-owned BrewBar Coffee in Poland.",
  },
  {
    name: "Befekadu Feleke",
    role: "Co-Founder, General Manager & COO",
    image: "/images/team/090.webp",
    bio: "Runs operations, client delivery and commercial work from Addis Ababa, leading 23+ staff in three cities. He co-founded Chekela and teaches paid ad management on its social media course.",
  },
  {
    name: "Michal Cal",
    role: "CFO",
    image: "/images/team/michal-cal.webp",
    bio: "Leads financial strategy, planning and financial controls, and supports the leadership team on business planning, growth and partnerships.",
  },
  {
    name: "Nathnael Zerihun",
    role: "Creative Director / Head of Social Media Wing",
    image: "/images/team/nathnael-zerihun.webp",
    bio: "Leads the social media wing and sets creative direction for health, hospitality and education accounts, including Lavish Medical Spa, Peniel, Liesak Resorts and Fikreselam General Hospital.",
  },
] as const;

export const org = {
  ceo: "CEO",
  reports: ["GM & COO", "Finance & Administration"],
  wings: [
    "Social Media Wing",
    "Technology Wing",
    "Capacity Building & Training",
    "Dire Dawa Team",
    "Adama Team",
  ],
} as const;

export const teamGroups = [
  {
    wing: "Video Editors",
    people: [
      {
        name: "Yonas Mano",
        role: "Video Editor",
        image: "/images/team/yonas-mano.webp",
      },
      {
        name: "Eskinder Tamrat",
        role: "Video Editor",
        image: "/images/team/eskinder-tamrat.webp",
      },
      {
        name: "Tsinfeadam Hailu",
        role: "Video Editor",
        image: "/images/team/tsinfeadam-hailu.webp",
      },
    ],
  },
  {
    wing: "Social Media Managers and Hosts",
    people: [
      {
        name: "Yeabkal Abera (Koki)",
        role: "Social Media Manager and Host",
        image: "/images/team/yeabkal-abera-2.webp",
      },
      {
        name: "Yeabsira Tesfaye (Maya)",
        role: "Social Media Manager and Host",
        image: "/images/team/yeabsira-tesfaye-2.webp",
      },
      {
        name: "Yeabsira Terefe",
        role: "Social Media Manager and Host",
        image: "",
      },
      {
        name: "Saron Aklile",
        role: "Social Media Manager, Host and Sales",
        image: "",
      },
    ],
  },
  {
    wing: "Cinematography",
    people: [
      {
        name: "Rebira Abraham",
        role: "Cinematographer and Video Editor",
        image: "/images/team/rebira-abraham-3.webp",
        frame: "full",
      },
    ],
  },
  {
    wing: "Technology Wing",
    people: [
      {
        name: "Dereje Masresha",
        role: "Full-stack ERP Developer",
        image: "/images/team/dereje-masresha-2.webp",
      },
    ],
  },
] as const;

export const story = [
  "Blue Ocean Creatives began with a conversation between two old friends. Dawit Lake Netere was building technology companies in Europe. Befekadu Feleke had moved from television commercials into digital work at Raphon Advertising in Addis Ababa.",
  "In April 2023 they founded Blue Pixel Trading PLC, trading as Blue Ocean Creatives, on one conviction: Ethiopian businesses deserve technology and marketing built around how they actually work. The company started with two offers, social media management and stock and financial management systems, and Befekadu trained the founding team to deliver them.",
  "The company grew on two tracks at once. A stock system for shops and warehouses became full ERP implementations, and eventually Blue Ocean ERP. A small social media desk became a wing with its own creative director, designers, videographers, editors, hosts and media buyer. In the same year the company launched Chekela.",
  "Today Blue Ocean Creatives employs more than 23 full-time staff in Addis Ababa, Dire Dawa and Adama, has more than 100 systems in daily use, and holds signed references from clients in both practices.",
] as const;

export const mission =
  "To give Ethiopian businesses the systems to run well and the digital presence to grow: built locally, delivered on site and measured by results.";

export const vision =
  "To be the partner Ethiopian businesses trust most for business systems and digital growth, helping Ethiopian enterprises compete with the best in the region.";

export const digitalEthiopia = [
  {
    title: "Modernising industry",
    text: "Blue Ocean ERP digitises production, inventory, quality, procurement and finance for Ethiopian manufacturers.",
  },
  {
    title: "Homegrown technology",
    text: "Our platforms are designed, built and supported in Ethiopia by Ethiopian engineers.",
  },
  {
    title: "SME growth",
    text: "Our stock management systems and marketing services are built for small and growing businesses, not only large enterprises.",
  },
  {
    title: "Digital skills and education",
    text: "Every implementation includes hands-on user training, and Chekela brings grades 9–12 learning content online for Ethiopian students.",
  },
] as const;

export const timeline = [
  {
    year: "2023",
    text: "Blue Pixel Trading PLC founded in Addis Ababa in April. First stock and financial management systems and first social media clients. Chekela launched.",
  },
  {
    year: "2024",
    text: "First full ERP implementation. Chekela recommended to secondary schools by the Addis Ababa City Education Bureau. Long-term marketing engagements begin with Apex and Peniel.",
  },
  {
    year: "2025",
    text: "Social media training at Nisir Training Center, later published on Chekela. Adama production team and Dire Dawa team set up. Stock systems pass 100 businesses. Blue Ocean ERP delivered for Nova Water. Odoo delivered for Nokdes.",
  },
  {
    year: "2026",
    text: "Blue Ocean ERP reaches 329 features across 21 modules and is live at Konel. Chekela recognised by iceaddis Venture Meda. The social media wing passes 50 accounts, and the team grows past 23 full-time staff.",
  },
] as const;
