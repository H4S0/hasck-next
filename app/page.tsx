import { AboutHasck } from '@/components/sections/about-hasck';
import { CtaSection } from '@/components/sections/cta-section';
import { Footer } from '@/components/sections/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { getHasckServerSession } from './services/getHasckServerSession';
import { Navbar } from '@/components/additional/navbar';

export default async function Page() {
  const { isAuthenticated } = await getHasckServerSession();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />
      <HeroSection />
      <AboutHasck />
      <CtaSection />
      <Footer />
    </div>
  );
}
