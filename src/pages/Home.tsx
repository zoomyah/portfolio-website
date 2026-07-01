import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WorkPreview } from "@/components/home/WorkPreview";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesPreview />
      <WorkPreview />
      <CTA />
    </>
  );
}
