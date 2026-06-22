'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from '@/shared/ui/Drawer';
import { Input } from '@/shared/ui/Input';
import { useSearchStore } from '../model/searchStore';
import { getProducts, SearchedProduct } from '@/app/actions/getProducts';
import { useCurrencyStore } from '@/features/currency/model/currencyStore';

export default function SearchDrawer() {
    const isSearchOpen = useSearchStore((state) => state.isSearchOpen);
    const setSearchOpen = useSearchStore((state) => state.setSearchOpen);
    const { currency } = useCurrencyStore();

    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<SearchedProduct[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch products once on mount
    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
        });
    }, []);

    // Focus input and reset query on open/close
    useEffect(() => {
        if (isSearchOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 150);
            return () => clearTimeout(timer);
        } else {
            setQuery('');
        }
    }, [isSearchOpen]);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <Drawer open={isSearchOpen} onOpenChange={setSearchOpen}>
            <DrawerContent className="px-6">
                <DrawerTitle className="sr-only">Căutare produse</DrawerTitle>
                <DrawerDescription className="sr-only">
                    Căutați produse din catalogul nostru.
                </DrawerDescription>
                <div className="flex flex-col gap-6 mt-6 h-full min-h-0">
                    <Input
                        ref={inputRef}
                        label="Ce căutați?"
                        placeholder="Biorepair"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full"
                    />

                    <div className="flex-1 overflow-y-auto no-scrollbar pb-36 flex flex-col gap-5">
                        {query.trim() === '' ? (
                            products.length > 0 ? (
                                products.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.slug}`}
                                        onClick={() => setSearchOpen(false)}
                                        className="flex gap-4 items-center group active:opacity-75 transition-opacity"
                                    >
                                        {product.images?.[0] ? (
                                            <div className="relative w-[77px] h-[81px] shrink-0 bg-neutral-100 rounded-card">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.title}
                                                    fill
                                                    sizes="80px"
                                                    className="object-cover rounded-card"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-[77px] h-[81px] bg-neutral-100 rounded-card flex items-center justify-center text-neutral-400 font-rounds font-bold text-lg shrink-0 select-none">
                                                {product.title[0]}
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1 justify-center">
                                            <span className="font-rounds font-semibold text-[15px] text-black">
                                                {product.title}
                                            </span>
                                            <span className="font-rounds text-[15px] text-muted-dark font-semibold">
                                                {product.price} {currency}
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-12 text-muted-dark font-rounds text-sm">
                                    Se încarcă produsele...
                                </div>
                            )
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}`}
                                    onClick={() => setSearchOpen(false)}
                                    className="flex gap-4 items-center group active:opacity-75 transition-opacity"
                                >
                                    {product.images?.[0] ? (
                                        <div className="relative w-[77px] h-[81px] shrink-0 bg-neutral-100 rounded-card">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.title}
                                                fill
                                                sizes="80px"
                                                className="object-cover rounded-card"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-[77px] h-[81px] bg-neutral-100 rounded-card flex items-center justify-center text-neutral-400 font-rounds font-bold text-lg shrink-0 select-none">
                                            {product.title[0]}
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-1 justify-center">
                                        <span className="font-rounds font-semibold text-[15px] text-black group-hover:underline">
                                            {product.title}
                                        </span>
                                        <span className="font-rounds text-[15px] text-muted-dark font-medium">
                                            {product.price} {currency}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12 text-muted-dark font-rounds text-sm">
                                Nu s-au găsit produse pentru &ldquo;{query}&rdquo;.
                            </div>
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
