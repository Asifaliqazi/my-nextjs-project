// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useCart, type Product as CartProduct } from "@/context/CartContext";

// const BASE_URL = "https://test.flipflops.cc";

// type ProductDetail = CartProduct & {
//   description?: string;
//   stock: number;
// };

// export default function ProductDetailPage() {
//   const searchParams = useSearchParams();
//   const sku = searchParams.get("sku");
//   const editMode = searchParams.get("edit") === "true";

//   const {
//     cart,
//     addToCart,
//     updateCartItem,
//     refreshCart,
//     openDrawer, // 🔥 OPEN CART DRAWER
//   } = useCart();

//   const [product, setProduct] = useState<ProductDetail | null>(null);
//   const [qty, setQty] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [showUpdate, setShowUpdate] = useState(false);
//   const [message, setMessage] = useState<{
//     type: "error" | "success";
//     text: string;
//   } | null>(null);

//   const cartItem = product
//     ? cart.find((item) => item.sku === product.sku)
//     : null;

//   /* ================= FETCH PRODUCT ================= */
//   useEffect(() => {
//     if (!sku) return;

//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`/api/product?sku=${encodeURIComponent(sku)}`);
//         const data = await res.json();

//         const description =
//           data.custom_attributes?.find(
//             (a: any) => a.attribute_code === "description"
//           )?.value || "";

//         const image = data.media_gallery_entries?.[0]?.file
//           ? `${BASE_URL}/media/catalog/product${data.media_gallery_entries[0].file}`
//           : "/no-image.png";

//         const stock =
//           data.extension_attributes?.quantity ??
//           data.extension_attributes?.stock_item?.qty ??
//           0;

//         setProduct({
//           sku: data.sku,
//           title: data.name,
//           price: data.price,
//           image,
//           description,
//           stock,
//         });

//         if (editMode && cartItem) {
//           setQty(cartItem.qty);
//         }
//       } catch (err) {
//         console.error(err);
//         setMessage({ type: "error", text: "Failed to load product" });
//       }
//     };

//     fetchProduct();
//   }, [sku]);

//   /* ================= AUTO HIDE MESSAGE ================= */
//   useEffect(() => {
//     if (!message) return;

//     const timer = setTimeout(() => {
//       setMessage(null);
//     }, 5000); // 5 second

//     return () => clearTimeout(timer);
//   }, [message]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async () => {
//     if (!product) return;

//     if (qty > product.stock) {
//       setMessage({ type: "error", text: "Quantity is not available" });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const result = await addToCart(product, qty);

//       if (!result.success) {
//         setMessage({ type: "error", text: result.message || "Quantity is not available" });
//         return;
//       }

//       await refreshCart();

//       // ✅ OPEN CART DRAWER
//       openDrawer();

//       setMessage({ type: "success", text: "Product added successfully" });
//     } catch {
//       setMessage({ type: "error", text: "Quantity is not available" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UPDATE CART ================= */
//   const handleUpdate = async () => {
//     if (!cartItem || !product) return;

//     if (qty > product.stock) {
//       setMessage({ type: "error", text: "Quantity is not available" });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       await updateCartItem(cartItem.item_id, qty);

//       await refreshCart();

//       // ✅ UPDATE KE BAAD BHI DRAWER OPEN
//       openDrawer();

//       setMessage({ type: "success", text: "Product updated successfully" });
//       setShowUpdate(false);
//     } catch {
//       setMessage({ type: "error", text: "Quantity is not available" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!product) return <p className="p-4">Loading product...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       {/* MESSAGE */}
//       {message && (
//         <div
//           className={`mb-4 px-4 py-2 rounded border flex justify-between ${
//             message.type === "error"
//               ? "bg-red-100 border-red-400 text-red-700"
//               : "bg-green-100 border-green-400 text-green-700"
//           }`}
//         >
//           <span>{message.text}</span>
//           <button onClick={() => setMessage(null)}>✕</button>
//         </div>
//       )}

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* IMAGE */}
//         <img
//           src={product.image}
//           alt={product.title}
//           className="w-full md:w-1/2 h-80 object-contain"
//         />

//         {/* DETAILS */}
//         <div className="md:w-1/2">
//           <h1 className="text-2xl font-bold">{product.title}</h1>
//           <p className="text-xl font-semibold mt-2">₹{product.price}</p>

//           <p
//             className={`mt-2 ${
//               product.stock > 0 ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             Stock Available: {product.stock}
//           </p>

//           {product.description && (
//             <div
//               className="mt-4 text-sm"
//               dangerouslySetInnerHTML={{ __html: product.description }}
//             />
//           )}

//           {/* QTY */}
//           <div className="flex items-center gap-4 mt-6">
//             <button
//               className="px-3 py-1 border"
//               onClick={() => {
//                 setQty((q) => Math.max(1, q - 1));
//                 if (editMode) setShowUpdate(true);
//               }}
//             >
//               -
//             </button>

//             <span className="font-semibold">{qty}</span>

//             <button
//               className="px-3 py-1 border"
//               onClick={() => {
//                 setQty((q) => q + 1);
//                 if (editMode) setShowUpdate(true);
//               }}
//             >
//               +
//             </button>
//           </div>

//           {/* BUTTON */}
//           {editMode ? (
//             <button
//               onClick={handleUpdate}
//               disabled={!showUpdate || loading}
//               className={`mt-6 px-6 py-3 text-white rounded ${
//                 showUpdate ? "bg-black" : "bg-gray-400"
//               }`}
//             >
//               {loading ? "Updating..." : "Update"}
//             </button>
//           ) : (
//             <button
//               onClick={handleAddToCart}
//               disabled={loading}
//               className="mt-6 px-6 py-3 bg-black text-white rounded"
//             >
//               {loading ? "Adding..." : "Add to Cart"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"; // must be first line

import { Suspense } from "react";
import ProductClient from "./ProductClient";

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Loading product...</div>}>
      <ProductClient />
    </Suspense>
  );
}



