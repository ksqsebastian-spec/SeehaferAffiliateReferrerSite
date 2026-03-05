import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StepCards from "@/components/StepCards";
import ReferralFormLoader from "@/components/ReferralFormLoader";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <StepCards />
      <ReferralFormLoader />
      <Footer />
    </>
  );
}
