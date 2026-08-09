import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductDetailComponent from "../components/products/ProductDetailComponent";
import { useGetProductByUuidQuery } from "../services/productApi";
import RTKProductComponent from "../components/products/RTKProductComponent";

export default function Product() {
  
  const { uuid } = useParams();
  console.log(`==> uuid: ${uuid}`)
  const {data} = useGetProductByUuidQuery(uuid);


  // const { name, description, thumbnail, priceOut } = detailProduct;
  return (
    <section>

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
