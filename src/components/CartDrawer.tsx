import { useState } from 'react';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { FREE_DELIVERY_THRESHOLD, products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';
import { ProductImage } from './ProductImage';

interface CartDrawerProps {
  onCheckout: () => void;
}

export function CartDrawer({ onCheckout }: CartDrawerProps) {
  const {
    isCartOpen,
    closeCart,
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    total,
    promoApplied,
    promoError,
    applyPromo,
    clearPromo,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - total);
  const progress = Math.min(100, (total / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <div className={`cart-drawer ${isCartOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="cart-drawer__backdrop"
        aria-label="Закрыть корзину"
        onClick={closeCart}
      />
      <aside className="cart-drawer__panel" aria-label="Корзина">
        <div className="cart-drawer__head">
          <h2>Корзина</h2>
          <button
            type="button"
            className="icon-btn"
            aria-label="Закрыть"
            onClick={closeCart}
          >
            <X size={22} />
          </button>
        </div>

        <div className="delivery-meter">
          {remaining > 0 ? (
            <p>
              До бесплатной доставки осталось{' '}
              <strong>{formatPrice(remaining)}</strong>
            </p>
          ) : (
            <p className="delivery-meter__ok">
              Бесплатная доставка уже доступна
            </p>
          )}
          <div className="delivery-meter__bar">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="cart-drawer__list">
          {cart.length === 0 ? (
            <p className="cart-drawer__empty">Корзина пуста</p>
          ) : (
            cart.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              return (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="cart-item"
                >
                  <ProductImage src={product.image} alt={product.name} />
                  <div className="cart-item__info">
                    <h3>{product.name}</h3>
                    <p>
                      Размер {item.size} · {item.color}
                    </p>
                    <strong>{formatPrice(product.price)}</strong>
                    <div className="cart-item__qty">
                      <button
                        type="button"
                        aria-label="Уменьшить"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity - 1,
                          )
                        }
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="Увеличить"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.color,
                            item.quantity + 1,
                          )
                        }
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        type="button"
                        className="cart-item__remove"
                        aria-label="Удалить"
                        onClick={() =>
                          removeFromCart(
                            item.productId,
                            item.size,
                            item.color,
                          )
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-drawer__footer">
          <div className="promo">
            <input
              type="text"
              placeholder="Промокод"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              disabled={promoApplied}
            />
            {promoApplied ? (
              <button type="button" className="btn btn--sm btn--ghost" onClick={clearPromo}>
                Сбросить
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--sm btn--ghost"
                onClick={() => applyPromo(promoInput)}
              >
                Применить
              </button>
            )}
          </div>
          {promoError && <p className="form-error">{promoError}</p>}
          {promoApplied && (
            <p className="promo-ok">Промокод KICK10 применён (−10%)</p>
          )}

          <div className="cart-totals">
            <div>
              <span>Товары</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="cart-totals__discount">
                <span>Скидка</span>
                <span>−{formatPrice(discount)}</span>
              </div>
            )}
            <div className="cart-totals__total">
              <span>Итого</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn--primary btn--block"
            disabled={cart.length === 0}
            onClick={() => {
              closeCart();
              onCheckout();
            }}
          >
            Оформить заказ
          </button>
        </div>
      </aside>
    </div>
  );
}
