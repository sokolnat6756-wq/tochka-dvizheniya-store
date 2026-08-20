import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';
import { ProductImage } from './ProductImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const [size, setSize] = useState<number | null>(null);
  const [color, setColor] = useState('');
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (product) {
      setSize(null);
      setColor(product.colors[0]?.name ?? '');
      setSizeError(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (size === null) {
      setSizeError(true);
      return;
    }
    addToCart(product.id, size, color);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <div className="product-modal__media">
          <ProductImage src={product.image} alt={product.name} />
        </div>

        <div className="product-modal__info">
          <p className="product-modal__category">{product.category}</p>
          <h2 id="product-modal-title">{product.name}</h2>
          <p className="product-modal__desc">{product.description}</p>
          <p className="product-modal__price">{formatPrice(product.price)}</p>

          <div className="selector">
            <span className="selector__label">Цвет</span>
            <div className="selector__row">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`color-option ${color === c.name ? 'is-active' : ''}`}
                  style={{ background: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                  onClick={() => setColor(c.name)}
                />
              ))}
            </div>
            <span className="selector__value">{color}</span>
          </div>

          <div className="selector">
            <span className="selector__label">Размер</span>
            <div className="size-grid">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`size-btn ${size === s ? 'is-active' : ''}`}
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="form-error">Пожалуйста, выберите размер</p>
            )}
          </div>

          <div className="product-modal__actions">
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={handleAdd}
            >
              Добавить в корзину
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--block"
              onClick={() => toggleFavorite(product.id)}
            >
              {isFavorite(product.id)
                ? 'Убрать из избранного'
                : 'В избранное'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
