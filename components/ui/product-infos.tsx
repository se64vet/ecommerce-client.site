'use client'

import { Product } from "@/global-types"
import useCart from "@/hooks/use-cart"
import { Pricetag } from "./price-tag"
import { ShoppingCart } from "lucide-react"

interface ProductInfosProps {
    product: Product
}
export const ProductInfos = ({product} : ProductInfosProps) => {
    const cart = useCart();

    const onAddToCart = ()=>{
        cart.addItem(product);
    }

  return ( 
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Pricetag value={product?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>
            {product?.size?.value}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: product?.color?.value }} />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <button onClick={onAddToCart} className="flex items-center gap-x-2 px-4 py-2 bg-gray-200 rounded-full hover:bg-black hover:text-white">
          Add To Cart
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
}
