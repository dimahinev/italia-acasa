'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';
import { Home, Search, ShoppingCart, Share } from 'lucide-react';

interface DockItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    onClick?: () => void;
}

const dockItems: DockItem[] = [
    { icon: Home, label: 'Descoperă', onClick: () => alert('Home clicked') },
    { icon: Search, label: 'Căutare', onClick: () => alert('Search clicked') },
    {
        icon: ShoppingCart,
        label: 'Coș',
        onClick: () => alert('Notifications clicked'),
    },
    { icon: Share, label: 'Share', onClick: () => alert('Profile clicked') },
];

export default function DockTmp({ className }: { className?: string }) {
    const [active, setActive] = React.useState<string | null>(null);
    const [hovered, setHovered] = React.useState<number | null>(null);

    return (
        <div className={cn('flex items-center justify-center w-full py-12', className)}>
            <div
                className={cn(
                    'flex items-end gap-4 px-4 py-3 rounded-3xl',
                    'bg-background/70 backdrop-blur-2xl shadow-lg',
                )}
            >
                <>
                    {dockItems.map((item, i) => {
                        const isActive = active === item.label;
                        const isHovered = hovered === i;

                        return (
                            <motion.div
                                key={item.label}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                animate={{
                                    scale: isHovered ? 1.2 : 1,
                                    rotate: isHovered ? -5 : 0,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className="relative flex flex-col items-center"
                            >
                                <button
                                    onClick={() => {
                                        setActive(item.label);
                                        item.onClick?.();
                                    }}
                                    className={cn(
                                        'rounded-2xl relative p-2',
                                        'transition-colors',
                                        isHovered && 'shadow-lg shadow-primary/20',
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            'h-6 w-6 transition-colors',
                                            isActive ? 'text-primary' : 'text-foreground',
                                        )}
                                    />
                                    {isHovered && (
                                        <motion.span
                                            layoutId="glow"
                                            className="absolute inset-0 rounded-2xl border border-primary/40"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                </button>

                                {/* Active indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="dot"
                                        className="w-1.5 h-1.5 rounded-full bg-primary mt-1"
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </>
            </div>
        </div>
    );
}
