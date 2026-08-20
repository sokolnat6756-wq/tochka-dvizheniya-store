import type { Product } from '../types';

const SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

export const FREE_DELIVERY_THRESHOLD = 15000;
export const PROMO_CODE = 'KICK10';
export const PROMO_DISCOUNT = 0.1;

export const products: Product[] = [
  {
    id: 'pervyy-shag',
    name: 'Первый шаг',
    price: 11990,
    category: 'новинки',
    description:
      'Старт новой коллекции: лёгкая подошва, смелый силуэт и уверенная посадка для ежедневных маршрутов.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Красный', hex: '#e11d2e' },
      { name: 'Чёрный', hex: '#111111' },
      { name: 'Белый', hex: '#f5f5f5' },
    ],
    sizes: SIZES,
  },
  {
    id: 'razgon',
    name: 'Разгон',
    price: 9490,
    category: 'для бега',
    description:
      'Динамичная модель для темпа: амортизация, дыхающий верх и сцепление на асфальте.',
    image:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Лайм', hex: '#c8ff00' },
      { name: 'Графит', hex: '#2a2a2a' },
      { name: 'Синий', hex: '#1a5cff' },
    ],
    sizes: SIZES,
  },
  {
    id: 'puls-ulits',
    name: 'Пульс улиц',
    price: 12990,
    category: 'для города',
    description:
      'Городской характер: плотный верх, выразительная линия и комфорт на весь день.',
    image:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Бежевый', hex: '#d4c4a8' },
      { name: 'Чёрный', hex: '#111111' },
      { name: 'Синий', hex: '#1a5cff' },
    ],
    sizes: SIZES,
  },
  {
    id: 'legkiy-hod',
    name: 'Лёгкий ход',
    price: 10990,
    category: 'универсальные',
    description:
      'Универсальная пара без лишнего веса — от тренировки до вечерней прогулки.',
    image:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Белый', hex: '#f5f5f5' },
      { name: 'Серый', hex: '#9a9a9a' },
      { name: 'Чёрный', hex: '#111111' },
    ],
    sizes: SIZES,
  },
  {
    id: 'tikhiy-shag',
    name: 'Тихий шаг',
    price: 8990,
    category: 'для города',
    description:
      'Минимализм и мягкий ход. Идеальны для тех, кто двигается спокойно и уверенно.',
    image:
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa9?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Серый', hex: '#8a8a8a' },
      { name: 'Белый', hex: '#f5f5f5' },
      { name: 'Синий', hex: '#1a5cff' },
    ],
    sizes: SIZES,
  },
  {
    id: 'vysota',
    name: 'Высота',
    price: 13490,
    category: 'высокие',
    description:
      'Высокий силуэт с поддержкой голеностопа и streetwear-характером.',
    image:
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Чёрный', hex: '#111111' },
      { name: 'Белый', hex: '#f5f5f5' },
      { name: 'Лайм', hex: '#c8ff00' },
    ],
    sizes: SIZES,
  },
  {
    id: 'svobodnyy-ritm',
    name: 'Свободный ритм',
    price: 9990,
    category: 'универсальные',
    description:
      'Свободная посадка и яркий ритм линий — пара под любой сценарий дня.',
    image:
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffc26e9?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Красный', hex: '#e11d2e' },
      { name: 'Белый', hex: '#f5f5f5' },
      { name: 'Чёрный', hex: '#111111' },
    ],
    sizes: SIZES,
  },
  {
    id: 'nochnoy-marshrut',
    name: 'Ночной маршрут',
    price: 14990,
    category: 'новинки',
    description:
      'Тёмный премиальный силуэт для ночных маршрутов города. Новинка сезона 2026.',
    image:
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
    colors: [
      { name: 'Чёрный', hex: '#111111' },
      { name: 'Графит', hex: '#2a2a2a' },
      { name: 'Синий', hex: '#1a5cff' },
    ],
    sizes: SIZES,
  },
];

export const reviews = [
  {
    id: 1,
    name: 'Алина К.',
    text: 'Ношу «Пульс улиц» уже месяц — комфорт на весь день, а дизайн реально выделяется.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Максим Р.',
    text: 'Заказал «Разгон» для пробежек. Лёгкие, держат темп, доставка пришла быстро.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Дарья С.',
    text: '«Ночной маршрут» — любовь с первой примерки. Качество на уровне премиум-брендов.',
    rating: 5,
  },
];
