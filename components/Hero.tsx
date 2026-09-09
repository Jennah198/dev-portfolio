import { ArrowDownCircle, Folder } from "lucide-react";
import { Carter_One } from "next/font/google";

const carterOne = Carter_One({ 
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Hero() {
  return (
    // Reduced top padding on mobile (pt-24) while keeping desktop the same (sm:pt-32)
    <section className="relative min-h-[calc(100vh-130px)] max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
      
      {/* 
        Changed alignment to 'justify-center' for mobile so it balances the space top and bottom.
        'sm:justify-end' ensures desktop stays exactly as it was.
        Also adjusted the mobile min-height to prevent it from stretching too far down.
      */}
      <div className="min-h-[70vh] sm:min-h-[calc(100vh-260px)] flex flex-col justify-center sm:justify-end pb-12 lg:pb-14">
        
        <p className="mb-6 text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-foreground/50">
          Software Engineer · Product Builder
        </p>

        <h1
          className={`max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-[-0.025em] leading-[1.1] sm:leading-[0.94] text-foreground ${carterOne.className}`}
        >
          I take your idea
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span className="text-foreground">from</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span className="text-primary">concept</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span className="text-foreground">to production.</span>
        </h1>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          
          <div className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-border bg-card px-6 shadow-sm">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>

            <span className="text-sm font-medium text-foreground/70">
              Available for new projects
            </span>
          </div>

          <div className="flex w-full flex-row gap-3 sm:w-auto sm:gap-4">
            <a
              href="#projects"
              className="group flex-1 sm:flex-none inline-flex h-12 items-center justify-center gap-2 sm:gap-3 rounded-full bg-primary px-3 sm:px-6 text-[13px] sm:text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="whitespace-nowrap">View My Work</span>
              <ArrowDownCircle className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>

            <a
              href="https://docs.google.com/document/d/1z5Ex9RoHyJFe9RqCysidAT4FiSQjFHxEL_VcPHyEP7A/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 sm:flex-none inline-flex h-12 items-center justify-center gap-2 sm:gap-3 rounded-full border border-border bg-card px-3 sm:px-6 text-[13px] sm:text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
            >
              <Folder
                className="h-4 w-4 sm:h-5 sm:w-5 text-primary transition-transform duration-300 group-hover:scale-105"
                fill="currentColor"
              />
              <span className="whitespace-nowrap">My Resume</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}