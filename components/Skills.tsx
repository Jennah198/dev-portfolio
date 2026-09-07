export default function Skills() {
  // Row 1: Languages & Backend
  const row1 = [
    {
      name: "Python",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    },
    {
      name: "JavaScript",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    },
    {
      name: "Node.js",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express.js",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    },
    {
      name: "Django",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
    },
  ];

  // Row 2: Frontend & Application Development
  const row2 = [
    {
      name: "Next.js",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "React",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    {
      name: "Tailwind CSS",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Shadcn/ui",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/shadcnui/shadcnui-original.svg",
    },
    {
      name: "HTML5",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    },
    {
      name: "Bootstrap",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    },
    {
      name: "Odoo",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/odoo/odoo-original.svg",
    },
  ];

  // Row 3: Data, DevOps & Infrastructure
  const row3 = [
    {
      name: "PostgreSQL",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MySQL",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    },
    {
      name: "Supabase",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    },
    {
      name: "Prisma",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
    },
    {
      name: "Docker",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    },
    {
      name: "Git",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    },
    {
      name: "GitLab",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg",
    },
    {
      name: "Vercel",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    },
    {
      name: "Ubuntu",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-plain.svg",
    },
    {
      name: "Omarchy",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@latest/icons/omarchy.svg",
    },
    {
      name: "AWS",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    },
    {
      name: "Azure",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
    },
    {
      name: "Google Cloud",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
    },
  ];

  return (
    <section className="py-16 max-w-5xl mx-auto w-full px-4 overflow-hidden">

      {/* Section Header */}
      <div className="mb-12 flex flex-col items-start text-left">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-[1px] w-12 bg-primary/40" />

          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            Technical Skills
          </span>
        </div>

        <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">
          Tools & Technologies
        </h2>

        <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed">
          A curated set of technologies I use to build reliable, scalable,
          and modern digital products.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative flex flex-col gap-6 py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">

        {/* Row 1 */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex gap-6 pr-6">
            {[...row1, ...row1, ...row1, ...row1].map((tech, idx) => (
              <TechCard
                key={`r1-${idx}`}
                name={tech.name}
                iconUrl={tech.iconUrl}
              />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-reverse flex gap-6 pr-6">
            {[...row2, ...row2, ...row2, ...row2].map((tech, idx) => (
              <TechCard
                key={`r2-${idx}`}
                name={tech.name}
                iconUrl={tech.iconUrl}
              />
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex gap-6 pr-6">
            {[...row3, ...row3, ...row3, ...row3].map((tech, idx) => (
              <TechCard
                key={`r3-${idx}`}
                name={tech.name}
                iconUrl={tech.iconUrl}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function TechCard({
  name,
  iconUrl,
}: {
  name: string;
  iconUrl: string;
}) {
  return (
    <div className="flex items-center justify-center gap-3.5 rounded-[2rem] border border-border/80 bg-card px-7 py-3.5 shadow-sm hover:border-primary/50 hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap">
      <img
        src={iconUrl}
        alt={`${name} icon`}
        className="h-7 w-7 object-contain"
      />

      <span className="text-[15px] font-bold text-foreground tracking-tight">
        {name}
      </span>
    </div>
  );
}