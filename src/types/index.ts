export type ProductCategory =
  | 'новинки'
  | 'для города'
  | 'для бега'
  | 'высокие'
  | 'универсальные';

export type FilterKey =
  | 'все'
  | 'новинки'
  | 'для города'
  | 'для бега'
  | 'высокие'
  | 'универсальные';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  image: string;
  colors: ProductColor[];
  sizes: number[];
}

export interface CartItem {
  productId: string;
  size: number;
  color: string;
  quantity: number;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc';

export interface CheckoutForm {
  name: string;
  phone: string;
  email: string;
  city: string;
  delivery: string;
  comment: string;
}
