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
//           Reveredtech
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



"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

type Category = {
  id: number;
  name: string;
  is_active: boolean;
  children_data?: Category[];
};

/* 🔹 SLUG FUNCTION */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function Header() {
  const { cart, drawerOpen, openDrawer, closeDrawer } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const TOKEN = "b8p4vbo33cq0vdtwvhsdm6bbwg0dcekx"; // ⚠️ HARD CODE (TEST ONLY)

        const res = await fetch(
          "https://test.flipflops.cc/rest/V1/categories",
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );

        console.log("MAGENTO STATUS:", res.status);

        if (!res.ok) {
          throw new Error("Magento API failed");
        }

        const data = await res.json();
        console.log("MAGENTO DATA:", data);

        setCategories(data.children_data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }

    fetchCategories();
  }, []);

  /* 🔹 MULTI LEVEL DROPDOWN */
  const renderDropdown = (children?: Category[]) => {
    if (!children || children.length === 0) return null;

    return (
      <ul className="absolute left-full top-0 hidden group-hover:block bg-white shadow-lg border rounded min-w-[180px] z-50">
        {children
          .filter(c => c.is_active)
          .map(child => (
            <li key={child.id} className="relative group">
              <Link
                href={`/category/${slugify(child.name)}`}
                className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
              >
                {child.name}
              </Link>

              {child.children_data &&
                renderDropdown(child.children_data)}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <>
      <header className="bg-white shadow-md px-6 py-4 relative flex items-center justify-between">
        {/* 🔹 NAV */}
        <nav className="flex space-x-6">
          {categories
            .filter(cat => cat.is_active)
            .map(cat => (
              <div key={cat.id} className="relative group">
                <Link
                  href={`/category/${slugify(cat.name)}`}
                  className="font-medium hover:text-blue-600"
                >
                  {cat.name}
                </Link>

                {cat.children_data && cat.children_data.length > 0 && (
                  <ul className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border rounded min-w-[180px] z-50">
                    {cat.children_data
                      .filter(c => c.is_active)
                      .map(child => (
                        <li key={child.id} className="relative group">
                          <Link
                            href={`/category/${slugify(child.name)}`}
                            className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                          >
                            {child.name}
                          </Link>

                          {child.children_data &&
                            renderDropdown(child.children_data)}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </nav>

        {/* 🔹 LOGO */}
        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold"
        >
          Reveredtech
        </Link>

        {/* 🔹 CART */}
        <button onClick={openDrawer} className="relative">
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </header>

      <CartDrawer open={drawerOpen} onClose={closeDrawer} />

      <style jsx>{`
        li.group:hover > ul {
          display: block;
        }
      `}</style>
    </>
  );
}
