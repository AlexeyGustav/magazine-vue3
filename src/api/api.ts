import type { ProductsApi } from "@/types/types.ts";

export async function getProducts():Promise<ProductsApi> {
  const res = await fetch('./items.json');

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}