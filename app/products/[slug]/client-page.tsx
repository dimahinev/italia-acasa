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
import { AddToCartButton } from '@/features/cart/ui/AddToCartButton';

const ProductImage = ({ img, title }: { img: string; title: string }) => {
    return (
        <div className="relative h-[306px] w-[264px] md:h-[480px] md:w-full md:max-w-[400px] shrink-0">
            <Image
                src={img}
                alt={title}
                fill
                sizes="(max-width: 768px) 240px, 400px"
                priority
                className="object-cover object-[center_80%] rounded-card"
            />
        </div>
    );
};

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

    const product = data.product;

    return (
        <div className="flex flex-col pb-24 md:pb-16">
            <Spacer size={18} />

            <Link href={'/'} className="rounded-2xl w-fit p-1 hover:bg-neutral-50 active:scale-[0.96] transition-all">
                <ChevronLeft />
            </Link>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-6 md:mt-10 items-start">
                {/* Left Column: Images */}
                <div className="w-full md:w-[400px] shrink-0">
                    {product.images?.[0] ? (
                        product.images?.length === 1 ? (
                            <div className="flex justify-center -mt-4 mb-2 md:mt-0 md:mb-0 md:justify-start">
                                <ProductImage title={product.title} img={product.images[0]} />
                            </div>
                        ) : (
                            <>
                                <HorizontalScroll gap={24} className="md:hidden">
                                    {product.images
                                        .filter((img: string | null): img is string => !!img)
                                        .map((img: string, i: number) => (
                                            <ProductImage key={i} title={product.title} img={img} />
                                        ))}
                                </HorizontalScroll>
                                <div className="hidden md:flex flex-col gap-6">
                                    {product.images
                                        .filter((img: string | null): img is string => !!img)
                                        .map((img: string, i: number) => (
                                            <ProductImage key={i} title={product.title} img={img} />
                                        ))}
                                </div>
                            </>
                        )
                    ) : null}
                </div>

                {/* Right Column: Details */}
                <div className="flex-1 flex flex-col w-full">
                    <div className="flex justify-between items-baseline gap-4 md:flex-col md:items-start md:gap-2">
                        <h1 className="text-[22px] md:text-[32px] font-bold font-recoleta leading-[120%]">
                            {product.title}
                        </h1>
                        <span className="font-rounds text-[17px] md:text-[22px] font-bold text-muted-dark whitespace-nowrap mt-1">
                            {`${product.price} ${currency}`}
                        </span>
                    </div>

                    <Spacer size={24} className="md:hidden" />
                    <Spacer size={32} className="hidden md:block" />

                    <div className="font-rounds text-[#3E4B55] font-semibold text-[15px] leading-relaxed">
                        <TinaMarkdown
                            content={product.description}
                            components={{
                                h1: (props: any) => <h1 className="" {...props} />,
                                li: (props: any) => <li className="list-disc ml-8 mb-6" {...props} />,
                                p: (props: any) => <p className="mb-6" {...props} />,
                            }}
                        />
                    </div>

                    <Spacer size={42} />

                    <AddToCartButton
                        itemId={product._sys.filename}
                        name={product.title}
                        price={product.price}
                        image={product.images?.[0] || undefined}
                    />
                </div>
            </div>
        </div>
    );
}
