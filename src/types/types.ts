export interface Product {
  id: number;
  price: number;
  description: string;
}

export type SearchableProduct = Pick<Product, "description">;

// Тип в корзине
export interface CartItem extends Product {
  quantity: number;
}
