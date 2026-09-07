import Image from "next/image";
import { Folder, Mail } from "lucide-react";

export default function About() {
  const stats = [
    { value: "4th", label: "YEAR SOFTWARE ENGINEERING" },
    { value: "10+", label: "PROJECTS BUILT" },
    { value: "5+", label: "INTERNSHIPS & PROGRAMS" },
    { value: "2×", label: "HACKATHON WINNER" },
  ];

  return (
    <section
      id="about"
      className="py-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8"
    >
      {/* Profile + Bio */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">

        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 overflow-hidden rounded-3xl bg-card border border-border shadow-sm">
            <Image
              src="/pink-shifon.jpg"
              alt="Nezira"
              fill
              className="object-cover"
            />

            {/* Accent Badge */}
            <div className="absolute bottom-4 right-4 h-7 w-7 rounded-full bg-background border border-border flex items-center justify-center shadow-md">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="flex flex-col items-start text-left gap-4">

          {/* Section Label */}
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
            About Me
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            I build with{" "}
            <span className="font-serif italic text-primary">
              purpose
            </span>
            .
          </h2>

          {/* Bio */}
          <p className="text-foreground/70 leading-relaxed text-base">
            I'm Nezira, a Software Engineering student and product builder
            focused on turning complex ideas into reliable digital products.
            My work spans full-stack development, backend systems, databases,
            and enterprise applications.
          </p>

          <p className="text-foreground/70 leading-relaxed text-base">
            My recent experience with Python, Odoo, PostgreSQL, and
            production-oriented backend systems has pushed me deeper into
            software architecture, data integrity, business logic, and
            scalable applications. I still enjoy building across the stack,
            but I'm increasingly focused on the engineering behind systems
            that need to work reliably.
          </p>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-4">

            {/* View Resume */}
            <a
              href="https://drive.google.com/file/d/1HBvlOeg1si_HJ9zASuvfW6hPb1CppOVx/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full px-6 border border-border bg-card hover:bg-card/80 shadow-sm gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Folder
                className="h-5 w-5 text-primary"
                fill="currentColor"
              />

              <span className="font-semibold text-foreground text-sm">
                View Resume
              </span>
            </a>

            {/* Get in Touch */}
            <a
              href="#contact"
              className="inline-flex h-12 min-w-[155px] items-center justify-center rounded-full px-7 border border-border bg-card hover:bg-card/80 shadow-sm gap-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Mail className="h-4 w-4 text-foreground/70 shrink-0" />

              <span>
                Get in Touch
              </span>
            </a>

          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-border bg-card/60 divide-x divide-y md:divide-y-0 divide-border overflow-hidden shadow-sm">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 text-center"
          >
            <span className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {stat.value}
            </span>

            <span className="mt-2 text-[11px] font-semibold tracking-wider text-foreground/60 uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}