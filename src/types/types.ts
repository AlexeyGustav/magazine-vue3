export interface Product {
  id: number;
  price: number;
  description: string;
}

export interface AllProduct extends Product {
  img: string;
  title: string;
  text: string;
  oldPrice: string | null;
  newPrice: string | null;
  additional: string;
  material: string[];
  color: string[];
  style: string[];
}

export type SearchableProduct = Pick<Product, "description">;

// Тип в корзине
export interface CartItem extends AllProduct {
  quantity: number;
}

// api
interface PriceByApi {
  label: string;
  type: string;
  min: number;
  max: number;
  currency: string;
}
export interface OptionsByApi {
  label: string;
  type: 'checkbox';
  options: string[];
}
interface CharacteristicsProducts {
  price: PriceByApi;
  additional: OptionsByApi;
  material: OptionsByApi;
  color: OptionsByApi;
  style: OptionsByApi;
}
export interface ProductsApi {
  categories: string[];
  filters: CharacteristicsProducts;
  products: AllProduct[];
}
