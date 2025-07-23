import { Navbar } from '@/components/navbar';
import { AboutHasck } from '@/components/sections/about-hasck';
import { CtaSection } from '@/components/sections/cta-section';
import { Footer } from '@/components/sections/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { getHasckServerSession } from './services/getHasckServerSession';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { isAuthenticated } = await getHasckServerSession();

  if (!isAuthenticated) {
    return redirect('/login');
  }

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
