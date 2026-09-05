import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const words = ['Detailing,', 'Done', 'Right', '—', 'At', 'Your', 'Driveway.'];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onPointerMove = (event: PointerEvent) => setPointer({ x: (event.clientX / window.innerWidth - 0.5) * -8, y: (event.clientY / window.innerHeight - 0.5) * -8 });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('pointermove', onPointerMove); };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.18}px) scale(1.08)` }}>
        <img src="/images/image.png" alt="A freshly detailed Range Rover in a Southern Orange County driveway" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/60 to-navy-950/95" />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-20" style={{ transform: `translate(${pointer.x}px, ${pointer.y}px)` }}>
        <p className="mb-6 text-xs font-semibold uppercase tracking-ultra text-navy-200 animate-fade-in">Southern Orange County • Mobile Auto Detailing</p>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tightest text-white leading-[1.05] text-balance">
          {words.map((word, index) => <span key={`${word}-${index}`} className="inline-block mr-[0.22em] animate-fade-up" style={{ animationDelay: `${index * 80 + 120}ms`, opacity: 0 }}>{word}</span>)}
        </h1>
        <p className="mt-6 text-lg text-navy-100 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.75s', opacity: 0 }}>Premium mobile auto detailing across Southern Orange County. We bring the showroom shine to you — wherever you are.</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.9s', opacity: 0 }}>
          <a href="#booking" className="luxury-button inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-semibold text-navy-900 shadow-xl"><span className="relative z-10">Book Your Detail</span></a>
          <a href="#pricing" className="luxury-button inline-flex items-center rounded-full border-2 border-white/40 px-8 py-4 text-base font-semibold text-white"><span className="relative z-10">View Pricing</span></a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"><ChevronDown className="text-white/60 animate-scroll-indicator" size={28} /></div>
    </section>
  );
}
