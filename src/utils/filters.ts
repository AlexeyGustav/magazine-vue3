import type { SearchableProduct, Product } from '@/types/types';

export function filterByPrice(product: Product[], min: number, max: number) {
  return product.filter((p) => p.price >= min && p.price <= max);
}

export function matchesSearch(product: SearchableProduct, query: string) {
  const q = query.trim().toLowerCase();
  return product.description.toLowerCase().includes(q);
}

export function editingPrice(item: number) {
  return item.toLocaleString('ru-RU')
}