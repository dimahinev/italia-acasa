import FeaturedCard from '@/shared/FeaturedCard';
import HorizontalScroll from '@/shared/HorizontalScroll';
import ProductCard from '@/shared/ProductCard';
import Spacer from '@/shared/ui/Spacer';
import Dock from '@/widgets/Dock';
import Sidebar from '@/widgets/Sidebar';
import { client } from '@/tina/__generated__/client';

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

    return (
        <div className="pt-3 pb-32">
            {/* HEADER START */}
            <div className="flex justify-between">
                <h1 className="text-[32px] font-recoleta font-medium">Produse Italiene</h1>
                <Sidebar />
            </div>
            {/* HEADER END */}

            <Spacer size={16} />

            {/* FEATURED PRODUCTS START */}
            {featuredProducts.length > 0 && (
                <>
                    <HorizontalScroll gap={32}>
                        {featuredProducts.map((product) => (
                            <FeaturedCard
                                key={product.id}
                                imgSrc={product.images?.[0] || '/img/test.jpg'}
                                name={product.title}
                                price={product.price}
                                slug={product._sys.filename}
                            />
                        ))}
                    </HorizontalScroll>
                    <Spacer size={38} />
                </>
            )}
            {/* FEATURED PRODUCTS END */}

            {toothpastes.length > 0 && (
                <>
                    <h2 id="toothpaste" className="scroll-mt-6 text-[24px] font-recoleta font-medium mb-2.5">Paste de dinți</h2>
                    <HorizontalScroll gap={16}>
                        {toothpastes.map((product) => (
                            <ProductCard
                                key={product.id}
                                imgSrc={product.images?.[0] || '/img/test.jpg'}
                                name={product.title}
                                price={product.price}
                                slug={product._sys.filename}
                            />
                        ))}
                    </HorizontalScroll>
                    <Spacer size={72} />
                </>
            )}

            {shampoos.length > 0 && (
                <>
                    <h2 id="shampoo" className="scroll-mt-6 text-[24px] font-recoleta font-medium mb-2.5">Șampoane</h2>
                    <HorizontalScroll gap={16}>
                        {shampoos.map((product) => (
                            <ProductCard
                                key={product.id}
                                imgSrc={product.images?.[0] || '/img/test.jpg'}
                                name={product.title}
                                price={product.price}
                                slug={product._sys.filename}
                            />
                        ))}
                    </HorizontalScroll>
                    <Spacer size={72} />
                </>
            )}

            {sprays.length > 0 && (
                <>
                    <h2 id="spray" className="scroll-mt-6 text-[24px] font-recoleta font-medium mb-2.5">
                        Balsamuri de păr
                    </h2>
                    <HorizontalScroll gap={16}>
                        {sprays.map((product) => (
                            <ProductCard
                                key={product.id}
                                imgSrc={product.images?.[0] || '/img/test.jpg'}
                                name={product.title}
                                price={product.price}
                                slug={product._sys.filename}
                            />
                        ))}
                    </HorizontalScroll>
                    <Spacer size={72} />
                </>
            )}

            {masks.length > 0 && (
                <>
                    <h2 id="mask" className="scroll-mt-6 text-[24px] font-recoleta font-medium mb-2.5">Măști</h2>
                    <HorizontalScroll gap={16}>
                        {masks.map((product) => (
                            <ProductCard
                                key={product.id}
                                imgSrc={product.images?.[0] || '/img/test.jpg'}
                                name={product.title}
                                price={product.price}
                                slug={product._sys.filename}
                            />
                        ))}
                    </HorizontalScroll>
                    <Spacer size={72} />
                </>
            )}

            <Dock />
        </div>
    );
}
