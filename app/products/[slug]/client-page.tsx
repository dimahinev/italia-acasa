'use client';
import Image from 'next/image';
import { useTina } from 'tinacms/dist/react';
import { ProductQuery, ProductQueryVariables } from '../../../tina/__generated__/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import HorizontalScroll from '@/shared/HorizontalScroll';
import Spacer from '@/shared/ui/Spacer';
import { useCurrencyStore } from '@/features/currency/model/currencyStore';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useCartStore } from '@/features/cart/model/cartStore';
import { AddToCartButton } from '@/features/cart/ui/AddToCartButton';

export function ProductPageClient(props: {
    query: string;
    variables: ProductQueryVariables;
    data: ProductQuery;
}) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });
    const { currency } = useCurrencyStore();
    const { items, addItem, removeItem, clearCart } = useCartStore();
    console.log('data', data);
    console.log('props', props);

    const product = data.product;

    return (
        <div className="flex flex-col">
            <Spacer size={18} />

            <Link href={'/'} className="rounded-2xl w-fit p-1">
                <ChevronLeft />
            </Link>

            <Spacer size={38} />

            {product.images && (
                <HorizontalScroll gap={24}>
                    {product.images
                        .filter((img: string | null): img is string => !!img)
                        .map((img: string, i: number) => (
                            <div key={i} className="relative h-[306px] w-[264px]">
                                <Image
                                    src={img}
                                    alt={product.title}
                                    fill
                                    sizes="240px"
                                    priority
                                    className="object-cover object-[center_80%] rounded-card"
                                />
                            </div>
                        ))}
                </HorizontalScroll>
            )}

            <Spacer size={20} />

            <div className="flex justify-between items-baseline">
                <h1 className="text-[22px] font-bold font-recoleta">{product.title}</h1>
                <span className="font-rounds text-[17px] font-bold text-muted-dark">
                    {`${product.price} ${currency}`}
                </span>
            </div>

            <Spacer size={42} />

            <TinaMarkdown
                content={product.description}
                components={{
                    h1: (props: any) => <h1 className="" {...props} />,
                    li: (props: any) => <li className="list-disc ml-8 mb-6" {...props} />,
                    p: (props: any) => <p className="mb-6" {...props} />,
                    text: (props: any) => (
                        <text className="font-rounds text-[#3E4B55] font-semibold" {...props} />
                    ),
                }}
            />

            <AddToCartButton
                itemId={product._sys.filename}
                name={product.title}
                price={product.price}
            />
        </div>
    );
}
