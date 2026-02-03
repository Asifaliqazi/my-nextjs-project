// "use client";

// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useRef } from "react";

// const products = [
//   {
//     id: 1,
//     title: "PrimeTime Plus VanillaPrimeTime Plus Vanilla Flavoured Smokes",
//     price: "$65",
//     image: "/a.png",
//   },
//   {
//     id: 2,
//     title: "PrimeTime Plus Grape Flavoured Cigars",
//     price: "$50",
//     image: "/bc.png",
//   },
//   {
//     id: 3,
//     title: "PrimeTime Plus VanillaPrimeTime Plus Vanilla Flavoured Smokes",
//     price: "$65",
//     image: "/a.png",
//   },
//   {
//     id: 4,
//     title: "PrimeTime Plus Grape Flavoured Cigars",
//     price: "$50",
//     image: "/bc.png",
//   },
//   {
//     id: 5,
//     title: "PrimeTime Plus VanillaPrimeTime Plus Vanilla Flavoured Smokes",
//     price: "$65",
//     image: "/a.png",
//   },
// ];

// export default function NewCollection() {
//   const sliderRef = useRef<HTMLDivElement>(null);

//   const scrollLeft = () => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     const itemWidth = slider.offsetWidth / 3; // ek image ka width (3 image dikh rahi hai)
    
//     if (slider.scrollLeft === 0) {
//       slider.scrollLeft = slider.scrollWidth; // infinite loop left
//     }

//     slider.scrollBy({ left: -itemWidth, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     const itemWidth = slider.offsetWidth / 3; // ek image ka width

//     if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth) {
//       slider.scrollLeft = 0; // infinite loop right
//     }

//     slider.scrollBy({ left: itemWidth, behavior: "smooth" });
//   };

//   // Duplicate products for infinite feel
//   const infiniteProducts = [...products, ...products];

//   return (
//     <div className="max-w-7xl mx-auto px-4 mt-16">
//       <h2 className="text-3xl font-bold text-center mb-10">
//         All Products
//       </h2>

//       <div className="relative overflow-hidden">
//         {/* LEFT BUTTON */}
//         <button
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
//         >
//           <ChevronLeft size={22} />
//         </button>

//         {/* SLIDER */}
//         <div
//           ref={sliderRef}
//           className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
//         >
//           {infiniteProducts.map((p, index) => (
//             <div
//               key={`${p.id}-${index}`}
//               className="flex-shrink-0 w-1/3 text-center" // 3 image ek sath
//             >
//               <Image
//                 src={p.image}
//                 alt={p.title}
//                 width={200}
//                 height={200}
//                 className="mx-auto rounded-lg object-cover"
//               />
//               <p className="mt-4 text-sm font-medium">{p.title}</p>
//               <p className="text-gray-600 text-sm">{p.price}</p>
//             </div>
//           ))}
//         </div>

//         {/* RIGHT BUTTON */}
//         <button
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
//         >
//           <ChevronRight size={22} />
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const products = [
  { id: 1, title: "PrimeTime Plus Vanilla Flavoured Smokes", price: "$65", image: "/a.png" },
  { id: 2, title: "PrimeTime Plus Grape Flavoured Cigars", price: "$50", image: "/bc.png" },
  { id: 3, title: "PrimeTime Plus Vanilla Flavoured Smokes", price: "$65", image: "/a.png" },
  { id: 4, title: "PrimeTime Plus Grape Flavoured Cigars", price: "$50", image: "/bc.png" },
  { id: 5, title: "PrimeTime Plus Vanilla Flavoured Smokes", price: "$65", image: "/a.png" },
];

export default function NewCollection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 768 ? 3 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const itemWidth = slider.offsetWidth / itemsPerView;
    slider.scrollBy({ left: -itemWidth, behavior: "smooth" }); // Default scroll behavior
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const itemWidth = slider.offsetWidth / itemsPerView;
    slider.scrollBy({ left: itemWidth, behavior: "smooth" }); // Default scroll behavior
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-16">
      <h2 className="text-3xl font-bold text-center mb-10">All Products</h2>

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
          {products.map((p) => (
            <div
              key={p.id}
              className={`flex-shrink-0 w-full sm:w-1/3 text-center`} // Responsive width
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
