import { Heart } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onDetails: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export function ProductCard({
  product,
  onDetails,
  onQuickAdd,
}: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useStore();
  const fav = isFavorite(product.id);

  return (
    <article className="product-card">
      <div className="product-card__media">
        <ProductImage src={product.image} alt={product.name} />
        <button
          type="button"
          className={`fav-btn ${fav ? 'is-active' : ''}`}
          aria-label={fav ? 'Убрать из избранного' : 'В избранное'}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
        </button>
        <span className="product-card__category">{product.category}</span>
      </div>

      <div className="product-card__body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card__colors" aria-label="Цвета">
          {product.colors.map((c) => (
            <span
              key={c.name}
              className="color-dot"
              style={{ background: c.hex }}
              title={c.name}
            />
          ))}
        </div>
        <div className="product-card__sizes">
          Размеры {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
        </div>
        <div className="product-card__footer">
          <strong>{formatPrice(product.price)}</strong>
          <div className="product-card__actions">
            <button
              type="button"
              className="btn btn--sm btn--ghost"
              onClick={() => onDetails(product)}
            >
              Подробнее
            </button>
            <button
              type="button"
              className="btn btn--sm btn--primary"
              onClick={() => onQuickAdd(product)}
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
