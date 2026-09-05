import { Star } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Review = { name: string; rating: number; text: string };

const reviews: Review[] = [
  { name: 'Melanie C.', rating: 5, text: 'Kuya Mobile Detailing: The Car Cleaning Avengers. So, I made the classic rookie parenting mistake: 1am, I picked up my daughter and her friends from a party in my brand new car — and one of them got sick in it. No matter what I tried, the smell wouldn\u2019t go away. Aiden and Jordan showed up, steam-cleaned the vents, completely eliminated the smell, and left the car looking and smelling better than it did from the dealership. Aiden is a legend — if you have kids, pets, or bad decisions riding in your car, call them immediately.' },
  { name: 'Lauren L.', rating: 5, text: 'Kuya mobile detailing is always on time, super friendly, flexible, and does a great job washing the car inside and out! Aiden has great attention to detail and customer service is unique, if something is not right by the time he is done, he will make it right. Would highly recommend to anyone looking for a mobile car wash and detail.' },
  { name: 'Alex R.', rating: 5, text: 'Kuya Mobile Detailing is actually a 6-star rating, but all I can go on here is 5... So let me start off with I am not a fan of people touching my cars and in knowing this, my beautiful better half found Kuya Mobile Detailing and surprised me...' },
  { name: 'Aimee N.', rating: 5, text: 'Aidan always does a fantastic job with my car detailing! Easy to schedule and flexible with appointments. Aidan is very thorough and my car consistently comes out looking great both inside and out! Highly recommend.' },
  { name: 'Lindy G.', rating: 5, text: 'Aidan and team did an amazing job on our 2013 Sienna today. The interior has not been detailed for at least 9 years and they made it look as new as an old minivan can. They also did a fabulous job on the exterior. We were very impressed and will definitely call on them again. Such super nice people, too.' },
  { name: 'Dana S.', rating: 5, text: 'Highly recommend Kuya Mobile Detailing they did an excellent job on our cars. Their attention to detail made our cars look brand new.' },
  { name: 'Ethan P.', rating: 5, text: 'They did a great job detailing my car had it looking brand new. They were also very professional and friendly would highly recommend.' },
  { name: 'Malinda R.', rating: 5, text: 'As soon as I saw the ad I called in no time I made my appointment for the next day, these guys are fantastic, they got right to work and had everything they needed in a mobile detailing business. They did such a great job I had them do my second car — the insides were bad, now they look and smell brand new again. I can\u2019t thank them enough, you guys are the very best. I\u2019ll be seeing you once or twice a month, thank you all again.' },
  { name: 'Joshua L.', rating: 5, text: 'Best detailers in Cali. My boy gets me right every time, detail is worth every dime.' },
  { name: 'Jason and Katherine P.', rating: 5, text: 'Great service and attention to detail. They left my car looking like new from the inside out. Would highly recommend.' },
  { name: 'Tim S.', rating: 5, text: 'These two guys are the best. Highly recommend.' },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-[340px] sm:w-[400px] flex-shrink-0 flex-col rounded-2xl bg-white border border-navy-100 p-6 shadow-sm hover:shadow-xl transition-shadow duration-500 mx-3">
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: review.rating }).map((_, idx) => (
          <Star key={idx} className="h-4 w-4 fill-navy-500 text-navy-500" />
        ))}
      </div>
      <p className="text-sm text-navy-700 leading-relaxed flex-1 line-clamp-6">&ldquo;{review.text}&rdquo;</p>
      <p className="mt-4 text-sm font-semibold text-navy-900">— {review.name}</p>
    </div>
  );
}

export default function Reviews() {
  const { ref, isVisible } = useScrollReveal();
  const row1 = reviews.slice(0, 6);
  const row2 = reviews.slice(6);

  return (
    <section className="bg-navy-50 py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className={`mx-auto max-w-7xl px-6 lg:px-8 reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-ultra text-navy-500 mb-4">Reviews</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-navy-900">What Our Clients Say</h2>
          <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white border border-navy-100 px-5 py-2.5 shadow-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-navy-500 text-navy-500" />
              ))}
            </div>
            <span className="text-sm font-bold text-navy-900">5.0</span>
            <span className="text-sm text-navy-400">— 11 Google Reviews</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="marquee-row overflow-hidden">
          <div className="marquee-track flex w-max">
            {[...row1, ...row1].map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} />
            ))}
          </div>
        </div>
        <div className="marquee-row overflow-hidden">
          <div className="marquee-track reverse flex w-max">
            {[...row2, ...row2].map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
