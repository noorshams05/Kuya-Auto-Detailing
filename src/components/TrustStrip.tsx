import { Truck, CreditCard, ShieldCheck, MapPin } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const trustItems = [
  { icon: Truck, label: 'Mobile — We Come To You' },
  { icon: CreditCard, label: 'Cash, Venmo, Zelle & Card' },
  { icon: ShieldCheck, label: 'Fully Insured' },
  { icon: MapPin, label: 'Southern Orange County' },
];

export default function TrustStrip() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-navy-900 border-y border-navy-700/40">
      <div ref={ref} className={`mx-auto max-w-7xl px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 py-5 md:py-6 md:justify-center"
                style={{ opacity: 0, animation: `fadeUp 0.6s cubic-bezier(.22,1,.36,1) ${i * 120}ms forwards` }}
              >
                <Icon className="h-5 w-5 text-navy-300 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-xs md:text-sm font-medium text-navy-100 tracking-wide">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
