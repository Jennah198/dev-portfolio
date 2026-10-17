import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import MoltenMetal from "@/components/MoltenMetal";
import CursorGrid from "@/components/CursorGrid";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nezira worku | Full-Stack Developer",
  description: "Official portfolio of nezira worku, I build reliable enterprise systems and modern web applications. Explore my software engineering portfolio featuring Next.js, Odoo, and Python projects.",
  verification: {
    google: "6_9wFdW3MQSNNGRCfYaSii_ByqbPn2p8wZu4PUFKvS4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SEO Structured Data (JSON-LD) for Search Engines and AI
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "nezira worku",
    jobTitle: "full-stack developer, odoo developer, ai engineer, automation engineer",
    url: "https://neziraworkuu.vercel.app/",
    sameAs: [
      "https://github.com/Jennah198","https://t.me/Nezira_worku_ali", "https://www.linkedin.com/in/neziraworkuali", "https://x.com/Nezira_Worku" ,
    ],
    knowsAbout: [
      "Full-Stack Development",
      "Next.js",
      "React",
      "Odoo",
      "Python",
      "Software Engineering",
      "ai engineering",
      "Automation",
      "Enterprise Systems",
      "Web Applications",
      "project management",
      "product management",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* SEO Structured Data must go in the <head> to prevent React client errors */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col text-foreground antialiased relative`} 
        suppressHydrationWarning
      >
        {/* Layer 1: Molten Background (Deepest) */}
        <div className="fixed inset-0 -z-20 h-full w-full opacity-40 dark:opacity-20">
          <MoltenMetal
            color1="#E91E63"
            color2="#B497CF"
            color3="#F2EFE9"
            speed={0.35}
            scale={4}
            detail={3}
            glow={1.6}
            coreSize={0.1}
            swirl={1}
            fold={-0.2}
            blackPoint={0.05}
            brightness={1.3}
            colorMode="molten"
            grain
            grainIntensity={0.05}
            mouseInteraction
            mouseStrength={0.3}
            opacity={1}
          />
        </div>

        {/* Layer 2: Cursor Grid (Above Molten, Below Content) */}
        <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
          <CursorGrid
            cellSize={70}
            color="#E91E63"
            radius={140}
            falloff="smooth"
            holdTime={400}
            fadeDuration={800}
            lineWidth={1.2}
            maxOpacity={1}
            fillOpacity={0}
            gridOpacity={0}
            cellRadius={0}
            clickPulse
            pulseSpeed={600}
          />
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}