// "use client";
// import { useCart, type Product } from "@/context/CartContext";

// export default function AddToCart({ product }: { product: Product }) {
//   const { addToCart } = useCart();

//   return (
//     <button onClick={() => addToCart(product)}>
//       Add to Cart
//     </button>
//   );
// }



// "use client";

// import { useState } from "react";
// import { useCart, type Product } from "@/context/CartContext";

// export default function AddToCart({ product }: { product: Product }) {
//   const { cartId, addToCart } = useCart(); // cartId context se
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const MAGENTO_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const handleAdd = async () => {
//     if (!cartId) return alert("Cart not initialized!");

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch(`${MAGENTO_URL}/rest/V1/guest-carts/${cartId}/items`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartItem: {
//             quote_id: cartId,
//             sku: product.sku,
//             qty: 1,
//           },
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to add to cart");
//       }

//       // Context me local add
//       addToCart(product);
//     } catch (err: any) {
//       console.error("Add to cart error:", err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleAdd}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {loading ? "Adding..." : "Add to Cart"}
//       </button>

//       {error && <p className="text-red-600 mt-1">{error}</p>}
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useCart, type Product } from "@/context/CartContext";

// export default function AddToCart({ product }: { product: Product }) {
//   const { cartId, addToCart } = useCart(); // Cart context se cartId
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleAdd = async () => {
//     if (!cartId) {
//       alert("Cart not initialized! Please visit checkout first.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // ✅ Add product to Magento guest cart via API
//       const res = await fetch("/api/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId,
//           sku: product.sku,
//           qty: 1,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Failed to add to cart");

//       // ✅ Also add to frontend cart context
//       addToCart(product);
//     } catch (err: any) {
//       console.error("❌ Add to cart error:", err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleAdd}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {loading ? "Adding..." : "Add to Cart"}
//       </button>
//       {error && <p className="text-red-600 mt-1">{error}</p>}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useCart, type Product } from "@/context/CartContext";

// export default function AddToCart({ product }: { product: Product }) {
//   const { cartId, addToCart } = useCart(); // Cart context se cartId
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleAdd = async () => {
//     console.log("🟢 Button clicked!", { cartId, product }); // 🔹 Browser console

//     if (!cartId) {
//       alert("Cart not initialized! Please visit checkout first.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//    const cleanCartId = cartId.replace(/"/g, ""); // ✅ remove extra quotes

//     try {
//       // 🔹 Call Next.js API route
//       const res = await fetch("/api/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: cleanCartId,  // 
//           sku: product.sku,
//           qty: 1,
//         }),
//       });

//       const data = await res.json();
//       console.log("🟢 API response:", data); // 🔹 Browser console

//       if (!res.ok) throw new Error(data.message || "Failed to add to cart");

//       // 🔹 Also update frontend cart context
//       addToCart(product);
//       console.log("🛒 Added to frontend cart:", product);
//     } catch (err: any) {
//       console.error("❌ Add to cart error:", err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={handleAdd}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {loading ? "Adding..." : "Add to Cart"}
//       </button>
//       {error && <p className="text-red-600 mt-1">{error}</p>}
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useCart, type Product } from "@/context/CartContext";

export default function AddToCart({ product }: { product: Product }) {
  const { cartId, refreshCart } = useCart(); // ✅ correct
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!cartId) {
      alert("Cart not initialized!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("🟡 Adding to cart:", {
        cartId,
        sku: product.sku,
      });

      const res = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,              // ✅ cartId already clean
          sku: product.sku,    // ✅ EXACT MAGENTO SKU
          qty: 1,
        }),
      });

      const data = await res.json();
      console.log("🟢 Magento add-to-cart response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to add to cart");
      }

      // 🔥 MOST IMPORTANT LINE
      await refreshCart();

      console.log("🛒 Cart synced with Magento");
    } catch (err: any) {
      console.error("❌ Add to cart error:", err.message);
      setError(err.message || "Add to cart failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>

      {error && <p className="text-red-600 mt-1">{error}</p>}
    </div>
  );
}
