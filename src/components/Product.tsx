import { ProductType } from "../contexts/ProductsProvider";
import { ReducerActionType, ReducerAction } from "../contexts/CartProvider";
import { ReactElement } from "react";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  Reducer_Actions: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  Reducer_Actions,
  inCart,
}: PropsType): ReactElement => {
  const img = require(`../images/${product.sku}.jpg`);

  const addToCart = () => {
    dispatch({
      type: Reducer_Actions.ADD,
      payload: { product: { ...product }, quantity: 1 },
    });
  };

  const itemInCart = inCart ? "⬅ Item Added to  Cart: ✔" : null;

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product_img" />
      <p>
        {new Intl.NumberFormat("en-us", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={addToCart}>Add to Cart </button>
    </article>
  );
  return content;
};

export default Product;
