import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    decrementItem: (id: string) => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set, get) => ({
                items: [],
                addItem: (item) =>
                    set(
                        (state) => {
                            const existing = state.items.find((i) => i.id === item.id);
                            if (existing) {
                                return {
                                    items: state.items.map((i) =>
                                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
                                    ),
                                };
                            }
                            return { items: [...state.items, { ...item, quantity: 1 }] };
                        },
                        false,
                        'cart/addItem',
                    ),
                removeItem: (id) =>
                    set(
                        (state) => ({
                            items: state.items.filter((i) => i.id !== id),
                        }),
                        false,
                        'cart/removeItem',
                    ),
                decrementItem: (id) =>
                    set(
                        (state) => {
                            const existing = state.items.find((i) => i.id === id);
                            if (!existing) return {};
                            if (existing.quantity <= 1) {
                                return {
                                    items: state.items.filter((i) => i.id !== id),
                                };
                            }
                            return {
                                items: state.items.map((i) =>
                                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
                                ),
                            };
                        },
                        false,
                        'cart/decrementItem',
                    ),
                clearCart: () => set({ items: [] }, false, 'cart/clearCart'),
                total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
            }),
            { name: 'cart-storage' },
        ),
        { name: 'CartStore' },
    ),
);
