'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/features/cart/model/cartStore';
import { useSearchStore } from '@/features/search/model/searchStore';
import { useEffect, useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const setSearchOpen = useSearchStore((state) => state.setSearchOpen);
    const items = useCartStore((state) => state.items);
    const itemCount = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    const handleNavClick = (e: React.MouseEvent, id: string) => {
        if (pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const categories = [
        { id: 'toothpaste', label: 'Paste de dinți' },
        { id: 'shampoo', label: 'Șampoane' },
        { id: 'spray', label: 'Balsamuri de păr' },
        { id: 'mask', label: 'Măști' },
    ];

    return (
        <header className="hidden md:block w-full sticky top-0 bg-white/85 backdrop-blur-[12px] z-30 border-b border-neutral-100/80">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-8 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="font-recoleta font-semibold text-[26px] text-black tracking-tight active:scale-[0.98] transition-transform select-none"
                >
                    ItaliaAcasa
                </Link>

                {/* Navigation links */}
                <nav className="flex items-center gap-[42px] font-rounds text-sm font-bold text-black uppercase tracking-wider select-none">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/#${category.id}`}
                            onClick={(e) => handleNavClick(e, category.id)}
                            className="hover:opacity-70 transition-opacity"
                        >
                            {category.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="p-3 text-black hover:bg-neutral-50 active:scale-[0.94] transition-all cursor-pointer rounded-2xl flex items-center justify-center"
                        aria-label="Căutare"
                    >
                        <Search className="w-[22px] h-[22px]" />
                    </button>

                    <Link
                        href="/cart"
                        className="p-3 text-black hover:bg-neutral-50 active:scale-[0.94] transition-all cursor-pointer rounded-2xl flex items-center justify-center relative"
                        aria-label="Coș de cumpărături"
                    >
                        <ShoppingCart className="w-[22px] h-[22px]" />
                        {itemCount > 0 && (
                            <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-[10px] w-4.5 h-4.5 flex items-center justify-center font-bold">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
