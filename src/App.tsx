import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import Pricing from '@/components/Pricing';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950 page-loader-exit">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-white text-navy-900 font-display text-4xl font-extrabold animate-pulse">K</div>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-navy-200">Kuya Auto Detailing</p>
          </div>
        </div>
      )}
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Pricing />
        <About />
        <Gallery />
        <Reviews />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

export default App;
