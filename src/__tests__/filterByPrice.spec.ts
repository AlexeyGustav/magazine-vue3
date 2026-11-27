import { describe, it, expect } from 'vitest';
import type { Product } from '@/types/types.ts';
import { filterByPrice } from '@/utils/filters.ts';

describe('filterByPrice', () => {
  const products: Product[] = [
    { id: 1, description: 'Кружка', price: 300 },
    { id: 1, description: 'Ваза', price: 1500 },
    { id: 1, description: 'Плед', price: 800 },
  ];

  it('фильтрует по диапазону цен', () => {
    const result = filterByPrice(products, 200, 900);
    expect(result).toHaveLength(2);
  });

  it('возвращает пустой массив, если ничего не происходит', () => {
    const result = filterByPrice(products, 5000, 10000);
    expect(result).toHaveLength(0);
  });

  it('включает пограничные значения', () => {
    const result = filterByPrice(products, 300, 300);
    expect(result[0].description).toBe('Кружка');
  });
});
