"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const products = [
  {
    id: 1,
    title: "Havaianas Baby Brazil Logo Sandals",
    price: "$17.60",
    image: "/c.png",
  },
  {
    id: 2,
    title: "Havaianas Slim Glitter II",
    price: "$30.40",
    image: "/b.png",
  },
  {
    id: 3,
    title: "Havaianas Slim Animals Print",
    price: "$34.00",
    image: "/c.png",
  },
  {
    id: 4,
    title: "Havaianas Slim Square Logo Metallic",
    price: "$30.40",
    image: "/b.png",
  },
  {
    id: 5,
    title: "Havaianas Slim Logo Sandals",
    price: "$28.00",
    image: "/c.png",
  },
];

export default function NewCollection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const itemWidth = slider.offsetWidth / 3; // ek image ka width (3 image dikh rahi hai)
    
    if (slider.scrollLeft === 0) {
      slider.scrollLeft = slider.scrollWidth; // infinite loop left
    }

    slider.scrollBy({ left: -itemWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const itemWidth = slider.offsetWidth / 3; // ek image ka width

    if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
      slider.scrollLeft = 0; // infinite loop right
    }

    slider.scrollBy({ left: itemWidth, behavior: "smooth" });
  };

  // Duplicate products for infinite feel
  const infiniteProducts = [...products, ...products];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        New Collection
      </h2>

      <div className="relative overflow-hidden">
        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
        >
          <ChevronLeft size={22} />
        </button>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {infiniteProducts.map((p, index) => (
            <div
              key={`${p.id}-${index}`}
              className="flex-shrink-0 w-1/3 text-center" // 3 image ek sath
            >
              <Image
                src={p.image}
                alt={p.title}
                width={200}
                height={200}
                className="mx-auto rounded-lg object-cover"
              />
              <p className="mt-4 text-sm font-medium">{p.title}</p>
              <p className="text-gray-600 text-sm">{p.price}</p>
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
