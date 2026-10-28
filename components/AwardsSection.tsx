import { SectionHeading } from "@/components/SectionHeading";
import Awards from "@/components/Awards";

export default function AwardsSection() {
  return (
    <section id="awards" aria-labelledby="awards-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        id="awards-title"
        index="06"
        eyebrow="Awards & certificates"
        title={
          <>
            Recognition along <em className="text-accent-text">the way</em>.
          </>
        }
      />
      <Awards />
    </section>
  );
}
