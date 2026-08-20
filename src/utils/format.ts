export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
