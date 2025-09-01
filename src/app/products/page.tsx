import Link from "next/link";
import { getApolloClient } from "@/lib/apolloClient";
import GET_PRODUCTS from "@/queries/get-products-list";

interface ProductListItem {
  id: number;
  name: string;
  sku: string;
  price_range: {
    minimum_price: {
      regular_price: {
        value: number;
        currency: string;
      };
    };
  };
}

export default async function ProductsPage() {
  const client = getApolloClient();
  const { data } = await client.query<{ products: { items: ProductListItem[] } }>({
    query: GET_PRODUCTS,
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <ul>
        {data.products.items.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.sku}`}>
              {p.name} - {p.price_range.minimum_price.regular_price.value}{" "}
              {p.price_range.minimum_price.regular_price.currency}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
