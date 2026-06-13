'use client';

import { Home, Search, ShoppingCart, Share } from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';
import Link from 'next/link';
import { shareLink } from '@/shared/lib/utils/shareLink';

export default function Dock({ className }: { className?: string }) {
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
        'p-3.5 cursor-pointer rounded-2xl hover:bg-black hover:text-white transition-all active:text-white active:bg-black [&>svg]:w-[22px] [&>svg]:h-[22px]';

    return (
        <div className={cn('fixed bottom-0 left-0 right-0 z-50 pointer-events-none', className)}>
            <div className="h-6 bg-linear-to-t from-white to-transparent" />

            <div className="bg-white pb-4 pt-6 px-6 flex justify-between pointer-events-auto">
                <Link
                    href="/"
                    className="py-3 px-8 cursor-pointer select-none flex flex-nowrap items-center gap-2.5 bg-black text-white rounded-2xl transition-transform"
                >
                    <dockItems.home.icon className="w-[22px] h-[22px]" />
                    <span className="font-rounds font-semibold">{dockItems.home.label}</span>
                </Link>

                <button className={iconBtnClasses}>
                    <dockItems.search.icon />
                </button>

                <button className={iconBtnClasses}>
                    <dockItems.cart.icon />
                </button>
                <button className={iconBtnClasses} onClick={shareLink}>
                    <dockItems.share.icon />
                </button>
            </div>
        </div>
    );
}
