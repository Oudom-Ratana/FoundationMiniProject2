import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductDetailComponent from "../components/products/ProductDetailComponent";
import { useGetProductByUuidQuery } from "../services/productApi";
import RTKProductComponent from "../components/products/RTKProductComponent";
import SEO from "../components/SEO";

export default function Product() {
  const { uuid } = useParams();
  console.log(`==> uuid: ${uuid}`);
  const { data } = useGetProductByUuidQuery(uuid);

  const productTitle = data?.name ? `${data.name} ${data.priceOut ? `($${data.priceOut})` : ''}` : "Product Details";
  const productDesc = data?.description || "Explore product details, specifications, pricing, and availability on React Foundation Store.";
  const productImage = data?.thumbnail || "/og-image.jpg";

  return (
    <section>
      <SEO
        title={productTitle}
        description={productDesc}
        image={productImage}
        type="product"
      />

      <RTKProductComponent/>

      <ProductDetailComponent
        title={data?.name}
        description={data?.description}
        thumbnail={data?.thumbnail}
        price={data?.priceOut}
      />
    </section>
  );
}
