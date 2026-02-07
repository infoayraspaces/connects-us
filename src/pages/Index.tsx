import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import LocationsHighlight from "@/components/home/LocationsHighlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <LocationsHighlight />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
