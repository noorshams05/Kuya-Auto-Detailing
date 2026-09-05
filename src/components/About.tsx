import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="bg-navy-950 py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className={`mx-auto max-w-7xl px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-2xl overflow-hidden bg-navy-800">
              <img src="/images/image copy 3.png" alt="A Kuya detailer at work on a vehicle" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden lg:block w-32 h-32 border-2 border-navy-500 rounded-2xl -z-0" />
            <div className="absolute -top-6 -left-6 hidden lg:block w-32 h-32 bg-navy-900 rounded-2xl -z-0" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-ultra text-navy-300 mb-4">About Kuya</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">Locally owned.<br />Obsessed with the details.</h2>
            <p className="mt-6 text-lg text-navy-200 leading-relaxed">Kuya Auto Detailing is a Southern Orange County mobile detailing service built on one simple belief: communication and quality come first. We show up on time, we treat every vehicle like it&apos;s our own, and we make the whole process fast, easy, and efficient.</p>
            <p className="mt-4 text-lg text-navy-200 leading-relaxed">No driving to a shop. No waiting rooms. Just a showroom-quality finish, right in your driveway.</p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div><p className="font-display text-3xl font-bold text-white">100%</p><p className="text-sm text-navy-300 mt-1">Mobile Service</p></div>
              <div><p className="font-display text-3xl font-bold text-white">24hr</p><p className="text-sm text-navy-300 mt-1">Response Time</p></div>
              <div><p className="font-display text-3xl font-bold text-white">SOCO</p><p className="text-sm text-navy-300 mt-1">Service Area</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
