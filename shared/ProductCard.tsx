import Image from 'next/image';
import { cn } from './lib/utils/cn';
import { CardProps } from './types/cardProps';

export default function ProductCard({ className, imgSrc, name, price }: CardProps) {
    return (
        <div className={cn('w-[162px]', className)}>
            <div className="relative w-full h-[170px]">
                <Image
                    className="object-cover object-[center_80%] rounded-card"
                    src={imgSrc}
                    alt={name}
                    fill
                    sizes="240px"
                    priority
                />
            </div>
            <div className="px-[5px] mt-1">
                <p className="font-rounds text-15 font-semibold">{name}</p>
                <p className="font-rounds text-15 font-semibold text-muted-dark">{price} MDL</p>
            </div>
        </div>
    );
}
