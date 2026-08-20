import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__grid">
        <div>
          <a href="#hero" className="logo">
            ТОЧКА ДВИЖЕНИЯ
          </a>
          <p className="footer__tagline">Твой стиль начинается с движения</p>
        </div>

        <div>
          <h3>Контакты</h3>
          <ul>
            <li>
              <Phone size={16} /> +7 (495) 000-00-26
            </li>
            <li>
              <Mail size={16} /> hello@tochka-dvizheniya.ru
            </li>
            <li>
              <MapPin size={16} /> Москва, ул. Движения, 1
            </li>
          </ul>
        </div>

        <div>
          <h3>Доставка</h3>
          <ul>
            <li>По России — от 2 дней</li>
            <li>Бесплатно от 15 000 ₽</li>
            <li>Курьер / ПВЗ / самовывоз</li>
          </ul>
        </div>

        <div>
          <h3>Возврат</h3>
          <ul>
            <li>14 дней на возврат</li>
            <li>Без объяснения причин</li>
            <li>Сохранённый товарный вид</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Точка движения. Демо-магазин.</span>
        <span>Промокод: KICK10</span>
      </div>
    </footer>
  );
}
