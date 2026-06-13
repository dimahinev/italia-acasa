import { cn } from '@/shared/lib/utils/cn';

interface Props extends React.PropsWithChildren {
    className?: string;
}

export default function PageContainer({ children, className }: Props) {
    return <div className={cn('px-6', className)}>{children}</div>;
}
