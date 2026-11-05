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
  resumeUrl:
    "https://docs.google.com/document/d/1z5Ex9RoHyJFe9RqCysidAT4FiSQjFHxEL_VcPHyEP7A/edit?usp=sharing",
  googleVerification: "6_9wFdW3MQSNNGRCfYaSii_ByqbPn2p8wZu4PUFKvS4",
  email: "neziraworku198@gmail.com",
} as const;

export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: "email" | "telegram" | "linkedin" | "x" | "github" | "phone";
};

export const socials: Social[] = [
  { label: "Email", handle: "neziraworku198@gmail.com", href: "mailto:neziraworku198@gmail.com", icon: "email" },
  { label: "GitHub", handle: "Jennah198", href: "https://github.com/Jennah198", icon: "github" },
  { label: "LinkedIn", handle: "neziraworkuali", href: "https://www.linkedin.com/in/neziraworkuali", icon: "linkedin" },
  { label: "X", handle: "@Nezira_Worku", href: "https://x.com/Nezira_Worku", icon: "x" },
  { label: "Telegram", handle: "@Nezira_worku_ali", href: "https://t.me/Nezira_worku_ali", icon: "telegram" },
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

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

export type ProjectLink = { label: string; href: string; kind: "live" | "code" | "frontend" | "backend" };

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Which side to keep when the card crops a wide screenshot (default "left"). */
  focus?: "left" | "center";
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** One-line outcome shown on the card. */
  summary: string;
  description: string;
  /** Screenshots shown in the card slider; the first one is the cover. */
  images: ProjectImage[];
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
    images: [
      { src: "/work/sms/sign-in.webp", width: 1600, height: 781, alt: "School Management System sign-in page", focus: "center" },
      { src: "/work/sms/dashboard.webp", width: 1600, height: 755, alt: "School Management System administrator dashboard" },
      { src: "/work/sms/students.webp", width: 1600, height: 787, alt: "Students list grouped by grade" },
      { src: "/work/sms/enrolments.webp", width: 1600, height: 787, alt: "Enrolments list with one active enrolment per student per year" },
      { src: "/work/sms/attendance.webp", width: 1600, height: 793, alt: "Attendance register with take-attendance form" },
    ],
    role: "Full-Stack Developer Intern, Backend Engineering (Odoo)",
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
      role: [
        "I joined the team building the school management system as a full-stack intern, focusing primarily on backend engineering with Odoo 19, Python and PostgreSQL, with responsibilities spanning data modeling, business logic, access control and frontend-backend integration.",
        "- Developed and worked with Odoo models and relational data structures.",
        "- Implemented business logic, ORM constraints and data integrity rules.",
        "- Worked on access control and backend security.",
        "- Supported student, teacher, class, enrollment and attendance workflows.",
        "- Contributed to integrating the Odoo backend with the Next.js frontend.",
      ],
      architecture: [
        "The system uses Odoo 19 as its ERP backend, Python for business logic, and PostgreSQL for relational data storage.",
        "The Next.js frontend provides a separate user interface that communicates with the Odoo backend through its API layer.",
        "The data model uses relational structures to keep students, teachers, classes, academic years, enrollments and attendance records consistent. Business rules and access restrictions are enforced at the backend level to protect data integrity.",
      ],
      challenges: [
        "Maintaining data integrity across interconnected academic records was one of the main technical challenges.",
        "I worked with Odoo ORM constraints, model-level validations and access control mechanisms to enforce business rules and prevent invalid operations, including the relationships between students, academic years and enrollment records.",
      ],
      outcome: [
        "Delivered contributions to a centralized school management platform covering core academic and administrative workflows: student management, teacher management, classes, enrollment and attendance.",
        "The project has a deployed Next.js frontend and a separately hosted backend.",
      ],
    },
  },
  {
    slug: "sadam-hussien-law-office",
    title: "Sadam Hussein Law Office",
    summary: "A professional digital presence for a law office: services, expertise and contact in one clean site.",
    description:
      "A modern frontend website designed for Sadam Hussien Law Office to establish a professional digital presence. The interface presents legal services, company information, expertise, and contact details through a clean and responsive user experience.",
    images: [
      { src: "/work/shlo/home.webp", width: 1600, height: 781, alt: "Sadam Hussein Law Office home page hero" },
      { src: "/work/shlo/services.webp", width: 1600, height: 792, alt: "Comprehensive legal services section" },
      { src: "/work/shlo/corporate-law.webp", width: 1600, height: 790, alt: "Corporate law practice area page" },
      { src: "/work/shlo/team.webp", width: 1600, height: 783, alt: "Our team section with the founder's profile", focus: "center" },
      { src: "/work/shlo/csr.webp", width: 1600, height: 788, alt: "Community commitment (CSR) section", focus: "center" },
    ],
    role: "Frontend Developer and Project Manager",
    context: "Client website",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    links: [
      { label: "Live site", href: "https://law-firm-website-blond.vercel.app/", kind: "live" },
      { label: "Source", href: "https://github.com/Jennah198/law-firm-website", kind: "code" },
    ],
    sections: {
      problem: ["The law office needed a professional digital presence that clearly presents its legal services, company information, expertise and contact details."],
      role: [
        "I led the frontend implementation and contributed to project planning and coordination.",
        "- Translated the business requirements into a structured website experience.",
        "- Designed and implemented responsive interfaces using Next.js and TypeScript.",
        "- Built reusable UI components using Tailwind CSS and shadcn/ui.",
        "- Organized website content around legal services, practice areas, company information and contact channels.",
        "- Coordinated development tasks and ensured consistency across website sections.",
      ],
      architecture: [
        "A frontend site built with Next.js and TypeScript, styled with Tailwind CSS and shadcn/ui components.",
        "Designed to be clean and responsive across devices.",
      ],
      challenges: [
        "Structuring extensive legal service information into a clear and accessible user experience was the key design challenge.",
        "I organized the content into dedicated sections and practice area pages, using reusable components and consistent layouts to keep the site visually clear and easy to navigate.",
      ],
      outcome: [
        "Developed and deployed a professional website for Sadam Hussein Law Office, giving the firm a centralized digital presence for its legal services, practice areas, team information and contact details.",
      ],
    },
  },
  {
    slug: "hmsa-website",
    title: "HMSA Website",
    summary: "A community platform that helps the Hira Muslim Students Association share its activities and resources.",
    description:
      "A digital platform for the Hira Muslim Student Association built to strengthen communication, community engagement, and access to organizational resources. The website provides information about HMSA, its activities, initiatives, and community programs through a responsive modern interface.",
    images: [
      { src: "/work/hmsa/home.webp", width: 1600, height: 754, alt: "Hira Muslim Students Association home page" },
      { src: "/work/hmsa/about.webp", width: 1600, height: 788, alt: "HMSA about us section" },
      { src: "/work/hmsa/programs.webp", width: 1600, height: 787, alt: "HMSA programs and initiatives", focus: "center" },
      { src: "/work/hmsa/membership.webp", width: 1600, height: 789, alt: "Three steps to join the community", focus: "center" },
      { src: "/work/hmsa/graduation.webp", width: 1600, height: 788, alt: "HMSA graduation ceremony event page" },
    ],
    role: "Lead Developer and Technical Team Leader",
    context: "Hira Muslim Students Association",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    links: [
      { label: "Live site", href: "https://hira-muslim-students-association.vercel.app/", kind: "live" },
      { label: "Source", href: "https://github.com/Jennah198/hira-portfolio", kind: "code" },
    ],
    sections: {
      problem: ["HMSA needed a central place to strengthen communication and community engagement, and to give members access to organizational resources."],
      role: [
        "I led the technical development of the HMSA digital platform, owning its technical direction and frontend development and coordinating the development team.",
        "- Planned and implemented the website architecture.",
        "- Developed responsive interfaces using Next.js and TypeScript.",
        "- Integrated Supabase for backend services.",
        "- Structured the website around organizational information, programs, initiatives, events and membership.",
        "- Coordinated technical development and kept the implementation on direction.",
      ],
      architecture: [
        "Built with Next.js and TypeScript, using Tailwind CSS for styling and Supabase for backend services.",
        "The architecture separates the presentation layer from backend services, with the frontend talking to Supabase for data operations.",
        "The platform is structured to support organizational content, community programs, events and membership information.",
      ],
      challenges: [
        "Bringing many different organizational activities into one platform while keeping the interface easy to navigate was the key challenge.",
        "I addressed it with reusable components, structured content sections and consistent navigation patterns. The architecture also lets the platform grow as the association adds new programs and resources.",
      ],
      outcome: [
        "Developed and deployed a centralized digital platform for the Hira Muslim Students Association, giving it an online presence for its activities, programs, events, organizational information and community engagement.",
      ],
    },
  },
  {
    slug: "habesha-harvest",
    title: "Habesha Harvest",
    summary: "A marketing site for an injera export business that turns overseas restaurants and stores into quote requests.",
    description:
      "Habesha Harvest is the marketing website for a teff injera export business based in Addis Ababa. It presents the products, shows how the injera is made, explains how restaurants and stores can order, and collects quote requests.",
    images: [
      { src: "/work/habesha/home.webp", width: 1600, height: 784, alt: "Habesha Harvest home page" },
      { src: "/work/habesha/categories.webp", width: 1600, height: 785, alt: "Best delivered injera categories", focus: "center" },
      { src: "/work/habesha/products.webp", width: 1600, height: 778, alt: "Product showcase: crafted with tradition", focus: "center" },
      { src: "/work/habesha/how-to-order.webp", width: 1600, height: 779, alt: "How to order in four steps", focus: "center" },
      { src: "/work/habesha/gallery.webp", width: 1600, height: 787, alt: "Gallery of injera around the world with the chat assistant open", focus: "center" },
    ],
    role: "Frontend Developer and UI Engineer (solo)",
    context: "Local client · Ethiopia",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    links: [
      { label: "Live site", href: "https://habesha-harvest.vercel.app", kind: "live" },
      { label: "Source", href: "https://github.com/Jennah198/habesha-harvest", kind: "code" },
    ],
    sections: {
      problem: [
        "An injera export business needed to reach restaurants and stores abroad: show its products, explain how the injera is made and how ordering works, and turn interest into quote requests.",
      ],
      role: [
        "I built Habesha Harvest on my own for a local client in Ethiopia, owning the interface design, frontend implementation and user experience, with a focus on presenting the business and its products to international buyers.",
        "- Implemented the website using Next.js and TypeScript.",
        "- Developed responsive interfaces with Tailwind CSS and shadcn/ui.",
        "- Created product showcases, category sections and ordering information.",
        "- Implemented international quote request forms using React Hook Form and Zod.",
        "- Integrated a country selector to support inquiries from abroad.",
        "- Added Framer Motion animations to improve the browsing experience.",
      ],
      architecture: [
        "A Next.js App Router site in TypeScript, styled with Tailwind CSS and shadcn/ui in a soft claymorphism design system, with framer-motion scroll animations.",
        "The order form is validated with react-hook-form and zod and includes a country selector for international buyers.",
      ],
      challenges: [
        "Designing an effective ordering experience for international buyers was the key challenge.",
        "The website needed to communicate product information, explain the ordering process, and collect structured inquiries from many different countries.",
        "I addressed this by organizing the content into clear product categories, adding a step-by-step ordering section, and building validated quote request forms with international country selection.",
      ],
      outcome: [
        "Developed and deployed a marketing website for Habesha Harvest that showcases its products online, explains the international ordering process, and gives buyers a structured channel for quote requests.",
      ],
    },
  },
];

export type MiniProject = { name: string; href: string };

export const moreProjects: MiniProject[] = [
  { name: "hidl", href: "https://github.com/fetehadin/hidl" },
  { name: "Womens Safety System", href: "https://github.com/Jennah198/womens-safety-system" },
  { name: "MotivateMe Bot", href: "https://github.com/Jennah198/motivate-me-bot" },
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
      { name: "React Query", icon: "reactquery" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "shadcn/ui", icon: "shadcnui", mono: true },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "Responsive Design", icon: "responsive", mono: true },
    ],
  },
  {
    title: "Backend & ERP",
    skills: [
      { name: "Odoo", icon: "odoo", mono: true },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express", mono: true },
      { name: "Django", icon: "django" },
    ],
  },
  {
    title: "AI Engineering",
    skills: [
      { name: "LLM Integration", icon: "llm", mono: true },
      { name: "RAG", icon: "rag", mono: true },
      { name: "Embeddings", icon: "embeddings", mono: true },
    ],
  },
  {
    title: "Data",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "Supabase", icon: "supabase" },
      { name: "Prisma", icon: "prisma", mono: true },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Linux", icon: "linux", mono: true },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Vercel", icon: "vercel", mono: true },
      { name: "AWS", icon: "aws" },
      { name: "Azure", icon: "azure" },
      { name: "Google Cloud", icon: "googlecloud" },
    ],
  },
  {
    title: "Testing",
    skills: [
      { name: "Jest", icon: "jest" },
      { name: "Pytest", icon: "pytest" },
      { name: "Postman", icon: "postman" },
    ],
  },
  {
    title: "Engineering Practices",
    skills: [
      { name: "REST APIs", icon: "rest-api", mono: true },
      { name: "API Integration", icon: "api-integration", mono: true },
      { name: "CI/CD", icon: "cicd", mono: true },
      { name: "Authentication", icon: "auth", mono: true },
      { name: "System Design", icon: "system-design", mono: true },
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
