import { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface HorizontalScrollProps {
    className?: string;
    gap?: number;
    children: ReactNode;
}

export default function HorizontalScroll({ className, gap, children }: HorizontalScrollProps) {
    const gapValue = gap !== undefined ? `${gap * 4}px` : undefined;

    return (
        <div
            className={cn(
                // [&>*]:shrink-0 заменяет логику Children.map
                'flex overflow-x-auto no-scrollbar w-auto -mx-6 px-6 *:shrink-0',
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
