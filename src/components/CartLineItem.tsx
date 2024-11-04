import { ChangeEvent, ReactElement } from "react";
import { CartItemType } from "../contexts/CartProvider";
import { ReducerAction } from "../contexts/CartProvider";
import { ReducerActionType } from "../contexts/CartProvider";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  Reducer_Actions: ReducerActionType;
};

const CartLineItem = ({
  item,
  dispatch,
  Reducer_Actions,
}: PropsType): ReactElement => {
  const img = require(`../images/${item.product.sku}.jpg`);

  const lineTotal: number = item.quantity * item.product.price;

  const highestQty: number = 20 > item.quantity ? 20 : item.quantity;

  const optionValues: number[] = Array.from(
    { length: highestQty },
    (_, i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: Reducer_Actions.QUANTITY,
      payload: {
        ...item,
        quantity: Number(e.target.value),
      },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: Reducer_Actions.REMOVE,
      payload: item,
    });

  const content = (
    <li className="cart__item">
      <img src={img} alt={item.product.name} className="cart__img" />
      <div aria-label="Item Name">{item.product.name}</div>
      <div aria-label="Item Price">
        {new Intl.NumberFormat("en-us", {
          style: "currency",
          currency: "USD",
        }).format(item.product.price)}
      </div>

      <label htmlFor="itemQty" className="offscreen">
        Item Quantity
      </label>

      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.quantity}
        aria-label="Item Quantity"
        title="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-us", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>

      <button
        className="cart-button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  );
  return content;
};

export default CartLineItem;
