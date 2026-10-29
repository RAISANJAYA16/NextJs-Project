"use client"

import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const AddToCart = ({product}) => {
    const addToCart = useCartStore((state) => state.addToCart);


    function addProductToCart(){
        addToCart(product)
        toast.info(`${product.name} added to cart`)


    }
  return (
      <button type="button" onClick={addProductToCart}
        className="bg-primary w-full px-2 py-2 text-white rounded-xl">Add to cart</button>
    

  )
}

export default AddToCart
