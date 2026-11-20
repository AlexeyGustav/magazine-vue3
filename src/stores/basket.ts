import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Product, CartItem } from '@/types/types.ts';

export const useBasket = defineStore('basket', () => {
  const items = ref<CartItem[]>([]);
  // Стоимость товаров в корзине
  const totalSum = computed(() => items.value.reduce((sum, p) => sum + p.price * p.quantity, 0));

  // Корзина в хедере
  const headerBasket = computed(() => items.value.length);

  function addBasket(item: Product) {
    const existing = items.value.find((p) => p.id === item.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.value.push({ ...item, quantity: 1 });
    }
  }

  // Добавить товар
  function plusCounter(product: CartItem) {
    const existing = items.value.find((p) => p.id === product.id);
    if (existing) existing.quantity += 1;
  }

  // Убавить товар
  function minusCounter(product: CartItem) {
    const existing = items.value.find((p) => p.id === product.id);
    if (!existing) return;
    if (existing.quantity > 1) {
      existing.quantity -= 1;
    } else {
      items.value = items.value.filter((p) => p.id !== product.id);
    }
  }

  // Удалить товар
  function deleteCard(product: CartItem) {
    items.value = items.value.filter((p) => p.id !== product.id);
  }

  // Копия суммы корзины, для окна успеха
  const lastOrder = ref(0);

  function clearBasket() {
    lastOrder.value = totalSum.value;
    items.value = [];
  }

  return {
    items,
    headerBasket,
    addBasket,
    minusCounter,
    plusCounter,
    deleteCard,
    totalSum,
    clearBasket,
    lastOrder,
  };
});
