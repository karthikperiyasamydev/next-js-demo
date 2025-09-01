import { getApolloClient } from "@/lib/apolloClient";
import GET_PRODUCT from "@/queries/get-product-detail";

interface ProductDetail {
  id: number;
  name: string;
  sku: string;
  description?: {
    html: string;
  };
  price_range: {
    minimum_price: {
      regular_price: {
        value: number;
        currency: string;
      };
    };
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;

  const client = getApolloClient();

  const { data } = await client.query<{
    products: { items: ProductDetail[] };
  }>({
    query: GET_PRODUCT,
    variables: { sku },
  });

  const product = data.products.items[0];

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.name}</h1>
      <p>
        SKU: <strong>{product.sku}</strong>
      </p>
      <p>
        Price:{" "}
        <strong>
          {product.price_range.minimum_price.regular_price.value}{" "}
          {product.price_range.minimum_price.regular_price.currency}
        </strong>
      </p>
      {product.description?.html && (
        <div dangerouslySetInnerHTML={{ __html: product.description.html }} />
      )}
    </div>
  );
}
