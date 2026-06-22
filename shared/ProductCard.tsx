import Image from 'next/image';
import Link from 'next/link';
import { cn } from './lib/utils/cn';
import { CardProps } from './types/cardProps';

export default function ProductCard({ className, imgSrc, name, price, slug, blurDataURL }: CardProps) {
    const cardContent = (
        <div className={cn('w-[162px] cursor-pointer', className)}>
            <div className="relative w-full h-[170px] bg-neutral-100 rounded-card">
                <Image
                    className="object-cover object-[center_80%] rounded-card"
                    src={imgSrc}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 162px, 220px"
                    priority
                    placeholder={blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={blurDataURL}
                />
            </div>
            <div className="px-[5px] mt-1">
                <p className="font-rounds text-15 font-semibold leading-[120%]">{name}</p>
                <p className="font-rounds mt-1 text-15 font-semibold text-muted-dark whitespace-nowrap">
                    {price} MDL
                </p>
            </div>
        </div>
    );

    if (slug) {
        return <Link href={`/products/${slug}`}>{cardContent}</Link>;
    }

    return cardContent;
}
