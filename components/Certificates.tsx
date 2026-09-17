"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Certificates() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered.current && scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;

        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: "auto",
          });
        } else {
          scrollContainerRef.current.scrollBy({
            left: 1,
            behavior: "auto",
          });
        }
      }
    }, 20);

    return () => {
      clearInterval(interval);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -500 : 500,
        behavior: "smooth",
      });
    }
  };

  const handleInteractionStart = () => {
    isHovered.current = true;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const handleInteractionEnd = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      isHovered.current = false;
    }, 1500);
  };

  const certificates = [
    {
      id: 1,
      title: "ALX Frontend Development",
      image: "/alxfrontend.png",
    },
    {
      id: 2,
      title: "GoldenAge Project Management Certificate",
      image: "/pm.png",
    },
    {
      id: 3,
      title: "H.E.R Hackathon 2026",
      image: "/HER.png",
    },
    {
      id: 4,
      title: "ASTU Entrepreneurship and Leadership Certificate",
      image: "/leadership.png",
    },
    {
      id: 5,
      title: "GoldenAge Frontend Development",
      image: "/frontend.png",
    },
    {
      id: 6,
      title: "Hira Muslim Student Association STEM Certificate",
      image: "/HMSA.png",
    },
    {
      id: 7,
      title: "ALX Her Commerce Hackathon 2026",
      image: "/herCommerce.png",
    },
    {
      id: 8,
      title: "Lanchitech Startup Development Certificate",
      image: "/lanchitech.png",
    },
    {
      id: 9,
      title: "Udemy Programming Fundamentals Certificate",
      image: "/programing-fundamentals.png",
    },
    {
      id: 10,
      title: "ALX Professional Skills Certificate",
      image: "/professional-skills.png",
    },
  ];

  return (
    <section
      id="certificates"
      className="relative mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Awards & Certificates
      </h2>

      {/* Hidden entirely on mobile, visible on sm and up */}
      <div className="hidden h-10 border-l-2 border-dashed border-foreground/20 dark:border-foreground/30 sm:block sm:ml-12 md:ml-20" />

      {/* Removed border and left-margin on mobile so the carousel aligns to the edge */}
      <div className="relative sm:ml-12 sm:border-l-2 sm:border-foreground/20 dark:sm:border-foreground/30 md:ml-20">
        <article className="relative z-10">
          
          {/* Timeline dot hidden on mobile */}
          <span className="absolute left-0 top-8 z-10 hidden h-3.5 w-3.5 -translate-x-[calc(50%+1px)] -translate-y-1/2 rounded-full border-[3px] border-primary bg-background sm:block" />

          {/* Removed left padding (pl-6) on mobile */}
          <div className="pt-6 sm:pl-8">
            <div
              className="relative rounded-xl border border-border bg-background/80 p-2 shadow-sm backdrop-blur-sm sm:p-6"
              onMouseEnter={handleInteractionStart}
              onMouseLeave={handleInteractionEnd}
              onTouchStart={handleInteractionStart}
              onTouchEnd={handleInteractionEnd}
            >
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:scale-105 hover:border-primary hover:text-primary"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div
                ref={scrollContainerRef}
                className="flex items-center gap-4 overflow-x-auto scroll-smooth pb-4 pt-2 sm:gap-6"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    // Responsive width: 85vw on mobile for maximum size, 500px fixed on desktop
                    className="group relative flex aspect-[4/3] w-[85vw] max-w-[400px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/30 p-1 sm:max-w-none sm:w-[500px] sm:p-2"
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain p-1 transition-transform duration-500 group-hover:scale-105 sm:p-2"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-base font-bold text-foreground sm:text-lg">
                        {cert.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 z-20 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-all hover:scale-105 hover:border-primary hover:text-primary"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}