import { createContext, ReactElement, useMemo, useReducer } from "react";
import { ProductType } from "./ProductsProvider";

export type CartItemType = {
  product: ProductType;
  quantity: number;
};

type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = {
  cart: [],
};

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload is missing");
      }
      const { sku, name, price } = action.payload.product;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.product.sku !== sku
      );

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.product.sku === sku
      );

      const qunt: number = itemExists ? itemExists.quantity + 1 : 1;

      return {
        ...state,
        cart: [
          ...filteredCart,
          { product: { sku, name, price }, quantity: qunt },
        ],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload is missing");
      }

      const { sku } = action.payload.product;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.product.sku !== sku
      );

      return {
        ...state,
        cart: filteredCart,
      };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload is missing");
      }
      const { sku } = action.payload.product;
      const { quantity } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.product.sku === sku
      );

      if (!itemExists) {
        throw new Error(
          "Product not found in cart and must exist in order to update quantity"
        );
      }

      const updatedItem: CartItemType = { ...itemExists, quantity };

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.product.sku !== sku
      );

      return {
        ...state,
        cart: [...filteredCart, updatedItem],
      };
    }
    case REDUCER_ACTION_TYPE.SUBMIT:
      return { ...state, cart: [] };
    default:
      throw new Error("Unidentified action type");
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const Reducer_Actions = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.quantity;
  }, 0);

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.quantity * cartItem.product.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.product.sku.slice(-4));
    const itemB = Number(b.product.sku.slice(-4));

    return itemA - itemB;
  });

  return {
    dispatch,
    Reducer_Actions,
    totalItems,
    totalPrice,
    cart,
  };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  Reducer_Actions: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
