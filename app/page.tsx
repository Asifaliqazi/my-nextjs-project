// import Link from "next/link";

// export default function Home() {
//   const categories = ["Men", "Women", "Shoes"];

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Categories</h1>
//       {/* <ul className="space-y-3">
//         {categories.map((c) => (
//           <li key={c}>
//             <Link
//               href={`/category/${c.toLowerCase()}`}
//               className="text-blue-600 underline"
//             >
//               {c}
//             </Link>
//           </li>
//         ))}
//       </ul> */}
//     </div>
//   );
// }

import Image from "next/image";
import NewCollection from "./components/NewCollection";

export default function Page() {
  return (
    <>
      {/* IMAGE BANNER */}
      <div className="w-full overflow-hidden">
        <div className="relative w-full h-[70vh]">
          <Image
            src="/banner2.jpg"
            alt="Hero Banner"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* NEW COLLECTION */}
      <NewCollection />
    </>
  );
}





