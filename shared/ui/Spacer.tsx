import { cn } from '../lib/utils/cn';

interface SpacerProps {
    size: number;
    className?: string;
}

export default function Spacer({ size, className }: SpacerProps) {
    const MULTIPLIER = 1;

    return (
        <div
            className={cn('shrink-0', className)}
            style={{ height: `${size * MULTIPLIER}px`, width: `${size * MULTIPLIER}px` }}
            aria-hidden="true"
        />
    );
}
