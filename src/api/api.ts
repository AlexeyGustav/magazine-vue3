import type { ProductsApi } from '@/types/types.ts';

const API_URL = 'http://localhost:4000';

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data as T;
}

const CATALOG_QUERY = `
  query {
    catalog {
      categories
      filters {
        price { label min max currency }
        additional { label options }
        material { label options }
        color { label options }
        style { label options }
      }
      products {
        id img title description text
        oldPrice newPrice additional
        material color style price
      }
    }
  }
`;

export async function getProducts(): Promise<ProductsApi> {
  const data = await gql<{ catalog: ProductsApi }>(CATALOG_QUERY);
  return data.catalog;
}
