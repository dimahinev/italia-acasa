import FeaturedCard from '@/shared/FeaturedCard';
import HorizontalScroll from '@/shared/HorizontalScroll';
import ProductCard from '@/shared/ProductCard';
import Spacer from '@/shared/ui/Spacer';
import Dock from '@/widgets/Dock';
import Sidebar from '@/widgets/Sidebar';
import { client } from '@/tina/__generated__/client';
import { getBlurDataURL } from '@/shared/lib/utils/getBlurDataURL';

export default async function HomePage() {
    const productsResponse = await client.queries.productConnection();
    const products =
        productsResponse.data.productConnection.edges
            ?.map((edge) => edge?.node)
            .filter((node): node is NonNullable<typeof node> => !!node) || [];

    const toothpastes = products.filter((p) => p.category === 'toothpaste');
    const shampoos = products.filter((p) => p.category === 'shampoo');
    const sprays = products.filter((p) => p.category === 'spray');
    const masks = products.filter((p) => p.category === 'mask');

    const featuredProducts = products.filter((p) => p.featured);

    const blurMap = Object.fromEntries(
        products
            .filter((p) => p.images?.[0])
            .map((p) => [p.images![0] as string, getBlurDataURL(p.images![0] as string)] as const),
    );

    return (
        <div className="pt-3 md:pt-10 pb-10">
            {/* HEADER START */}
            <div className="flex justify-between md:hidden">
                <h1 className="text-[32px] font-recoleta font-medium">Produse Italiene</h1>
                <Sidebar />
            </div>
            {/* HEADER END */}

            <Spacer size={16} className="md:hidden" />

            {/* FEATURED PRODUCTS START */}
            {featuredProducts.length > 0 && (
                <>
                    <HorizontalScroll
                        gap={32}
                        className="md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-8 md:overflow-visible md:-mx-0 md:px-0"
                    >
                        {featuredProducts.map((product) => (
                            <FeaturedCard
                                key={product.id}
                                imgSrc={product.images?.[0] || '/img/test.jpg'}
                                name={product.title}
                                price={product.price}
                                slug={product._sys.filename}
                                className="w-[240px] md:w-full"
                                blurDataURL={blurMap[product.images?.[0] as string]}
                            />
                        ))}
                    </HorizontalScroll>
                    <Spacer size={72} />
                </>
            )}
            {/* FEATURED PRODUCTS END */}

            {toothpastes.length > 0 && (
                <>
                    <h2
                        id="toothpaste"
                        className="scroll-mt-24 text-[24px] md:text-[28px] font-recoleta font-medium mb-4"
                    >
                        Paste de dinți
                    </h2>
                    <HorizontalScroll className="gap-4 md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-10 md:overflow-visible md:-mx-0 md:px-0">
                        {toothpastes.map((product) => (
                            <ProductCard
                                key={product.id}
                                imgSrc={product.images?.[0] || '/img/test.jpg'}
                                name={product.title}
                                price={product.price}
                                slug={product._sys.filename}
                                className="w-[162px] md:w-full"
                                blurDataURL={blurMap[product.images?.[0] as string]}
                            />
                        ))}
                    </HorizontalScroll>
                    <Spacer size={72} />
                </>
            )}

            {shampoos.length > 0 && (
                <>
                    <h2
                        id="shampoo"
                        className="scroll-mt-24 text-[24px] md:text-[28px] font-recoleta font-medium mb-4"
                    >
                        Șampoane
                    </h2>
                    <HorizontalScroll className="gap-4 md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-10 md:overflow-visible md:-mx-0 md:px-0">
                        {shampoos.map((product) => (
                            <ProductCard
                                key={product.id}
                                imgSrc={product.images?.[0] || '/img/test.jpg'}
                                name={product.title}
                                price={product.price}
                                slug={product._sys.filename}
                                className="w-[162px] md:w-full"
                                blurDataURL={blurMap[product.images?.[0] as string]}
                            />
                        ))}
                    </HorizontalScroll>
                    <Spacer size={72} />
                </>
            )}

            {sprays.length > 0 && (
                <>
                    <h2
                        id="spray"
                        className="scroll-mt-24 text-[24px] md:text-[28px] font-recoleta font-medium mb-4"
                    >
                        Balsamuri de păr
                    </h2>
                    <HorizontalScroll className="gap-4 md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-10 md:overflow-visible md:-mx-0 md:px-0">
                        {sprays.map((product) => (
                            <ProductCard
                                key={product.id}
                                imgSrc={product.images?.[0] || '/img/test.jpg'}
                                name={product.title}
                                price={product.price}
                                slug={product._sys.filename}
                                className="w-[162px] md:w-full"
                                blurDataURL={blurMap[product.images?.[0] as string]}
                            />
                        ))}
                    </HorizontalScroll>
                    <Spacer size={72} />
                </>
            )}

            {masks.length > 0 && (
                <>
                    <h2
                        id="mask"
                        className="scroll-mt-24 text-[24px] md:text-[28px] font-recoleta font-medium mb-4"
                    >
                        Măști
                    </h2>
                    <HorizontalScroll className="gap-4 md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-10 md:overflow-visible md:-mx-0 md:px-0">
                        {masks.map((product) => (
                            <ProductCard
                                key={product.id}
                                imgSrc={product.images?.[0] || '/img/test.jpg'}
                                name={product.title}
                                price={product.price}
                                slug={product._sys.filename}
                                className="w-[162px] md:w-full"
                                blurDataURL={blurMap[product.images?.[0] as string]}
                            />
                        ))}
                    </HorizontalScroll>
                    <Spacer size={72} />
                </>
            )}

            <Dock className="md:hidden" />
        </div>
    );
}
