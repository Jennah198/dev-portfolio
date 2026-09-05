import { ArrowDownCircle, Folder } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 max-w-7xl mx-auto px-6 lg:px-8">
      {/* Container: Splits into 2 columns on large screens */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
        
        {/* Left Column: Main Content (Left Aligned) */}
        <div className="flex-1 max-w-3xl flex flex-col items-start text-left">
          
          {/* 1. Availability Status Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-foreground/80 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Available for new projects
          </div>

          {/* 2. Main Headline (Static with Carter One Font) */}
          <h1 
            className="text-5xl font-normal tracking-wide text-foreground sm:text-6xl md:text-7xl leading-tight"
            style={{ fontFamily: "'Carter One', cursive" }}
          >
            Building Tomorrow's <br className="hidden sm:block" />
            
            <div className="flex items-center justify-start my-2">
              <span className="inline-block rounded-2xl bg-primary px-4 py-1 text-primary-foreground shadow-sm">
                Scalable Systems
              </span>
            </div>
            
            Today
          </h1>

          {/* 3. Biography / Narrative */}
          <p className="mt-6 text-lg leading-relaxed text-foreground/70 md:text-xl">
            I'm <strong className="font-semibold text-foreground">Fetehadin Negash</strong>, a full-stack Software Engineer who bridges the gap between structural design and digital innovation. Drawing on my background in civil engineering, I architect complex, scalable logic and bring it to life through robust, end-to-end software solutions. I specialize in transforming intricate technical challenges into elegant, high-performing digital experiences.
          </p>
        </div>

        {/* Right Column: Action Buttons (Smaller and 50% Round / Pill-shaped) */}
        <div className="w-full lg:w-[260px] shrink-0 flex flex-col gap-4 lg:pt-16">
          
          {/* Primary View Work Button */}
          <a 
            href="#projects"
            className="inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-base bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md gap-2 transition-transform hover:scale-105"
          >
            View My Work
            <ArrowDownCircle className="h-4 w-4" />
          </a>
          
          {/* Secondary Resume Button */}
          <a 
            href="https://drive.google.com/file/d/1HBvlOeg1si_HJ9zASuvfW6hPb1CppOVx/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 w-full items-center justify-center rounded-full px-5 border border-border bg-card hover:bg-card/80 shadow-sm gap-3 transition-transform hover:scale-105"
          >
            <Folder className="h-5 w-5 text-primary shrink-0" fill="currentColor" />
            <div className="flex flex-col items-start text-left">
              <span className="font-semibold text-foreground leading-none text-sm">My Resumes</span>
              <span className="text-[10px] text-foreground/60 leading-tight mt-0.5">Click anywhere to open</span>
            </div>
          </a>
          
        </div>
      </div>
    </section>
  );
}