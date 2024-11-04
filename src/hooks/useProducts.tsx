import { useContext } from "react";
import ProductContext from "../contexts/ProductsProvider";
import { UseProductContextType } from "../contexts/ProductsProvider";

const useProduct = (): UseProductContextType => {
  return useContext(ProductContext);
};

export default useProduct;
