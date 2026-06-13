import { cn } from '../lib/utils/cn';

interface SpacerProps {
    size: number;
    className?: string;
}

export default function Spacer({ size, className }: SpacerProps) {
    return (
        <div
            className={cn('shrink-0', className)}
            style={{ height: `${size * 4}px`, width: `${size * 4}px` }}
            aria-hidden="true"
        />
    );
}
