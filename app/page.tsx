import { HeroSection } from "@/components/HeroSection";
import { BrandStorySection } from "@/components/BrandStorySection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Collections } from "@/components/Collections";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <BrandStorySection />
      <FeaturedProducts />
      <Collections />
    </div>
  );
}
