//flip flop code
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// const MAGENTO_BASE_URL = "https://www.mrciggy.com";

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryId, setCategoryId] = useState<number | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY ID ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         const findRecursive = (cats: Category[]): number | null => {
//           for (const c of cats) {
//             if (slugify(c.name) === slug) return c.id;
//             if (c.children_data) {
//               const found = findRecursive(c.children_data);
//               if (found) return found;
//             }
//           }
//           return null;
//         };

//         const id = findRecursive(data.children_data || []);

//         if (!id) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         setCategoryId(id);
//       } catch {
//         setError("Failed to load category");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (!categoryId) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch(`/api/fetchProducts?id=${categoryId}`);
//         if (!res.ok) throw new Error("Failed to fetch products");

//         const data = await res.json();

//         const items = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.items)
//           ? data.items
//           : [];

//         const mapped: Product[] = items.map((item: any) => ({
          
//           id: item.id,
//           sku: item.sku,
//           title: item.name,
//           price: Number(item.price) || 0,
//           image: item.image
//             ? `${MAGENTO_BASE_URL}/media/catalog/product${item.image}`
//             : "/no-image.png",
//           type: item.type_id || "simple",
//           stock:
//             item.extension_attributes?.stock_item?.qty ??
//             item.extension_attributes?.quantity,
//         }));
        
//         setProducts(mapped);
        
//       } catch {
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryId]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);

//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price > 0); // ✅ price 0 hide

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p, index) => (
//             <div
//               key={p.sku}
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link
//                 href={`/product?sku=${encodeURIComponent(p.sku)}`}
//               >
//                 <Image
//                   src={p.image}
//                   alt={p.title}
//                   width={300}
//                   height={300}
//                   priority={index === 0} // ✅ LCP
//                   className="w-full h-40 object-contain"
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string | null;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// const MAGENTO_BASE_URL = "https://www.mrciggy.com";

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryId, setCategoryId] = useState<number | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY ID ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         const findRecursive = (cats: Category[]): number | null => {
//           for (const c of cats) {
//             if (slugify(c.name) === slug) return c.id;
//             if (c.children_data) {
//               const found = findRecursive(c.children_data);
//               if (found) return found;
//             }
//           }
//           return null;
//         };

//         const id = findRecursive(data.children_data || []);

//         if (!id) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         setCategoryId(id);
//       } catch {
//         setError("Failed to load category");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (!categoryId) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch(`/api/fetchProducts?id=${categoryId}`);
//         if (!res.ok) throw new Error("Failed to fetch products");

//         const data = await res.json();

//         const items = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.items)
//           ? data.items
//           : [];

//         const mapped: Product[] = items.map((item: any) => {
//           const magentoImage =
//             item.media_gallery_entries?.[0]?.file || item.image || null;

//           const imageUrl = magentoImage
//             ? `${MAGENTO_BASE_URL}/media/catalog/product${magentoImage}`
//             : null;

//           console.log("🖼️ Product:", item.sku);
//   console.log("➡️ final image URL:", imageUrl);

//           return {
//             id: item.id,
//             sku: item.sku,
//             title: item.name,
//             price: Number(item.price) || 0,
//             image: imageUrl,
//             type: item.type_id || "simple",
//             stock:
//               item.extension_attributes?.stock_item?.qty ??
//               item.extension_attributes?.quantity,
//           };
//         });

//         setProducts(mapped);
//       } catch {
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryId]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);

//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image || "",
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price > 0);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p, index) => (
//             <div
//               key={p.sku}
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 {/* ✅ IMAGE TABHI RENDER HOGI JAB EXIST KARE */}
//                 {p.image && (
//                   <Image
//                     src={p.image}
//                     alt={p.title}
//                     width={300}
//                     height={300}
//                     priority={index === 0}
//                     className="w-full h-40 object-contain"
//                   />
//                 )}

//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string | null;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// const MAGENTO_BASE_URL = "https://www.mrciggy.com";

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryId, setCategoryId] = useState<number | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY ID ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         const findRecursive = (cats: Category[]): number | null => {
//           for (const c of cats) {
//             if (slugify(c.name) === slug) return c.id;
//             if (c.children_data) {
//               const found = findRecursive(c.children_data);
//               if (found) return found;
//             }
//           }
//           return null;
//         };

//         const id = findRecursive(data.children_data || []);

//         if (!id) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         setCategoryId(id);
//       } catch {
//         setError("Failed to load category");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (!categoryId) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch(`/api/fetchProducts?id=${categoryId}`);
//         if (!res.ok) throw new Error("Failed to fetch products");

//         const data = await res.json();

//         const items = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.items)
//           ? data.items
//           : [];

//         const mapped: Product[] = items.map((item: any) => {
//           const magentoImage =
//             item.media_gallery_entries?.[0]?.file || item.image || null;

//           const imageUrl = magentoImage
//             ? `${MAGENTO_BASE_URL}/media/catalog/product${magentoImage}`
//             : null;

//           return {
//             id: item.id,
//             sku: item.sku,
//             title: item.name,
//             price: Number(item.price) || 0,
//             image: imageUrl,
//             type: item.type_id || "simple",
//             stock:
//               item.extension_attributes?.stock_item?.qty ??
//               item.extension_attributes?.quantity,
//           };
//         });

//         setProducts(mapped);
//       } catch {
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryId]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);

//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image || "",
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-6">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price > 0);

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-xl font-bold mb-6">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//           {visibleProducts.map((p, index) => (
//             <div
//               key={p.sku}
//               className="border rounded-lg p-4 flex flex-col items-center bg-white hover:shadow-md transition"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 {p.image && (
//                   <Image
//                     src={p.image}
//                     alt={p.title}
//                     width={300}
//                     height={300}
//                     priority={index === 0}
//                     className="w-full h-44 object-contain mb-3"
//                   />
//                 )}

//                 <h3 className="text-sm text-center font-medium min-h-[40px]">
//                   {p.title}
//                 </h3>
//               </Link>

//               <p className="font-semibold text-lg mt-2">
//                 CA${p.price}
//               </p>

//               <button
//                 onClick={() => handleAddToCart(p)}
//                 disabled={addingSku === p.sku}
//                 className="bg-black text-white py-2 px-4 rounded w-2/3 mt-3 mx-auto text-sm hover:bg-gray-900 disabled:opacity-50"
//               >

//                 {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

/* ================= TYPES ================= */
type Product = {
  id: number;
  sku: string;
  title: string;
  price: number;
  image: string | null;
  type: string;
  stock?: number;
};

type Category = {
  id: number;
  name: string;
  is_active: boolean;
  children_data?: Category[];
};

const MAGENTO_BASE_URL = "https://www.mrciggy.com";

/* ================= SLUG HELPER ================= */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.id as string;

  const { addToCart } = useCart();

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingSku, setAddingSku] = useState<string | null>(null);

  /* ================= SLUG → CATEGORY ID ================= */
  useEffect(() => {
    if (!slug) return;

    const loadCategories = async () => {
      try {
        const res = await fetch("/api/fetchCategories");
        const data = await res.json();

        const findRecursive = (cats: Category[]): number | null => {
          for (const c of cats) {
            if (slugify(c.name) === slug) return c.id;
            if (c.children_data) {
              const found = findRecursive(c.children_data);
              if (found) return found;
            }
          }
          return null;
        };

        const id = findRecursive(data.children_data || []);

        if (!id) {
          setError("Category not found");
          setLoading(false);
          return;
        }

        setCategoryId(id);
      } catch {
        setError("Failed to load category");
        setLoading(false);
      }
    };

    loadCategories();
  }, [slug]);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/fetchProducts?id=${categoryId}`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : [];

        const mapped: Product[] = items.map((item: any) => {
          const magentoImage =
            item.media_gallery_entries?.[0]?.file || item.image || null;

          const imageUrl = magentoImage
            ? `${MAGENTO_BASE_URL}/media/catalog/product${magentoImage}`
            : null;

          return {
            id: item.id,
            sku: item.sku,
            title: item.name,
            price: Number(item.price) || 0,
            image: imageUrl,
            type: item.type_id || "simple",
            stock:
              item.extension_attributes?.stock_item?.qty ??
              item.extension_attributes?.quantity,
          };
        });

        setProducts(mapped);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  /* ================= ADD TO CART ================= */
  const handleAddToCart = async (product: Product) => {
    if (product.type === "configurable") {
      window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
      return;
    }

    try {
      setAddingSku(product.sku);

      await addToCart(
        {
          sku: product.sku,
          title: product.title,
          price: product.price,
          image: product.image || "",
          stock: product.stock ?? 999,
        },
        1
      );
    } catch {
      alert("Failed to add product");
    } finally {
      setAddingSku(null);
    }
  };

  /* ================= UI ================= */
  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const visibleProducts = products.filter((p) => p.price > 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold mb-6">
        Products ({visibleProducts.length})
      </h1>

      {visibleProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleProducts.map((p, index) => (
            <div
              key={p.sku}
              className="border rounded-lg p-4 flex flex-col items-center bg-white hover:shadow-md transition"
            >
              <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={300}
                    height={300}
                    priority={index === 0}
                    className="w-full h-44 object-contain mb-3"
                  />
                )}

                <h3 className="text-sm text-center font-medium min-h-[40px]">
                  {p.title}
                </h3>
              </Link>

              <p className="font-semibold text-lg mt-2">CA${p.price}</p>

              <button
                onClick={() => handleAddToCart(p)}
                disabled={addingSku === p.sku}
                className="bg-black text-white py-2 px-4 rounded w-2/3 mt-3 mx-auto text-sm hover:bg-gray-900 disabled:opacity-50"
              >
                {addingSku === p.sku ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}






// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// const MAGENTO_BASE_URL = "https://www.mrciggy.com";

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryId, setCategoryId] = useState<number | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY ID ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         const findRecursive = (cats: Category[]): number | null => {
//           for (const c of cats) {
//             if (slugify(c.name) === slug) return c.id;
//             if (c.children_data) {
//               const found = findRecursive(c.children_data);
//               if (found) return found;
//             }
//           }
//           return null;
//         };

//         const id = findRecursive(data.children_data || []);

//         if (!id) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         setCategoryId(id);
//       } catch {
//         setError("Failed to load category");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (!categoryId) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch(`/api/fetchProducts?id=${categoryId}`);
//         if (!res.ok) throw new Error("Failed to fetch products");

//         const data = await res.json();

//         const items = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.items)
//           ? data.items
//           : [];

//         const mapped: Product[] = items.map((item: any) => {
//           const imageUrl = item.image
//             ? `${MAGENTO_BASE_URL}${item.image}`
//             : "/no-image.png"; // fallback image

//           // 🔹 Console log for debugging
//           console.log(
//             `%cProduct SKU: ${item.sku}`,
//             "color: blue; font-weight: bold;",
//             "Image URL:",
//             imageUrl
//           );

//           return {
//             id: item.id,
//             sku: item.sku,
//             title: item.name,
//             price: Number(item.price) || 0,
//             image: imageUrl,
//             type: item.type_id || "simple",
//             stock:
//               item.extension_attributes?.stock_item?.qty ??
//               item.extension_attributes?.quantity,
//           };
//         });

//         setProducts(mapped);
//       } catch (err) {
//         console.error("Fetch products error:", err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryId]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);

//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price > 0);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p, index) => (
//             <div
//               key={p.sku}
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 <Image
//                   src={p.image}
//                   alt={p.title}
//                   width={300}
//                   height={300}
//                   priority={index === 0}
//                   className="w-full h-40 object-contain"
//                   onError={(e) => {
//                     e.currentTarget.src = "/no-image.png";
//                   }}
//                   unoptimized={p.image === "/no-image.png"} // ✅ important fix for 400 error
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// /* ================= MAGENTO BASE URL ================= */
// const MAGENTO_BASE_URL = process.env.NEXT_PUBLIC_MAGENTO_URL || "";

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryId, setCategoryId] = useState<number | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY ID ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         const findRecursive = (cats: Category[]): number | null => {
//           for (const c of cats) {
//             if (slugify(c.name) === slug) return c.id;
//             if (c.children_data) {
//               const found = findRecursive(c.children_data);
//               if (found) return found;
//             }
//           }
//           return null;
//         };

//         const id = findRecursive(data.children_data || []);

//         if (!id) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         setCategoryId(id);
//       } catch {
//         setError("Failed to load category");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (!categoryId) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch(`/api/fetchProducts?id=${categoryId}`);
//         if (!res.ok) throw new Error("Failed to fetch products");

//         const data = await res.json();

//         const items = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.items)
//           ? data.items
//           : [];

//         const mapped: Product[] = items.map((item: any) => ({
//           id: item.id,
//           sku: item.sku,
//           title: item.name,
//           price: Number(item.price) || 0,
//           image:
//             item.image && item.image.trim() !== ""
//               ? `${MAGENTO_BASE_URL}/media/catalog/product${item.image}`
//               : "/no-image.png",
//           type: item.type_id || "simple",
//           stock:
//             item.extension_attributes?.stock_item?.qty ??
//             item.extension_attributes?.quantity,
//         }));

//         // ✅ Debug: log all products in terminal
//         console.log("Fetched products for categoryId:", categoryId);
//         mapped.forEach((p) =>
//           console.log(
//             `SKU: ${p.sku}, Title: ${p.title}, Price: ${p.price}, Image: ${p.image}`
//           )
//         );

//         setProducts(mapped);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryId]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);

//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price > 0); // hide free products

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p, index) => (
//             <div
//               key={p.sku}
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 <Image
//                   src={p.image}
//                   alt={p.title}
//                   width={300}
//                   height={300}
//                   priority={index === 0} // LCP optimization
//                   className="w-full h-40 object-contain"
//                   onError={(e) =>
//                     (e.currentTarget.src = "/no-image.png")
//                   } // fallback if Magento image broken
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

















































//yas code
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// const MAGENTO_BASE_URL = "https://staging.yourartsupplies.com";

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// /* ================= COLLECT ALL CHILD IDS ================= */
// const collectCategoryIds = (cat: Category): number[] => {
//   let ids = [cat.id];

//   if (cat.children_data?.length) {
//     cat.children_data.forEach((child) => {
//       ids = ids.concat(collectCategoryIds(child));
//     });
//   }

//   return ids;
// };

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryIds, setCategoryIds] = useState<number[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY IDS ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         console.log("📦 Loading categories...");
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         console.log("CATEGORY API RESPONSE:", data);

//         let matchedCategory: Category | null = null;

//         const findRecursive = (cats: Category[]) => {
//           for (const c of cats) {
//             console.log("CHECK:", slugify(c.name), "vs", slug);

//             if (slugify(c.name) === slug) {
//               matchedCategory = c;
//               return;
//             }
//             if (c.children_data?.length) {
//               findRecursive(c.children_data);
//             }
//           }
//         };

//         findRecursive(data.categories?.children_data || []);

//         if (!matchedCategory) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         const ids = collectCategoryIds(matchedCategory);
//         console.log("✅ ALL CATEGORY IDS:", ids);

//         setCategoryIds(ids);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load category");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS (ALL CATEGORY IDS) ================= */
//   useEffect(() => {
//     if (!categoryIds.length) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         let allItems: any[] = [];

//         for (const id of categoryIds) {
//           console.log("📦 Fetching products for category:", id);
//           const res = await fetch(`/api/fetchProducts?id=${id}`);
//           const data = await res.json();

//           if (data?.items?.length) {
//             allItems = allItems.concat(data.items);
//           }
//         }

//         console.log("📦 RAW PRODUCTS:", allItems);

//         const mapped: Product[] = allItems.map((item: any) => ({
//           id: item.id,
//           sku: item.sku,
//           title: item.name,
//           price: Number(item.price) || 0,
//           image: item.image
//             ? `${MAGENTO_BASE_URL}/media/catalog/product${item.image}`
//             : "/no-image.png",
//           type: item.type_id || "simple",
//           stock:
//             item.extension_attributes?.stock_item?.qty ??
//             item.extension_attributes?.quantity,
//         }));

//         setProducts(mapped);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryIds]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);
//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price > 0);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p, index) => (
//             <div
//               key={p.sku}
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 <Image
//                   src={p.image}
//                   alt={p.title}
//                   width={300}
//                   height={300}
//                   priority={index === 0}
//                   className="w-full h-40 object-contain"
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// const MAGENTO_BASE_URL = "https://staging.yourartsupplies.com";

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// /* ================= COLLECT ALL CHILD IDS ================= */
// const collectCategoryIds = (cat: Category): number[] => {
//   let ids = [cat.id];

//   if (cat.children_data?.length) {
//     cat.children_data.forEach((child) => {
//       ids = ids.concat(collectCategoryIds(child));
//     });
//   }

//   return ids;
// };

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryIds, setCategoryIds] = useState<number[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY IDS ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         console.log("📦 Fetching categories...");
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         console.log("✅ Categories fetched:", data);

//         let matchedCategory: Category | null = null;

//         const findRecursive = (cats: Category[]) => {
//           for (const c of cats) {
//             console.log("Checking category:", c.name, "slug:", slugify(c.name));
//             if (slugify(c.name) === slug) {
//               matchedCategory = c;
//               return;
//             }
//             if (c.children_data?.length) {
//               findRecursive(c.children_data);
//             }
//           }
//         };

//         findRecursive(data.categories?.children_data || []);

//         if (!matchedCategory) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         console.log("🔹 Matched category found:", matchedCategory.name);

//         const ids = collectCategoryIds(matchedCategory);
//         console.log("✅ All category IDs collected:", ids);

//         setCategoryIds(ids);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load category");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS (ALL CATEGORY IDS) ================= */
//   useEffect(() => {
//     if (!categoryIds.length) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         let allItems: any[] = [];

//         console.log("📦 Fetching products for category IDs:", categoryIds);

//         for (const id of categoryIds) {
//           console.log("Fetching products for category ID:", id);
//           const res = await fetch(`/api/fetchProducts?id=${id}`);
//           const data = await res.json();

//           console.log("Raw API response for category", id, ":", data);

//           // 🔹 Update this field based on API response
//           // Example: if API response has `products` field, use `data.products`
//           const items = data?.items || data?.products || [];
//           console.log("Products fetched for ID", id, ":", items);

//           if (items.length) {
//             allItems = allItems.concat(items);
//           }
//         }

//         console.log("📦 All raw products combined:", allItems);

//         const mapped: Product[] = allItems.map((item: any) => ({
//           id: item.id,
//           sku: item.sku,
//           title: item.name,
//           price: Number(item.price) || 0,
//           image: item.image
//             ? `${MAGENTO_BASE_URL}/media/catalog/product${item.image}`
//             : "/no-image.png",
//           type: item.type_id || "simple",
//           stock:
//             item.extension_attributes?.stock_item?.qty ??
//             item.extension_attributes?.quantity,
//         }));

//         console.log("✅ Mapped products:", mapped);

//         setProducts(mapped);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryIds]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);
//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price > 0);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p, index) => (
//             <div
//               key={p.sku}
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 <Image
//                   src={p.image}
//                   alt={p.title}
//                   width={300}
//                   height={300}
//                   priority={index === 0}
//                   className="w-full h-40 object-contain"
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// /* ================= COLLECT ALL CHILD IDS ================= */
// const collectCategoryIds = (cat: Category): number[] => {
//   let ids = [cat.id];
//   if (cat.children_data?.length) {
//     cat.children_data.forEach((child) => {
//       ids = ids.concat(collectCategoryIds(child));
//     });
//   }
//   return ids;
// };

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryIds, setCategoryIds] = useState<number[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY IDS ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         let matchedCategory: Category | null = null;

//         const findRecursive = (cats: Category[]) => {
//           for (const c of cats) {
//             if (slugify(c.name) === slug) {
//               matchedCategory = c;
//               return;
//             }
//             if (c.children_data?.length) {
//               findRecursive(c.children_data);
//             }
//           }
//         };

//         findRecursive(data.categories?.children_data || []);

//         if (!matchedCategory) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         const ids = collectCategoryIds(matchedCategory);
//         setCategoryIds(ids);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load category");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (!categoryIds.length) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         let allItems: Product[] = [];

//         for (const id of categoryIds) {
//           const res = await fetch(`/api/fetchProducts?id=${id}`);
//           const data = await res.json();

//           const items: any[] = data || [];
//           if (items.length) {
//             allItems = allItems.concat(items);
//           }
//         }

//         // 🔹 Remove duplicate SKUs
//         const uniqueProducts = allItems.filter(
//           (p, index, self) =>
//             index === self.findIndex((t) => t.sku === p.sku)
//         );

//         // 🔹 Map to frontend Product type
//         const mapped: Product[] = uniqueProducts.map((item: any) => ({
//           id: item.id,
//           sku: item.sku,
//           title: item.name,
//           price: Number(item.price) || 0,
//           image: item.image || "/no-image.png",
//           type: item.type_id || "simple",
//           stock:
//             item.extension_attributes?.stock_item?.qty ??
//             item.extension_attributes?.quantity,
//         }));

//         setProducts(mapped);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryIds]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);
//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price > 0);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p) => (
//             <div
//               key={`${p.sku}-${p.id}`} // ✅ Unique key
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 <img
//                   src={p.image.replace(/\/\//g, "/")} // double slash remove
//                   alt={p.title}
//                   width={300}
//                   height={300}
//                   className="w-full h-40 object-contain"
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// /* ================= COLLECT ALL CHILD IDS ================= */
// const collectCategoryIds = (cat: Category): number[] => {
//   let ids = [cat.id];
//   if (cat.children_data?.length) {
//     cat.children_data.forEach((child) => {
//       ids = ids.concat(collectCategoryIds(child));
//     });
//   }
//   return ids;
// };

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryIds, setCategoryIds] = useState<number[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY IDS ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         let matchedCategory: Category | null = null;

//         const findRecursive = (cats: Category[]) => {
//           for (const c of cats) {
//             if (slugify(c.name) === slug) {
//               matchedCategory = c;
//               return;
//             }
//             if (c.children_data?.length) {
//               findRecursive(c.children_data);
//             }
//           }
//         };

//         findRecursive(data.categories?.children_data || []);

//         if (!matchedCategory) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         setCategoryIds(collectCategoryIds(matchedCategory));
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load category");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (!categoryIds.length) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         let allItems: any[] = [];

//         for (const id of categoryIds) {
//           const res = await fetch(`/api/fetchProducts?id=${id}`);
//           const data = await res.json();
//           if (Array.isArray(data)) {
//             allItems = allItems.concat(data);
//           }
//         }

//         // 🔹 Remove duplicate SKUs
//         const uniqueProducts = allItems.filter(
//           (p, index, self) =>
//             index === self.findIndex((t) => t.sku === p.sku)
//         );

//         // 🔹 MAP PRODUCTS (🔥 IMAGE DOUBLE SLASH FIX HERE 🔥)
//         const mapped: Product[] = uniqueProducts.map((item: any) => {
//           let image = "/no-image.png";

//           if (item.image) {
//             const url = new URL(item.image);
//             image =
//               url.origin +
//               url.pathname.replace(/\/{2,}/g, "/");
//           }

//           return {
//             id: item.id,
//             sku: item.sku,
//             title: item.name,
//             price: Number(item.price) || 0,
//             image,
//             type: item.type_id || "simple",
//             stock:
//               item.extension_attributes?.stock_item?.qty ??
//               item.extension_attributes?.quantity,
//           };
//         });

//         setProducts(mapped);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryIds]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);
//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price > 0);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p) => (
//             <div
//               key={`${p.sku}-${p.id}`}
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 <img
//                   src={p.image}
//                   alt={p.title}
//                   width={300}
//                   height={300}
//                   className="w-full h-40 object-contain"
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// /* ================= COLLECT ALL CHILD IDS ================= */
// const collectCategoryIds = (cat: Category): number[] => {
//   let ids = [cat.id];
//   if (cat.children_data?.length) {
//     cat.children_data.forEach((child) => {
//       ids = ids.concat(collectCategoryIds(child));
//     });
//   }
//   return ids;
// };

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryIds, setCategoryIds] = useState<number[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY IDS ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         let matchedCategory: Category | null = null;

//         const findRecursive = (cats: Category[]) => {
//           for (const c of cats) {
//             if (slugify(c.name) === slug) {
//               matchedCategory = c;
//               return;
//             }
//             if (c.children_data?.length) {
//               findRecursive(c.children_data);
//             }
//           }
//         };

//         findRecursive(data.categories?.children_data || []);

//         if (!matchedCategory) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         setCategoryIds(collectCategoryIds(matchedCategory));
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load category");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (!categoryIds.length) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         let allItems: any[] = [];

//         for (const id of categoryIds) {
//           const res = await fetch(`/api/fetchProducts?id=${id}`);
//           const data = await res.json();
//           if (Array.isArray(data)) {
//             allItems = allItems.concat(data);
//           }
//         }

//         // 🔹 Remove duplicate SKUs
//         const uniqueProducts = allItems.filter(
//           (p, index, self) =>
//             index === self.findIndex((t) => t.sku === p.sku)
//         );

//         // 🔹 MAP PRODUCTS (🔥 IMAGE DOUBLE SLASH FIX HERE 🔥)
//         const mapped: Product[] = uniqueProducts.map((item: any) => {
//           let image = "/no-image.png";

//           if (item.image) {
//             const url = new URL(item.image);
//             image =
//               url.origin +
//               url.pathname.replace(/\/{2,}/g, "/");
//           }

//           return {
//             id: item.id,
//             sku: item.sku,
//             title: item.name,
//             price: Number(item.price) || 0,
//             image,
//             type: item.type_id || "simple",
//             stock:
//               item.extension_attributes?.stock_item?.qty ??
//               item.extension_attributes?.quantity,
//           };
//         });

//         setProducts(mapped);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryIds]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);
//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price > 0);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p) => (
//             <div
//               key={`${p.sku}-${p.id}`}
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 <img
//                   src={p.image}
//                   alt={p.title}
//                   width={300}
//                   height={300}
//                   className="w-full h-40 object-contain"
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// /* ================= COLLECT CATEGORY + CHILD IDS ================= */
// const collectCategoryIds = (cat: Category): number[] => {
//   let ids = [cat.id];
//   if (cat.children_data?.length) {
//     cat.children_data.forEach((child) => {
//       ids = ids.concat(collectCategoryIds(child));
//     });
//   }
//   return ids;
// };

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryIds, setCategoryIds] = useState<number[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         console.log("Raw categories data:");
//         console.dir(data, { depth: null });

//         let matched: Category | null = null;

//         const findRecursive = (cats: Category[]) => {
//           for (const c of cats) {
//             if (slugify(c.name) === slug) {
//               matched = c;
//               return;
//             }
//             if (c.children_data?.length) {
//               findRecursive(c.children_data);
//             }
//           }
//         };

//         findRecursive([data.categories]); // root category include

//         if (!matched) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         const ids = collectCategoryIds(matched);
//         setCategoryIds(ids);

//         console.log("Matched category:", matched);
//         console.log("All category IDs:", ids);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load categories");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (!categoryIds.length) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         let allItems: any[] = [];

//         for (const id of categoryIds) {
//           const res = await fetch(`/api/fetchProducts?id=${id}`);
//           const data = await res.json();

//           console.log(`Raw products for category ${id}:`, data);
//           console.dir(data, { depth: null });

//           if (Array.isArray(data)) allItems = allItems.concat(data);
//         }

//         // Remove duplicate SKUs
//         const uniqueProducts = allItems.filter(
//           (p, i, self) => i === self.findIndex((t) => t.sku === p.sku)
//         );

//         // Filter products belonging to current category IDs
//         const filtered = uniqueProducts.filter((item: any) => {
//           if (!item.category_links) return true; // Gift Card ya simple products
//           return item.category_links.some((c: any) =>
//             categoryIds.includes(+c.category_id)
//           );
//         });

//         // Map products with safe image handling
//         const cleanBaseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL?.replace(/\/$/, "") || "";

//         const mapped: Product[] = filtered.map((item: any) => {
//           let image = "/no-image.png";

//           if (item.image && typeof item.image === "string") {
//             try {
//               if (item.image.startsWith("http://") || item.image.startsWith("https://")) {
//                 const url = new URL(item.image);
//                 image = url.origin + url.pathname.replace(/\/{2,}/g, "/");
//               } else {
//                 const path = item.image.replace(/^\/+/, "");
//                 image = `${cleanBaseUrl}/media/catalog/product/${path}`;
//               }
//             } catch {
//               image = item.image || "/no-image.png";
//             }
//           } else if (item.media_gallery_entries?.[0]?.file) {
//             const file = item.media_gallery_entries[0].file.replace(/^\/+/, "");
//             image = `${cleanBaseUrl}/media/catalog/product/${file}`;
//           }

//           return {
//             id: item.id,
//             sku: item.sku,
//             title: item.name,
//             price: Number(item.price) || 0,
//             type: item.type_id || "simple",
//             image,
//             stock: item.extension_attributes?.stock_item?.qty ?? item.extension_attributes?.quantity,
//           };
//         });

//         setProducts(mapped);

//         console.log("Mapped products:", mapped);
//         console.dir(mapped, { depth: null });
//       } catch (err) {
//         console.error("Failed to load products:", err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryIds]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);
//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price >= 0); // zero-price included

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p) => (
//             <div
//               key={`${p.sku}-${p.id}`}
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 <img
//                   src={p.image}
//                   alt={p.title}
//                   className="w-full h-40 object-contain"
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Product = {
//   id: number;
//   sku: string;
//   title: string;
//   price: number;
//   image: string;
//   type: string;
//   stock?: number;
// };

// type Category = {
//   id: number;
//   name: string;
//   is_active: boolean;
//   children_data?: Category[];
// };

// /* ================= SLUG HELPER ================= */
// const slugify = (text: string) =>
//   text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");

// /* ================= COLLECT CATEGORY + CHILD IDS ================= */
// const collectCategoryIds = (cat: Category): number[] => {
//   let ids = [cat.id];
//   if (cat.children_data?.length) {
//     cat.children_data.forEach((child) => {
//       ids = ids.concat(collectCategoryIds(child));
//     });
//   }
//   return ids;
// };

// export default function CategoryPage() {
//   const params = useParams();
//   const slug = params?.id as string;

//   const { addToCart } = useCart();

//   const [categoryIds, setCategoryIds] = useState<number[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [addingSku, setAddingSku] = useState<string | null>(null);

//   /* ================= SLUG → CATEGORY ================= */
//   useEffect(() => {
//     if (!slug) return;

//     const loadCategories = async () => {
//       try {
//         const res = await fetch("/api/fetchCategories");
//         const data = await res.json();

//         console.log("Raw categories data:");
//         console.dir(data, { depth: null });

//         let matched: Category | null = null;

//         const findRecursive = (cats: Category[]) => {
//           for (const c of cats) {
//             if (slugify(c.name) === slug) {
//               matched = c;
//               return;
//             }
//             if (c.children_data?.length) {
//               findRecursive(c.children_data);
//             }
//           }
//         };

//         findRecursive([data.categories]); // root category include

//         if (!matched) {
//           setError("Category not found");
//           setLoading(false);
//           return;
//         }

//         const ids = collectCategoryIds(matched);
//         setCategoryIds(ids);

//         console.log("Matched category:", matched);
//         console.log("All category IDs:", ids);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load categories");
//         setLoading(false);
//       }
//     };

//     loadCategories();
//   }, [slug]);

//   /* ================= FETCH PRODUCTS ================= */
//   useEffect(() => {
//     if (!categoryIds.length) return;

//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         let allItems: any[] = [];

//         for (const id of categoryIds) {
//           const res = await fetch(`/api/fetchProducts?id=${id}`);
//           const data = await res.json();

//           console.log(`Raw products for category ${id}:`, data);
//           console.dir(data, { depth: null });

//           if (Array.isArray(data)) allItems = allItems.concat(data);
//         }

//         // Remove duplicate SKUs
//         const uniqueProducts = allItems.filter(
//           (p, i, self) => i === self.findIndex((t) => t.sku === p.sku)
//         );

//         // Filter products belonging to current category IDs
//         const filtered = uniqueProducts.filter((item: any) => {
//           if (!item.category_links) return true;
//           return item.category_links.some((c: any) =>
//             categoryIds.includes(+c.category_id)
//           );
//         });

//         // Safe image mapping with console logs
//         const cleanBaseUrl = (process.env.NEXT_PUBLIC_MAGENTO_URL || "").replace(/\/$/, "");

//         const mapped: Product[] = filtered.map((item: any) => {
//           let image = "/no-image.png";

//           const rawImage = item.image || item.media_gallery_entries?.[0]?.file;

//           if (rawImage && typeof rawImage === "string") {
//             try {
//               if (rawImage.startsWith("http://") || rawImage.startsWith("https://")) {
//                 const url = new URL(rawImage);
//                 image = url.origin + url.pathname.replace(/\/{2,}/g, "/"); // double slash fix
//               } else {
//                 const path = rawImage.replace(/^\/+/, ""); // remove leading slashes
//                 image = `${cleanBaseUrl}/media/catalog/product/${path}`;
//               }
//             } catch {
//               image = "/no-image.png";
//             }
//           }

//           // Console log for debugging broken images
//           console.log("Original image:", rawImage, "Mapped image:", image);

//           return {
//             id: item.id,
//             sku: item.sku,
//             title: item.name,
//             price: Number(item.price) || 0,
//             type: item.type_id || "simple",
//             image,
//             stock: item.extension_attributes?.stock_item?.qty ?? item.extension_attributes?.quantity,
//           };
//         });

//         setProducts(mapped);
//       } catch (err) {
//         console.error("Failed to load products:", err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryIds]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: Product) => {
//     if (product.type === "configurable") {
//       window.location.href = `/product?sku=${encodeURIComponent(product.sku)}`;
//       return;
//     }

//     try {
//       setAddingSku(product.sku);
//       await addToCart(
//         {
//           sku: product.sku,
//           title: product.title,
//           price: product.price,
//           image: product.image,
//           stock: product.stock ?? 999,
//         },
//         1
//       );
//     } catch {
//       alert("Failed to add product");
//     } finally {
//       setAddingSku(null);
//     }
//   };

//   /* ================= UI ================= */
//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;

//   const visibleProducts = products.filter((p) => p.price >= 0);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({visibleProducts.length})
//       </h1>

//       {visibleProducts.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {visibleProducts.map((p) => (
//             <div
//               key={`${p.sku}-${p.id}`}
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}>
//                 <img
//                   src={p.image}
//                   alt={p.title}
//                   className="w-full h-40 object-contain"
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
//                 >
//                   {addingSku === p.sku ? "Adding..." : "Add to Cart"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
