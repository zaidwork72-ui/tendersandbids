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
      title: "Register & save",
      text: "Save searches and preferences for later."
    },
    {
      number: "03",
      icon: "recieve",
      title: "Receive tenders",
      text: "Get relevant opportunities as they're published."
    },
    {
      number: "04",
      icon: "eye",
      title: "Access",
      text: "Use credits to access full tender information."
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
      text: "See key information such as buyer, location, scope, value and deadline before spending a credit."
    },
    {
      number: "03",
      icon: "lockKey",
      title: "Pay only when you need",
      text: "Access full tender information for just $1. No annual subscription or long-term commitment."
    },
    {
      number: "04",
      icon: "multiple",
      title: "Built for action",
      text: "Download, share and track opportunities. Set alerts for similar tenders and build your procurement pipeline."
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
  activeFilter: [
    {
      name: "Medical Equipment",
      icons: "blueX",
      active: true
    },
    {
      name: "Germany",
      icons: "blueX",
      active: true
    },
    {
      name: "Government Buyers",
      icons: "blueX",
      active: true
    },
    {
      name: "All Values",
      icons: "greyX",
      active: false
    },
    {
      name: "All Deadlines",
      icons: "greyX",
      active: false
    },
  ]
}