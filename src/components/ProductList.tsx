import React, { ReactElement } from "react";
import useCart from "../hooks/useCart";
import useProduct from "../hooks/useProducts";
import Product from "./Product";

const ProductList = () => {
  const { dispatch, Reducer_Actions, cart } = useCart();
  const { products } = useProduct();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some(
        (item) => item.product.sku === product.sku
      );
      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          Reducer_Actions={Reducer_Actions}
          inCart={inCart}
        />
      );
    });
  }

  const content = (
    <main className="main.main.main--products">{pageContent}</main>
  );

  return content;
};

export default ProductList;
