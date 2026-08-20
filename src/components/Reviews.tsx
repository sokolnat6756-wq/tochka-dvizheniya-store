import { Star } from 'lucide-react';
import { reviews } from '../data/products';

export function Reviews() {
  return (
    <section className="reviews" aria-label="Отзывы">
      <div className="section-head">
        <p className="eyebrow">Отзывы</p>
        <h2>Говорят те, кто уже в движении</h2>
      </div>
      <div className="reviews__grid">
        {reviews.map((review) => (
          <article key={review.id} className="review">
            <div className="review__stars" aria-label={`${review.rating} из 5`}>
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p>«{review.text}»</p>
            <strong>{review.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
