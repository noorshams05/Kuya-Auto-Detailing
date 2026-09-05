import { useRef } from 'react';
import { Check, Star } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type VehicleSize = 'Coupe' | 'Sedan' | 'SUV / Truck' | 'Large SUV / Truck';

const packages = [
  {
    name: 'Kuya Standard',
    tagline: 'Essential exterior & interior clean',
    features: ['Exterior wash & dry', 'Tire & wheel cleaning', 'Interior vacuum', 'Window cleaning', 'Dash & door cleaning'],
    pricing: { Coupe: '$110', Sedan: '$115', 'SUV / Truck': '$120', 'Large SUV / Truck': '$125' } as Record<VehicleSize, string>,
    popular: false,
  },
  {
    name: 'Kuya Premium+',
    tagline: 'Added protection & shine',
    features: ['Everything in Standard, plus:', 'Hand wax application', 'Tire protectant', 'UV dash treatment'],
    pricing: { Coupe: '$130', Sedan: '$135', 'SUV / Truck': '$140', 'Large SUV / Truck': '$145' } as Record<VehicleSize, string>,
    popular: true,
  },
  {
    name: 'Kuya Ultimate++',
    tagline: 'Full restoration & deep clean',
    features: ['Everything in Premium+, plus:', 'Clay bar & sealant', 'Leather conditioning', 'Carpet shampoo'],
    pricing: { Coupe: '$180', Sedan: '$185', 'SUV / Truck': '$195', 'Large SUV / Truck': '$200' } as Record<VehicleSize, string>,
    popular: false,
  },
];

const vehicleSizes: VehicleSize[] = ['Coupe', 'Sedan', 'SUV / Truck', 'Large SUV / Truck'];

function TiltCard({ pkg, index }: { pkg: typeof packages[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
  };
  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative flex flex-col rounded-2xl border-2 p-8 transition-all duration-500 will-change-transform ${
        pkg.popular
          ? 'border-navy-500 bg-navy-900 text-white lg:scale-105 shadow-2xl shadow-navy-900/20'
          : 'border-navy-100 bg-white text-navy-900 hover:border-navy-300 hover:shadow-xl'
      }`}
      style={{ opacity: 0, animation: `fadeUp 0.7s cubic-bezier(.22,1,.36,1) ${index * 150}ms forwards` }}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-navy-900 shadow-lg">
            <Star className="h-3.5 w-3.5 fill-navy-500 text-navy-500" /> Most Popular
          </span>
        </div>
      )}
      {pkg.popular && <div className="premium-glow absolute inset-0 rounded-2xl border-2 border-navy-400 pointer-events-none" />}
      <h3 className={`font-display text-2xl font-bold ${pkg.popular ? 'text-white' : 'text-navy-900'}`}>{pkg.name}</h3>
      <p className={`mt-1 text-sm ${pkg.popular ? 'text-navy-200' : 'text-navy-400'}`}>{pkg.tagline}</p>
      <div className={`mt-6 space-y-3 ${pkg.popular ? 'text-navy-100' : 'text-navy-700'}`}>
        {pkg.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            {i === 0 && pkg.features[0].includes('Everything') ? (
              <span className="text-sm font-medium flex-1">{feature}</span>
            ) : (
              <>
                <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-navy-300' : 'text-navy-500'}`} strokeWidth={2} />
                <span className="text-sm">{feature}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={`mt-8 pt-6 border-t ${pkg.popular ? 'border-navy-700' : 'border-navy-100'}`}>
        <p className={`text-xs font-semibold uppercase tracking-wide mb-4 ${pkg.popular ? 'text-navy-200' : 'text-navy-400'}`}>Pricing by Vehicle Size</p>
        <div className="space-y-2.5">
          {vehicleSizes.map((size) => (
            <div key={size} className="flex items-center justify-between text-sm">
              <span className={pkg.popular ? 'text-navy-200' : 'text-navy-500'}>{size}</span>
              <span className={`font-semibold ${pkg.popular ? 'text-white' : 'text-navy-900'}`}>{pkg.pricing[size]}</span>
            </div>
          ))}
        </div>
      </div>
      <a href="#booking" className={`luxury-button mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold ${pkg.popular ? 'bg-white text-navy-900' : 'bg-navy-900 text-white'}`}><span className="relative z-10">Book {pkg.name}</span></a>
    </div>
  );
}

export default function Pricing() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="pricing" className="bg-white py-24 lg:py-32">
      <div ref={ref} className={`mx-auto max-w-7xl px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-ultra text-navy-500 mb-4">Packages & Pricing</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-navy-900">Choose Your Detail</h2>
          <p className="mt-4 text-lg text-navy-400 max-w-2xl mx-auto">Three tiers, priced by vehicle size. Every package is fully mobile — we come to you.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg, i) => <TiltCard key={pkg.name} pkg={pkg} index={i} />)}
        </div>
        <p className="text-center mt-10 text-sm text-navy-400">Prices are starting points — final quote confirmed upon booking. Multiple vehicles welcome.</p>
      </div>
    </section>
  );
}
