'use client';

import { useState, useEffect } from 'react';
import { Home, Search, ShoppingCart, Share } from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { shareLink } from '@/shared/lib/utils/shareLink';
import { useCartStore } from '@/features/cart/model/cartStore';
import { useSearchStore } from '@/features/search/model/searchStore';

export default function Dock({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const pathname = usePathname();
    const isSearchOpen = useSearchStore((state) => state.isSearchOpen);
    const setSearchOpen = useSearchStore((state) => state.setSearchOpen);

    const items = useCartStore((state) => state.items);
    const itemCount = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    let activeTab: 'home' | 'search' | 'cart' | 'share' = 'home';
    if (isSearchOpen) {
        activeTab = 'search';
    } else if (pathname === '/cart') {
        activeTab = 'cart';
    } else {
        activeTab = 'home';
    }

    const itemsList = [
        {
            id: 'home',
            icon: Home,
            label: 'Descoperă',
            href: '/',
            onClick: () => setSearchOpen(false),
        },
        {
            id: 'search',
            icon: Search,
            label: 'Căutare',
            onClick: () => setSearchOpen(true),
        },
        {
            id: 'cart',
            icon: ShoppingCart,
            label: 'Coș',
            href: '/cart',
            onClick: () => setSearchOpen(false),
        },
        {
            id: 'share',
            icon: Share,
            label: 'Share',
            onClick: () => {
                setSearchOpen(false);
                shareLink();
            },
        },
    ] as const;

    const iconBtnClasses =
        'p-3.5 active:scale-[0.94] transition-all cursor-pointer rounded-2xl hover:bg-black hover:text-white active:text-white active:bg-black [&>svg]:w-[22px] [&>svg]:h-[22px] flex items-center justify-center relative text-black';

    return (
        <div className={cn('fixed bottom-0 left-0 right-0 z-50 pointer-events-none', className)}>
            <div className="h-6 bg-linear-to-t from-white to-transparent" />

            <div className="bg-white pb-4 pt-6 px-6 flex justify-between items-center pointer-events-auto">
                {itemsList.map((item) => {
                    const isActive = item.id === activeTab;
                    const Icon = item.icon;

                    const activeClass =
                        'py-3 px-8 active:scale-[0.98] cursor-pointer select-none flex flex-nowrap items-center gap-2.5 bg-black text-white rounded-2xl transition-transform';

                    const content = (
                        <>
                            <Icon className="w-[22px] h-[22px]" />
                            {isActive && (
                                <span className="font-rounds font-semibold">{item.label}</span>
                            )}
                            {item.id === 'cart' && !isActive && itemCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                                    {itemCount}
                                </span>
                            )}
                        </>
                    );

                    if ('href' in item && item.href) {
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={item.onClick}
                                className={isActive ? activeClass : iconBtnClasses}
                            >
                                {content}
                            </Link>
                        );
                    }

                    return (
                        <button
                            key={item.id}
                            onClick={item.onClick}
                            className={isActive ? activeClass : iconBtnClasses}
                        >
                            {content}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
