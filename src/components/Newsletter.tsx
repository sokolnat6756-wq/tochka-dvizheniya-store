import { useState, type FormEvent } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setDone(true);
  };

  return (
    <section className="newsletter">
      <div className="newsletter__inner">
        <div>
          <p className="eyebrow">Подписка</p>
          <h2>Узнавай о новых коллекциях первым</h2>
          <p>Без спама — только релизы, дропы и эксклюзивные предложения.</p>
        </div>
        {done ? (
          <p className="newsletter__ok">Спасибо! Вы в списке на новые коллекции.</p>
        ) : (
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email для подписки"
            />
            <button type="submit" className="btn btn--primary">
              Подписаться
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
