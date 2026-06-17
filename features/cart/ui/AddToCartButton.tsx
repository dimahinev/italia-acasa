import { cn } from '@/shared/lib/utils/cn';
import { useCartStore } from '@/features/cart/model/cartStore';

interface Props {
    itemId: string;
    name: string;
    price: number;
    className?: string;
}

export function AddToCartButton({ itemId, name, price, className }: Props) {
    const items = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const decrementItem = useCartStore((state) => state.decrementItem);

    const cartItem = items.find((item) => item.id === itemId);
    const quantity = cartItem ? cartItem.quantity : 0;

    if (quantity > 0) {
        return (
            <div
                className={cn('fixed bottom-0 left-0 right-0 z-50 pointer-events-none', className)}
            >
                <div className="h-6 bg-linear-to-t from-white to-transparent" />

                <div className="bg-white pb-4 pt-6 px-6 pointer-events-auto">
                    <div className="w-full flex items-center justify-between bg-black text-white rounded-2xl overflow-hidden h-14">
                        <button
                            onClick={() => decrementItem(itemId)}
                            className="flex-1 h-full flex items-center justify-center font-rounds font-semibold text-lg hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer select-none"
                        >
                            —
                        </button>
                        <div className="w-px h-6 bg-white" />
                        <span className="flex-1 text-center font-rounds font-semibold text-lg select-none">
                            {quantity}
                        </span>
                        <div className="w-px h-6 bg-white" />
                        <button
                            onClick={() => addItem({ id: itemId, name, price, quantity: 1 })}
                            className="flex-1 h-full flex items-center justify-center font-rounds font-semibold text-lg hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer select-none"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn('fixed bottom-0 left-0 right-0 z-50 pointer-events-none', className)}>
            <div className="h-6 bg-linear-to-t from-white to-transparent" />

            <div className="bg-white pb-4 pt-6 px-6 pointer-events-auto">
                <button
                    onClick={() => addItem({ id: itemId, name, price, quantity: 1 })}
                    className="w-full h-14 cursor-pointer select-none flex items-center justify-center bg-black text-white rounded-2xl transition-transform active:scale-[0.98]"
                >
                    <span className="font-rounds font-semibold text-base">Adaugă în coș</span>
                </button>
            </div>
        </div>
    );
}
