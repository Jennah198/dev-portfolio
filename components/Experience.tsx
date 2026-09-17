import { MapPin } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      company: "Hira Muslim Students Association",
      role: "Lead Developer & Technical Team Leader",
      date: "2022 – Present",
      location: "Addis Ababa, Ethiopia",
      type: "Leadership · Technology",
      description:
        "Lead the technical team in developing software products while organizing technology exhibitions, workshops, and training programs. Coordinate developers, translate organizational needs into digital solutions, and contribute to building a stronger technical community.",
      skills: [
        "Software Development",
        "Team Leadership",
        "Product Development",
        "Technical Training",
      ],
    },
    {
      company: "Innobiz K",
      role: "Team Lead",
      date: "2025 – Present",
      location: "Addis Ababa, Ethiopia",
      type: "Startup · Innovation",
      description:
        "Lead and coordinate a team across hackathon and startup initiatives, managing collaboration, product development, and execution from idea to presentation.",
      skills: [
        "Team Leadership",
        "Product Strategy",
        "Hackathons",
        "Startup Development",
      ],
    },
    {
      company: "Golden Age Technology",
      role: "Frontend Developer & Project Manager",
      date: "2024 – 2025",
      location: "Jemo, Addis Ababa",
      type: "Remote · Professional",
      description:
        "Worked across frontend development and project management, coordinating multiple teams and projects while contributing to the development of web-based products and maintaining collaboration across technical teams.",
      skills: [
        "Next.js",
        "React",
        "TypeScript",
        "Project Management",
        "Team Coordination",
      ],
    },
    {
      company: "Async Tech Service PLC",
      role: "Full-Stack Developer",
      date: "Summer 2025",
      location: "Lideta, Addis Ababa",
      type: "Hybrid · Internship",
      description:
        "Worked on enterprise application development using Python and Odoo, with hands-on experience in PostgreSQL, relational data modeling, business logic, ORM constraints, access control, API security, and Docker-based development. Also contributed to frontend integration with Next.js.",
      skills: [
        "Python",
        "Odoo",
        "PostgreSQL",
        "Next.js",
        "Docker",
        "Backend Engineering",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-20 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-8">
        Experience
      </h2>

      {/* Increased border width to 2px (border-l-2) and adjusted color for better visibility */}
      <div className="ml-4 sm:ml-12 md:ml-20 h-10 border-l-2 border-dashed border-foreground/20 dark:border-foreground/30" />

      {/* Applied the same 2px width and contrast to the main timeline track */}
      <div className="relative ml-4 sm:ml-12 md:ml-20 border-l-2 border-foreground/20 dark:border-foreground/30">
        <div className="space-y-14">
          {experiences.map((exp, index) => (
            <article key={index} className="relative z-10">
              {/* Adjusted translate-x to keep the badge perfectly centered on the thicker 2px line */}
              <span className="absolute left-0 top-0 z-10 -translate-x-[10px] sm:-translate-x-[calc(50%+1px)] -translate-y-1/2 inline-flex items-center whitespace-nowrap rounded-full border-2 border-primary/30 bg-background/90 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold text-foreground shadow-sm backdrop-blur-md">
                {exp.date}
              </span>

              <div className="pt-8 sm:pt-6 pl-6 sm:pl-8">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {exp.company}
                </h3>

                <p className="mt-1 text-base font-bold text-primary">
                  {exp.role}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground/55">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {exp.location}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-border" />

                  <span className="font-semibold text-primary">
                    {exp.type}
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-[14px] sm:text-[15px] leading-7 text-foreground/70">
                  {exp.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-border bg-card/80 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold tracking-wide text-foreground/65 transition-colors duration-200 hover:border-primary/30 hover:text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}