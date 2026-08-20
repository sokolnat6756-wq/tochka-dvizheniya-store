import { Package, Palette, RefreshCw, Wind } from 'lucide-react';

const FEATURES = [
  {
    icon: Palette,
    title: 'Оригинальный дизайн',
    text: 'Силуэты, которые задают тон улице и не теряются в толпе.',
  },
  {
    icon: Wind,
    title: 'Комфорт каждый день',
    text: 'Лёгкость и поддержка — от первой прогулки до длинного маршрута.',
  },
  {
    icon: Package,
    title: 'Быстрая доставка',
    text: 'Отправляем заказы оперативно по всей России.',
  },
  {
    icon: RefreshCw,
    title: 'Возврат 14 дней',
    text: 'Не подошла пара — верните без лишних вопросов.',
  },
];

export function Features() {
  return (
    <section className="features" aria-label="Преимущества">
      <div className="features__grid">
        {FEATURES.map((item) => (
          <article key={item.title} className="feature">
            <item.icon size={22} strokeWidth={1.5} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
