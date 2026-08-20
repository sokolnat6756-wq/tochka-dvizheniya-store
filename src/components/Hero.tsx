import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { scrollToId } from '../utils/format';

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">НОВАЯ КОЛЛЕКЦИЯ / 2026</p>
        <h1 className="hero__title">
          ТВОЯ НОВАЯ ПАРА
          <br />
          УЖЕ ЗДЕСЬ
        </h1>
        <p className="hero__desc">
          Кроссовки для города, спорта и собственного ритма. Найди свою пару и
          выбери свой маршрут.
        </p>
        <div className="hero__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => scrollToId('catalog')}
          >
            Смотреть новинки
            <ArrowRight size={18} />
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => scrollToId('catalog')}
          >
            Выбрать свою пару
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <div className="hero__orbit hero__orbit--a" />
        <div className="hero__orbit hero__orbit--b" />
        <div className="hero__glow" />
        <img
          className="hero__image"
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
          alt=""
        />
        <span className="hero__streak" />
        <span className="hero__streak hero__streak--2" />
      </div>
    </section>
  );
}
