import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePayment = defineStore('payment', () => {
  const typePay = ref<string>('Банковская карта');

  const numberCard = ref<string>('');
  const name = ref<string>('');
  const validityPeriod = ref<string>('');
  const cvc = ref<string>('');

  return {
    typePay,
    name,
    validityPeriod,
    cvc,
    numberCard,
  };
});
