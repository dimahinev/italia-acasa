import Image from 'next/image'

type Props = { className?: string, imgSrc: string, name: string, price: number }

export default function FeaturedCard({ className, imgSrc, name, price }: Props) {
    return (
        <div className="w-[240px]">
            <div className="relative w-full h-[277px]">
                <Image
                    className="object-cover object-[center_80%] rounded-card"
                    src={imgSrc}
                    alt={name}
                    fill
                    sizes="240px"
                    priority
                />
            </div>
            <div className="flex justify-between mt-2 px-[5px]">
                <span className="font-rounds text-17 font-bold">{name}</span>
                <span className="font-rounds text-17 font-bold text-muted-dark">{price} MDL</span>
            </div>
        </div>
    )
}