import { useEffect, useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { scrollToId } from '../utils/format';

interface HeaderProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
  onOpenFavorites: () => void;
}

const NAV = [
  { label: 'Новинки', id: 'catalog', filter: 'новинки' },
  { label: 'Каталог', id: 'catalog' },
  { label: 'О бренде', id: 'about' },
  { label: 'Доставка', id: 'footer' },
] as const;

export function Header({
  onSearchChange,
  searchValue,
  onOpenFavorites,
}: HeaderProps) {
  const { cartCount, openCart, favorites } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <button
          type="button"
          className="header__menu-btn"
          aria-label="Меню"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} />
        </button>

        <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); scrollToId('hero'); }}>
          <span className="logo__mark" />
          ТОЧКА ДВИЖЕНИЯ
        </a>

        <nav className="header__nav">
          {NAV.map((item) => (
            <button
              key={item.label}
              type="button"
              className="header__link"
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header__actions">
          <div className={`header__search ${searchOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="icon-btn"
              aria-label="Поиск"
              onClick={() => {
                setSearchOpen((v) => !v);
                if (!searchOpen) scrollToId('catalog');
              }}
            >
              <Search size={20} />
            </button>
            <input
              type="search"
              placeholder="Поиск кроссовок..."
              value={searchValue}
              onChange={(e) => {
                onSearchChange(e.target.value);
                scrollToId('catalog');
              }}
              aria-label="Поиск по названию"
            />
          </div>

          <button
            type="button"
            className="icon-btn"
            aria-label="Избранное"
            onClick={onOpenFavorites}
          >
            <Heart size={20} />
            {favorites.length > 0 && (
              <span className="badge">{favorites.length}</span>
            )}
          </button>

          <button
            type="button"
            className="icon-btn"
            aria-label="Корзина"
            onClick={openCart}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu__panel">
          <div className="mobile-menu__head">
            <span className="logo">ТОЧКА ДВИЖЕНИЯ</span>
            <button
              type="button"
              className="icon-btn"
              aria-label="Закрыть"
              onClick={() => setMenuOpen(false)}
            >
              <X size={22} />
            </button>
          </div>
          <nav className="mobile-menu__nav">
            {NAV.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <p className="mobile-menu__tagline">
            Твой стиль начинается с движения
          </p>
        </div>
        <button
          type="button"
          className="mobile-menu__backdrop"
          aria-label="Закрыть меню"
          onClick={() => setMenuOpen(false)}
        />
      </div>
    </header>
  );
}
