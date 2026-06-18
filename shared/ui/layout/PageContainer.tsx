import { cn } from '@/shared/lib/utils/cn';

interface Props extends React.PropsWithChildren {
    className?: string;
}

export default function PageContainer({ children, className }: Props) {
    return (
        <div className={cn('px-6 md:px-8 max-w-7xl mx-auto w-full flex-1 flex flex-col', className)}>
            {children}
        </div>
    );
}
