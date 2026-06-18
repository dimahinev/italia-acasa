'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/features/cart/model/cartStore';
import { useCheckout } from '@/features/cart/model/useCheckout';
import { Input } from '@/shared/ui/Input';
import Spacer from '@/shared/ui/Spacer';
import { SuccessScreen } from '@/features/cart/ui/SuccessScreen';

export default function CartPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const addItem = useCartStore((state) => state.addItem);
    const decrementItem = useCartStore((state) => state.decrementItem);
    const removeItem = useCartStore((state) => state.removeItem);

    const {
        name,
        setName,
        phone,
        setPhone,
        address,
        setAddress,
        isSuccess,
        isSubmitting,
        submitError,
        errors,
        setErrors,
        total,
        currency,
        items,
        handleSubmit,
    } = useCheckout();

    if (!mounted) {
        return null;
    }

    if (isSuccess) {
        return <SuccessScreen />;
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-muted-dark mb-6">
                    <ShoppingCart className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-recoleta font-medium mb-2">Coșul tău este gol</h1>
                <p className="text-muted-dark font-rounds max-w-sm mb-8 text-sm leading-relaxed">
                    Adaugă produse din catalog pentru a le comanda.
                </p>
                <Link
                    href="/"
                    className="w-full max-w-[359px] h-12 flex items-center justify-center bg-black text-white rounded-[16px] font-rounds font-semibold text-base hover:bg-neutral-900 active:scale-[0.98] transition-all"
                >
                    Descoperă produse
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-4 pb-4 max-w-[600px] md:max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 w-full h-dvh md:h-auto md:py-10">
            <div className="flex flex-col flex-1 min-h-0 md:min-h-auto md:overflow-visible">
                <div className="flex items-center shrink-0">
                    <Link
                        href="/"
                        className="rounded-2xl p-1 -ml-1 text-black hover:bg-neutral-105 active:bg-neutral-100 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                </div>

                <Spacer size={20} className="shrink-0" />

                <h1 className="text-[32px] md:text-[38px] font-recoleta font-medium text-black shrink-0">
                    Finalizare comandă
                </h1>

                <Spacer size={24} className="shrink-0" />

                <div className="relative flex-1 min-h-0 md:overflow-visible">
                    <div className="h-full overflow-y-auto md:overflow-visible flex flex-col gap-6 pr-1 pb-8 md:pb-0 no-scrollbar">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center justify-between">
                                <div className="flex gap-4 items-center flex-1 min-w-0">
                                    {item.image ? (
                                        <div className="relative w-[77px] h-[81px] shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="80px"
                                                className="object-cover rounded-card"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-[77px] h-[81px] bg-neutral-100 rounded-card flex items-center justify-center text-neutral-450 font-rounds font-bold text-lg shrink-0 select-none">
                                            {item.name[0]}
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-2 min-w-0">
                                        <span className="font-rounds font-semibold text-[15px] text-black truncate pr-2">
                                            {item.name}
                                        </span>

                                        <div className="flex items-center h-[32px] rounded-xl border border-muted-light overflow-hidden w-[130px] shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => decrementItem(item.id)}
                                                className="w-[42px] h-full flex items-center justify-center text-muted-light font-rounds hover:bg-neutral-50 active:bg-neutral-100 transition-colors cursor-pointer select-none text-[17px] font-medium"
                                            >
                                                –
                                            </button>
                                            <div className="flex-1 h-full border-x border-muted-light flex items-center justify-center font-rounds text-[15px] text-muted-light select-none">
                                                {item.quantity}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => addItem({ ...item, quantity: 1 })}
                                                className="w-[42px] h-full flex items-center justify-center text-muted-light font-rounds hover:bg-neutral-50 active:bg-neutral-100 transition-colors cursor-pointer select-none text-[17px] font-medium"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end justify-between h-[81px] py-1 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        className="w-8 h-8 rounded-full border border-muted-light flex items-center justify-center text-muted-light hover:bg-neutral-50 hover:text-black transition-colors cursor-pointer"
                                    >
                                        <X className="w-4 h-4 text-muted-light" />
                                    </button>
                                    <span className="font-rounds font-semibold text-[15px] text-black text-right whitespace-nowrap">
                                        {item.price * item.quantity} {currency}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col items-end gap-1 py-4 font-rounds font-bold text-muted-light text-[15px] uppercase shrink-0 mt-4 md:hidden">
                            <span>=</span>
                            <span className="text-[15px]">
                                {total} {currency}
                            </span>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-white to-transparent pointer-events-none z-10 md:hidden" />
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 shrink-0 bg-white pt-4 w-full md:w-[400px] md:pt-8 md:border md:border-neutral-300 md:p-8 md:rounded-[26px] md:shadow-xs md:sticky md:top-28 md:h-fit"
            >
                <div className="hidden md:flex justify-between items-center pb-4 border-b border-neutral-100">
                    <span className="font-rounds font-bold text-muted-light text-[13px] uppercase tracking-wide">
                        Total de plată
                    </span>
                    <span className="font-rounds font-bold text-xl text-black">
                        {total} {currency}
                    </span>
                </div>

                <Input
                    id="name-input"
                    label="Nume"
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    error={errors.name}
                />

                <Input
                    id="phone-input"
                    label="Telefon"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    error={errors.phone}
                />

                <Input
                    id="address-input"
                    label="Adresă de livrare"
                    type="text"
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                    }}
                    error={errors.address}
                />

                {submitError && (
                    <div className="text-red-500 text-sm font-rounds text-center bg-red-50 p-3 rounded-[12px] border border-red-200">
                        {submitError}
                    </div>
                )}

                <Spacer size={4} className="md:hidden" />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-[48px] bg-black text-white rounded-[16px] flex items-center justify-center font-rounds font-semibold text-[15px] hover:bg-neutral-900 active:scale-[0.98] transition-all cursor-pointer disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:scale-100 mt-2"
                >
                    {isSubmitting ? 'Se trimite...' : 'Comandă'}
                </button>
            </form>
        </div>
    );
}
