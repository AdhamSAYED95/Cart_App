import { useContext } from "react";
import CartContext from "../contexts/CartProvider";
import { UseCartContextType } from "../contexts/CartProvider";

const useCart = (): UseCartContextType => {
  return useContext(CartContext);
};

export default useCart;
