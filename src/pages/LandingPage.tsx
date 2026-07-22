import Hero from '../components/Hero';
import LogoCloud from '../components/LogoCloud';
import Features from '../components/Features';
import Showcase from '../components/Showcase';
import Roadmap from '../components/Roadmap';
import GettingStarted from '../components/GettingStarted';
import Community from '../components/Community';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export function LandingPage() {
  return (
    <div className="noise-bg relative">
      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <Showcase />
        <Roadmap />
        <GettingStarted />
        <Community />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
