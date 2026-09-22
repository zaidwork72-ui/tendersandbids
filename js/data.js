// data.js

const homepageData = {
  navLinks: [
    { label: "Tenders", href: "/pages/tenders/tenderlisting.html", hasChevron: true },
    { label: "About us", href: "#" },
    { label: "Blogs", href: "#" },
    { label: "Contact us", href: "#" }
  ],
  trustBadges: [
    { icon: "verified", label: "Verified sources" },
    { icon: "globe", label: "Global coverage" },
    { icon: "unlock", label: "No subscription required" },
    { icon: "layers", label: "Relevant opportunities" },
    { icon: "action", label: "Built for action" }
  ],
  steps: [
    {
      number: "01",
      icon: "search",
      title: "Search & Refine",
      text: "Find tenders matching your requirements."
    },
    {
      number: "02",
      icon: "save",
      title: "Preview and evaluate",
      text: "Review key details before spending a credit."
    },
    {
      number: "03",
      icon: "recieve",
      title: "Save your search",
      text: "Save up to 5 searches for relevant tenders."
    },
    {
      number: "04",
      icon: "eye",
      title: "Access when ready",
      text: "Use 1 credit when you decide to pursue a tender."
    },
    {
      number: "05",
      icon: "action0",
      title: "No subscription required",
      text: "Pay only for the tenders you choose to access."
    }
  ],
  why: [
    {
      number: "01",
      icon: "trending",
      title: "Fresh opportunities",
      text: "Access newly published tenders and RFPs from procurement sources worldwide."
    },
    {
      number: "02",
      icon: "fileSearch",
      title: "Evaluate opportunities",
      text: "Review key details such as value, location, scope and deadline before spending a credit."
    },
    {
      number: "03",
      icon: "lockKey",
      title: "Pay only when you need",
      text: "Pay $1 to access the full tender. No annual subscription or long-term commitment."
    },
    {
      number: "04",
      icon: "multiple",
      title: "Built for action",
      text: "Download, share and track tenders. Set alerts for similar opportunities and build your procurement pipeline."
    },
  ],
  regions: [
    { name: "Europe", count: "3,842 opportunities" },
    { name: "Middle East", count: "1,291 opportunities" },
    { name: "North America", count: "2.105 opportunities" },
    { name: "Latin America", count: "3,842 opportunities" },
    { name: "Africa", count: "500 opportunities" },
    { name: "Asia-Pacific", count: "2,887 opportunities" }
  ],
  industries: [
    { name: "Information technology", count: "5,724" },
    { name: "Construction & works", count: "2,318" },
    { name: "Healthcare", count: "3,456" },
    { name: "Energy", count: "1,892" },
    { name: "Agriculture", count: "987" },
    { name: "Defence & Security", count: "2,641" },
    { name: "Logistics & Transport", count: "1,205" }
  ],
  searchFilters: [
    { label: "Country", value: "Germany, UAE, Saudi, UK" },
    { label: "Buyer", value: "Government" },
    { label: "Min Value", value: ">$1M" },
    { label: "Industry", value: "Medical Equipment" },
    { label: "Deadline", value: "Next 90 days" }
  ],
  searchResults: [
    {
      flag: "🇩🇪",
      country: "Germany",
      industry: "Medical Equipment",
      title: "Supply and installation of medical imaging equipment - mri and systems",
      value: "USD 2.4M",
      deadline: "28d left"
    },
    {
      flag: "🇦🇪",
      country: "United Arab Emirates",
      industry: "Medical Equipment",
      title: "Automated laboratory diagnostic systems - procurement and maintenance",
      value: "USD 23.1M",
      deadline: "51d left"
    },
    {
      flag: "🇬🇧",
      country: "United Kingdom",
      industry: "Medical Equipment",
      title: "Hospital patient monitoring systems - supply and installation",
      value: "USD 5.1M",
      deadline: "10d left",
      urgent: true
    },
    {
      flag: "🇸🇦",
      country: "Saudi Arabia",
      industry: "Medical Equipment",
      title: "Surgical robotics platform - deployment and training services",
      value: "USD 49.3M",
      deadline: "61d left"
    }
  ],
  creditFeatures: [
    "Full tender document access",
    "Issuer contact details",
    "Technical specifications",
    "Submission requirements",
    "Download & share",
    "Save searches and set alerts"
  ],
  footerColumns: [
    {
      title: "Product",
      links: ["Advanced search", "Search & Filter", "Saved Searches", "Tender Alerts", "Pricing"]
    },
    {
      title: "TENDERS",
      links: ["Europe", "Middle East", "North America", "Asia-Pacific", "Africa", "Latin America"]
    },
    {
      title: "Company",
      links: ["About", "Support", "Sitemap", "Privacy Policy", "Terms of Service"]
    }
  ]
};

const locationData = [
  {
    country : "India",
    states: [
      { name: "Maharashtra", selected: true},
      { name: "Delhi", selected: true},
      { name: "Karnataka", selected: false},
      {name: "Tamil Nadu", selected: false},
      {name: "Gujarat", selected: false}
    ],
    more: "+95 more"
  },
  {
    country : "United States",
    states: [
      {name: "California", selected: true},
      {name: "New York", selected: true},
      {name: "Texas", selected: false},
      {name: "Florida", selected: false}
    ],
    more: "+46 more"
  },
  {
    country : "UAE",
    states: [
      {name: "Dubai", selected: true},
      {name: "Abu Dhabi", selected: false},
      {name: "Sharjah", selected: false}
    ],
    more: "+4 more"
  }
]


const tenderListingPage = {
  searchQuery: "Medical equipment government tenders in Germany",

  activeFilter: [
    { name: "Medical Equipment", active: true },
    { name: "Germany", active: true },
    { name: "Government Buyers", active: true },
    { name: "All Values", active: false },
    { name: "All Deadlines", active: false },
  ],

  resultsCount: 847,

  regions: [
    { name: "Europe", count: "3,842" },
    { name: "Middle East", count: "1,291" },
    { name: "North America", count: "2,105" },
    { name: "Asia-Pacific", count: "2,887" },
    { name: "Africa", count: "984" },
    { name: "Latin America", count: "731" },
  ],

  industries: [
    { name: "Information Technology", count: "4,210" },
    { name: "Construction & Works", count: "3,891" },
    { name: "Healthcare", count: "2,740" },
    { name: "Energy", count: "1,984" },
    { name: "Defence & Security", count: "1,582" },
    { name: "Logistics & Transport", count: "1,388" },
    { name: "Water & Utilities", count: "1,120" },
  ],

  tenderTypes: [
    { name: "Supply" },
    { name: "Services" },
    { name: "Works" },
    { name: "Consulting" },
    { name: "Framework" },
  ],

  tenders: [
    {
      flag: "germany", country: "Germany", type: "SUPPLY", industry: "Healthcare",
      status: "open", value: "EUR 2.4M", closes: "2025-02-15", urgent: false,
      title: "Supply and Installation of Medical Imaging Equipment — MRI and CT Systems",
      buyer: "Bundesministerium für Gesundheit · Berlin",
      desc: "Procurement of high-field MRI systems (1.5T and 3T) and multi-slice CT scanners for four federal hospital facilities. Includes installation, commissioning, and five-year maintenance contracts.",
      ref: "BMG/2024/MED/4821", published: "2024-12-18",
    },
    {
      flag: "uae", country: "United Arab Emirates", type: "WORKS", industry: "Information Technology",
      status: "open", value: "USD 23.1M", closes: "2025-03-10", urgent: false,
      title: "Smart City Digital Infrastructure Programme — Phase II",
      buyer: "Dubai Municipality · Dubai",
      desc: "Design, supply and implementation of smart city digital infrastructure including IoT sensor networks, city-wide data platform, intelligent traffic management systems, and integrated command and control centre.",
      ref: "DM/ICT0/2024/0934", published: "2024-12-20",
    },
    {
      flag: "uk", country: "United Kingdom", type: "SERVICES", industry: "Information Technology",
      status: "closing", closingIn: "10D", value: "GBP 5.1M", closes: "2025-01-28", urgent: true,
      title: "Enterprise Tax Management Software — Licensing and Support Services",
      buyer: "HM Revenue & Customs · London",
      desc: "Multi-year enterprise software licensing for tax calculation and case management systems, including maintenance releases, technical support, and bespoke development capacity.",
      ref: "HMRC/ICT/2024/7702", published: "2024-12-15",
    },
    {
      flag: "saudi", country: "Saudi Arabia", type: "WORKS", industry: "Energy",
      status: "open", value: "USD 49.3M", closes: "2025-03-20", urgent: false,
      title: "Solar PV Power Generation Facility — 50MW Grid-Connected",
      buyer: "NEOM Company · Tabuk",
      desc: "EPC contract for a 50MW ground-mounted photovoltaic power plant connected to the NEOM internal grid. Includes land preparation, PV module supply, mounting structure, grid interconnection substation and SCADA systems.",
      ref: "NEOM/ENG/2024/2250", published: "2024-12-10",
    },
    {
      flag: "australia", country: "Australia", type: "FRAMEWORK", industry: "Defence & Security",
      status: "closing", closingIn: "4D", value: "AUD 8.9M", closes: "2025-01-22", urgent: true,
      title: "Protective and Safety Equipment — National Standing Offer",
      buyer: "Department of Defence · Canberra",
      desc: "Establishment of a national standing offer arrangement for the supply of personal protective equipment, safety apparel and associated accessories to ADF and Defence civilian personnel across all states and territories.",
      ref: "CASG/EQ/2024/3318", published: "2024-12-22",
    },
    {
      flag: "canada", country: "Canada", type: "SERVICES", industry: "Information Technology",
      status: "open", value: "CAD 12M", closes: "2025-02-08", urgent: false,
      title: "Cloud Computing and Managed Infrastructure Services",
      buyer: "Shared Services Canada · Ottawa",
      desc: "Managed cloud infrastructure services for Government of Canada workloads, including migration support, security operations, and 24/7 managed services under Protected B security classification.",
      ref: "SSC/ICT/2024/5590", published: "2024-12-17",
    },
    {
      flag: "sa", country: "South Africa", type: "WORKS", industry: "Water & Utilities",
      status: "open", value: "USD 26M", closes: "2025-03-01", urgent: false,
      title: "Bulk Water Treatment Plant — Upgrade and Expansion",
      buyer: "eThekwini Metropolitan Municipality · Durban",
      desc: "Civil and mechanical works for the upgrade and capacity expansion of the Wiggins Water Treatment Works, increasing daily treatment capacity from 340 Ml/day to 520 Ml/day.",
      ref: "ETM/WS/2024/8841", published: "2024-12-05",
    },
    {
      flag: "netherlands", country: "Netherlands", type: "CONSULTING", industry: "Information Technology",
      status: "closing", closingIn: "13D", value: "EUR 890K", closes: "2025-01-31", urgent: true,
      title: "Cybersecurity Assessment and Penetration Testing Services",
      buyer: "Ministerie van Justitie en Veiligheid · The Hague",
      desc: "Comprehensive cybersecurity assessment services including penetration testing, red team exercises, vulnerability assessment, and security architecture review for Ministry ICT infrastructure.",
      ref: "MJV/ICT/2024/6650", published: "2024-12-19",
    },
    {
      flag: "singapore", country: "Singapore", type: "SERVICES", industry: "Logistics & Transport",
      status: "open", value: "SGD 31.5M", closes: "2025-04-05", urgent: false,
      title: "Port Logistics Automation — Terminal Operating System Upgrade",
      buyer: "Maritime and Port Authority of Singapore · Singapore",
      desc: "Design, supply, implementation and integration of next-generation Terminal Operating System (TOS) for Tuas Port Phase II, including automated container tracking, AI-assisted resource allocation, and digital twin capability.",
      ref: "MPA/IT/2024/1182", published: "2024-12-12",
    },
    {
      flag: "brazil", country: "Brazil", type: "SUPPLY", industry: "Healthcare",
      status: "open", value: "USD 9.7M", closes: "2025-02-20", urgent: false,
      title: "National Immunisation Programme — Vaccine Cold Chain Equipment",
      buyer: "Ministério da Saúde · Brasília",
      desc: "Supply of cold chain equipment for the National Immunisation Programme including ultra-low temperature freezers, pharmaceutical refrigerators, transport coolers and associated temperature monitoring systems for 850 health facilities.",
      ref: "MS/SVS/2024/9940", published: "2024-12-08",
    },
  ],
};