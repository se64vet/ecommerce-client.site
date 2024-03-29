"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import useCart from "@/hooks/use-cart";
import usePreviewModal from "@/hooks/use-preview-modal";
import { Pricetag } from "@/components/ui/price-tag";
import IconButton  from "@/components/ui/icon-button";
import { Product } from "@/global-types";

interface ProductCard {
  data: Product
}

export const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };
  
  return ( 
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <CardHeader 
      imgUrl={data.images[0].url}
      onPreview={onPreview}
      onAddToCart={onAddToCart}
      />

      <CardDetails 
      name={data.name}
      shortDescription={data.category.name}
      price={data.price}
      />
    </div>
  );
}

interface CardHeaderProps {
  imgUrl: string,
  onPreview: MouseEventHandler<HTMLButtonElement>,
  onAddToCart: MouseEventHandler<HTMLButtonElement>
}
const CardHeader = ({imgUrl, onPreview, onAddToCart}:CardHeaderProps) => {

  return(
    // Image & actions
    <div className="aspect-square rounded-xl bg-gray-100 relative">

        <Image 
          src={imgUrl} 
          alt="" 
          fill
          className="aspect-square object-cover rounded-md"
        />

        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview} 
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart} 
              icon={<ShoppingCart size={20} className="text-gray-600" />} 
            />
          </div>
        </div>

      </div>
  )
}

interface CardDetailsProps {
  name: string,
  shortDescription: string,
  price: string | number
}
const CardDetails = ({name, shortDescription, price} : CardDetailsProps ) => {

  return (
    <div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{name}</p>
        <p className="text-sm text-gray-500">{shortDescription}</p>
      </div>

      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Pricetag value={price} />
      </div>
    </div>
  )
}
