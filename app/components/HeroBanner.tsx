// "use client";

// import Link from "next/link";
// import Image from "next/image";

// export default function HeroBanner() {
//   return (
//     <section className="relative w-full h-[420px] md:h-[520px]">
//       {/* 🔹 Background Image */}
//       <Image
//         src="/banner.jpg" // 👈 apni image yahan rakho (public/banner.jpg)
//         alt="Hero Banner"
//         fill
//         priority
//         className="object-cover"
//       />

//       {/* 🔹 Dark Overlay */}
//       <div className="absolute inset-0 bg-black/40" />

//       {/* 🔹 Content */}
//       <div className="absolute inset-0 flex items-center">
//         <div className="max-w-7xl mx-auto px-6 w-full">
//           <div className="max-w-xl text-white">
//             <h1 className="text-3xl md:text-5xl font-bold leading-tight">
//               Canada’s Easiest Way to Order <br />
//               Smokes Online
//             </h1>

//             <p className="mt-4 text-sm md:text-base text-gray-200">
//               Skip the markup. Skip the trip. Premium smokes,
//               delivered discreetly.
//             </p>

//             <Link
//               href="/category/all-products"
//               className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
//             >
//               Shop Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[420px] md:h-[520px]">
      {/* 🔹 Background Image */}
      <Image
        src="/banner.jpg"
        alt="Hero Banner"
        fill
        priority
        className="object-cover"
      />

      {/* 🔹 Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🔹 Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl px-6 w-full text-center">
          <div className="max-w-xl mx-auto text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Canada’s Easiest Way to Order <br />
              Smokes Online
            </h1>

            <p className="mt-4 text-sm md:text-base text-gray-200">
              Skip the markup. Skip the trip. Premium smokes,
              delivered discreetly.
            </p>

            <Link
              href="/category/all-products"
              className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
