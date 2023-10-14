import { create } from "zustand";
import { toast } from "react-hot-toast";

import { Product } from "@/global-types";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStore {
    items: Product[],
    addItem: (newItem: Product) => void,
    removeItem: (itemId : string) => void,
    removeAllItem: ()=>void
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (newItem: Product) => {
            const currentItems = get().items;
            const existedItem = currentItems.find(
                (item) => item.id === newItem.id);
            if (existedItem) {
                return toast('Item is in cart')
            };

            set({items: [...get().items, newItem]});
            toast.success('Added to cart');
        },
        removeItem: (itemId: string) => {
            set({items: [...get().items.filter((item) => item.id !== itemId )]});
            toast.success('removed from cart')
        },
        removeAllItem: () => {
            set({items: []})
        }
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
    }));

export default useCart;