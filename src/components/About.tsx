export function About() {
  return (
    <section className="about" id="about">
      <div className="about__content">
        <p className="eyebrow">О бренде</p>
        <h2>ТОЧКА ДВИЖЕНИЯ</h2>
        <p className="about__lead">Твой стиль начинается с движения</p>
        <p>
          Мы создаём кроссовки для тех, кто не стоит на месте: для города,
          тренировок и собственного маршрута. Каждая модель — баланс формы,
          комфорта и характера streetwear.
        </p>
        <p>
          Коллекция 2026 собрана вокруг идеи свободного ритма: смелые силуэты,
          чистые линии и материалы, которые работают каждый день.
        </p>
      </div>
      <div className="about__visual" aria-hidden="true">
        <div className="about__panel" />
        <img
          src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=900&q=80"
          alt=""
        />
      </div>
    </section>
  );
}
