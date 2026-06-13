import FeaturedCard from '@/shared/FeaturedCard';
import HorizontalScroll from '@/shared/HorizontalScroll';
import ProductCard from '@/shared/ProductCard';
import Spacer from '@/shared/ui/Spacer';
import Dock from '@/widgets/Dock';
import Sidebar from '@/widgets/Sidebar';

export default function HomePage() {
    return (
        <div className="py-3">
            {/* HEADER START */}
            <div className="flex justify-between">
                <h1 className="text-[32px] font-recoleta font-medium">Produse Italiene</h1>
                <Sidebar />
            </div>
            {/* HEADER END */}

            <Spacer size={4} />

            {/* FEATURED PRODUCTS START */}
            <HorizontalScroll gap={8}>
                <FeaturedCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <FeaturedCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <FeaturedCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <FeaturedCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
            </HorizontalScroll>
            {/* FEATURED PRODUCTS END */}

            <Spacer size={9.5} />

            <h2 className="text-[24px] font-recoleta font-medium mb-2.5">Paste de dinți</h2>
            <HorizontalScroll gap={4}>
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
            </HorizontalScroll>

            <Spacer size={18} />

            <h2 className="text-[24px] font-recoleta font-medium mb-2.5">Șampoane</h2>
            <HorizontalScroll gap={4}>
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
            </HorizontalScroll>

            <Spacer size={18} />

            <h2 className="text-[24px] font-recoleta font-medium mb-2.5">Balsamuri de păr</h2>
            <HorizontalScroll gap={4}>
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
            </HorizontalScroll>

            <Spacer size={18} />

            <h2 className="text-[24px] font-recoleta font-medium mb-2.5">Măști</h2>
            <HorizontalScroll gap={4}>
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
                <ProductCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
            </HorizontalScroll>

            <Dock />
        </div>
    );
}
