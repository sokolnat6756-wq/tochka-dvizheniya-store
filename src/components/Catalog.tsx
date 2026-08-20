import { useMemo } from 'react';
import { products } from '../data/products';
import type { FilterKey, Product, SortOption } from '../types';
import { ProductCard } from './ProductCard';

const FILTERS: FilterKey[] = [
  'все',
  'новинки',
  'для города',
  'для бега',
  'высокие',
  'универсальные',
];

interface CatalogProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: FilterKey;
  onFilterChange: (filter: FilterKey) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onDetails: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  favoritesOnly?: boolean;
  favoriteIds?: string[];
}

export function Catalog({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  sort,
  onSortChange,
  onDetails,
  onQuickAdd,
  favoritesOnly = false,
  favoriteIds = [],
}: CatalogProps) {
  const list = useMemo(() => {
    let result = [...products];

    if (favoritesOnly) {
      result = result.filter((p) => favoriteIds.includes(p.id));
    }

    if (filter !== 'все') {
      result = result.filter((p) => p.category === filter);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, filter, sort, favoritesOnly, favoriteIds]);

  return (
    <section className="catalog" id="catalog">
      <div className="section-head">
        <p className="eyebrow">Каталог</p>
        <h2>ВЫБЕРИ СВОЮ ПАРУ</h2>
      </div>

      <div className="catalog__controls">
        <input
          type="search"
          className="catalog__search"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Поиск по названию"
        />

        <div className="catalog__filters" role="tablist" aria-label="Фильтры">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`chip ${filter === f ? 'is-active' : ''}`}
              onClick={() => onFilterChange(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <label className="catalog__sort">
          <span>Сортировка</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
          </select>
        </label>
      </div>

      {list.length === 0 ? (
        <p className="catalog__empty">
          {favoritesOnly
            ? 'В избранном пока ничего нет'
            : 'Ничего не найдено. Попробуйте другой запрос.'}
        </p>
      ) : (
        <div className="catalog__grid">
          {list.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetails={onDetails}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      )}
    </section>
  );
}
