// "use client";

// import { X, Trash2, Pencil } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function CartDrawer() {
//   const {
//     cart,
//     updateCartItem,
//     removeFromCart,
//     clearCart,
//     drawerOpen,
//     closeDrawer,
//     openDrawer,
//   } = useCart();

//   const router = useRouter();

//   const [tempQty, setTempQty] = useState<Record<number, number>>({});
//   const [error, setError] = useState<string | null>(null);

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   const getQty = (item: any) => tempQty[item.item_id] ?? item.qty;

//   /* ================= UPDATE HANDLER ================= */
//   const handleUpdate = async (item_id: number, qty: number) => {
//     setError(null);

//     try {
//       await updateCartItem(item_id, qty);

//       // 🔥 update ke baad drawer OPEN hi rahe
//       openDrawer();

//       // temp clear
//       setTempQty((prev) => {
//         const copy = { ...prev };
//         delete copy[item_id];
//         return copy;
//       });
//     } catch (err) {
       
//       setError("Quantity is not available");

//       setTempQty((prev) => {
//         const copy = { ...prev };
//         delete copy[item_id];
//         return copy;
//       });
//     }
//   };

//   // 🔥 IMPORTANT: drawer closed hai to kuch render hi mat karo
//   if (!drawerOpen) return null;

//   return (
//     <>
//       {/* 🔴 ERROR MESSAGE */}
//       {error && (
//         <div
//           className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999]
//           bg-red-100 border border-red-400 text-red-700
//           px-3 py-2 rounded shadow-md flex items-center gap-2"
//         >
//           <span className="text-sm">{error}</span>
//           <button
//             onClick={() => setError(null)}
//             className="text-xs px-1 font-bold"
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       {/* BACKDROP */}
//       <div
//         className="fixed inset-0 bg-black/50 z-40"
//         onClick={closeDrawer}
//       />

//       {/* DRAWER */}
//       <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50">
//         {/* HEADER */}
//         <div className="bg-black text-white flex justify-between items-center px-4 py-3">
//           <h2 className="text-lg font-semibold">Shopping Cart</h2>
//           <button onClick={closeDrawer}>
//             <X size={18} />
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
//           {cart.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty</p>
//           ) : (
//             <>
//               {cart.map((item) => {
//                 const qty = getQty(item);

//                 return (
//                   <div key={item.item_id} className="border-b pb-3 mb-3">
//                     {/* TITLE */}
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="font-semibold">{item.title}</p>
//                         <p className="text-xs text-gray-500">
//                           SKU: {item.sku}
//                         </p>
//                       </div>

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => {
//                             closeDrawer();
//                             router.push(
//                               `/product?sku=${encodeURIComponent(
//                                 item.sku
//                               )}&edit=true`
//                             );
//                           }}
//                         >
//                           <Pencil size={16} />
//                         </button>

//                         <button
//                           onClick={() => removeFromCart(item.item_id)}
//                           className="text-red-500"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>

//                     {/* QTY CONTROLS */}
//                     <div className="flex items-center gap-3 mt-3">
//                       <button
//                         className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
//                         disabled={qty <= 1}
//                         onClick={() =>
//                           setTempQty({
//                             ...tempQty,
//                             [item.item_id]: qty - 1,
//                           })
//                         }
//                       >
//                         -
//                       </button>

//                       <span className="font-semibold">{qty}</span>

//                       <button
//                         className="px-3 py-1 bg-gray-200 rounded"
//                         onClick={() =>
//                           setTempQty({
//                             ...tempQty,
//                             [item.item_id]: qty + 1,
//                           })
//                         }
//                       >
//                         +
//                       </button>

//                       {/* UPDATE BUTTON */}
//                       {qty !== item.qty && (
//                         <button
//                           onClick={() =>
//                             handleUpdate(item.item_id, qty)
//                           }
//                           className="ml-2 px-3 py-1 bg-black text-white rounded"
//                         >
//                           Update
//                         </button>
//                       )}
//                     </div>

//                     {/* PRICE */}
//                     <p className="mt-2 font-semibold">
//                       ₹{(item.price * item.qty).toFixed(2)}
//                     </p>
//                   </div>
//                 );
//               })}

//               {/* TOTAL */}
//               <div className="flex justify-between font-bold mt-4 border-t pt-3">
//                 <span>Total</span>
//                 <span>₹{total.toFixed(2)}</span>
//               </div>

//               {/* ACTIONS */}
//               <button
//                 className="mt-3 w-full bg-black text-white py-3 rounded"
//                 onClick={() => {
//                   closeDrawer();
//                   router.push("/cart");
//                 }}
//               >
//                 View & Edit Cart
//               </button>

//               <button
//                 className="mt-2 w-full bg-black text-white py-3 rounded"
//                 onClick={() => {
//                   closeDrawer();
//                   router.push("/checkout");
//                 }}
//               >
//                 Checkout
//               </button>

//               <button
//                 className="mt-2 w-full bg-black text-white py-2 rounded"
//                 onClick={clearCart}
//               >
//                 Clear Cart
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


"use client";

import { X, Trash2, Pencil } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartDrawer() {
  const {
    cart,
    updateCartItem,
    removeFromCart,
    clearCart,
    drawerOpen,
    closeDrawer,
    openDrawer,
  } = useCart();

  const router = useRouter();

  const [tempQty, setTempQty] = useState<Record<number, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const getQty = (item: any) => tempQty[item.item_id] ?? item.qty;

  /* ================= UPDATE HANDLER ================= */
  const handleUpdate = async (item_id: number, qty: number) => {
    setError(null);
    setSuccess(null);

    try {
      await updateCartItem(item_id, qty);

      // 🟢 SUCCESS MESSAGE
      setSuccess("Product updated successfully");
      setTimeout(() => setSuccess(null), 2000);

      // drawer open hi rahe
      openDrawer();

      // temp clear
      setTempQty((prev) => {
        const copy = { ...prev };
        delete copy[item_id];
        return copy;
      });
    } catch (err) {
      // 🔴 ERROR MESSAGE
      setError("Quantity is not available");
      setTimeout(() => setError(null), 2500);

      setTempQty((prev) => {
        const copy = { ...prev };
        delete copy[item_id];
        return copy;
      });
    }
  };

  // drawer band hai to kuch render nahi
  if (!drawerOpen) return null;

  return (
    <>
      {/* 🔴 ERROR MESSAGE */}
      {error && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999]
          bg-red-100 border border-red-400 text-red-700
          px-3 py-2 rounded shadow-md flex items-center gap-2"
        >
          <span className="text-sm">{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-xs px-1 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* 🟢 SUCCESS MESSAGE */}
      {success && (
        <div
          className="fixed top-14 left-1/2 -translate-x-1/2 z-[9999]
          bg-green-100 border border-green-400 text-green-700
          px-3 py-2 rounded shadow-md flex items-center gap-2"
        >
          <span className="text-sm">{success}</span>
          <button
            onClick={() => setSuccess(null)}
            className="text-xs px-1 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeDrawer}
      />

      {/* DRAWER */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50">
        {/* HEADER */}
        <div className="bg-black text-white flex justify-between items-center px-4 py-3">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={closeDrawer}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => {
                const qty = getQty(item);

                return (
                  <div key={item.item_id} className="border-b pb-3 mb-3">
                    {/* TITLE */}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          SKU: {item.sku}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            closeDrawer();
                            router.push(
                              `/product?sku=${encodeURIComponent(
                                item.sku
                              )}&edit=true`
                            );
                          }}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => removeFromCart(item.item_id)}
                          className="text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* QTY CONTROLS */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
                        disabled={qty <= 1}
                        onClick={() =>
                          setTempQty({
                            ...tempQty,
                            [item.item_id]: qty - 1,
                          })
                        }
                      >
                        -
                      </button>

                      <span className="font-semibold">{qty}</span>

                      <button
                        className="px-3 py-1 bg-gray-200 rounded"
                        onClick={() =>
                          setTempQty({
                            ...tempQty,
                            [item.item_id]: qty + 1,
                          })
                        }
                      >
                        +
                      </button>

                      {/* UPDATE BUTTON */}
                      {qty !== item.qty && (
                        <button
                          onClick={() =>
                            handleUpdate(item.item_id, qty)
                          }
                          className="ml-2 px-3 py-1 bg-black text-white rounded"
                        >
                          Update
                        </button>
                      )}
                    </div>

                    {/* PRICE */}
                    <p className="mt-2 font-semibold">
                      ₹{(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                );
              })}

              {/* TOTAL */}
              <div className="flex justify-between font-bold mt-4 border-t pt-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {/* ACTIONS */}
              <button
                className="mt-3 w-full bg-black text-white py-3 rounded"
                onClick={() => {
                  closeDrawer();
                  router.push("/cart");
                }}
              >
                View & Edit Cart
              </button>

              <button
                className="mt-2 w-full bg-black text-white py-3 rounded"
                onClick={() => {
                  closeDrawer();
                  router.push("/checkout");
                }}
              >
                Checkout
              </button>

              <button
                className="mt-2 w-full bg-black text-white py-2 rounded"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
