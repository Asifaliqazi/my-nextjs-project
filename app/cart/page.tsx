// "use client";

// import React from "react";
// import { useCart } from "@/context/CartContext";

// export default function CartPage() {
//   const { cart, updateCartItem, removeFromCart, clearCart } = useCart();

//   const total = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">My Cart</h1>

//       {cart.length === 0 ? (
//         <p className="text-gray-500">Your cart is empty</p>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div
//               key={item.sku}
//               className="flex items-center gap-4 border p-4 rounded mb-3"
//             >
//               <div className="flex-1">
//                 <p className="font-semibold">{item.title}</p>
//                 <p className="text-sm text-gray-500">SKU: {item.sku}</p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   className="px-2 py-1 bg-gray-200 rounded"
//                   onClick={() =>
//                     updateCartItem(item.sku, item.qty - 1)
//                   }
//                 >
//                   -
//                 </button>
//                 <span>{item.qty}</span>
//                 <button
//                   className="px-2 py-1 bg-gray-200 rounded"
//                   onClick={() =>
//                     updateCartItem(item.sku, item.qty + 1)
//                   }
//                 >
//                   +
//                 </button>
//               </div>

//               <div className="text-right">
//                 <p className="font-semibold">
//                   ₹{(item.price * item.qty).toFixed(2)}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Price: ₹{item.price.toFixed(2)} each
//                 </p>
//                 <button
//                   className="text-red-500 text-sm mt-1"
//                   onClick={() => removeFromCart(item.sku)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="mt-6 flex justify-between border-t pt-4">
//             <p className="text-lg font-bold">Total</p>
//             <p className="text-lg font-bold">
//               ₹{total.toFixed(2)}
//             </p>
//           </div>

//           <button className="mt-6 w-full bg-green-600 text-white py-3 rounded">
//             Proceed to Checkout
//           </button>

//           <button
//             className="mt-2 w-full bg-red-600 text-white py-2 rounded"
//             onClick={clearCart}
//           >
//             Clear Cart
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

//full working code 
// "use client";

// import { useCart } from "@/context/CartContext";
// import { Trash2, Pencil } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CartPage() {
//   const { cart, updateCartItem, removeFromCart } = useCart();
//   const router = useRouter();

//   const [qtyMap, setQtyMap] = useState<Record<number, number>>({});

//   const handleQtyChange = (item_id: number, qty: number) => {
//     setQtyMap((prev) => ({ ...prev, [item_id]: qty }));
//   };

//   const handleUpdateCart = async () => {
//     for (const item of cart) {
//       const newQty = qtyMap[item.item_id];
//       if (newQty && newQty !== item.qty) {
//         await updateCartItem(item.item_id, newQty);
//       }
//     }
//     setQtyMap({});
//   };

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   if (cart.length === 0) {
//     return (
//       <div className="max-w-5xl mx-auto p-8">
//         <h1 className="text-2xl font-semibold mb-4">
//           Shopping Cart
//         </h1>
//         <p>Your cart is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       <h1 className="text-2xl font-semibold mb-6">
//         Shopping Cart
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT: CART ITEMS */}
//         <div className="lg:col-span-2">
//           <div className="grid grid-cols-5 font-semibold text-sm border-b pb-2 mb-4">
//             <span className="col-span-2">Item</span>
//             <span>Price</span>
//             <span>Qty</span>
//             <span>Subtotal</span>
//           </div>

//           {cart.map((item) => {
//             const qty =
//               qtyMap[item.item_id] ?? item.qty;

//             return (
//               <div
//                 key={item.item_id}
//                 className="grid grid-cols-5 items-center border-b py-4"
//               >
//                 {/* Item Info */}
//                 <div className="col-span-2">
//                   <p className="font-semibold">
//                     {item.title}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     SKU: {item.sku}
//                   </p>
//                 </div>

//                 {/* Price */}
//                 <div>₹{item.price.toFixed(2)}</div>

//                 {/* Qty */}
//                 <div>
//                   <input
//                     type="number"
//                     min={1}
//                     value={qty}
//                     onChange={(e) =>
//                       handleQtyChange(
//                         item.item_id,
//                         Math.max(
//                           1,
//                           parseInt(e.target.value) || 1
//                         )
//                       )
//                     }
//                     className="w-16 border px-2 py-1"
//                   />
//                 </div>

//                 {/* Subtotal + Actions */}
//                 <div className="flex justify-between items-center">
//                   <span>
//                     ₹{(item.price * qty).toFixed(2)}
//                   </span>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() =>
//                         removeFromCart(item.item_id)
//                       }
//                       className="text-red-500"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                     <button
//                           onClick={() => {
//                             router.push(
//                               `/product?sku=${encodeURIComponent(item.sku)}&edit=true`
//                             );
//                           }}
//                         >
//                           <Pencil size={16} />
//                         </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           <button
//             onClick={handleUpdateCart}
//             className="mt-6 border px-6 py-2 rounded hover:bg-gray-100"
//           >
//             Update Shopping Cart
//           </button>
//         </div>

//         {/* RIGHT: SUMMARY */}
//         <div className="border p-6 h-fit">
//           <h2 className="text-lg font-semibold mb-4">
//             Summary
//           </h2>

//           <div className="flex justify-between mb-2">
//             <span>Subtotal</span>
//             <span>₹{subtotal.toFixed(2)}</span>
//           </div>

//           <div className="border-t mt-4 pt-4 flex justify-between font-bold">
//             <span>Grand Total</span>
//             <span>₹{subtotal.toFixed(2)}</span>
//           </div>

//           <button
//             onClick={() => router.push("/checkout")}
//             className="w-full mt-6 bg-black text-white py-3 rounded"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useCart } from "@/context/CartContext";
// import { Trash2, Pencil } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CartPage() {
//   const { cart, updateCartItem, removeFromCart } = useCart();
//   const router = useRouter();

//   const [qtyMap, setQtyMap] = useState<Record<number, number>>({});

//   const handleQtyChange = (item_id: number, qty: number) => {
//     setQtyMap((prev) => ({ ...prev, [item_id]: qty }));
//   };

//   const handleUpdateCart = async () => {
//     for (const item of cart) {
//       const newQty = qtyMap[item.item_id];
//       if (newQty && newQty !== item.qty) {
//         await updateCartItem(item.item_id, newQty);
//       }
//     }
//     setQtyMap({});
//   };

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   const TAX_RATE = 0.18;
//   const taxAmount = subtotal * TAX_RATE;
//   const grandTotal = subtotal + taxAmount;

//   if (cart.length === 0) {
//     return (
//       <div className="max-w-5xl mx-auto p-8">
//         <h1 className="text-2xl font-semibold mb-4">
//           Shopping Cart
//         </h1>
//         <p>Your cart is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       <h1 className="text-2xl font-semibold mb-6">
//         Shopping Cart
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT: CART ITEMS */}
//         <div className="lg:col-span-2">
//           <div className="grid grid-cols-5 font-semibold text-sm border-b pb-2 mb-4">
//             <span className="col-span-2">Item</span>
//             <span>Price</span>
//             <span>Qty</span>
//             <span>Subtotal</span>
//           </div>

//           {cart.map((item) => {
//             const qty = qtyMap[item.item_id] ?? item.qty;

//             return (
//               <div
//                 key={item.item_id}
//                 className="grid grid-cols-5 items-center border-b py-4"
//               >
//                 {/* Item Info */}
//                 <div className="col-span-2">
//                   <p className="font-semibold">
//                     {item.title}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     SKU: {item.sku}
//                   </p>
//                 </div>

//                 {/* Price */}
//                 <div>
//                   ₹{item.price.toFixed(2)}
//                 </div>

//                 {/* Qty */}
//                 <div>
//                   <input
//                     type="number"
//                     min={1}
//                     value={qty}
//                     onChange={(e) =>
//                       handleQtyChange(
//                         item.item_id,
//                         Math.max(
//                           1,
//                           parseInt(e.target.value) || 1
//                         )
//                       )
//                     }
//                     className="w-16 border px-2 py-1"
//                   />
//                 </div>

//                 {/* Subtotal + Actions */}
//                 <div className="flex justify-between items-center">
//                   <span>
//                     ₹{(item.price * qty).toFixed(2)}
//                   </span>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() =>
//                         removeFromCart(item.item_id)
//                       }
//                       className="text-red-500"
//                     >
//                       <Trash2 size={16} />
//                     </button>

//                     <button
//                       onClick={() =>
//                         router.push(
//                           `/product?sku=${encodeURIComponent(
//                             item.sku
//                           )}&edit=true`
//                         )
//                       }
//                     >
//                       <Pencil size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           <button
//             onClick={handleUpdateCart}
//             className="mt-6 bg-black text-white px-6 py-2 rounded"
//           >
//             Update Shopping Cart
//           </button>
//         </div>

//         {/* RIGHT: ORDER SUMMARY */}
//         <div className="border p-6 h-fit bg-gray-50">
//           <h2 className="text-lg font-semibold mb-4">
//             Order Summary
//           </h2>

//           {/* Products */}
//           <div className="space-y-3 text-sm">
//             {cart.map((item) => {
//               const qty = qtyMap[item.item_id] ?? item.qty;

//               return (
//                 <div
//                   key={item.item_id}
//                   className="flex justify-between"
//                 >
//                   <div>
//                     <p className="font-medium">
//                       {item.title}
//                     </p>
//                     <p className="text-gray-500">
//                       Qty: {qty}
//                     </p>
//                   </div>

//                   <div className="font-semibold">
//                     ₹{(item.price * qty).toFixed(2)}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <hr className="my-4" />

//           {/* Totals */}
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>
//                 ₹{subtotal.toFixed(2)}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span>Tax (18%)</span>
//               <span>
//                 ₹{taxAmount.toFixed(2)}
//               </span>
//             </div>

//             <div className="flex justify-between font-bold text-base border-t pt-3 mt-3">
//               <span>Grand Total</span>
//               <span>
//                 ₹{grandTotal.toFixed(2)}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={() => router.push("/checkout")}
//             className="w-full mt-6 bg-black text-white py-3 rounded"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useCart } from "@/context/CartContext";
// import { Trash2, Pencil } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CartPage() {
//   const { cart, updateCartItem, removeFromCart } = useCart();
//   const router = useRouter();

//   const [qtyMap, setQtyMap] = useState<Record<number, number>>({});
//   const [updating, setUpdating] = useState(false); // 🔥 NEW

//   const handleQtyChange = (item_id: number, qty: number) => {
//     setQtyMap((prev) => ({ ...prev, [item_id]: qty }));
//   };

//   const handleUpdateCart = async () => {
//     if (updating) return;

//     setUpdating(true);

//     try {
//       for (const item of cart) {
//         const newQty = qtyMap[item.item_id];
//         if (newQty && newQty !== item.qty) {
//           await updateCartItem(item.item_id, newQty);
//         }
//       }
//       setQtyMap({});
//     } catch (err: any) {
//       alert(err.message || "Quantity is not available");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   const TAX_RATE = 0.18;
//   const taxAmount = subtotal * TAX_RATE;
//   const grandTotal = subtotal + taxAmount;

//   if (cart.length === 0) {
//     return (
//       <div className="max-w-5xl mx-auto p-8">
//         <h1 className="text-2xl font-semibold mb-4">
//           Shopping Cart
//         </h1>
//         <p>Your cart is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       <h1 className="text-2xl font-semibold mb-6">
//         Shopping Cart
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT: CART ITEMS */}
//         <div className="lg:col-span-2">
//           <div className="grid grid-cols-5 font-semibold text-sm border-b pb-2 mb-4">
//             <span className="col-span-2">Item</span>
//             <span>Price</span>
//             <span>Qty</span>
//             <span>Subtotal</span>
//           </div>

//           {cart.map((item) => {
//             const qty = qtyMap[item.item_id] ?? item.qty;

//             return (
//               <div
//                 key={item.item_id}
//                 className="grid grid-cols-5 items-center border-b py-4"
//               >
//                 {/* Item Info */}
//                 <div className="col-span-2">
//                   <p className="font-semibold">
//                     {item.title}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     SKU: {item.sku}
//                   </p>
//                 </div>

//                 {/* Price */}
//                 <div>
//                   ₹{item.price.toFixed(2)}
//                 </div>

//                 {/* Qty */}
//                 <div>
//                   <input
//                     type="number"
//                     min={1}
//                     value={qty}
//                     disabled={updating}
//                     onChange={(e) =>
//                       handleQtyChange(
//                         item.item_id,
//                         Math.max(
//                           1,
//                           parseInt(e.target.value) || 1
//                         )
//                       )
//                     }
//                     className="w-16 border px-2 py-1"
//                   />
//                 </div>

//                 {/* Subtotal + Actions */}
//                 <div className="flex justify-between items-center">
//                   <span>
//                     ₹{(item.price * qty).toFixed(2)}
//                   </span>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() =>
//                         removeFromCart(item.item_id)
//                       }
//                       disabled={updating}
//                       className="text-red-500 disabled:opacity-40"
//                     >
//                       <Trash2 size={16} />
//                     </button>

//                     <button
//                       disabled={updating}
//                       onClick={() =>
//                         router.push(
//                           `/product?sku=${encodeURIComponent(
//                             item.sku
//                           )}&edit=true`
//                         )
//                       }
//                       className="disabled:opacity-40"
//                     >
//                       <Pencil size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {/* 🔥 UPDATE BUTTON */}
//           <button
//             onClick={handleUpdateCart}
//             disabled={updating}
//             className={`mt-6 px-6 py-2 rounded text-white
//               ${
//                 updating
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-black"
//               }
//             `}
//           >
//             {updating ? "Updating..." : "Update Produt"}
//           </button>
//         </div>

//         {/* RIGHT: ORDER SUMMARY */}
//         <div className="border p-6 h-fit bg-gray-50">
//           <h2 className="text-lg font-semibold mb-4">
//             Order Summary
//           </h2>

//           {/* Products */}
//           <div className="space-y-3 text-sm">
//             {cart.map((item) => {
//               const qty = qtyMap[item.item_id] ?? item.qty;

//               return (
//                 <div
//                   key={item.item_id}
//                   className="flex justify-between"
//                 >
//                   <div>
//                     <p className="font-medium">
//                       {item.title}
//                     </p>
//                     <p className="text-gray-500">
//                       Qty: {qty}
//                     </p>
//                   </div>

//                   <div className="font-semibold">
//                     ₹{(item.price * qty).toFixed(2)}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <hr className="my-4" />

//           {/* Totals */}
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>
//                 ₹{subtotal.toFixed(2)}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span>Tax (18%)</span>
//               <span>
//                 ₹{taxAmount.toFixed(2)}
//               </span>
//             </div>

//             <div className="flex justify-between font-bold text-base border-t pt-3 mt-3">
//               <span>Grand Total</span>
//               <span>
//                 ₹{grandTotal.toFixed(2)}
//               </span>
//             </div>
//           </div>

//           <button
//             disabled={updating}
//             onClick={() => router.push("/checkout")}
//             className="w-full mt-6 bg-black text-white py-3 rounded disabled:opacity-40"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useCart } from "@/context/CartContext";
// import { Trash2, Pencil, X } from "lucide-react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CartPage() {
//   const { cart, updateCartItem, removeFromCart } = useCart();
//   const router = useRouter();

//   const [qtyMap, setQtyMap] = useState<Record<number, number>>({});
//   const [updating, setUpdating] = useState(false);

//   // 🔴 ERROR MESSAGE STATE
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const showError = (msg: string) => {
//     setErrorMsg(msg);

//     // ⏱ auto hide after 5 seconds
//     setTimeout(() => {
//       setErrorMsg(null);
//     }, 5000);
//   };

//   const handleQtyChange = (item_id: number, qty: number) => {
//     setQtyMap((prev) => ({ ...prev, [item_id]: qty }));
//   };

//   const handleUpdateCart = async () => {
//     if (updating) return;

//     setUpdating(true);

//     try {
//       for (const item of cart) {
//         const newQty = qtyMap[item.item_id];
//         if (newQty && newQty !== item.qty) {
//           await updateCartItem(item.item_id, newQty);
//         }
//       }
//       setQtyMap({});
//     } catch {
//       // ❌ ALERT REMOVED
//       // ✅ UI MESSAGE
//       showError("Quantity is not available");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   const TAX_RATE = 0.18;
//   const taxAmount = subtotal * TAX_RATE;
//   const grandTotal = subtotal + taxAmount;

//   if (cart.length === 0) {
//     return (
//       <div className="max-w-5xl mx-auto p-8">
//         <h1 className="text-2xl font-semibold mb-4">
//           Shopping Cart
//         </h1>
//         <p>Your cart is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-8">
//       {/* 🔴 TOP ERROR MESSAGE */}
//       {errorMsg && (
//         <div className="mb-6 flex items-center justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <span>{errorMsg}</span>
//           <button onClick={() => setErrorMsg(null)}>
//             <X size={18} />
//           </button>
//         </div>
//       )}

//       <h1 className="text-2xl font-semibold mb-6">
//         Shopping Cart
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT: CART ITEMS */}
//         <div className="lg:col-span-2">
//           <div className="grid grid-cols-5 font-semibold text-sm border-b pb-2 mb-4">
//             <span className="col-span-2">Item</span>
//             <span>Price</span>
//             <span>Qty</span>
//             <span>Subtotal</span>
//           </div>

//           {cart.map((item) => {
//             const qty = qtyMap[item.item_id] ?? item.qty;

//             return (
//               <div
//                 key={item.item_id}
//                 className="grid grid-cols-5 items-center border-b py-4"
//               >
//                 <div className="col-span-2">
//                   <p className="font-semibold">{item.title}</p>
//                   <p className="text-sm text-gray-600">
//                     SKU: {item.sku}
//                   </p>
//                 </div>

//                 <div>₹{item.price.toFixed(2)}</div>

//                 <div>
//                   <input
//                     type="number"
//                     min={1}
//                     value={qty}
//                     disabled={updating}
//                     onChange={(e) =>
//                       handleQtyChange(
//                         item.item_id,
//                         Math.max(
//                           1,
//                           parseInt(e.target.value) || 1
//                         )
//                       )
//                     }
//                     className="w-16 border px-2 py-1"
//                   />
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span>
//                     ₹{(item.price * qty).toFixed(2)}
//                   </span>

//                   <div className="flex gap-2">
//                     <button
//                       disabled={updating}
//                       onClick={() =>
//                         removeFromCart(item.item_id)
//                       }
//                       className="text-red-500 disabled:opacity-40"
//                     >
//                       <Trash2 size={16} />
//                     </button>

//                     <button
//                       disabled={updating}
//                       onClick={() =>
//                         router.push(
//                           `/product?sku=${encodeURIComponent(
//                             item.sku
//                           )}&edit=true`
//                         )
//                       }
//                       className="disabled:opacity-40"
//                     >
//                       <Pencil size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {/* UPDATE BUTTON */}
//           <button
//             onClick={handleUpdateCart}
//             disabled={updating}
//             className={`mt-6 px-6 py-2 rounded text-white
//               ${
//                 updating
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-black"
//               }
//             `}
//           >
//             {updating ? "Updating..." : "Update Shopping Cart"}
//           </button>
//         </div>

//         {/* RIGHT: ORDER SUMMARY */}
//         <div className="border p-6 h-fit bg-gray-50">
//           <h2 className="text-lg font-semibold mb-4">
//             Order Summary
//           </h2>

//           <div className="space-y-3 text-sm">
//             {cart.map((item) => {
//               const qty = qtyMap[item.item_id] ?? item.qty;

//               return (
//                 <div
//                   key={item.item_id}
//                   className="flex justify-between"
//                 >
//                   <div>
//                     <p className="font-medium">
//                       {item.title}
//                     </p>
//                     <p className="text-gray-500">
//                       Qty: {qty}
//                     </p>
//                   </div>

//                   <div className="font-semibold">
//                     ₹{(item.price * qty).toFixed(2)}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <hr className="my-4" />

//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Tax (18%)</span>
//               <span>₹{taxAmount.toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between font-bold text-base border-t pt-3 mt-3">
//               <span>Grand Total</span>
//               <span>₹{grandTotal.toFixed(2)}</span>
//             </div>
//           </div>

//           <button
//             disabled={updating}
//             onClick={() => router.push("/checkout")}
//             className="w-full mt-6 bg-black text-white py-3 rounded disabled:opacity-40"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const router = useRouter();

  const [qtyMap, setQtyMap] = useState<Record<number, number>>({});
  const [updating, setUpdating] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  /* ---------- AUTO HIDE MESSAGE ---------- */
  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleQtyChange = (item_id: number, qty: number) => {
    setQtyMap((prev) => ({ ...prev, [item_id]: qty }));
  };

  const handleUpdateCart = async () => {
    setUpdating(true);

    try {
      for (const item of cart) {
        const newQty = qtyMap[item.item_id];
        if (newQty && newQty !== item.qty) {
          await updateCartItem(item.item_id, newQty);
        }
      }

      setQtyMap({});
      showMessage("success", "Product updated successfully");
    } catch {
      showMessage("error", "Quantity is not available");
    } finally {
      setUpdating(false);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const TAX_RATE = 0.18;
  const taxAmount = subtotal * TAX_RATE;
  const grandTotal = subtotal + taxAmount;

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      {/* 🔥 TOP MESSAGE */}
      {message && (
        <div
          className={`mb-6 flex items-center justify-between rounded px-4 py-3 text-sm
          ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-5 font-semibold text-sm border-b pb-2 mb-4">
            <span className="col-span-2">Item</span>
            <span>Price</span>
            <span>Qty</span>
            <span>Subtotal</span>
          </div>

          {cart.map((item) => {
            const qty = qtyMap[item.item_id] ?? item.qty;

            return (
              <div
                key={item.item_id}
                className="grid grid-cols-5 items-center border-b py-4"
              >
                <div className="col-span-2">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                </div>

                <div>₹{item.price.toFixed(2)}</div>

                <div>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) =>
                      handleQtyChange(
                        item.item_id,
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    className="w-16 border px-2 py-1"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span>₹{(item.price * qty).toFixed(2)}</span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => removeFromCart(item.item_id)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>

                    <button
                      onClick={() =>
                        router.push(
                          `/product?sku=${encodeURIComponent(
                            item.sku
                          )}&edit=true`
                        )
                      }
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={handleUpdateCart}
            disabled={updating}
            className="mt-6 bg-black text-white px-6 py-2 rounded disabled:opacity-60"
          >
            {updating ? "Updating..." : "Update Shopping Cart"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="border p-6 h-fit bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm">
            {cart.map((item) => {
              const qty = qtyMap[item.item_id] ?? item.qty;
              return (
                <div key={item.item_id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500">Qty: {qty}</p>
                  </div>
                  <div className="font-semibold">
                    ₹{(item.price * qty).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="my-4" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-base border-t pt-3 mt-3">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full mt-6 bg-black text-white py-3 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
