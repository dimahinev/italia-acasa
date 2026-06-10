import { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface HorizontalScrollProps {
    className?: string;
    classname?: string;
    gap?: number;
    children: ReactNode;
}

export default function HorizontalScroll({
    className,
    classname,
    gap,
    children,
}: HorizontalScrollProps) {
    const finalClassName = className || classname;
    const gapValue = gap !== undefined ? `${gap * 4}px` : undefined;

    return (
        <div
            className={cn("flex overflow-x-auto no-scrollbar w-full", finalClassName)}
            style={{
                gap: gapValue,
            }}
        >
            {children}
        </div>
    );
}