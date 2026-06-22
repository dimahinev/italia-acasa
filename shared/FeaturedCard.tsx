import Image from 'next/image';
import Link from 'next/link';
import { cn } from './lib/utils/cn';
import { CardProps } from './types/cardProps';

export default function FeaturedCard({ className, imgSrc, name, price, slug, blurDataURL }: CardProps) {
    const cardContent = (
        <div className={cn('w-[240px] cursor-pointer', className)}>
            <div className="relative w-full h-[277px] bg-neutral-100 rounded-card">
                <Image
                    className="object-cover object-[center_80%] rounded-card"
                    src={imgSrc}
                    alt={name}
                    fill
                    sizes="240px"
                    priority
                    placeholder={blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={blurDataURL}
                />
            </div>
            <div className="flex justify-between mt-2 px-[5px]">
                <span className="font-rounds text-17 font-bold leading-[120%] max-w-[140px]">
                    {name}
                </span>
                <span className="font-rounds text-17 font-bold text-muted-dark whitespace-nowrap">
                    {price} MDL
                </span>
            </div>
        </div>
    );

    if (slug) {
        return <Link href={`/products/${slug}`}>{cardContent}</Link>;
    }

    return cardContent;
}
