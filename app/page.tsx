import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GlimpsesSection from "@/components/GlimpsesSection";
import SpotlightsSection from "@/components/SpotlightsSection";
import CitizenJourneyGuide from "@/components/CitizenJourneyGuide";
import CitizenCharter from "@/components/CitizenCharter";
import PanchayatSelection from "@/components/PanchayatSelection";
import ServiceCenter from "@/components/ServiceCenter";
import StatsSection from "@/components/StatsSection";
import WelfareSchemes from "@/components/WelfareSchemes";
import GovernanceTransparency from "@/components/GovernanceTransparency";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import LatestUpdates from "@/components/LatestUpdates";

export default function Home() {
  return (
    <>
      <div className="bg-[#f2f4f7] text-lg md:text-xl text-slate-900 dark:bg-[#0a111a] dark:text-slate-100">
        <FloatingSupport />

        <Header />

        <LatestUpdates />

        <HeroSection />

        <AboutSection />

        <GlimpsesSection />

        <SpotlightsSection />

        <CitizenJourneyGuide />

        <CitizenCharter />

        <PanchayatSelection />

        <ServiceCenter />

        <StatsSection />

        <WelfareSchemes />

        <GovernanceTransparency />

        <Footer />
      </div>
    </>
  );
}
