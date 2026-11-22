import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Product from '../components/Product.vue';
import type { AllProduct } from '@/types/types.ts';

describe('тесты компонента товаров', () => {
  const mockProduct: AllProduct = {
    id: 2,
    price: 200,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzvnKHtUBPSbjfskwVHBFRXJhFaIbjMd1XSylwZKJPUw&s=10',
    title: 'Варенье',
    description: 'Варенье Малиновое',
    text: 'Нежное малиновое варенье с косточками. Сезонный урожай, небольшой тираж. Банка 350 г.',
    additional: 'Новинка',
    material: ['Малина'],
    oldPrice: "490 ₽",
    newPrice: null,
    color: ['Сладкий', 'Кисло-сладкий'],
    style: ['Фермерский'],
  };

  it('показывает кнопку в корзину, когда товара нету', () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct,
        basket: [],
      },
    });
    expect(wrapper.text()).toContain('В корзину');
    expect(wrapper.find('.quantity-control').exists()).toBe(false);
  });

  it('проверяем правильность отображения в корзине', () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct,
        basket: [
          {
            id: 2,
            quantity: 1,
          },
        ],
      },
    });
    expect(wrapper.find('.add-btn').exists()).toBe(false);
    expect(wrapper.find('.quantity-control').exists()).toBe(true);
    expect(wrapper.find('.quantity-value').text()).toBe('1');
  });

  it('Проверка + и - товара в корзину', async () => {
    const wrapper = mount(Product, {
      props: {
        product: mockProduct,
        basket: [
          {
            id: 2,
            quantity: 2,
          },
        ],
      },
    });
    const [minusBtn, plusBtn] = wrapper.findAll('.quantity-btn');
    await minusBtn.trigger('click');
    await plusBtn.trigger('click');
    // Проверка есть ли кнопка на самом деле
    const emittedDecrease = wrapper.emitted('decrease') ?? [];
    const emittedIncrease = wrapper.emitted('increase') ?? [];
    expect(emittedDecrease[0]).toEqual([mockProduct]);
    expect(emittedIncrease[0]).toEqual([mockProduct]);
  });
});
