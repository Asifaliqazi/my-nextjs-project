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

// const MAGENTO_BASE_URL = "https://test.flipflops.cc";

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
//         if (!res.ok) throw new Error();

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
//             item.extension_attributes?.quantity ,
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

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">
//         Products ({products.length})
//       </h1>
      
//       {products.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {products.map((p, index) => (
            
//             <div
//               key={p.sku}
              
//               className="border rounded p-3 flex flex-col hover:shadow"
//             >
//               <Link href={`/product?sku=${encodeURIComponent(p.sku)}`}
//               onClick={() => console.log("Clicked product:", p)}
//               >
//                 <Image
//                   src={p.image}
//                   alt={p.title}
//                   width={300}
//                   height={300}
//                   priority={index === 0}   // ✅ LCP FIX
//                   className="w-full h-40 object-contain"
//                 />
//                 <h3 className="text-sm mt-2 truncate">{p.title}</h3>
//               </Link>

//               <div className="mt-auto flex flex-col items-center">
//                 <p className="font-semibold">₹{p.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(p)}
                  
//                   disabled={addingSku === p.sku}
//                   className="bg-black text-white py-2 px-4 rounded w- mt-2 disabled:opacity-50"
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
  image: string;
  type: string;
  stock?: number;
};

type Category = {
  id: number;
  name: string;
  is_active: boolean;
  children_data?: Category[];
};

const MAGENTO_BASE_URL = "https://test.flipflops.cc";

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

        const mapped: Product[] = items.map((item: any) => ({
          
          id: item.id,
          sku: item.sku,
          title: item.name,
          price: Number(item.price) || 0,
          image: item.image
            ? `${MAGENTO_BASE_URL}/media/catalog/product${item.image}`
            : "/no-image.png",
          type: item.type_id || "simple",
          stock:
            item.extension_attributes?.stock_item?.qty ??
            item.extension_attributes?.quantity,
        }));
        
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
          image: product.image,
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
  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const visibleProducts = products.filter((p) => p.price > 0); // ✅ price 0 hide

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Products ({visibleProducts.length})
      </h1>

      {visibleProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {visibleProducts.map((p, index) => (
            <div
              key={p.sku}
              className="border rounded p-3 flex flex-col hover:shadow"
            >
              <Link
                href={`/product?sku=${encodeURIComponent(p.sku)}`}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  width={300}
                  height={300}
                  priority={index === 0} // ✅ LCP
                  className="w-full h-40 object-contain"
                />
                <h3 className="text-sm mt-2 truncate">{p.title}</h3>
              </Link>

              <div className="mt-auto flex flex-col items-center">
                <p className="font-semibold">₹{p.price}</p>
                <button
                  onClick={() => handleAddToCart(p)}
                  disabled={addingSku === p.sku}
                  className="bg-black text-white py-2 px-4 rounded w-1/2 mt-2 disabled:opacity-50"
                >
                  {addingSku === p.sku ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


