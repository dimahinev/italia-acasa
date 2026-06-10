import Sidebar from "@/widgets/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="py-3">
      {/* HEADER START */}
      <div className="flex justify-between">
        <span className="text-[32px] font-recoleta font-medium">Produse Italiene</span>
        <Sidebar />
      </div>
      {/* HEADER END */}

      {/* FEATURED PRODUCTS START */}
      <div>
        <Image
          className="rounded-card"
          src="/img/test.jpg" alt="test" width={242} height={279} />


      </div>
      {/* FEATURED PRODUCTS END */}
    </div>
  );
}
