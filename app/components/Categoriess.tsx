// "use client";
// import { useEffect, useState } from "react";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// export default function Categories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();
//         setCategories(data.children_data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories:", err);
//         setError("Failed to load categories");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCategories();
//   }, []);

//   if (loading) return <p>Loading categories...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="flex gap-4 flex-wrap">
//       {categories
//         .filter((cat) => cat.is_active)
//         .map((cat) => (
//           <div
//             key={cat.id}
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
//           >
//             {cat.name}
//           </div>
//         ))}
//     </div>
//   );
// }



// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// export default function Categories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();
//         setCategories(data.children_data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories:", err);
//         setError("Failed to load categories");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCategories();
//   }, []);

//   if (loading) return <p>Loading categories...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="flex gap-4 flex-wrap">
//       {categories
//         .filter((cat) => cat.is_active)
//         .map((cat) => (
//           <Link
//             key={cat.id}
//             href={`/category/${cat.id}`} // Dynamic route
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
//           >
//             {cat.name}
//           </Link>
//         ))}
//     </div>
//   );
// }


// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// export default function Categories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();
//         setCategories(data.children_data || []);
//       } catch {
//         setError("Failed to load categories");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCategories();
//   }, []);

//   if (loading) return <p>Loading categories...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="flex gap-4 flex-wrap">
//       {categories
//         .filter((cat) => cat.is_active)
//         .map((cat) => (
//           <Link
//             key={cat.id}
//             href={`/category/${cat.id}`}
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
//           >
//             {cat.name}
//           </Link>
//         ))}
//     </div>
//   );
// }



// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// export default function Categories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await fetch("/api/fetchCategories"); // tumhara Next.js API route
//         const data = await res.json();
//         console.log("Fetched categories:", data); // 🔹 console me bhi check kar sakte ho
//         setCategories(data.children_data || []); // top-level categories
//       } catch (err) {
//         console.error("Failed to fetch categories:", err);
//         setError("Failed to load categories");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCategories();
//   }, []);

//   if (loading) return <p>Loading categories...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="flex flex-wrap gap-4 p-4">
//       {categories
//         .filter(cat => cat.is_active) // sirf active categories show karenge
//         .map(cat => (
//           <Link
//             key={cat.id}
//             href={`/category/${cat.id}`} // click par category page pe le jaayega
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           >
//             {cat.name}
//           </Link>
//         ))}
//     </div>
//   );
// }


// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// export default function Navbar() {
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();
//         setCategories(data.children_data || []);
//       } catch (err) {
//         console.error("Failed to fetch categories:", err);
//       }
//     }
//     fetchCategories();
//   }, []);

//   // Recursive function for multi-level dropdowns
//   const renderDropdown = (children?: Category[]) => {
//     if (!children || children.length === 0) return null;

//     return (
//       <ul className="absolute left-full top-0 hidden group-hover:block bg-white shadow-lg border rounded min-w-[200px] z-50">
//         {children
//           .filter(c => c.is_active)
//           .map(child => (
//             <li key={child.id} className="relative group">
//               <Link
//                 href={`/category/${child.id}`}
//                 className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
//               >
//                 {child.name}
//               </Link>
//               {child.children_data && child.children_data.length > 0 && renderDropdown(child.children_data)}
//             </li>
//           ))}
//       </ul>
//     );
//   };

//   return (
//     <nav className="bg-white shadow">
//       <ul className="flex space-x-4 px-4 py-2">
//         {categories
//           .filter(c => c.is_active)
//           .map(cat => (
//             <li key={cat.id} className="relative group">
//               <Link
//                 href={`/category/${cat.id}`}
//                 className="px-3 py-2 hover:text-blue-600 whitespace-nowrap"
//               >
//                 {cat.name}
//               </Link>

//               {/* Top-level dropdown */}
//               {cat.children_data && cat.children_data.length > 0 && (
//                 <ul className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg border rounded min-w-[200px] z-50">
//                   {cat.children_data
//                     .filter(c => c.is_active)
//                     .map(child => (
//                       <li key={child.id} className="relative group">
//                         <Link
//                           href={`/category/${child.id}`}
//                           className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
//                         >
//                           {child.name}
//                         </Link>
//                         {child.children_data && renderDropdown(child.children_data)}
//                       </li>
//                     ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//       </ul>
//     </nav>
//   );
// }


