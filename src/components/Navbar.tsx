import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Booking', href: '#booking' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-navy-900/95 backdrop-blur-xl shadow-lg shadow-navy-950/30' : 'bg-transparent'}`}>
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-700 ${scrolled ? 'h-16' : 'h-20'}`}>
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-navy-900 font-display text-2xl font-extrabold tracking-tightest transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">K</span>
            <span className="font-display text-xl font-bold tracking-tight text-white">KUYA</span>
            <span className="hidden sm:inline text-[10px] font-medium uppercase tracking-ultra text-navy-200 mt-1">Auto Detailing</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-navy-100 hover:text-white transition-colors duration-300 relative group">
                {link.label}<span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            <a href="#booking" className="luxury-button inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-navy-900 shadow-lg"><span className="relative z-10">Book Now</span></a>
          </div>
          <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-navy-700/50 py-4 space-y-1 animate-fade-in">
            {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-navy-100 hover:text-white hover:bg-navy-800/50 rounded-lg transition-colors">{link.label}</a>)}
            <a href="#booking" onClick={() => setMobileOpen(false)} className="luxury-button block mx-4 mt-3 rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-navy-900"><span className="relative z-10">Book Now</span></a>
          </div>
        )}
      </nav>
    </header>
  );
}
