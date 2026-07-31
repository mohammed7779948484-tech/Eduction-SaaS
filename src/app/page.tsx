import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LearningChannels } from "@/components/sections/learning-channels";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/layout/cta-section";
import { RailDivider } from "@/components/brand/rail-divider";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <RailDivider tone="teal" beads={9} />
      <HowItWorks />
      <LearningChannels />
      <RailDivider tone="teal" beads={9} />
      <Testimonials />
      <CTASection />
    </>
  );
}
