import { Phone, Instagram, MapPin, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-navy-900 font-display text-2xl font-extrabold">
                K
              </span>
              <div>
                <span className="font-display text-xl font-bold">KUYA</span>
                <p className="text-[10px] font-medium uppercase tracking-ultra text-navy-300">
                  Auto Detailing
                </p>
              </div>
            </div>
            <p className="text-sm text-navy-300 leading-relaxed">
              Premium mobile auto detailing. We bring the showroom to your driveway.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-ultra text-navy-300 mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Booking', href: '#booking' },
                { label: 'About', href: '#about' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-navy-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-ultra text-navy-300 mb-4">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a href="tel:+19495550123" className="flex items-center gap-2.5 text-sm text-navy-200 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-navy-400" strokeWidth={1.5} />
                  (949) 555-0123
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/kuyamobiledetailers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-navy-200 hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4 text-navy-400" strokeWidth={1.5} />
                  @kuyamobiledetailers
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-navy-200">
                <MapPin className="h-4 w-4 text-navy-400" strokeWidth={1.5} />
                Southern Orange County, CA
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-ultra text-navy-300 mb-4">
              Payment Methods
            </p>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-navy-400" strokeWidth={1.5} />
              <div className="flex flex-wrap gap-2">
                {['Cash', 'Venmo', 'Zelle', 'Card'].map((method) => (
                  <span
                    key={method}
                    className="rounded-md bg-navy-800 px-2.5 py-1 text-xs font-medium text-navy-200"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-navy-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400">
            &copy; {new Date().getFullYear()} Kuya Auto Detailing. All rights reserved.
          </p>
          <p className="text-xs text-navy-400">
            Serving Southern Orange County, California
          </p>
        </div>
      </div>
    </footer>
  );
}
