import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
    currency: string;
}

export const useCurrencyStore = create<CartStore>()(
    persist(
        (set) => ({
            currency: 'MDL',
            setCurrency: (currency: string) => {
                set(() => {
                    return { currency };
                });
            },
        }),
        { name: 'currency-storage' },
    ),
);
