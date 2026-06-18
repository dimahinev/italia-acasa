'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from '@/shared/ui/Drawer';

export function SuccessScreen() {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            router.push('/');
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Drawer open={open} onOpenChange={handleOpenChange}>
                <DrawerContent className="px-6">
                    <div className="flex flex-col items-center justify-between h-full pt-8 pb-10 min-h-0">
                        <div className="flex flex-col items-center w-full">
                            <div className="w-[278px] h-[280px] flex items-center justify-center overflow-hidden relative rounded-2xl mt-2">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute max-w-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                    style={{ width: '885px', height: '498px' }}
                                >
                                    <source src="/video/box_final.mp4" type="video/mp4" />
                                </video>
                            </div>

                            <DrawerTitle className="text-[28px] mt-6 font-recoleta font-medium text-black text-center leading-tight">
                                Comandă plasată cu succes!
                            </DrawerTitle>

                            <DrawerDescription className="text-muted-dark font-rounds text-center text-[15px] leading-relaxed max-w-[320px] mx-auto mt-3">
                                Totul e gata. Managerul nostru te va apela în curând pentru a
                                stabili detaliile de livrare.
                            </DrawerDescription>
                        </div>

                        <div className="w-[240px] mb-[92px] mt-auto md:mt-10">
                            <Link
                                href="/"
                                className="w-full h-[54px] flex items-center justify-center border border-black rounded-[20px] font-rounds font-semibold text-base text-black bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all cursor-pointer"
                            >
                                Spre pagina principală
                            </Link>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
