import LandingNavbar from "@/components/landing/navbar";
import LandingHero from "@/components/landing/hero";
import DataStrip from "@/components/landing/data-strip";
import LandingComparison from "@/components/landing/comparison";
import LandingFeatures from "@/components/landing/features";
import LandingPricing from "@/components/landing/pricing";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080A0F] text-[#E2E8F0]">
      <LandingNavbar />
      <LandingHero />
      <DataStrip />
      <LandingComparison />
      <LandingFeatures />
      <LandingPricing />
    </div>
  );
}
