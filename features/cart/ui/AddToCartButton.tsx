import { cn } from '@/shared/lib/utils/cn';
import { useCartStore } from '@/features/cart/model/cartStore';

interface Props {
    itemId: string;
    name: string;
    price: number;
    image?: string;
    className?: string;
}

export function AddToCartButton({ itemId, name, price, image, className }: Props) {
    const items = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const decrementItem = useCartStore((state) => state.decrementItem);

    const cartItem = items.find((item) => item.id === itemId);
    const quantity = cartItem ? cartItem.quantity : 0;

    if (quantity > 0) {
        return (
            <div
                className={cn(
                    'fixed bottom-0 left-0 right-0 z-10 pointer-events-none md:static md:z-auto md:pointer-events-auto md:w-full md:max-w-[320px]',
                    className,
                )}
            >
                <div className="h-6 bg-linear-to-t from-white to-transparent md:hidden" />

                <div className="bg-white pb-4 pt-6 px-6 pointer-events-auto md:p-0 md:bg-transparent">
                    <div className="w-full flex items-center justify-between bg-black text-white rounded-2xl overflow-hidden h-14">
                        <button
                            onClick={() => decrementItem(itemId)}
                            className="flex-1 h-full flex items-center justify-center font-rounds font-semibold text-lg hover:bg-neutral-900 active:bg-neutral-850 transition-colors cursor-pointer select-none text-white"
                        >
                            —
                        </button>
                        <div className="flex-1 h-full bg-white text-black flex items-center justify-center font-rounds font-semibold text-lg border-y border-x border-[#E5E7EB] select-none">
                            {quantity}
                        </div>
                        <button
                            onClick={() => addItem({ id: itemId, name, price, quantity: 1, image })}
                            className="flex-1 h-full flex items-center justify-center font-rounds font-semibold text-lg hover:bg-neutral-900 active:bg-neutral-850 transition-colors cursor-pointer select-none text-white"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'fixed bottom-0 left-0 right-0 z-10 pointer-events-none md:static md:z-auto md:pointer-events-auto md:w-full md:max-w-[320px]',
                className,
            )}
        >
            <div className="h-6 bg-linear-to-t from-white to-transparent md:hidden" />

            <div className="bg-white pb-4 pt-6 px-6 pointer-events-auto md:p-0 md:bg-transparent">
                <button
                    onClick={() => addItem({ id: itemId, name, price, quantity: 1, image })}
                    className="w-full h-14 cursor-pointer select-none flex items-center justify-center bg-black text-white rounded-2xl transition-transform active:scale-[0.98]"
                >
                    <span className="font-rounds font-semibold text-base">Adaugă în coș</span>
                </button>
            </div>
        </div>
    );
}
