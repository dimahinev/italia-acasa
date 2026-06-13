'use client';

import { useState } from 'react';
import { SidebarIcon } from '@/shared/ui/icons/SidebarIcon';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="cursor-pointer">
                <SidebarIcon className="w-6" />
            </button>

            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-[5px] z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
            />

            <div
                className={`fixed top-0 right-0 h-full w-[334px] bg-white rounded-l-[26px] z-50 shadow-2xl transition-transform duration-300 ease-out transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-[33px] right-[26px] w-6 h-6 flex items-center justify-center text-black cursor-pointer hover:opacity-75 transition-opacity"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className="flex flex-col items-center justify-center h-full gap-[67px] font-rounds text-[17px] font-bold text-black text-center">
                    <p className="cursor-pointer hover:opacity-75 transition-opacity">
                        Paste de dinti
                    </p>
                    <p className="cursor-pointer hover:opacity-75 transition-opacity">Șampoane</p>
                    <p className="cursor-pointer hover:opacity-75 transition-opacity">
                        Balsamuri de păr
                    </p>
                    <p className="cursor-pointer hover:opacity-75 transition-opacity">Măști</p>
                </div>
            </div>
        </>
    );
}
