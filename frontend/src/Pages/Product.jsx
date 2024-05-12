import React, { useContext } from "react";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  // console.log(all_product.products); // it give the list of products array
  const helperProduct = all_product.products; // needed idk why though

  const product = helperProduct.find((e) => e.id === Number(productId));
  if (!product || product === undefined) {
    return <div>Product not found.</div>;
  }
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
