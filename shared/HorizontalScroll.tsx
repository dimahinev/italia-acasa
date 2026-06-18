import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface HorizontalScrollProps {
    className?: string;
    gap?: number;
    children: ReactNode;
}

export default function HorizontalScroll({ className, gap, children }: HorizontalScrollProps) {
    const MULTIPLIER = 1;
    const gapValue = gap !== undefined ? `${gap * MULTIPLIER}px` : undefined;

    return (
        <div
            className={cn(
                'flex overflow-x-auto overflow-y-hidden no-scrollbar w-auto -mx-6 px-6 *:shrink-0',
                className,
            )}
            style={{
                gap: gapValue,
            }}
        >
            {children}
        </div>
    );
}
