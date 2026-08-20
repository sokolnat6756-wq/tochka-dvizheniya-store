import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { products, PROMO_CODE, PROMO_DISCOUNT } from '../data/products';
import type { CartItem } from '../types';

interface StoreContextValue {
  favorites: string[];
  cart: CartItem[];
  isCartOpen: boolean;
  promoApplied: boolean;
  promoError: string;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  addToCart: (productId: string, size: number, color: string) => void;
  removeFromCart: (productId: string, size: number, color: string) => void;
  updateQuantity: (
    productId: string,
    size: number,
    color: string,
    quantity: number,
  ) => void;
  openCart: () => void;
  closeCart: () => void;
  applyPromo: (code: string) => void;
  clearPromo: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const FAVORITES_KEY = 'td-favorites';
const CART_KEY = 'td-cart';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() =>
    readJson(FAVORITES_KEY, []),
  );
  const [cart, setCart] = useState<CartItem[]>(() => readJson(CART_KEY, []));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites],
  );

  const addToCart = useCallback(
    (productId: string, size: number, color: string) => {
      setCart((prev) => {
        const existing = prev.find(
          (item) =>
            item.productId === productId &&
            item.size === size &&
            item.color === color,
        );
        if (existing) {
          return prev.map((item) =>
            item.productId === productId &&
            item.size === size &&
            item.color === color
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...prev, { productId, size, color, quantity: 1 }];
      });
      setIsCartOpen(true);
    },
    [],
  );

  const removeFromCart = useCallback(
    (productId: string, size: number, color: string) => {
      setCart((prev) =>
        prev.filter(
          (item) =>
            !(
              item.productId === productId &&
              item.size === size &&
              item.color === color
            ),
        ),
      );
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, size: number, color: string, quantity: number) => {
      if (quantity < 1) {
        removeFromCart(productId, size, color);
        return;
      }
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    [removeFromCart],
  );

  const applyPromo = useCallback((code: string) => {
    if (code.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Промокод не найден');
    }
  }, []);

  const clearPromo = useCallback(() => {
    setPromoApplied(false);
    setPromoError('');
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product?.price ?? 0) * item.quantity;
      }, 0),
    [cart],
  );

  const discount = promoApplied ? Math.round(subtotal * PROMO_DISCOUNT) : 0;
  const total = subtotal - discount;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value: StoreContextValue = {
    favorites,
    cart,
    isCartOpen,
    promoApplied,
    promoError,
    toggleFavorite,
    isFavorite,
    addToCart,
    removeFromCart,
    updateQuantity,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    applyPromo,
    clearPromo,
    cartCount,
    subtotal,
    discount,
    total,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}
