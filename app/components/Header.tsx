// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { ShoppingCart } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import CartDrawer from "./CartDrawer";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// /* 🔹 SLUG FUNCTION */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// export default function Header() {
//   const { cart, drawerOpen, openDrawer, closeDrawer } = useCart();
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

//   /* 🔹 MULTI LEVEL DROPDOWN */
//   const renderDropdown = (children?: Category[]) => {
//     if (!children || children.length === 0) return null;

//     return (
//       <ul className="absolute left-full top-0 hidden group-hover:block bg-white shadow-lg border rounded min-w-[180px] z-50">
//         {children
//           .filter(c => c.is_active)
//           .map(child => (
//             <li key={child.id} className="relative group">
//               <Link
//                 href={`/category/${slugify(child.name)}`}
//                 className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
//               >
//                 {child.name}
//               </Link>

//               {child.children_data &&
//                 renderDropdown(child.children_data)}
//             </li>
//           ))}
//       </ul>
//     );
//   };

//   return (
//     <>
//       <header className="bg-white shadow-md px-6 py-4 relative flex items-center justify-between">
//         {/* 🔹 NAV */}
//         <nav className="flex space-x-6">
//           {categories
//             .filter(cat => cat.is_active)
//             .map(cat => (
//               <div key={cat.id} className="relative group">
//                 <Link
//                   href={`/category/${slugify(cat.name)}`}
//                   className="font-medium hover:text-blue-600"
//                 >
//                   {cat.name}
//                 </Link>

//                 {cat.children_data && cat.children_data.length > 0 && (
//                   <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border rounded min-w-[180px] z-50">
//                     {cat.children_data
//                       .filter(c => c.is_active)
//                       .map(child => (
//                         <li key={child.id} className="relative group">
//                           <Link
//                             href={`/category/${slugify(child.name)}`}
//                             className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
//                           >
//                             {child.name}
//                           </Link>

//                           {child.children_data &&
//                             renderDropdown(child.children_data)}
//                         </li>
//                       ))}
//                   </ul>
//                 )}
//               </div>
//             ))}
//         </nav>

//         {/* 🔹 LOGO */}
//         <Link
//           href="/"
//           className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold"
//         >
//           Abc
//         </Link>

//         {/* 🔹 CART */}
//         <button onClick={openDrawer} className="relative">
//           <ShoppingCart size={24} />
//           {cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
//               {cart.length}
//             </span>
//           )}
//         </button>
//       </header>

//       {/* 🔹 CART DRAWER */}
//       <CartDrawer open={drawerOpen} onClose={closeDrawer} />

//       <style jsx>{`
//         li.group:hover > ul {
//           display: block;
//         }
//       `}</style>
//     </>
//   );
// }



// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { ShoppingCart, Search, User } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import CartDrawer from "./CartDrawer";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// const slugify = (text: string) =>
//   text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// export default function Header() {
//   const { cart, drawerOpen, openDrawer, closeDrawer } = useCart();
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     fetch("/api/fetchCategories")
//       .then(res => res.json())
//       .then(data => setCategories(data.children_data || []))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <>
//       {/* 🔹 FIXED HEADER */}
//       <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
        
//         {/* 🔹 TOP ROW (LOGO CENTER + ICONS RIGHT) */}
//         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center relative">
          
//           {/* LOGO */}
//           <Link
//             href="/"
//             className="text-4xl font-bold tracking-wide"
//           >
//             Mr. Ciggy
//           </Link>

//           {/* RIGHT ICONS */}
//           <div className="absolute right-6 flex items-center gap-5">
//             <Search size={20} className="cursor-pointer" />
//             <User size={20} className="cursor-pointer" />

//             <button onClick={openDrawer} className="relative">
//               <ShoppingCart size={22} />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
//                   {cart.length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* 🔹 MENU ROW (LOGO KE NICHE) */}
//         <div className="border-t">
//           <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-center gap-8 text-sm font-medium">
//             {categories
//               .filter(cat => cat.is_active)
//               .map(cat => (
//                 <Link
//                   key={cat.id}
//                   href={`/category/${slugify(cat.name)}`}
//                   className="text-gray-700 hover:text-black transition"
//                 >
//                   {cat.name}
//                 </Link>
//               ))}
//           </nav>
//         </div>
//       </header>

//       {/* 🔹 CART DRAWER */}
//       <CartDrawer open={drawerOpen} onClose={closeDrawer} />

//       {/* 🔹 PAGE OFFSET (HEADER HEIGHT = 80 + 56 = 136px) */}
//       <div className="h-[136px]" />
//     </>
//   );
// }



// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { ShoppingCart, Search, User } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import CartDrawer from "./CartDrawer";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// const slugify = (text: string) =>
//   text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// export default function Header() {
//   const { cart, drawerOpen, openDrawer, closeDrawer } = useCart();
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     fetch("/api/fetchCategories")
//       .then(res => res.json())
//       .then(data => setCategories(data.children_data || []))
//       .catch(err => console.error(err));
//   }, []);

//   // 🔹 SMART LINK (parent ke andar products ho to child pe bhejo)
//   const getCategoryLink = (cat: Category) => {
//     const activeChildren =
//       cat.children_data?.filter(c => c.is_active) || [];

//     if (activeChildren.length > 0) {
//       return `/category/${slugify(activeChildren[0].name)}`;
//     }

//     return `/category/${slugify(cat.name)}`;
//   };

//   return (
//     <>
//       {/* 🔹 FIXED HEADER */}
//       <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
        
//         {/* 🔹 TOP ROW */}
//         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center relative">
          
//           {/* LOGO */}
//           <Link href="/" className="text-4xl font-bold tracking-wide">
//             Mr. Ciggy
//           </Link>

//           {/* ICONS */}
//           <div className="absolute right-6 flex items-center gap-5">
//             <Search size={20} />
//             <User size={20} />

//             <button onClick={openDrawer} className="relative">
//               <ShoppingCart size={22} />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
//                   {cart.length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* 🔹 MENU */}
//         <div className="border-t">
//           <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-center gap-8 text-sm font-medium">
//             {categories
//               .filter(cat => cat.is_active)
//               .map(cat => (
//                 <Link
//                   key={cat.id}
//                   href={getCategoryLink(cat)}
//                   className="text-gray-700 hover:text-black transition"
//                 >
//                   {cat.name}
//                 </Link>
//               ))}
//           </nav>
//         </div>
//       </header>

//       {/* 🔹 CART DRAWER */}
//       <CartDrawer open={drawerOpen} onClose={closeDrawer} />

//       {/* 🔹 OFFSET */}
//       <div className="h-[136px]" />
//     </>
//   );
// }



// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { ShoppingCart } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import CartDrawer from "./CartDrawer";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// /* 🔹 SLUG FUNCTION */
// const slugify = (text: string) =>
//   text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// export default function Header() {
//   const { cart, drawerOpen, openDrawer, closeDrawer } = useCart();
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

//   /* 🔹 MULTI LEVEL DROPDOWN (SAME LOGIC) */
//   const renderDropdown = (children?: Category[]) => {
//     if (!children || children.length === 0) return null;

//     return (
//       <ul className="absolute left-full top-0 hidden group-hover:block bg-white shadow-lg border rounded min-w-[180px] z-50">
//         {children
//           .filter(c => c.is_active)
//           .map(child => (
//             <li key={child.id} className="relative group" >

//               <Link
//                 href={`/category/${slugify(child.name)}`}
//                 className="block display- hide px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
//               >
//                 {child.name}
//               </Link>

//               {child.children_data && renderDropdown(child.children_data)}
//             </li>
//           ))}
//       </ul>
//     );
//   };

//   return (
//     <>
//       {/* 🔹 FIXED HEADER */}
//       <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

//         {/* 🔹 TOP ROW : LOGO CENTER */}
//         <div className="h-20 flex items-center justify-center">
//           <Link
//             href="/"
//             className="text-6xl font-bold"
//           >
//             Abc
//           </Link>
//         </div>

//         {/* 🔹 MENU ROW + CART RIGHT */}
//         <div className="border-t">
//           <div className="max-w-7xl mx-auto px-6 h-14 flex items-center">

//             {/* MENU CENTER */}
//             <nav className="flex-1 flex justify-center space-x-6">
//               {categories
//                 .filter(cat => cat.is_active)
//                 .map(cat => (
//                   <div key={cat.id} className="relative group">
//                     <Link
//                       href={`/category/${slugify(cat.name)}`}
//                       className="font-medium hover:text-blue-600"
//                     >
//                       {cat.name}
//                     </Link>

//                     {cat.children_data && cat.children_data.length > 0 && (
//                       <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border rounded min-w-[180px] z-50">
//                         {cat.children_data
//                           .filter(c => c.is_active)
//                           .map(child => (
//                             <li key={child.id} className="relative group">
//                               <Link
//                                 href={`/category/${slugify(child.name)}`}
//                                 className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
//                               >
//                                 {child.name}
//                               </Link>

//                               {child.children_data &&
//                                 renderDropdown(child.children_data)}
//                             </li>
//                           ))}
//                       </ul>
//                     )}
//                   </div>
//                 ))}
//             </nav>

//             {/* CART RIGHT */}
//             <button onClick={openDrawer} className="relative ml-6">
//               <ShoppingCart size={24} />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
//                   {cart.length}
//                 </span>
//               )}
//             </button>

//           </div>
//         </div>
//       </header>

//       {/* 🔹 CART DRAWER */}
//       <CartDrawer open={drawerOpen} onClose={closeDrawer} />

//       {/* 🔹 PAGE OFFSET */}
//       <div className="h-[136px]" />

//       <style jsx>{`
//         li.group:hover > ul {
//           display: block;
//         }
//       `}</style>
//     </>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { ShoppingCart } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import CartDrawer from "./CartDrawer";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// /* 🔹 SLUG FUNCTION */
// const slugify = (text: string) =>
//   text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// export default function Header() {
//   const { cart, drawerOpen, openDrawer, closeDrawer } = useCart();
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

//   /* 🔹 MULTI LEVEL DROPDOWN (LOGIC SAME) */
//   const renderDropdown = (children?: Category[]) => {
//     if (!children || children.length === 0) return null;

//     return (
//       <ul className="absolute left-full top-0 hidden group-hover:block bg-white shadow-lg border rounded min-w-[180px] z-50">
//         {children
//           .filter(c => c.is_active)
//           .map(child => (
//             <li key={child.id} className="relative group">
//               <Link
//                 href={`/category/${slugify(child.name)}`}
//                 className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
//               >
//                 {child.name}
//               </Link>

//               {child.children_data && renderDropdown(child.children_data)}
//             </li>
//           ))}
//       </ul>
//     );
//   };

//   return (
//     <>
//       {/* 🔹 FIXED HEADER */}
//       <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

//         {/* 🔹 LOGO TOP CENTER */}
//         <div className="h-20 flex items-center justify-center">
//           <Link href="/" className="text-4xl font-bold">
//             Reveredtech
//           </Link>
//         </div>

//         {/* 🔹 MENU + CART */}
//         <div className="border-t">
//           <div className="max-w-7xl mx-auto px-6 h-14 flex items-center">

//             {/* MENU CENTER */}
//             <nav className="flex-1 flex justify-center space-x-6">
//               {categories
//                 .filter(cat => cat.is_active)
//                 .map(cat => (
//                   <div key={cat.id} className="relative group">
//                     <Link
//                       href={`/category/${slugify(cat.name)}`}
//                       className="font-medium hover:text-blue-600"
//                     >
//                       {cat.name}
//                     </Link>

//                     {/* 🔹 SUB-CATEGORIES (DATA AAYEGA, FRONTEND PAR NAHI DIKHEGA) */}
//                     {cat.children_data && cat.children_data.length > 0 && (
//                       <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border rounded min-w-[180px] z-50">
//                         {cat.children_data
//                           .filter(c => c.is_active)
//                           .map(child => (
//                             <li key={child.id} className="relative group">
//                               <Link
//                                 href={`/category/${slugify(child.name)}`}
//                                 className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
//                               >
//                                 {child.name}
//                               </Link>

//                               {child.children_data &&
//                                 renderDropdown(child.children_data)}
//                             </li>
//                           ))}
//                       </ul>
//                     )}
//                   </div>
//                 ))}
//             </nav>

//             {/* CART RIGHT */}
//             <button onClick={openDrawer} className="relative ml-6">
//               <ShoppingCart size={24} />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
//                   {cart.length}
//                 </span>
//               )}
//             </button>

//           </div>
//         </div>
//       </header>

//       {/* 🔹 CART DRAWER */}
//       <CartDrawer open={drawerOpen} onClose={closeDrawer} />

//       {/* 🔹 PAGE OFFSET */}
//       <div className="h-[136px]" />

//       {/* 🔹 ONLY CSS CHANGE (FRONTEND HIDE SUB-CATEGORIES) */}
//       <style jsx>{`
//         /* sub-categories ko frontend par hamesha hide rakho */
//         nav .group > ul {
//           display: none !important;
//         }
//       `}</style>
//     </>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { ShoppingCart, Menu, X } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import CartDrawer from "./CartDrawer";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// const slugify = (text: string) =>
//   text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// export default function Header() {
//   const { cart, drawerOpen, openDrawer, closeDrawer } = useCart();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [mobileMenu, setMobileMenu] = useState(false);

//   useEffect(() => {
//     async function fetchCategories() {
//       const res = await fetch("/api/fetchCategories");
//       const data = await res.json();
//       setCategories(data.children_data || []);
//     }
//     fetchCategories();
//   }, []);

//   return (
//     <>
//       {/* 🔹 HEADER */}
//       <header className="fixed top-0 left-0 w-full bg-white shadow z-50">

//         {/* 🔹 TOP BAR */}
//         <div className="h-16 flex items-center px-4 md:justify-center justify-between">

//           {/* LOGO (LEFT ON MOBILE, CENTER ON DESKTOP) */}
//           <Link href="/" className="text-2xl font-bold md:absolute md:left-1/2 md:-translate-x-1/2">
//             Reveredtech
//           </Link>

//           {/* MOBILE HAMBURGER */}
//           <button
//             className="md:hidden"
//             onClick={() => setMobileMenu(true)}
//           >
//             <Menu size={26} />
//           </button>
//         </div>

//         {/* 🔹 DESKTOP MENU */}
//         <div className="border-t hidden md:block">
//           <div className="max-w-7xl mx-auto px-6 h-14 flex items-center">
//             <nav className="flex-1 flex justify-center gap-6">
//               {categories
//                 .filter(c => c.is_active)
//                 .map(cat => (
//                   <Link
//                     key={cat.id}
//                     href={`/category/${slugify(cat.name)}`}
//                     className="font-medium hover:text-blue-600"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//             </nav>

//             <button onClick={openDrawer} className="relative ml-6">
//               <ShoppingCart size={24} />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
//                   {cart.length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* 🔹 MOBILE SIDE DRAWER */}
//       {mobileMenu && (
//         <>
//           {/* Overlay */}
//           <div
//             className="fixed inset-0 bg-black/40 z-50"
//             onClick={() => setMobileMenu(false)}
//           />

//           {/* Drawer */}
//           <div className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg p-4">
//             <div className="flex justify-between items-center mb-4">
//               <span className="font-bold text-lg">Menu</span>
//               <button onClick={() => setMobileMenu(false)}>
//                 <X size={22} />
//               </button>
//             </div>

//             <nav className="flex flex-col divide-y">
//               {categories
//                 .filter(c => c.is_active)
//                 .map(cat => (
//                   <Link
//                     key={cat.id}
//                     href={`/category/${slugify(cat.name)}`}
//                     onClick={() => setMobileMenu(false)}
//                     className="py-3 text-lg font-medium"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//             </nav>
//           </div>
//         </>
//       )}

//       {/* CART DRAWER */}
//       <CartDrawer open={drawerOpen} onClose={closeDrawer} />

//       {/* PAGE OFFSET */}
//       <div className="h-32" />
//     </>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

type Category = {
  id: number;
  name: string;
  is_active: boolean;
  children_data?: Category[];
};

const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Header() {
  const { cart, drawerOpen, openDrawer, closeDrawer } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/fetchCategories");
      const data = await res.json();
      setCategories(data.children_data || []);
    }
    fetchCategories();
  }, []);

  return (
    <>
      {/* 🔹 HEADER */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">

        {/* 🔹 TOP BAR */}
        <div className="h-16 flex items-center justify-between px-4 md:justify-center relative">

          {/* LOGO */}
          <Link
            href="/"
            className="text-4xl font-bold md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            Reveredtech
          </Link>

          {/* RIGHT ICONS (MOBILE) */}
          <div className="flex items-center gap-4 md:hidden">
            {/* CART */}
            <button onClick={openDrawer} className="relative">
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* HAMBURGER */}
            <button onClick={() => setMobileMenu(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* 🔹 DESKTOP MENU */}
        <div className="border-t hidden md:block">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-center">
            <nav className="flex-1 flex justify-center gap-6">
              {categories
                .filter(c => c.is_active)
                .map(cat => (
                  <Link
                    key={cat.id}
                    href={`/category/${slugify(cat.name)}`}
                    className="font-medium hover:text-blue-600"
                  >
                    {cat.name}
                  </Link>
                ))}
            </nav>

            <button onClick={openDrawer} className="relative ml-6">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 MOBILE SIDE DRAWER */}
      {mobileMenu && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setMobileMenu(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMobileMenu(false)}>
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col divide-y">
              {categories
                .filter(c => c.is_active)
                .map(cat => (
                  <Link
                    key={cat.id}
                    href={`/category/${slugify(cat.name)}`}
                    onClick={() => setMobileMenu(false)}
                    className="py-3 text-lg font-medium"
                  >
                    {cat.name}
                  </Link>
                ))}
            </nav>
          </div>
        </>
      )}

      {/* CART DRAWER */}
      <CartDrawer open={drawerOpen} onClose={closeDrawer} />

      {/* PAGE OFFSET */}
<div className="h-16 md:h-30" />


    </>
  );
}


// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { ShoppingCart, Menu, X } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import CartDrawer from "./CartDrawer";

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// const slugify = (text: string) =>
//   text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// export default function Header() {
//   const { cart, drawerOpen, openDrawer, closeDrawer } = useCart();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

//   return (
//     <>
//       {/* 🔹 HEADER */}
//       <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

//         {/* 🔹 LOGO */}
//         <div className="h-20 flex items-center justify-center relative">
//           <Link href="/" className="text-4xl font-bold">
//             Reveredtech
//           </Link>

//           {/* 🔹 HAMBURGER (MOBILE ONLY) */}
//           <button
//             className="absolute left-4 md:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* 🔹 MENU + CART */}
//         <div className="border-t">
//           <div className="max-w-7xl mx-auto px-6 h-14 flex items-center">

//             {/* 🔹 DESKTOP MENU */}
//             <nav className="flex-1 hidden md:flex justify-center space-x-6">
//               {categories
//                 .filter(cat => cat.is_active)
//                 .map(cat => (
//                   <Link
//                     key={cat.id}
//                     href={`/category/${slugify(cat.name)}`}
//                     className="font-medium hover:text-blue-600"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
                
//             </nav>

//             {/* 🔹 CART */}
//             <button onClick={openDrawer} className="relative ml-auto md:ml-6">
//               <ShoppingCart size={24} />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
//                   {cart.length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* 🔹 MOBILE MENU */}
//         {mobileMenuOpen && (
//           <div className="md:hidden border-t bg-white">
//             <nav className="flex flex-col items-center gap-4 py-4">
//               {categories
//                 .filter(cat => cat.is_active)
//                 .map(cat => (
//                   <Link
//                     key={cat.id}
//                     href={`/category/${slugify(cat.name)}`}
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="text-lg font-medium"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//             </nav>
//           </div>
//         )}
//       </header>

//       {/* 🔹 CART DRAWER */}
//       <CartDrawer open={drawerOpen} onClose={closeDrawer} />

//       {/* 🔹 PAGE OFFSET */}
//       <div className="h-[136px]" />
//     </>
//   );
// }







// "use client";
// import { useEffect, useState } from "react";

// export default function Header() {
//   const [categories, setCategories] = useState<any[]>([]);

//   // 🔹 Header load hote hi categories lao
//   useEffect(() => {
//     fetch("/api/categories")
//       .then(res => res.json())
//       .then(data => {
//         setCategories(data.children_data || []);
//         console.log("🟢 Header Categories:", data.children_data);
//       });
//   }, []);

//   // 🔥 Category click → products console
//   const handleCategoryClick = async (categoryId: number) => {
//     console.log("🟡 Clicked Category ID:", categoryId);

//     const res = await fetch(`/api/products?id=${categoryId}`);
//     const products = await res.json();

//     console.log("🟢 Products of clicked category:", products);
//   };

//   return (
//     <header>
//       <nav style={{ display: "flex", gap: "15px" }}>
//         {categories.map(cat => (
//           <span
//             key={cat.id}
//             style={{ cursor: "pointer" }}
//             onClick={() => handleCategoryClick(cat.id)}
//           >
//             {cat.name}
//           </span>
//         ))}
//       </nav>
//     </header>
//   );
// }
