import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type GalleryImage = { src: string; alt: string; label: string };

const galleryImages: GalleryImage[] = [
  { src: '/images/image.png', alt: 'Freshly detailed Range Rover in a driveway', label: 'Exterior Shine' },
  { src: '/images/image copy.png', alt: 'Detailed vehicle close-up', label: 'Paint Correction' },
  { src: '/images/image copy 2.png', alt: 'Detailed vehicle close-up', label: 'Premium Finish' },
  { src: '/images/image copy 3.png', alt: 'Detailer at work', label: 'Hand Detailing' },
  { src: '/images/image copy 4.png', alt: 'Detailed vehicle close-up', label: 'Showroom Results' },
];

export default function Gallery() {
  const { ref, isVisible } = useScrollReveal();
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  return (
    <section id="gallery" className="bg-white py-24 lg:py-32">
      <div ref={ref} className={`mx-auto max-w-7xl px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-ultra text-navy-500 mb-4">Gallery</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-navy-900">The Results Speak for Themselves</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(img)}
              className={`group relative overflow-hidden rounded-xl bg-navy-100 ${i === 0 ? 'col-span-2 md:col-span-1 row-span-1' : ''}`}
              style={{ opacity: 0, animation: `fadeUp 0.7s cubic-bezier(.22,1,.36,1) ${i * 120}ms forwards` }}
            >
              <div className="aspect-square md:aspect-[4/3]">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-sm font-semibold text-white">{img.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[60] bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full" style={{ animation: 'fadeUp 0.5s cubic-bezier(.22,1,.36,1) forwards' }}>
            <img src={lightbox.src} alt={lightbox.alt} className="w-full rounded-xl" />
            <p className="mt-4 text-center text-white font-medium">{lightbox.label}</p>
          </div>
        </div>
      )}
    </section>
  );
}
