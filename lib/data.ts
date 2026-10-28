/**
 * All site content lives here so it can be edited without touching components.
 *
 * Rule for this file: only facts Nezira has published (her previous site,
 * résumé and certificates). Anything not yet confirmed is written as a
 * `TODO(nezira): ...` string. TODO strings render as a visible note in
 * `npm run dev` and are hidden in production builds (see `isTodo`).
 */

export const TODO_PREFIX = "TODO(nezira):";
export const isTodo = (value: string | undefined | null) =>
  !value || value.startsWith(TODO_PREFIX);

export const site = {
  url: "https://neziraworkuu.vercel.app",
  name: "Nezira Worku",
  shortName: "Nezira W.",
  role: "Software Engineer · Product Builder",
  title: "Nezira Worku — Software Engineer & Product Builder",
  description:
    "Nezira Worku is a Software Engineering student and full-stack product builder in Addis Ababa. She builds reliable enterprise systems and modern web applications with Python, Odoo, PostgreSQL and Next.js.",
  valueLine: "I take your idea from concept to production.",
  availability: "Available for new projects",
  location: "Addis Ababa, Ethiopia",
  timeZone: "Africa/Addis_Ababa",
  timeZoneLabel: "GMT+3",
  photo: {
    src: "/pink-shifon.jpg",
    alt: "Portrait of Nezira Worku in a pink chiffon headscarf",
    width: 720,
    height: 1280,
  },
  resumeUrl:
    "https://docs.google.com/document/d/1z5Ex9RoHyJFe9RqCysidAT4FiSQjFHxEL_VcPHyEP7A/edit?usp=sharing",
  googleVerification: "6_9wFdW3MQSNNGRCfYaSii_ByqbPn2p8wZu4PUFKvS4",
  // No public email has been published yet, so the copy-email action is hidden.
  email: "TODO(nezira): public email address to show on the site",
} as const;

export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: "telegram" | "linkedin" | "x" | "github" | "phone";
};

export const socials: Social[] = [
  { label: "LinkedIn", handle: "neziraworkuali", href: "https://www.linkedin.com/in/neziraworkuali", icon: "linkedin" },
  { label: "GitHub", handle: "Jennah198", href: "https://github.com/Jennah198", icon: "github" },
  { label: "Telegram", handle: "@Nezira_worku_ali", href: "https://t.me/Nezira_worku_ali", icon: "telegram" },
  { label: "X", handle: "@Nezira_Worku", href: "https://x.com/Nezira_Worku", icon: "x" },
  { label: "Phone", handle: "+251 900 004 848", href: "tel:+251900004848", icon: "phone" },
];

export const twitterHandle = "@Nezira_Worku";

export const about = {
  paragraphs: [
    "I'm Nezira, a Software Engineering student and product builder focused on turning complex ideas into reliable digital products. My work spans full-stack development, backend systems, databases, and enterprise applications.",
    "My recent experience with Python, Odoo, PostgreSQL, and production-oriented backend systems has pushed me deeper into software architecture, data integrity, business logic, and scalable applications. I still enjoy building across the stack, but I'm increasingly focused on the engineering behind systems that need to work reliably.",
  ],
};

export const highlights = [
  "Odoo / ERP backend internship",
  "Team Lead at Innobiz K",
  "Lead Developer at HMSA",
  "H.E.R Hackathon 2026",
  "ALX Her Commerce Hackathon 2026",
];

export type Stat = { value: number; suffix?: string; prefix?: string; label: string; display?: string };

export const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Projects built" },
  { value: 5, suffix: "+", label: "Internships & programs" },
  // TODO(nezira): both hackathon certificates on the site say "Participation".
  // Confirm placements before publishing this stat (see QUESTIONS_FOR_NEZIRA.md #1).
  { value: 2, suffix: "×", label: "Hackathon winner" },
  // The old site said "5th year", but ASTU is listed as 2023–Present.
  // Until she confirms, show the engineering + business combo instead of a year.
  { value: 2, label: "Studying engineering + business", display: "SE + BA" },
];

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

export type ProjectLink = { label: string; href: string; kind: "live" | "code" | "frontend" | "backend" };

export type CaseStudy = {
  slug: string;
  title: string;
  /** One-line outcome shown on the card. */
  summary: string;
  description: string;
  image: { src: string; width: number; height: number; alt: string };
  role: string;
  context: string;
  stack: string[];
  links: ProjectLink[];
  nda?: boolean;
  sections: {
    problem: string[];
    role: string[];
    architecture: string[];
    challenges: string[];
    outcome: string[];
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "school-management-system",
    title: "School Management System",
    summary:
      "A centralized Odoo ERP that runs a school's academic and administrative operations in one place.",
    description:
      "A comprehensive school management system built under NDA with Odoo to streamline academic and administrative operations. The system manages students, teachers, classes, enrollment, attendance, and school workflows through a centralized ERP architecture.",
    image: { src: "/SMS.png", width: 981, height: 705, alt: "School Management System dashboard screenshot" },
    role: "TODO(nezira): your exact role on this project",
    context: "Built under NDA",
    stack: ["Odoo", "Python", "PostgreSQL", "Next.js"],
    nda: true,
    links: [
      { label: "Frontend", href: "https://asyncschool.vercel.app/", kind: "frontend" },
      { label: "Backend", href: "https://async-school-system.onrender.com/", kind: "backend" },
    ],
    sections: {
      problem: [
        "Schools juggle students, teachers, classes, enrollment and attendance across separate tools and paperwork. The goal was to streamline academic and administrative operations in one system.",
      ],
      role: ["TODO(nezira): what you personally built, and whether this was solo or team work (and team size)."],
      architecture: [
        "Built on Odoo with Python and PostgreSQL, using a centralized ERP architecture so every school workflow shares one data model.",
        "A separate Next.js frontend sits in front of the Odoo backend.",
        "TODO(nezira): key modules, data model decisions, and how the frontend talks to Odoo (REST, JSON-RPC, …).",
      ],
      challenges: ["TODO(nezira): the hardest technical problem and how you solved it."],
      outcome: ["TODO(nezira): real outcomes only, e.g. number of modules, users, or schools using it."],
    },
  },
  {
    slug: "sadam-hussien-law-office",
    title: "Sadam Hussien Law Office",
    summary: "A professional digital presence for a law office: services, expertise and contact in one clean site.",
    description:
      "A modern frontend website designed for Sadam Hussien Law Office to establish a professional digital presence. The interface presents legal services, company information, expertise, and contact details through a clean and responsive user experience.",
    image: { src: "/shlo.png", width: 987, height: 711, alt: "Sadam Hussien Law Office website screenshot" },
    role: "TODO(nezira): your exact role on this project",
    context: "Client website",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    links: [
      { label: "Live site", href: "https://law-firm-website-an1q-5175ijkbm.vercel.app/", kind: "live" },
      { label: "Source", href: "https://github.com/Jennah198/law-firm-website", kind: "code" },
    ],
    sections: {
      problem: ["The law office needed a professional digital presence that clearly presents its legal services, company information, expertise and contact details."],
      role: ["TODO(nezira): design + build alone, or with a team? Who was the client contact?"],
      architecture: [
        "A frontend site built with Next.js and TypeScript, styled with Tailwind CSS and shadcn/ui components.",
        "Designed to be clean and responsive across devices.",
      ],
      challenges: ["TODO(nezira): a real challenge from this build (content, design, performance, client feedback…)."],
      outcome: ["TODO(nezira): real outcomes only (launched date, client feedback, inquiries…)."],
    },
  },
  {
    slug: "hmsa-website",
    title: "HMSA Website",
    summary: "A community platform that helps the Hira Muslim Students Association share its activities and resources.",
    description:
      "A digital platform for the Hira Muslim Student Association built to strengthen communication, community engagement, and access to organizational resources. The website provides information about HMSA, its activities, initiatives, and community programs through a responsive modern interface.",
    image: { src: "/hmsa1.png", width: 987, height: 597, alt: "HMSA website hero section screenshot" },
    role: "TODO(nezira): your exact role on this project",
    context: "Hira Muslim Students Association",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    links: [
      { label: "Live site", href: "https://v0-hira-muslim-association-website.vercel.app/", kind: "live" },
      { label: "Source", href: "https://github.com/Jennah198/hira-portfolio", kind: "code" },
    ],
    sections: {
      problem: ["HMSA needed a central place to strengthen communication and community engagement, and to give members access to organizational resources."],
      role: ["TODO(nezira): your part vs. the team's, and team size."],
      architecture: [
        "A Next.js and TypeScript site styled with Tailwind CSS, with Supabase as the backend.",
        "TODO(nezira): what Supabase stores (events, members, resources?) and how content is managed.",
      ],
      challenges: ["TODO(nezira): a real challenge from this build."],
      outcome: ["TODO(nezira): real outcomes only (members reached, events published…)."],
    },
  },
];

export type MiniProject = { name: string; href: string };

export const moreProjects: MiniProject[] = [
  { name: "Womens Safety System", href: "https://github.com/Jennah198/womens-safety-system" },
  { name: "MotivateMe Bot", href: "https://github.com/Jennah198/motivate-me-bot" },
  { name: "Habesha Harvest", href: "https://github.com/Jennah198/habesha-harvest" },
  { name: "Block Chain", href: "https://github.com/Jennah198/block-chain" },
  { name: "Smart Complaint and Issue Tracking System", href: "https://github.com/Jennah198/Smart-Complaint-and-Issue-Tracking-System" },
  { name: "Capstone Project", href: "https://github.com/Jennah198/capstone-frontend" },
  { name: "Hajj QR Generator", href: "https://github.com/Jennah198/hajj-qr-generator-3g" },
  { name: "Zekat Collection", href: "https://github.com/Jennah198/Zekat-Collection" },
];

export const githubProfile = "https://github.com/Jennah198";

/* ------------------------------------------------------------------ */
/* Experience                                                         */
/* ------------------------------------------------------------------ */

export type Experience = {
  org: string;
  role: string;
  date: string;
  location: string;
  type: string;
  bullets: string[];
  tech: string[];
};

// Strongest engineering role first, then by recency/relevance.
export const experience: Experience[] = [
  {
    org: "Async Tech Service PLC",
    role: "Full-Stack Developer",
    date: "Summer 2025",
    location: "Lideta, Addis Ababa",
    type: "Hybrid · Internship",
    bullets: [
      "Worked on enterprise application development using Python and Odoo.",
      "Hands-on with PostgreSQL, relational data modeling, business logic, ORM constraints, access control and API security.",
      "Used Docker-based development and contributed to frontend integration with Next.js.",
    ],
    tech: ["Python", "Odoo", "PostgreSQL", "Docker", "Next.js"],
  },
  {
    org: "Innobiz K",
    role: "Team Lead",
    date: "2025 – Present",
    location: "Addis Ababa, Ethiopia",
    type: "Startup · Innovation",
    bullets: [
      "Lead and coordinate a team across hackathon and startup initiatives.",
      "Manage collaboration, product development, and execution from idea to presentation.",
    ],
    tech: ["Team Leadership", "Product Strategy", "Hackathons", "Startup Development"],
  },
  {
    org: "Golden Age Technology",
    role: "Frontend Developer & Project Manager",
    date: "2024 – 2025",
    location: "Jemo, Addis Ababa",
    type: "Remote · Professional",
    bullets: [
      "Worked across frontend development and project management for web-based products.",
      "Coordinated multiple teams and projects and kept collaboration running across technical teams.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Project Management"],
  },
  {
    org: "Hira Muslim Students Association",
    role: "Lead Developer & Technical Team Leader",
    date: "2022 – Present",
    location: "Addis Ababa, Ethiopia",
    type: "Leadership · Technology",
    bullets: [
      "Lead the technical team in developing software products.",
      "Organize technology exhibitions, workshops, and training programs.",
      "Coordinate developers and translate organizational needs into digital solutions.",
    ],
    tech: ["Software Development", "Team Leadership", "Product Development", "Technical Training"],
  },
];

/* ------------------------------------------------------------------ */
/* How I work + recruiter FAQ                                         */
/* ------------------------------------------------------------------ */

// Drafted from her About and Experience text. She should confirm the wording.
export const workProcess = [
  {
    title: "Understand",
    body: "Translate the organization's needs into a clear picture of the product before writing code.",
  },
  {
    title: "Design the system",
    body: "Model the data and business logic first, with data integrity and access control in mind.",
  },
  {
    title: "Build across the stack",
    body: "Python, Odoo and PostgreSQL on the backend; Next.js, React and TypeScript on the frontend.",
  },
  {
    title: "Ship & iterate",
    body: "Take it from concept to production, then keep improving it so it keeps working reliably.",
  },
];

export const faq = [
  {
    q: "Are you available?",
    a: "Yes. I'm currently open to new opportunities and collaborations.",
    todo: "TODO(nezira): full-time, part-time, internship or freelance? Remote/relocation preferences?",
  },
  {
    q: "What time zone are you in?",
    a: "Addis Ababa, GMT+3 (no daylight saving). My working day overlaps the full European working day.",
  },
  {
    q: "What's your strongest stack?",
    a: "Backend and enterprise systems with Python, Odoo and PostgreSQL, plus modern frontends with Next.js, React and TypeScript.",
  },
  {
    q: "Do you work in teams?",
    a: "Yes. I lead the technical team at the Hira Muslim Students Association, lead a team at Innobiz K, and coordinated multiple teams as a project manager at Golden Age Technology.",
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                             */
/* ------------------------------------------------------------------ */

export type Skill = {
  name: string;
  /** File in /public/icons. */
  icon: string;
  /** Monochrome icon that needs inverting in dark mode. */
  mono?: boolean;
};

export const skillGroups: { title: string; skills: Skill[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "Next.js", icon: "nextjs", mono: true },
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "shadcn/ui", icon: "shadcnui", mono: true },
      { name: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    title: "Backend & ERP",
    skills: [
      { name: "Odoo", icon: "odoo", mono: true },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express", mono: true },
      { name: "Django", icon: "django" },
    ],
  },
  {
    title: "Data",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "Supabase", icon: "supabase" },
      { name: "Prisma", icon: "prisma", mono: true },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Vercel", icon: "vercel", mono: true },
      { name: "AWS", icon: "aws" },
      { name: "Azure", icon: "azure" },
      { name: "Google Cloud", icon: "googlecloud" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github", mono: true },
      { name: "GitLab", icon: "gitlab" },
      { name: "Omarchy", icon: "omarchy", mono: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                          */
/* ------------------------------------------------------------------ */

export type Education = {
  school: string;
  degree: string;
  date: string;
  kind: "degree" | "program";
  description: string;
  tags: string[];
};

export const education: Education[] = [
  {
    school: "Adama Science and Technology University (ASTU)",
    degree: "B.Sc. Software Engineering",
    date: "2023 – Present",
    kind: "degree",
    description:
      "Focus on software architecture, system design, algorithms, databases, and full-stack development, with a strong foundation in engineering principles and problem-solving.",
    tags: ["System Design", "Algorithms", "Databases"],
  },
  {
    school: "Harambee University",
    degree: "Business Administration",
    date: "2024 – Present",
    kind: "degree",
    description:
      "Studying alongside software engineering: management, marketing, entrepreneurship, leadership, and business strategy.",
    tags: ["Management", "Marketing", "Entrepreneurship"],
  },
  {
    school: "ALX Ethiopia",
    degree: "Frontend Development",
    date: "2023 – 2024",
    kind: "program",
    description:
      "Project-based training in responsive interfaces, JavaScript, React, and collaborative software development.",
    tags: ["JavaScript", "React", "HTML", "CSS"],
  },
  {
    school: "Evangadi Tech",
    degree: "Full-Stack Development",
    date: "2025",
    kind: "program",
    description:
      "Full-stack training through the Evangadi Tech scholarship, building web applications across the frontend and backend.",
    tags: ["JavaScript", "React", "Node.js"],
  },
  {
    school: "Udemy",
    degree: "Fundamentals of Programming",
    date: "2025",
    kind: "program",
    description: "Programming concepts, logical problem-solving, and software development fundamentals using Python.",
    tags: ["Python", "Problem Solving"],
  },
];

/* ------------------------------------------------------------------ */
/* Awards & certificates                                              */
/* ------------------------------------------------------------------ */

export type CertificateCategory = "Hackathons" | "Technical" | "Leadership";

export type Certificate = {
  title: string;
  issuer: string;
  category: CertificateCategory;
  image: { src: string; width: number; height: number };
  featured?: boolean;
};

export const certificates: Certificate[] = [
  { title: "H.E.R Hackathon 2026", issuer: "Cheche", category: "Hackathons", featured: true, image: { src: "/HER.png", width: 2560, height: 1786 } },
  { title: "ALX Her Commerce Hackathon 2026", issuer: "ALX Ventures · iceaddis", category: "Hackathons", featured: true, image: { src: "/herCommerce.png", width: 1280, height: 893 } },
  { title: "ALX Frontend Development", issuer: "ALX", category: "Technical", image: { src: "/alxfrontend.png", width: 1280, height: 720 } },
  { title: "GoldenAge Frontend Development", issuer: "Golden Age Technology", category: "Technical", image: { src: "/frontend.png", width: 1280, height: 904 } },
  { title: "Udemy Programming Fundamentals", issuer: "Udemy", category: "Technical", image: { src: "/programing-fundamentals.png", width: 735, height: 573 } },
  { title: "GoldenAge Project Management", issuer: "Golden Age Technology", category: "Leadership", image: { src: "/pm.png", width: 1280, height: 904 } },
  { title: "ASTU Entrepreneurship and Leadership", issuer: "ASTU", category: "Leadership", image: { src: "/leadership.png", width: 990, height: 607 } },
  { title: "Lanchitech Startup Development", issuer: "Lanchitech", category: "Leadership", image: { src: "/lanchitech.png", width: 913, height: 615 } },
  { title: "ALX Professional Skills", issuer: "ALX", category: "Leadership", image: { src: "/professional-skills.png", width: 1280, height: 720 } },
  { title: "HMSA STEM Certificate", issuer: "Hira Muslim Students Association", category: "Leadership", image: { src: "/HMSA.png", width: 2560, height: 1607 } },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                         */
/* ------------------------------------------------------------------ */

export const sections = [
  { id: "work", label: "Work", key: "w" },
  { id: "experience", label: "Experience", key: "e" },
  { id: "skills", label: "Skills", key: "s" },
  { id: "education", label: "Education", key: "d" },
  { id: "awards", label: "Awards", key: "a" },
  { id: "contact", label: "Contact", key: "c" },
] as const;
