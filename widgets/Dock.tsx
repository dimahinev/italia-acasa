'use client';

import { useState, useEffect } from 'react';
import { Home, Search, ShoppingCart, Share } from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';
import Link from 'next/link';
import { shareLink } from '@/shared/lib/utils/shareLink';
import { useCartStore } from '@/features/cart/model/cartStore';

export default function Dock({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const items = useCartStore((state) => state.items);
    const itemCount = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    const dockItems = {
        home: {
            icon: Home,
            label: 'Descoperă',
        },
        search: {
            icon: Search,
            label: 'Căutare',
            onClick: () => alert('Search clicked'),
        },
        cart: {
            icon: ShoppingCart,
            label: 'Coș',
            onClick: () => alert('Notifications clicked'),
        },
        share: {
            icon: Share,
            label: 'Share',
            onClick: () => alert('Profile clicked'),
        },
    };

    const iconBtnClasses =
        'p-3.5 active:scale-[0.94] transition-all cursor-pointer rounded-2xl hover:bg-black hover:text-white transition-all active:text-white active:bg-black [&>svg]:w-[22px] [&>svg]:h-[22px]';

    return (
        <div className={cn('fixed bottom-0 left-0 right-0 z-50 pointer-events-none', className)}>
            <div className="h-6 bg-linear-to-t from-white to-transparent" />

            <div className="bg-white pb-4 pt-6 px-6 flex justify-between pointer-events-auto">
                <Link
                    href="/"
                    className="py-3 px-8 active:scale-[0.98] cursor-pointer select-none flex flex-nowrap items-center gap-2.5 bg-black text-white rounded-2xl transition-transform"
                >
                    <dockItems.home.icon className="w-[22px] h-[22px]" />
                    <span className="font-rounds font-semibold">{dockItems.home.label}</span>
                </Link>

                <button className={iconBtnClasses}>
                    <dockItems.search.icon />
                </button>

                <Link href="/cart" className={cn(iconBtnClasses, 'relative')}>
                    <dockItems.cart.icon />
                    {itemCount > 0 && (
                        <span className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                            {itemCount}
                        </span>
                    )}
                </Link>
                <button className={iconBtnClasses} onClick={shareLink}>
                    <dockItems.share.icon />
                </button>
            </div>
        </div>
    );
}
