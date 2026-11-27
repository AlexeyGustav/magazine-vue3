import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { AllProduct, CartPosition, CartRow } from '@/types/types.ts';
import { io } from 'socket.io-client';
import { useFilters } from './filtersProducts';

export const useBasket = defineStore('basket', () => {
  const items = ref<CartPosition[]>([]);
  const socket = io('http://localhost:4000');

  socket.on('cart-updated', (newCart: CartPosition[]) => {
    items.value = newCart;
  });

  const filters = useFilters();

  // Корзина, обогащённая каталогом: { id, quantity } из сокета + поля товара из dataProducts
  const itemsBasket = computed<CartRow[]>(() => {
    return items.value
      .map((item) => {
        const product = filters.dataProducts.find((p) => p.id === item.id);
        if (!product) return null;
        return {
          id: item.id,
          quantity: item.quantity,
          price: product.price,
          title: product.title,
          img: product.img,
          text: product.text,
          description: product.description,
          oldPrice: product.oldPrice,
          newPrice: product.newPrice,
        };
      })
      .filter(Boolean) as CartRow[];
  });

  // Стоимость товаров в корзине — от обогащённых позиций, там есть price
  const totalSum = computed(() =>
    itemsBasket.value.reduce((sum, p) => sum + p.price * p.quantity, 0),
  );

  // Корзина в хедере
  const headerBasket = computed(() => items.value.length);

  // Функциям нужен только id — подходит и позиция корзины, и целый товар из каталога
  function addBasket(item: CartPosition | AllProduct) {
    socket.emit('cart:add', { id: item.id });
  }

  function plusCounter(item: CartPosition | AllProduct) {
    socket.emit('cart:plus', { id: item.id });
  }

  function minusCounter(item: CartPosition | AllProduct) {
    socket.emit('cart:minus', { id: item.id });
  }

  function deleteCard(item: CartPosition | AllProduct) {
    socket.emit('cart:remove', { id: item.id });
  }

  // Копия суммы корзины, для окна успеха — фиксируем ДО очистки
  const lastOrder = ref(0);

  function clearBasket() {
    lastOrder.value = totalSum.value;
    socket.emit('cart:clear');
  }

  return {
    items,
    itemsBasket,
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
