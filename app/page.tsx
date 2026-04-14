import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoBand from "@/components/LogoBand";
import Benefits from "@/components/Benefits";
import Solutions from "@/components/Solutions";
import TechStack from "@/components/TechStack";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoBand />
        <Benefits />
        <Solutions />
        <TechStack />
        <Pricing />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
