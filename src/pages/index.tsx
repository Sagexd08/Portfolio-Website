import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SEO from '@/components/layout/SEO';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import AIShowcase from '@/components/sections/AIShowcase';

// Dynamically import the Hero component with 3D elements
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
  suspense: true,
});

const Home: NextPage = () => {
  return (
    <>
      <SEO
        title="Sohom Chatterjee | AI/ML Developer Portfolio"
        description="Sohom Chatterjee's portfolio showcasing expertise in artificial intelligence and machine learning"
      />

      <main className="overflow-hidden">
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading 3D scene...</div>}>
          <Hero />
        </Suspense>
        <About />
        <Projects />
        <AIShowcase />
        <Experience />
        <Contact />
      </main>
    </>
  );
};

export default Home;