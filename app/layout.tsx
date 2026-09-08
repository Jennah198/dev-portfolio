import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TargetCursor from "@/components/TargetCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nezira W - Portfolio",
  description: "Software Engineer Portfolio, odoo, frontend, backend, fullstacksss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-background text-foreground antialiased`} suppressHydrationWarning>

      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cursorColor="#990343" // Default cursor color
        cursorColorOnTarget="#efa0c1" // Matches your pink primary color theme
        />
        
        {/* The Google Translate dropdown will appear inside this div */}
        <div id="google_translate_element" className="absolute top-4 right-4 z-50"></div>

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
