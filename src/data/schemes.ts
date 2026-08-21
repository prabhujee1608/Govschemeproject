export interface Scheme {
  id: string;
  name: string;
  department: string;
  category: string;
  description: string;
  eligibilitySummary: string;
  benefits: string;
  requiredDocuments: string[];
  officialUrl: string;
  criteria: {
    minAge?: number;
    maxAge?: number;
    genders?: string[];
    occupations?: string[];
    maxIncome?: number;
    states?: string[];
    ruralUrban?: 'Rural' | 'Urban' | 'Both';
    casteCategories?: string[];
  };
}

export const schemesData: Scheme[] = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    department: "Ministry of Agriculture and Farmers Welfare",
    category: "Agriculture",
    description: "Direct income support of ₹6,00,000 per year to all eligible landholding farmer families across India.",
    eligibilitySummary: "Landholding farmer families with cultivable land in their names.",
    benefits: "₹6,000 per year distributed in 3 equal installments of ₹2,000 directly into the bank accounts.",
    requiredDocuments: ["Aadhaar Card", "Land Ownership Documents", "Bank Account Details", "Mobile Number linked with Aadhaar"],
    officialUrl: "https://pmkisan.gov.in/",
    criteria: { occupations: ["Farmer", "Agriculture"], ruralUrban: "Both" }
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat - PM-JAY",
    department: "Ministry of Health and Family Welfare",
    category: "Healthcare",
    description: "Health insurance coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    eligibilitySummary: "Low-income families listed in SECC-2011 database or categorized families.",
    benefits: "Cashless health cover of up to ₹5,00,000 per family per year for secondary and tertiary treatments.",
    requiredDocuments: ["Aadhaar Card", "Ration Card", "Income Certificate"],
    officialUrl: "https://dashboard.pmjay.gov.in/",
    criteria: { maxIncome: 150000, ruralUrban: "Both" }
  },
  {
    id: "pm-awas-yojana",
    name: "Pradhan Mantri Awas Yojana (PMAY)",
    department: "Ministry of Housing and Urban Affairs",
    category: "Housing",
    description: "Financial assistance for affordable housing to homeless households and families living in dilapidated houses in urban and rural areas.",
    eligibilitySummary: "Families not owning a pucca house anywhere in India, falling under EWS/LIG.",
    benefits: "Interest subsidies on home loans or direct financial assistance for pucca house construction.",
    requiredDocuments: ["Aadhaar Card", "Affidavit of no pucca house", "Bank Account Passbook", "Income Certificate"],
    officialUrl: "https://pmaymis.gov.in/",
    criteria: { maxIncome: 300000, ruralUrban: "Both" }
  },
  {
    id: "pm-mudra",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    department: "Ministry of Micro, Small and Medium Enterprises",
    category: "Financial Assistance",
    description: "Collateral-free institutional loans up to ₹10 lakh for micro and small enterprises to launch or expand their businesses.",
    eligibilitySummary: "Non-corporate, non-farm small/micro enterprises and startups.",
    benefits: "Loans split into Shishu (up to ₹50k), Kishor (₹50k-₹5L), and Tarun (₹5L-₹10L) with zero collateral.",
    requiredDocuments: ["Mudra Application Form", "Business Plan", "Aadhaar Card", "PAN Card", "Address Proof of Business"],
    officialUrl: "https://www.mudra.org.in/",
    criteria: { minAge: 18, ruralUrban: "Both" }
  },
  {
    id: "pm-surya-ghar",
    name: "PM Surya Ghar: Muft Bijli Yojana",
    department: "Ministry of New and Renewable Energy",
    category: "Social Security",
    description: "Provides up to 300 units of free electricity per month to households through rooftop solar installations with massive government subsidies.",
    eligibilitySummary: "Indian resident households owning a suitable rooftop space for solar panel installation.",
    benefits: "Up to 300 units of free electricity monthly, reducing household bills and supporting green energy.",
    requiredDocuments: ["Aadhaar Card", "Electricity Bill", "Rooftop Ownership Proof", "Bank Details"],
    officialUrl: "https://pmsuryaghar.gov.in/",
    criteria: { ruralUrban: "Both" }
  },
  {
    id: "pm-ujjwala",
    name: "PM Ujjwala Yojana (PMUY)",
    department: "Ministry of Petroleum and Natural Gas",
    category: "Women & Child",
    description: "Distributes free LPG connections to women from below-poverty-line (BPL) households to support clean and smoke-free cooking.",
    eligibilitySummary: "Adult women belonging to BPL households without active gas connections.",
    benefits: "Free first LPG cylinder and gas stove, with cash assistance for installation costs.",
    requiredDocuments: ["BPL Ration Card", "Aadhaar Card", "Address Proof", "Bank Account Details"],
    officialUrl: "https://www.pmuy.gov.in/",
    criteria: { genders: ["Female"], ruralUrban: "Both" }
  },
  {
    id: "pm-kusum",
    name: "PM-KUSUM Scheme",
    department: "Ministry of New and Renewable Energy",
    category: "Agriculture",
    description: "Helps farmers install solar water pumps and set up grid-connected solar power plants on their barren lands.",
    eligibilitySummary: "Farmers, farmer cooperatives, and panchayats with cultivable or barren lands.",
    benefits: "Up to 60% subsidy for solar water pump installation and options to sell generated solar power back to Discoms.",
    requiredDocuments: ["Land Registry documents", "Aadhaar Card", "Bank Account Details", "Discom NOC"],
    officialUrl: "https://mnre.gov.in/",
    criteria: { occupations: ["Farmer", "Agriculture"], ruralUrban: "Both" }
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    department: "Ministry of Women and Child Development",
    category: "Women & Child",
    description: "A high-interest savings scheme designed for the future education and marriage expenses of a girl child.",
    eligibilitySummary: "Parents or legal guardians of a girl child aged 10 years or below.",
    benefits: "High-interest savings account (currently 8.2% p.a.) with tax deductions under Section 80C.",
    requiredDocuments: ["Girl Child Birth Certificate", "Guardian Identity Proof", "Address Proof"],
    officialUrl: "https://www.indiapost.gov.in/",
    criteria: { genders: ["Female"], maxAge: 10 }
  },
  {
    id: "pm-matru-vandana",
    name: "PM Matru Vandana Yojana (PMMVY)",
    department: "Ministry of Women and Child Development",
    category: "Women & Child",
    description: "Provides a direct cash incentive of ₹5,000–₹6,000 to pregnant and lactating mothers for their first living child to support optimal nutrition.",
    eligibilitySummary: "Pregnant women and lactating mothers in unorganized sectors.",
    benefits: "Direct cash incentives of ₹5,00,00 to ₹6,000 paid in installments directly to bank accounts.",
    requiredDocuments: ["Aadhaar Card", "MCP Card details", "Bank Passbook", "Birth registration certificate"],
    officialUrl: "https://wcd.nic.in/",
    criteria: { genders: ["Female"] }
  },
  {
    id: "pm-svanidhi",
    name: "PM SVANidhi",
    department: "Ministry of Housing and Urban Affairs",
    category: "Financial Assistance",
    description: "Offers collateral-free working capital microloans up to ₹50,000 to street vendors to resume and scale up their livelihoods.",
    eligibilitySummary: "Street vendors and hawkers operating in urban or surrounding areas.",
    benefits: "Initial loan of ₹10,000, progressing to ₹20,000 and ₹50,000 on timely repayments with interest subsidies.",
    requiredDocuments: ["Aadhaar Card", "Certificate of Vending", "Voter ID Card", "Bank Details"],
    officialUrl: "https://pmsvanidhi.mohua.gov.in/",
    criteria: { occupations: ["Street Vendor", "Shopkeeper"], ruralUrban: "Both" }
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Yojana",
    department: "Ministry of Micro, Small and Medium Enterprises",
    category: "Employment & Skill Training",
    description: "Provides end-to-end support including skill training, toolkit incentives, and low-interest loans to traditional artisans and craftspeople.",
    eligibilitySummary: "Artisans and craftspeople working with hands and tools (e.g. potters, blacksmiths, carpenters).",
    benefits: "Skill assessment certification, ₹15,000 toolkit incentive, and collateral-free enterprise loans up to ₹3 Lakhs.",
    requiredDocuments: ["Aadhaar Card", "Artisan registration card", "Bank Passbook", "Active Mobile Number"],
    officialUrl: "https://pmvishwakarma.gov.in/",
    criteria: { ruralUrban: "Both" }
  },
  {
    id: "pm-kaushal-vikas",
    name: "PM Kaushal Vikas Yojana (PMKVY)",
    department: "Ministry of Skill Development and Entrepreneurship",
    category: "Employment & Skill Training",
    description: "Offers free industry-relevant skill training and certification to youth to help them secure better livelihoods.",
    eligibilitySummary: "Indian youth aged between 15 and 45 years who are unemployed or dropouts.",
    benefits: "Free skill courses, internship facilitation, industry certifications, and employment placement assistance.",
    requiredDocuments: ["Aadhaar Card", "Educational Marksheets", "Bank Account Details", "Registration form"],
    officialUrl: "https://www.pmkvyofficial.org/",
    criteria: { minAge: 15, maxAge: 45 }
  },
  {
    id: "mgnrega",
    name: "MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act)",
    department: "Ministry of Rural Development",
    category: "Employment & Skill Training",
    description: "Guarantees at least 100 days of wage employment in a financial year to every rural household whose adult members volunteer for unskilled manual work.",
    eligibilitySummary: "Adult members of rural households willing to do unskilled manual work.",
    benefits: "Guaranteed 100 days of wage employment per year, with unemployment allowances if work is not provided within 15 days.",
    requiredDocuments: ["MGNREGA Job Card", "Aadhaar Card", "Bank Passbook"],
    officialUrl: "https://nrega.nic.in/",
    criteria: { ruralUrban: "Rural" }
  },
  {
    id: "pm-jandhan",
    name: "PM Jan Dhan Yojana (PMJDY)",
    department: "Ministry of Finance",
    category: "Social Security",
    description: "Provides universal access to banking services with zero-balance savings accounts, RuPay debit cards, and overdraft facility.",
    eligibilitySummary: "Any Indian citizen without an active bank account.",
    benefits: "Zero balance bank account, free RuPay debit card, ₹2 Lakh built-in accident insurance, and ₹10,000 overdraft facility.",
    requiredDocuments: ["Aadhaar Card", "PAN Card (optional)", "Passport size photo"],
    officialUrl: "https://pmjdy.gov.in/",
    criteria: { minAge: 10 }
  },
  {
    id: "atal-pension",
    name: "Atal Pension Yojana (APY)",
    department: "Ministry of Finance / PFRDA",
    category: "Social Security",
    description: "Offers a guaranteed monthly pension for workers in the unorganized sector to secure their old age.",
    eligibilitySummary: "Indian citizens aged between 18 and 40 years holding a savings bank account.",
    benefits: "Guaranteed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 after attaining the age of 60 years.",
    requiredDocuments: ["Aadhaar Card", "Savings Bank Account details", "Mobile Number"],
    officialUrl: "https://www.npscra.nsdl.co.in/",
    criteria: { minAge: 18, maxAge: 40 }
  },
  {
    id: "pm-jeevan-suraksha",
    name: "PM Jeevan Jyoti & Suraksha Bima",
    department: "Ministry of Finance",
    category: "Insurance",
    description: "Affordable life and accident insurance coverages providing financial security to families at low premiums.",
    eligibilitySummary: "Savings bank account holders aged 18 to 70 years.",
    benefits: "₹2 Lakh life cover under PMJJBY and ₹2 Lakh accident/disability cover under PMSBY.",
    requiredDocuments: ["Aadhaar Card", "Bank Account Details", "Nominee details"],
    officialUrl: "https://www.jansuraksha.gov.in/",
    criteria: { minAge: 18, maxAge: 70 }
  },
  {
    id: "pm-usp-csss",
    name: "Central Sector Scheme of Scholarship for College and University Students (PM-USP CSSS)",
    department: "Department of Higher Education, Ministry of Education",
    category: "Education & Scholarship",
    description: "Financial assistance to meritorious students from economically weaker sections to meet their day-to-day expenses while pursuing higher studies.",
    eligibilitySummary: "Class 12 passed students above the 80th percentile, enrolled in regular UG/PG courses with annual family income up to ₹4.5 Lakh.",
    benefits: "₹12,000 per year for the first three years of undergraduate level, and ₹20,000 per year for postgraduate level.",
    requiredDocuments: ["Class 12 Marksheet", "Income Certificate", "Aadhaar Card", "Bank Account Details", "College Admission Proof"],
    officialUrl: "https://scholarships.gov.in/",
    criteria: {
      minAge: 18,
      maxAge: 25,
      occupations: ["Student"],
      maxIncome: 450000,
      ruralUrban: "Both"
    }
  },
  {
    id: "nmmss",
    name: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    department: "Department of School Education & Literacy, Ministry of Education",
    category: "Education & Scholarship",
    description: "Scholarship to award meritorious students of economically weaker sections to arrest their drop-out at class VIII and encourage them to continue study at secondary stage.",
    eligibilitySummary: "Regular government/aided/local body school students of Class 9 to 12 with family income up to ₹3.5 Lakh, who passed Class 8 with min 55% marks and cleared the selection exam.",
    benefits: "₹12,000 per annum (₹1,000 per month) from Class 9 to Class 12.",
    requiredDocuments: ["Class 7 & 8 Marksheets", "Parental Income Certificate", "Aadhaar Card", "Bank Passbook", "School Certificate"],
    officialUrl: "https://scholarships.gov.in/",
    criteria: {
      minAge: 12,
      maxAge: 18,
      occupations: ["Student"],
      maxIncome: 350000,
      ruralUrban: "Both"
    }
  },
  {
    id: "pragati-scholarship",
    name: "AICTE Pragati Scholarship Scheme for Girl Students",
    department: "All India Council for Technical Education (AICTE), Ministry of Education",
    category: "Education & Scholarship",
    description: "An initiative to support and encourage girl students to pursue technical education (degree and diploma courses) in AICTE-approved institutions.",
    eligibilitySummary: "Girl students admitted to 1st year degree/diploma or 2nd year lateral entry in AICTE-approved institutions, with family income up to ₹8 Lakh (max 2 girl children per family).",
    benefits: "₹50,000 per annum for tuition fees, computer purchase, stationery, books, etc.",
    requiredDocuments: ["AICTE Admission Letter", "Family Income Certificate", "Aadhaar Card", "Bank Passbook", "Declaration of single/two girl child status"],
    officialUrl: "https://scholarships.gov.in/",
    criteria: {
      genders: ["Female"],
      occupations: ["Student"],
      maxIncome: 800000,
      ruralUrban: "Both"
    }
  },
  {
    id: "hdfc-parivartan-ecss",
    name: "HDFC Bank Parivartan's ECSS Scholarship",
    department: "HDFC Bank (CSR initiative via Buddy4Study)",
    category: "Education & Scholarship",
    description: "Supports meritorious students facing financial or personal crises to continue their education from Class 1 up to postgraduate level.",
    eligibilitySummary: "Indian nationals studying in Class 1 to 12, ITI, Diploma, UG, or PG courses, with minimum 55% marks in previous class and family income up to ₹2.5 Lakh, facing personal crisis.",
    benefits: "Financial assistance up to ₹75,000 depending on the level of study.",
    requiredDocuments: ["Previous Class Marksheet", "Income Proof / Crisis Proof", "Aadhaar Card", "Bank Passbook", "Current Year Admission Proof"],
    officialUrl: "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-scholarship",
    criteria: {
      occupations: ["Student"],
      maxIncome: 250000,
      ruralUrban: "Both"
    }
  },
  {
    id: "lic-hfl-vidyadhan",
    name: "LIC HFL Vidyadhan Scholarship",
    department: "LIC Housing Finance Limited (CSR initiative via Buddy4Study)",
    category: "Education & Scholarship",
    description: "Financial assistance to students from lower-income families who are pursuing higher secondary, graduation, or post-graduation.",
    eligibilitySummary: "Meritorious students in Class 11, 12, UG, or PG programs, with at least 60% marks in the qualifying board exam and family income up to ₹3.6 Lakh.",
    benefits: "Up to ₹25,000 per year based on the course level.",
    requiredDocuments: ["Marksheet of Class 10/12/UG", "Income Certificate", "Aadhaar Card / Voter ID", "Current College Fee Receipt", "Bank Passbook"],
    officialUrl: "https://www.buddy4study.com/",
    criteria: {
      occupations: ["Student"],
      maxIncome: 360000,
      ruralUrban: "Both"
    }
  }
];
