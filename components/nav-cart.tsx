'use client'

import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'

import useCart from '@/hooks/use-cart'


export const Cart = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    const router = useRouter();
    const cart = useCart();
  
    if (!isMounted) {
      return null;
    }
  return (
    <div className="flex items-center gap-x-4">
      <div onClick={() => router.push('/cart')} className="flex items-center rounded-full bg-black px-4 py-2">
        <ShoppingBag
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </div>
    </div>
  )
}