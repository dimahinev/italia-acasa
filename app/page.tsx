import FeaturedCard from "@/shared/FeaturedCard";
import HorizontalScroll from "@/shared/HorizontalScroll";
import Spacer from "@/shared/ui/Spacer";
import Sidebar from "@/widgets/Sidebar";

export default function Home() {
  return (
    <div className="py-3">
      {/* HEADER START */}
      <div className="flex justify-between">
        <span className="text-[32px] font-recoleta font-medium">Produse Italiene</span>
        <Sidebar />
      </div>
      {/* HEADER END */}
      <Spacer size={4} />
      {/* FEATURED PRODUCTS START */}
      <HorizontalScroll gap={2}>
        <FeaturedCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
        <FeaturedCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
        <FeaturedCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />
        <FeaturedCard imgSrc="/img/test.jpg" name="Biorepair Pro White" price={65} />

      </HorizontalScroll>
      {/* FEATURED PRODUCTS END */}

    </div>
  );
}
