'use client';

import { Navbar } from '@/components/navbar';
import { AboutHasck } from '@/components/sections/about-hasck';
import { CtaSection } from '@/components/sections/cta-section';
import { Footer } from '@/components/sections/footer';
import { HeroSection } from '@/components/sections/hero-section';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <AboutHasck />
      <CtaSection />
      <Footer />
    </div>
  );
}
