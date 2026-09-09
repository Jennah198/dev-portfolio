export default function Education() {
  const education = [
    {
      school: "Adama Science and Technology University (ASTU)",
      degree: "Bachelor of Science, Software Engineering",
      date: "2023 – Present",
      badges: [
        "Software Engineering",
        "System Design",
        "Algorithms",
        "Databases",
      ],
      description:
        "Pursuing a degree in Software Engineering with a focus on software architecture, system design, algorithms, databases, and full-stack development. Built and contributed to software projects while developing a strong foundation in engineering principles, problem-solving, and system design.",
    },
    {
      school: "Harambee University",
      degree: "Business Administration",
      date: "2024 – Present",
      badges: [
        "Business Administration",
        "Management",
        "Marketing",
        "Entrepreneurship",
      ],
      description:
        "Studying Business Administration alongside software engineering, developing knowledge in management, marketing, entrepreneurship, leadership, and business strategy.",
    },
    {
      school: "ALX Ethiopia",
      degree: "Frontend Development",
      date: "2023 – 2024",
      badges: ["JavaScript", "React", "HTML", "CSS"],
      description:
        "Completed frontend development training through a project-based learning environment, strengthening practical skills in web development, responsive interfaces, JavaScript, React, and collaborative software development.",
    },
    {
      school: "Evangadi Tech",
      degree: "Full-Stack Development",
      date: "2025",
      badges: ["Full-Stack Development", "JavaScript", "React", "Node.js"],
      description:
        "Completed full-stack development training through the Evangadi Tech scholarship, gaining practical experience building web applications across the frontend and backend.",
    },
    {
      school: "Udemy",
      degree: "Fundamentals of Programming",
      date: "2025",
      badges: ["Python", "Programming Fundamentals", "Problem Solving"],
      description:
        "Completed foundational programming training focused on programming concepts, logical problem-solving, and software development fundamentals using Python.",
    },
  ];

  return (
    <section
      id="education"
      className="relative py-20 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-8">
        Education
      </h2>

      {/* Increased border width to 2px (border-l-2) and adjusted color for better visibility */}
      <div className="ml-4 sm:ml-12 md:ml-20 h-10 border-l-2 border-dashed border-foreground/20 dark:border-foreground/30" />

      {/* Applied the same 2px width and contrast to the main timeline track */}
      <div className="relative ml-4 sm:ml-12 md:ml-20 border-l-2 border-foreground/20 dark:border-foreground/30">
        <div className="space-y-14">
          {education.map((edu, index) => (
            <article key={index} className="relative z-10">
              <span className="absolute left-0 top-0 z-10 -translate-x-[10px] sm:-translate-x-[calc(50%+1px)] -translate-y-1/2 inline-flex items-center whitespace-nowrap rounded-full border-2 border-primary/30 bg-background/90 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-bold text-foreground shadow-sm backdrop-blur-md">
                {edu.date}
              </span>

              <div className="pt-8 sm:pt-6 pl-6 sm:pl-8">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {edu.school}
                </h3>

                <p className="mt-1 text-base font-bold text-primary">
                  {edu.degree}
                </p>

                {edu.description && (
                  <p className="mt-3 max-w-2xl text-[14px] sm:text-[15px] leading-7 text-foreground/70">
                    {edu.description}
                  </p>
                )}

                {edu.badges.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {edu.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-border bg-card/80 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold tracking-wide text-foreground/65 transition-colors duration-200 hover:border-primary/30 hover:text-primary"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}