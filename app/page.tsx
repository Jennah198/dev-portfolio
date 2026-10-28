import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import HowIWork from "@/components/HowIWork";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import AwardsSection from "@/components/AwardsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PrintCV from "@/components/PrintCV";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />
        <Work />
        <Experience />
        <HowIWork />
        <div className="section-divider mx-auto max-w-5xl" aria-hidden="true" />
        <Skills />
        <Education />
        <AwardsSection />
        <Contact />
      </main>
      <Footer />
      <PrintCV />
    </>
  );
}
