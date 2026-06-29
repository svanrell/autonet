"use client"

import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import Image from "next/image"

const images = [
    {
        title: "Coche 1",
        thumbnail: "/images/coche1.webp",
    },
    {
        title: "Coche 2",
        thumbnail: "/images/coche2.webp",
    },
    {
        title: "Coche 3",
        thumbnail: "/images/coche3.webp",
    },
    {
        title: "Coche 4",
        thumbnail: "/images/coche4.webp",
    },
    {
        title: "Coche 5",
        thumbnail: "/images/coche5.webp",
    },
    {
        title: "Coche 6",
        thumbnail: "/images/coche6.webp",
    },
]

const velocity = [0.8, -0.8]

function ScrollVelocityDemo() {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-y-12 px-30 py-10">
                {velocity.map((v, index) => (
                    <ScrollVelocity key={index} velocity={v}>
                        {images.map(({ title, thumbnail }) => (
                            <div
                                key={title}
                                className="relative h-[6rem] w-[9rem] md:h-[8rem] md:w-[12rem] xl:h-[12rem] xl:w-[18rem] rounded-2xl overflow-hidden border border-zinc-900/80 shadow-2xl shadow-black/40 transition-all duration-500 hover:border-blue-500/30 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer"
                            >
                                <Image
                                    src={thumbnail}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 768px) 144px, (max-width: 1200px) 192px, 288px"
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        ))}
                    </ScrollVelocity>
                ))}
            </div>
        </div>
    )
}

export { ScrollVelocityDemo }