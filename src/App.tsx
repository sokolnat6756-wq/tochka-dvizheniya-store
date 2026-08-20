import { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import type { FilterKey, Product, SortOption } from './types';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Catalog } from './components/Catalog';
import { CityBanner } from './components/CityBanner';
import { About } from './components/About';
import { Reviews } from './components/Reviews';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import './index.css';

function StoreApp() {
  const { favorites } = useStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterKey>('все');
  const [sort, setSort] = useState<SortOption>('default');
  const [selected, setSelected] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const openFavorites = () => {
    setFavoritesOnly(true);
    setFilter('все');
    setSearch('');
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchChange = (value: string) => {
    setFavoritesOnly(false);
    setSearch(value);
  };

  const handleFilterChange = (next: FilterKey) => {
    setFavoritesOnly(false);
    setFilter(next);
  };

  return (
    <div className="app">
      <TopBar />
      <Header
        searchValue={search}
        onSearchChange={handleSearchChange}
        onOpenFavorites={openFavorites}
      />
      <main>
        <Hero />
        <Features />
        {favoritesOnly && (
          <div className="favorites-banner">
            <p>
              Показано избранное ({favorites.length})
            </p>
            <button
              type="button"
              className="btn btn--sm btn--ghost"
              onClick={() => setFavoritesOnly(false)}
            >
              Показать весь каталог
            </button>
          </div>
        )}
        <Catalog
          search={search}
          onSearchChange={handleSearchChange}
          filter={filter}
          onFilterChange={handleFilterChange}
          sort={sort}
          onSortChange={setSort}
          onDetails={setSelected}
          onQuickAdd={setSelected}
          favoritesOnly={favoritesOnly}
          favoriteIds={favorites}
        />
        <CityBanner />
        <About />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
      <ProductModal product={selected} onClose={() => setSelected(null)} />
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreApp />
    </StoreProvider>
  );
}
