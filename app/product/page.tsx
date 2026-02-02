// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useCart, type Product as CartProduct } from "@/context/CartContext";

// const BASE_URL = "https://www.mrciggy.com";

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












// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useCart, type Product as CartProduct } from "@/context/CartContext";

// const BASE_URL = "https://www.mrciggy.com";

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
//     openDrawer,
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
//     if (!sku) {
//       console.log("No SKU found in search parameters.");
//       return;
//     }

//     const fetchProduct = async () => {
//       console.log("Fetching product with SKU:", sku);

//       try {
//         const res = await fetch(`/api/product?sku=${encodeURIComponent(sku)}`);
//         console.log("API Response Status:", res.status);

//         if (!res.ok) {
//           console.log("Error fetching product: ", res.statusText);
//           setMessage({ type: "error", text: "Failed to load product" });
//           return;
//         }

//         const data = await res.json();
//         console.log("Fetched product data:", data);

//         // 🔹 Handle nested API response (sometimes product is in data.items[0])
//         const fetchedProduct = data.items?.[0] || data;

//         const description =
//           fetchedProduct.custom_attributes?.find(
//             (a: any) => a.attribute_code === "description"
//           )?.value || "";

//         const stock =
//           fetchedProduct.extension_attributes?.stock_item?.qty ?? 0;

//         const image =
//           fetchedProduct.media_gallery_entries?.length
//             ? `${BASE_URL}/media/catalog/product${fetchedProduct.media_gallery_entries[0].file}`
//             : "/no-image.png";

//         const title = fetchedProduct.name || "No Title";

//         console.log("Mapped Product Correctly:", { title, stock, description, image });

//         setProduct({
//           sku: fetchedProduct.sku,
//           title,
//           price: fetchedProduct.price,
//           image,
//           description,
//           stock,
//         });

//         if (editMode && cartItem) {
//           console.log("Edit mode enabled. Cart item found:", cartItem);
//           setQty(cartItem.qty);
//         }
//       } catch (err) {
//         console.error("Error in fetchProduct:", err);
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
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [message]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async () => {
//     if (!product) {
//       console.log("No product found, can't add to cart.");
//       return;
//     }

//     console.log("Adding to cart with quantity:", qty);

//     if (qty > product.stock) {
//       console.log("Requested quantity exceeds stock.");
//       setMessage({ type: "error", text: "Quantity is not available" });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const result = await addToCart(product, qty);
//       console.log("Add to cart result:", result);

//       if (!result.success) {
//         setMessage({ type: "error", text: result.message || "Quantity is not available" });
//         return;
//       }

//       await refreshCart();
//       openDrawer();
//       setMessage({ type: "success", text: "Product added successfully" });
//     } catch (err) {
//       console.error("Error adding to cart:", err);
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
//       openDrawer();
//       setMessage({ type: "success", text: "Product updated successfully" });
//       setShowUpdate(false);
//     } catch (err) {
//       console.error("Error updating cart item:", err);
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




// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useCart, type Product as CartProduct } from "@/context/CartContext";

// const BASE_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;

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
//     openDrawer,
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
//     if (!sku) {
//       console.log("No SKU found in search parameters.");
//       return;
//     }

//     const fetchProduct = async () => {
//       console.log("Fetching product with SKU:", sku);

//       try {
//         const res = await fetch(`/api/product?sku=${encodeURIComponent(sku)}`);
//         console.log("API Response Status:", res.status);

//         if (!res.ok) {
//           console.log("Error fetching product: ", res.statusText);
//           setMessage({ type: "error", text: "Failed to load product" });
//           return;
//         }

//         const data = await res.json();
//         console.log("Fetched product data:", data);

//         // 🔹 Find the product in array by SKU
//         const fetchedProduct = Array.isArray(data)
//           ? data.find((p: any) => p.sku === sku)
//           : data;

//         if (!fetchedProduct) {
//           setMessage({ type: "error", text: "Product not found" });
//           return;
//         }

//         // 🔹 Map data
//         const title = fetchedProduct.name || "No Title";

//         const image =
//           fetchedProduct.media_gallery_entries?.[0]?.file
//             ? `${BASE_URL}/media/catalog/product${fetchedProduct.media_gallery_entries[0].file}`
//             : "/no-image.png";

//         const description =
//           fetchedProduct.custom_attributes?.find(
//             (a: any) => a.attribute_code === "description"
//           )?.value || "";

//         const stock = fetchedProduct.stock ?? 0; // Direct stock from backend

//         console.log("Mapped Product Correctly:", { title, stock, description, image });

//         setProduct({
//           sku: fetchedProduct.sku,
//           title,
//           price: fetchedProduct.price,
//           image,
//           description,
//           stock,
//         });

//         if (editMode && cartItem) {
//           console.log("Edit mode enabled. Cart item found:", cartItem);
//           setQty(cartItem.qty);
//         }
//       } catch (err) {
//         console.error("Error in fetchProduct:", err);
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
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [message]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async () => {
//     if (!product) return;
//        console.log("🟡 ADD TO CART CLICKED");
//        console.log("📦 Product:", product);
//        console.log("🔢 Qty:", qty);
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
//       openDrawer();
//       setMessage({ type: "success", text: "Product added successfully" });
//     } catch (err) {
//       console.error("Error adding to cart:", err);
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
//       openDrawer();
//       setMessage({ type: "success", text: "Product updated successfully" });
//       setShowUpdate(false);
//     } catch (err) {
//       console.error("Error updating cart item:", err);
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


// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useCart, type Product as CartProduct } from "@/context/CartContext";

// const BASE_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;

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
//     openDrawer,
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
//     if (!sku) {
//       console.log("No SKU found in search parameters.");
//       return;
//     }

//     const fetchProduct = async () => {
//       console.log("Fetching product with SKU:", sku);

//       try {
//         const res = await fetch(`/api/product?sku=${encodeURIComponent(sku)}`);
//         console.log("API Response Status:", res.status);

//         if (!res.ok) {
//           console.log("Error fetching product: ", res.statusText);
//           setMessage({ type: "error", text: "Failed to load product" });
//           return;
//         }

//         const data = await res.json();
//         console.log("Fetched product data:", data);

//         const fetchedProduct = Array.isArray(data)
//           ? data.find((p: any) => p.sku === sku)
//           : data;

//         if (!fetchedProduct) {
//           setMessage({ type: "error", text: "Product not found" });
//           return;
//         }

//         // Map data
//         const title = fetchedProduct.name || "No Title";

//         const image =
//           fetchedProduct.media_gallery_entries?.[0]?.file
//             ? `${BASE_URL}/media/catalog/product${fetchedProduct.media_gallery_entries[0].file}`
//             : "/no-image.png";

//         const description =
//           fetchedProduct.custom_attributes?.find(
//             (a: any) => a.attribute_code === "description"
//           )?.value || "";

//         const stock = fetchedProduct.stock ?? 0;

//         console.log("Mapped Product Correctly:", { title, stock, description, image });

//         setProduct({
//           sku: fetchedProduct.sku,
//           title,
//           price: fetchedProduct.price,
//           image,
//           description,
//           stock,
//         });

//         if (editMode && cartItem) {
//           console.log("Edit mode enabled. Cart item found:", cartItem);
//           setQty(cartItem.qty);
//         }
//       } catch (err) {
//         console.error("Error in fetchProduct:", err);
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
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [message]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async () => {
//     if (!product) return;

//     console.log("🟡 ADD TO CART CLICKED");

//     // Log current product details
//     console.log("📦 Product object:", product);

//     // Log quantity selected
//     console.log("🔢 Quantity selected:", qty);

//     // Log cart info to see quote_id (cart session)
//     console.log("🛒 Current Cart:", cart);
//     const quoteId = (cart as any)?.quote_id || "No quote_id found";
//     console.log("🆔 Quote ID:", quoteId);

//     if (qty > product.stock) {
//       setMessage({ type: "error", text: "Quantity is not available" });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const result = await addToCart(product, qty);
//       console.log("✅ Add to Cart Result:", result);

//       if (!result.success) {
//         setMessage({ type: "error", text: result.message || "Quantity is not available" });
//         return;
//       }

//       await refreshCart();
//       openDrawer();
//       setMessage({ type: "success", text: "Product added successfully" });
//     } catch (err) {
//       console.error("Error adding to cart:", err);
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
//       openDrawer();
//       setMessage({ type: "success", text: "Product updated successfully" });
//       setShowUpdate(false);
//     } catch (err) {
//       console.error("Error updating cart item:", err);
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

import { Suspense } from "react";
import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";

export default function ProductPage() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Page</h1>

      <Suspense fallback={<p>Loading product...</p>}>
        <ProductClient />
      </Suspense>
    </div>
  );
}





// "use client";
// export const dynamic = "force-dynamic"; // ✅ forces Next.js to treat this as dynamic page

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { useCart, type Product as CartProduct } from "@/context/CartContext";

// const BASE_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;

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
//     cartId,
//     addToCart,
//     updateCartItem,
//     refreshCart,
//     openDrawer,
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
//     if (!sku) {
//       console.log("No SKU found in search parameters.");
//       return;
//     }

//     const fetchProduct = async () => {
//       console.log("Fetching product with SKU:", sku);

//       try {
//         const res = await fetch(`/api/product?sku=${encodeURIComponent(sku)}`);
//         console.log("API Response Status:", res.status);

//         if (!res.ok) {
//           console.log("Error fetching product: ", res.statusText);
//           setMessage({ type: "error", text: "Failed to load product" });
//           return;
//         }

//         const data = await res.json();
//         console.log("Fetched product data:", data);

//         const fetchedProduct = Array.isArray(data)
//           ? data.find((p: any) => p.sku === sku)
//           : data;

//         if (!fetchedProduct) {
//           setMessage({ type: "error", text: "Product not found" });
//           return;
//         }

//         // Map data
//         const title = fetchedProduct.name || "No Title";

//         const image =
//           fetchedProduct.media_gallery_entries?.[0]?.file
//             ? `${BASE_URL}/media/catalog/product${fetchedProduct.media_gallery_entries[0].file}`
//             : "/no-image.png";

//         const description =
//           fetchedProduct.custom_attributes?.find(
//             (a: any) => a.attribute_code === "description"
//           )?.value || "";

//         const stock =
//           fetchedProduct.extension_attributes?.stock_item?.qty ??
//           fetchedProduct.stock ??
//           0;

//         console.log("Mapped Product Correctly:", { title, stock, description, image });

//         setProduct({
//           sku: fetchedProduct.sku,
//           title,
//           price: fetchedProduct.price,
//           image,
//           description,
//           stock,
//         });

//         if (editMode && cartItem) {
//           console.log("Edit mode enabled. Cart item found:", cartItem);
//           setQty(cartItem.qty);
//         }
//       } catch (err) {
//         console.error("Error in fetchProduct:", err);
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
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [message]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async () => {
//     if (!product) return;

//     console.log("🟡 ADD TO CART CLICKED");
//     console.log("📦 Product object:", product);
//     console.log("🔢 Quantity selected:", qty);

//     if (!cartId) {
//       console.log("⚠️ Guest cart not initialized yet. Initializing...");
//     }
//     console.log("🆔 Current Quote ID (cartId):", cartId || "Not initialized");

//     if (qty > product.stock) {
//       setMessage({ type: "error", text: "Quantity is not available" });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const result = await addToCart(product, qty);
//       console.log("📥 Add to Cart response:", result);

//       if (!result.success) {
//         setMessage({
//           type: "error",
//           text: result.message || "Magento rejected add to cart",
//         });
//         return;
//       }

//       await refreshCart();
//       openDrawer();
//       setMessage({ type: "success", text: "Product added successfully" });
//     } catch (err) {
//       console.error("Error adding to cart:", err);
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
//       openDrawer();
//       setMessage({ type: "success", text: "Product updated successfully" });
//       setShowUpdate(false);
//     } catch (err) {
//       console.error("Error updating cart item:", err);
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




// import ProductClient from "./ProductClient";
// import { Suspense } from "react";

// export default function ProductPage() {
//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Product Page</h1>

//       {/* Wrap client component in Suspense */}
//       <Suspense fallback={<p>Loading product...</p>}>
//         <ProductClient />
//       </Suspense>
//     </div>
//   );
// }




