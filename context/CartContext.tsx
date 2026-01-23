// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// /* ================= TYPES ================= */

// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
// };

// export type CartItem = {
//   item_id: number; // 🔥 MUST
//   sku: string;
//   title: string;
//   price: number;
//   qty: number;
//   image?: string;
// };

// type CartContextType = {
//   cart: CartItem[];
//   cartId: string | null;
//   addToCart: (product: Product, qty?: number) => Promise<void>;
//   updateCartItem: (item_id: number, qty: number) => Promise<void>;
//   removeFromCart: (item_id: number) => Promise<void>;
//   clearCart: () => void;
//   refreshCart: (overrideId?: string) => Promise<void>;
//   createGuestCart: () => Promise<string | null>;
// };

// const CartContext = createContext<CartContextType | null>(null);

// /* ================= PROVIDER ================= */

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartId, setCartId] = useState<string | null>(null);

//   /* 🔹 SAVE CART ID */
//   const saveCartId = (id: string) => {
//     if (!id || id.includes("<!DOCTYPE")) return;
//     setCartId(id);
//     localStorage.setItem("cartId", id);
//   };

//   /* 🔹 CREATE GUEST CART */
//   const createGuestCart = async (): Promise<string | null> => {
//     try {
//       const res = await fetch("/api/guest-cart", { method: "POST" });
//       if (!res.ok) return null;

//       const id = (await res.text()).trim();
//       if (!id || id.includes("<!DOCTYPE")) return null;

//       saveCartId(id);
//       return id;
//     } catch (err) {
//       console.error("❌ createGuestCart error:", err);
//       return null;
//     }
//   };

//   /* 🔹 REFRESH CART */
//   const refreshCart = async (overrideId?: string) => {
//     try {
//       const id = overrideId || cartId;
//       if (!id) return;

//       const res = await fetch(`/api/cart?cartId=${id}`);
//       if (!res.ok) throw new Error("Cart fetch failed");

//       const data = await res.json();

//       const items: CartItem[] = (data.items || []).map((item: any) => ({
//         item_id: Number(item.item_id), // 🔥 KEY FIX
//         sku: item.sku,
//         title: item.name,
//         price: item.price,
//         qty: item.qty,
//         image: item.extension_attributes?.image,
//       }));

//       setCart(items);
//     } catch (err) {
//       console.error("❌ refreshCart error:", err);
//       setCart([]);
//     }
//   };

//   /* 🔹 ADD TO CART */
//   const addToCart = async (product: Product, qty = 1) => {
//     let id = cartId;

//     if (!id) {
//       id = await createGuestCart();
//       if (!id) return;
//     }

//     const res = await fetch("/api/add-to-cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         cartItem: {
//           quote_id: id,
//           sku: product.sku,
//           qty,
//         },
//       }),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Add to cart failed");

//     await refreshCart(id); // 🔥 IMPORTANT
//   };

//   /* 🔹 UPDATE ITEM (item_id based) */
//   const updateCartItem = async (item_id: number, qty: number) => {
//     if (!cartId) return;

//     await fetch("/api/update-cart-item", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId, item_id, qty }),
//     });

//     await refreshCart();
//   };

//   /* 🔹 REMOVE ITEM (item_id based) */
//   const removeFromCart = async (item_id: number) => {
//     if (!cartId) return;

//     await fetch("/api/remove-from-cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId, item_id }),
//     });

//     await refreshCart();
//   };

//   /* 🔹 CLEAR CART */
//   const clearCart = () => {
//     setCart([]);
//     setCartId(null);
//     localStorage.removeItem("cartId");
//   };

//   /* 🔹 LOAD CART ON START */
//   useEffect(() => {
//     const stored = localStorage.getItem("cartId");
//     if (stored && !stored.includes("<!DOCTYPE")) {
//       setCartId(stored);
//       refreshCart(stored);
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         cartId,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//         clearCart,
//         refreshCart,
//         createGuestCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /* ================= HOOK ================= */

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };




//working
// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// /* ================= TYPES ================= */

// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
// };

// export type CartItem = Product & {
//   qty: number;
//   item_id: number; // 🔥 VERY IMPORTANT
// };

// type CartContextType = {
//   cart: CartItem[];
//   cartId: string | null;
//   addToCart: (product: Product, qty?: number) => Promise<void>;
//   updateCartItem: (item_id: number, qty: number) => Promise<void>;
//   removeFromCart: (item_id: number) => Promise<void>;
//   clearCart: () => void;
//   refreshCart: (overrideId?: string) => Promise<void>;
//   createGuestCart: () => Promise<string | null>;
// };

// const CartContext = createContext<CartContextType | null>(null);

// /* ================= PROVIDER ================= */

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartId, setCartId] = useState<string | null>(null);

//   /* 🔹 Save cartId safely */
//   const saveCartId = (id: string) => {
//     if (!id || id.includes("<!DOCTYPE")) return;
//     setCartId(id);
//     localStorage.setItem("cartId", id);
//   };

//   /* ================= CREATE GUEST CART ================= */

//   const createGuestCart = async (): Promise<string | null> => {
//     try {
//       const res = await fetch("/api/guest-cart", { method: "POST" });
//       if (!res.ok) return null;

//       const id = (await res.text()).trim();
//       if (!id || id.includes("<!DOCTYPE")) return null;

//       saveCartId(id);
//       await refreshCart(id);
//       return id;
//     } catch (err) {
//       console.error("❌ createGuestCart error:", err);
//       return null;
//     }
//   };

//   /* ================= REFRESH CART ================= */

//   const refreshCart = async (overrideId?: string) => {
//     try {
//       const id = overrideId || cartId;
//       if (!id) return;

//       const res = await fetch(`/api/cart?cartId=${id}`);
//       if (!res.ok) throw new Error("Cart fetch failed");

//       const data = await res.json();

//       const items: CartItem[] = (data.items || []).map((item: any) => ({
//         item_id: item.item_id, // 🔥 KEY FIX
//         sku: item.sku,
//         title: item.name,
//         price: item.price,
//         qty: item.qty,
//         image: item.extension_attributes?.image,
//       }));

//       setCart(items);
//     } catch (err) {
//       console.error("❌ refreshCart error:", err);
//       setCart([]);
//     }
//   };

//   /* ================= ADD TO CART ================= */

//   const addToCart = async (product: Product, qty = 1) => {
//     let id = cartId;

//     if (!id) {
//       id = await createGuestCart();
//       if (!id) return;
//     }

//     try {
//       const res = await fetch("/api/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartItem: {
//             quote_id: id,
//             sku: product.sku,
//             qty,
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       await refreshCart();
//     } catch (err) {
//       console.error("❌ addToCart error:", err);
//     }
//   };

//   /* ================= UPDATE CART ITEM ================= */

//   const updateCartItem = async (item_id: number, qty: number) => {
//     if (!cartId) return;

//     if (qty <= 0) {
//       return removeFromCart(item_id);
//     }

//     try {
//       const res = await fetch("/api/update-cart-item", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId,
//           item_id,
//           qty,
//         }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         console.error("❌ updateCartItem failed:", err);
//         return;
//       }

//       await refreshCart();
//     } catch (err) {
//       console.error("❌ updateCartItem error:", err);
//     }
//   };

//   /* ================= REMOVE ITEM ================= */

//   const removeFromCart = async (item_id: number) => {
//     if (!cartId) return;

//     try {
//       const res = await fetch("/api/remove-from-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cartId, item_id }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         console.error("❌ removeFromCart failed:", err);
//         return;
//       }

//       await refreshCart();
//     } catch (err) {
//       console.error("❌ removeFromCart error:", err);
//     }
//   };

//   /* ================= CLEAR CART ================= */

//   const clearCart = () => {
//     setCart([]);
//     setCartId(null);
//     localStorage.removeItem("cartId");
//   };

//   /* ================= LOAD CART ON START ================= */

//   useEffect(() => {
//     const stored = localStorage.getItem("cartId");
//     if (stored && !stored.includes("<!DOCTYPE")) {
//       setCartId(stored);
//       refreshCart(stored);
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         cartId,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//         clearCart,
//         refreshCart,
//         createGuestCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /* ================= HOOK ================= */

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };


// working
// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// /* ================= TYPES ================= */

// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
// };

// export type CartItem = Product & {
//   qty: number;
//   item_id: number; // unique id for frontend cart
// };

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (product: Product, qty?: number) => void;
//   updateCartItem: (item_id: number, qty: number) => void;
//   removeFromCart: (item_id: number) => void;
//   clearCart: () => void;
// };

// /* ================= CONTEXT ================= */

// const CartContext = createContext<CartContextType | null>(null);

// /* ================= PROVIDER ================= */

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   /* 🔹 Load cart from localStorage on start */
//   useEffect(() => {
//     const stored = localStorage.getItem("cart");
//     if (stored) {
//       setCart(JSON.parse(stored));
//     }
//   }, []);

//   /* ================= ADD TO CART ================= */
//   const addToCart = (product: Product, qty: number = 1) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.sku === product.sku);
//       let newCart;
//       if (existing) {
//         newCart = prev.map((item) =>
//           item.sku === product.sku ? { ...item, qty: item.qty + qty } : item
//         );
//       } else {
//         newCart = [...prev, { ...product, qty, item_id: Date.now() }];
//       }
//       localStorage.setItem("cart", JSON.stringify(newCart));
//       return newCart;
//     });
//   };

//   /* ================= UPDATE CART ITEM ================= */
//   const updateCartItem = (item_id: number, qty: number) => {
//     setCart((prev) => {
//       const newCart = prev.map((item) =>
//         item.item_id === item_id ? { ...item, qty } : item
//       );
//       localStorage.setItem("cart", JSON.stringify(newCart));
//       return newCart;
//     });
//   };

//   /* ================= REMOVE CART ITEM ================= */
//   const removeFromCart = (item_id: number) => {
//     setCart((prev) => {
//       const newCart = prev.filter((item) => item.item_id !== item_id);
//       localStorage.setItem("cart", JSON.stringify(newCart));
//       return newCart;
//     });
//   };

//   /* ================= CLEAR CART ================= */
//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem("cart");
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /* ================= HOOK ================= */
// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };


// "use client";

// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
// };

// export type CartItem = Product & {
//   qty: number;
//   item_id: number; // unique id for React key
// };

// type CartContextType = {
//   cart: CartItem[];
//   cartId: string | null;
//   addToCart: (product: Product, qty?: number) => Promise<void>;
//   updateCartItem: (item_id: number, qty: number) => Promise<void>;
//   removeFromCart: (item_id: number) => Promise<void>;
//   clearCart: () => void;
//   refreshCart: () => Promise<void>;
//   createGuestCart: () => Promise<string | null>;
// };

// const CartContext = createContext<CartContextType | null>(null);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartId, setCartId] = useState<string | null>(null);

//   // Save cartId safely
//   const saveCartId = (id: string) => {
//     if (!id || id.includes("<!DOCTYPE")) return;
//     setCartId(id);
//     localStorage.setItem("guestCartId", id);
//   };

//   // Create guest cart
//   const createGuestCart = async (): Promise<string | null> => {
//     try {
//       const res = await fetch("/api/guest-cart", { method: "POST" });
//       if (!res.ok) return null;
//       const id = (await res.text()).trim();
//       saveCartId(id);
//       return id;
//     } catch (err) {
//       console.error("❌ createGuestCart error:", err);
//       return null;
//     }
//   };

//   // Refresh cart items from Magento
//   const refreshCart = async () => {
//     try {
//       if (!cartId) return;
//       const res = await fetch(`/api/cart?cartId=${cartId}`);
//       if (!res.ok) throw new Error("Cart fetch failed");
//       const data = await res.json();

//       const items: CartItem[] = (data.items || []).map((item: any) => ({
//         item_id: item.item_id,
//         sku: item.sku,
//         title: item.name,
//         price: item.price,
//         qty: item.qty,
//         image: item.extension_attributes?.image,
//       }));

//       setCart(items);
//     } catch (err) {
//       console.error("❌ refreshCart error:", err);
//       setCart([]);
//     }
//   };

//   // Add product to cart
//   const addToCart = async (product: Product, qty = 1) => {
//     let id = cartId;
//     if (!id) {
//       id = await createGuestCart();
//       if (!id) return;
//     }

//     try {
//       const res = await fetch("/api/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartItem: {
//             sku: product.sku,
//             qty,
//             quote_id: id,
//           },
//         }),
//       });

//       const data = await res.json();
//       console.log("✅ MAGENTO RESPONSE:", data);

//       if (!res.ok) throw new Error(data.message || "Failed to add");

//       await refreshCart();
//     } catch (err) {
//       console.error("❌ addToCart error:", err);
//     }
//   };

//   // Update item qty
//   const updateCartItem = async (item_id: number, qty: number) => {
//     if (!cartId) return;
//     if (qty <= 0) return removeFromCart(item_id);

//     try {
//       const res = await fetch("/api/update-cart-item", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cartId, item_id, qty }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         console.error("❌ updateCartItem failed:", err);
//         return;
//       }

//       await refreshCart();
//     } catch (err) {
//       console.error("❌ updateCartItem error:", err);
//     }
//   };

//   // Remove item
//   const removeFromCart = async (item_id: number) => {
//     if (!cartId) return;
//     try {
//       const res = await fetch("/api/remove-from-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cartId, item_id }),
//       });
//       if (!res.ok) console.error("❌ removeFromCart failed");
//       await refreshCart();
//     } catch (err) {
//       console.error("❌ removeFromCart error:", err);
//     }
//   };

//   // Clear cart
//   const clearCart = () => {
//     setCart([]);
//     setCartId(null);
//     localStorage.removeItem("guestCartId");
//   };

//   // Load guest cart on start
//   useEffect(() => {
//     const stored = localStorage.getItem("guestCartId");
//     if (stored && !stored.includes("<!DOCTYPE")) {
//       setCartId(stored);
//       refreshCart();
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         cartId,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//         clearCart,
//         refreshCart,
//         createGuestCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };



// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// /* ================= TYPES ================= */

// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
// };

// export type CartItem = Product & {
//   item_id: number;
//   qty: number;
// };

// type CartContextType = {
//   cart: CartItem[];
//   cartId: string | null;
//   addToCart: (product: Product, qty?: number) => Promise<void>;
//   updateCartItem: (item_id: number, qty: number) => Promise<void>;
//   removeFromCart: (item_id: number) => Promise<void>;
//   clearCart: () => void;
//   refreshCart: () => Promise<void>;
// };

// /* ================= CONTEXT ================= */

// const CartContext = createContext<CartContextType | null>(null);

// /* ================= PROVIDER ================= */

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartId, setCartId] = useState<string | null>(null);

//   /* ---------- helpers ---------- */

//   const saveCartId = (id: string) => {
//     if (!id || id.includes("<!DOCTYPE")) return;
//     localStorage.setItem("guestCartId", id);
//     setCartId(id);
//   };

//   const getCartId = async (): Promise<string> => {
//     let id = cartId || localStorage.getItem("guestCartId");

//     if (id) return id;

//     const res = await fetch("/api/guest-cart", { method: "POST" });
//     const newId = (await res.text()).trim();

//     saveCartId(newId);
//     return newId;
//   };

//   /* ---------- fetch cart ---------- */

//   const refreshCart = async () => {
//     try {
//       const id = cartId || localStorage.getItem("guestCartId");
//       if (!id) return;

//       const res = await fetch(`/api/cart?cartId=${id}`);
//       if (!res.ok) throw new Error("Failed to fetch cart");

//       const data = await res.json();

//       const items: CartItem[] = (data.items || []).map((item: any) => ({
//         item_id: item.item_id,
//         sku: item.sku,
//         title: item.name,
//         price: item.price,
//         qty: item.qty,
//         image: item.extension_attributes?.image,
//       }));

//       setCart(items);
//     } catch (err) {
//       console.error("❌ refreshCart error:", err);
//       setCart([]);
//     }
//   };

//   /* ---------- add to cart ---------- */

//   const addToCart = async (product: Product, qty = 1) => {
//     const id = await getCartId();

//     console.log("🛒 USING CART ID:", id);

//     const payload = {
//       cartItem: {
//         sku: product.sku,
//         qty,
//         quote_id: id,
//       },
//     };

//     console.log("📦 ADD TO CART PAYLOAD:", payload);

//     const res = await fetch("/api/add-to-cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     console.log("✅ MAGENTO RESPONSE:", data);

//     if (!res.ok) {
//       throw new Error(data.message || "Add to cart failed");
//     }

//     await refreshCart();
//   };

//   /* ---------- update qty ---------- */

//   const updateCartItem = async (item_id: number, qty: number) => {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;

//     if (qty <= 0) return removeFromCart(item_id);

//     await fetch("/api/update-cart-item", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id, qty }),
//     });

//     await refreshCart();
//   };

//   /* ---------- remove item ---------- */

//   const removeFromCart = async (item_id: number) => {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;

//     await fetch("/api/remove-from-cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id }),
//     });

//     await refreshCart();
//   };

//   /* ---------- clear cart ---------- */

//   const clearCart = () => {
//     setCart([]);
//     setCartId(null);
//     localStorage.removeItem("guestCartId");
//   };

//   /* ---------- load cart on app start ---------- */

//   useEffect(() => {
//     const stored = localStorage.getItem("guestCartId");
//     if (stored) {
//       setCartId(stored);
//       refreshCart();
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         cartId,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//         clearCart,
//         refreshCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /* ================= HOOK ================= */

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };


// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// /* ================= TYPES ================= */

// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
// };

// export type CartItem = Product & {
//   item_id: number;
//   qty: number;
// };

// type CartContextType = {
//   cart: CartItem[];
//   cartId: string | null;
//   addToCart: (product: Product, qty?: number) => Promise<void>;
//   updateCartItem: (item_id: number, qty: number) => Promise<void>;
//   removeFromCart: (item_id: number) => Promise<void>;
//   clearCart: () => void;
//   refreshCart: () => Promise<void>;
// };

// /* ================= CONTEXT ================= */

// const CartContext = createContext<CartContextType | null>(null);

// /* ================= PROVIDER ================= */

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartId, setCartId] = useState<string | null>(null);

//   /* ---------- helpers ---------- */

//   const saveCartId = (id: string) => {
//     if (!id || id.includes("<!DOCTYPE")) return;
//     localStorage.setItem("guestCartId", id);
//     setCartId(id);
//   };

//   const getCartId = async (): Promise<string> => {
//     let id = cartId || localStorage.getItem("guestCartId");

//     if (id) return id;

//     const res = await fetch("/api/guest-cart", { method: "POST" });
//     const newId = (await res.text()).trim();

//     saveCartId(newId);
//     return newId;
//   };

//   /* ---------- fetch cart ---------- */

//   const refreshCart = async () => {
//     try {
//       const id = cartId || localStorage.getItem("guestCartId");
//       if (!id) return;

//       const res = await fetch(`/api/cart?cartId=${id}`);
//       if (!res.ok) throw new Error("Failed to fetch cart");

//       const data = await res.json();

//       const items: CartItem[] = (data.items || []).map((item: any) => ({
//         item_id: item.item_id,
//         sku: item.sku,
//         title: item.name,
//         price: item.price,
//         qty: item.qty,
//         image: item.extension_attributes?.image,
//       }));

//       setCart(items);
//     } catch (err) {
//       console.error("❌ refreshCart error:", err);
//       setCart([]);
//     }
//   };

//   /* ---------- add to cart ---------- */

//   const addToCart = async (product: Product, qty = 1) => {
//     const id = await getCartId();

//     console.log("🛒 USING CART ID:", id);

//     const payload = {
//       cartItem: {
//         sku: product.sku,
//         qty,
//         quote_id: id,
//       },
//     };

//     console.log("📦 ADD TO CART PAYLOAD:", payload);

//     const res = await fetch("/api/add-to-cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     console.log("✅ MAGENTO RESPONSE:", data);

//     if (!res.ok) {
//       throw new Error(data.message || "Add to cart failed");
//     }

//     await refreshCart();
//   };

//   /* ---------- update qty ---------- */

//   const updateCartItem = async (item_id: number, qty: number) => {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;

//     if (qty <= 0) return removeFromCart(item_id);

//     await fetch("/api/update-cart-item", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id, qty }),
//     });

//     await refreshCart();
//   };

//   /* ---------- remove item ---------- */

//   const removeFromCart = async (item_id: number) => {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;

//     await fetch("/api/remove-from-cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id }),
//     });

//     await refreshCart();
//   };

//   /* ---------- clear cart ---------- */

//   const clearCart = () => {
//     setCart([]);
//     setCartId(null);
//     localStorage.removeItem("guestCartId");
//   };

//   /* ---------- load cart on app start ---------- */

//   useEffect(() => {
//     const stored = localStorage.getItem("guestCartId");
//     if (stored) {
//       setCartId(stored);
//       refreshCart();
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         cartId,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//         clearCart,
//         refreshCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /* ================= HOOK ================= */

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };



// "use client";

// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// /* ================= TYPES ================= */

// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
//   stock: number; // 🔥 IMPORTANT
// };

// export type CartItem = Product & {
//   item_id: number;
//   qty: number;
// };

// type CartContextType = {
//   cart: CartItem[];
//   cartId: string | null;
//   addToCart: (product: Product, qty?: number) => Promise<void>;
//   updateCartItem: (item_id: number, qty: number) => Promise<void>;
//   removeFromCart: (item_id: number) => Promise<void>;
//   clearCart: () => void;
//   refreshCart: () => Promise<void>;
// };

// /* ================= CONTEXT ================= */

// const CartContext = createContext<CartContextType | null>(null);

// /* ================= PROVIDER ================= */

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartId, setCartId] = useState<string | null>(null);

//   /* ---------- Helpers ---------- */

//   const saveCartId = (id: string) => {
//     if (!id || id.includes("<!DOCTYPE")) return;
//     localStorage.setItem("guestCartId", id);
//     setCartId(id);
//   };

//   const getCartId = async (): Promise<string> => {
//     let id = cartId || localStorage.getItem("guestCartId");
//     if (id) return id;

//     const res = await fetch("/api/guest-cart", { method: "POST" });
//     const newId = (await res.text()).trim();
//     saveCartId(newId);
//     return newId;
//   };

//   /* ---------- Refresh Cart ---------- */

//   const refreshCart = async () => {
//     try {
//       const id = cartId || localStorage.getItem("guestCartId");
//       if (!id) return;

//       const res = await fetch(`/api/cart?cartId=${id}`);
//       if (!res.ok) throw new Error("Failed to fetch cart");

//       const data = await res.json();

//       const items: CartItem[] = (data.items || []).map((item: any) => ({
//         item_id: item.item_id,
//         sku: item.sku,
//         title: item.name,
//         price: item.price,
//         qty: item.qty,
//         image: item.extension_attributes?.image,
//       }));

//       setCart(items);
//     } catch (err) {
//       console.error("❌ refreshCart error:", err);
//       setCart([]);
//     }
//   };

//   /* ---------- Add to Cart (robust) ---------- */

//   // const addToCart = async (product: Product, qty = 1) => {
//   //   try {
//   //     let id = await getCartId();

//   //     // Already in cart → skip
//   //     if (cart.find((item) => item.sku === product.sku)) return;

//   //     const payload = { cartItem: { sku: product.sku, qty, quote_id: id } };

//   //     let res = await fetch("/api/add-to-cart", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(payload),
//   //     });

//   //     let data = await res.json();

//   //     // Magento rejects old cartId → create new cart & retry
//   //     if (!res.ok || data.message?.includes("No such entity")) {
//   //       console.warn("⚠️ Magento rejected, creating new guest cart...");
//   //       const cartRes = await fetch("/api/guest-cart", { method: "POST" });
//   //       const newId = (await cartRes.text()).trim();
//   //       saveCartId(newId);

//   //       payload.cartItem.quote_id = newId;

//   //       res = await fetch("/api/add-to-cart", {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(payload),
//   //       });

//   //       data = await res.json();
//   //       if (!res.ok) throw new Error(data.message || "Magento rejected add to cart again");
//   //     }

//   //     // Immediate local cart update
//   //     setCart((prev) => [...prev, { ...product, item_id: data.item_id, qty }]);
//   //   } catch (err) {
//   //     console.error("❌ Add to cart error:", err);
//   //     throw err;
//   //   }
//   // };


// //   const addToCart = async (product: Product, qty = 1) => {
// //   try {
// //     let id = await getCartId();

// //     const existing = cart.find((item) => item.sku === product.sku);

// //     if (existing) {
// //       // 🔹 Already in cart → increment quantity
// //       const payload = {
// //         cartItem: {
// //           sku: product.sku,
// //           qty: existing.qty + qty, // previous + new qty
// //           quote_id: id,
// //           item_id: existing.item_id, // update existing item
// //         },
// //       };

// //       const res = await fetch("/api/add-to-cart", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.message || "Failed to update qty");

// //       // update local cart
// //       setCart((prev) =>
// //         prev.map((item) =>
// //           item.sku === product.sku ? { ...item, qty: existing.qty + qty } : item
// //         )
// //       );
// //       return;
// //     }

// //     // 🔹 Not in cart → add new item
// //     const payload = { cartItem: { sku: product.sku, qty, quote_id: id } };

// //     let res = await fetch("/api/add-to-cart", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload),
// //     });

// //     let data = await res.json();

// //     // Magento rejects old cartId → create new cart & retry
// //     if (!res.ok || data.message?.includes("No such entity")) {
// //       console.warn("⚠️ Magento rejected, creating new guest cart...");
// //       const cartRes = await fetch("/api/guest-cart", { method: "POST" });
// //       const newId = (await cartRes.text()).trim();
// //       saveCartId(newId);

// //       payload.cartItem.quote_id = newId;

// //       res = await fetch("/api/add-to-cart", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       data = await res.json();
// //       if (!res.ok) throw new Error(data.message || "Magento rejected add to cart again");
// //     }

// //     // Immediate local cart update
// //     setCart((prev) => [...prev, { ...product, item_id: data.item_id, qty }]);
// //   } catch (err) {
// //     console.error("❌ Add to cart error:", err);
// //     throw err;
// //   }
// // };

// const addToCart = async (product: Product, qty = 1) => {
//   try {
//     let id = await getCartId();

//     const existing = cart.find((item) => item.sku === product.sku);

//     if (existing) {
//       // 🔹 Already in cart → increment quantity
//       const payload = {
//         cartItem: {
//           sku: product.sku,
//           qty: existing.qty + qty, // previous + new qty
//           quote_id: id,
//           item_id: existing.item_id, // update existing item
//         },
//       };

//       const res = await fetch("/api/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//   const msg =
//     data?.message?.includes("Not enough")
//       ? "Requested quantity is not available in stock"
//       : data?.message || "Magento rejected add to cart";

//   throw new Error(msg);
// }


//       // update local cart
//       setCart((prev) =>
//         prev.map((item) =>
//           item.sku === product.sku ? { ...item, qty: existing.qty + qty } : item
//         )
//       );
//       return;
//     }

//     // 🔹 Not in cart → add new item
//     const payload = { cartItem: { sku: product.sku, qty, quote_id: id } };

//     let res = await fetch("/api/add-to-cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     let data = await res.json();

//     // Magento rejects old cartId → create new cart & retry
//     if (!res.ok || data.message?.includes("No such entity")) {
//       console.warn("⚠️ Magento rejected, creating new guest cart...");
//       const cartRes = await fetch("/api/guest-cart", { method: "POST" });
//       const newId = (await cartRes.text()).trim();
//       saveCartId(newId);

//       payload.cartItem.quote_id = newId;

//       res = await fetch("/api/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Magento rejected add to cart again");
//     }

//     // Immediate local cart update
//     setCart((prev) => [...prev, { ...product, item_id: data.item_id, qty }]);
//   } catch (err) {
//     console.error("❌ Add to cart error:", err);
//     throw err;
//   }
// };

//   /* ---------- Update Qty ---------- */

//   const updateCartItem = async (item_id: number, qty: number) => {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;
//     if (qty <= 0) return removeFromCart(item_id);

//     await fetch("/api/update-cart-item", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id, qty }),
//     });

//     await refreshCart();
//   };

//   /* ---------- Remove Item ---------- */

//   // const removeFromCart = async (item_id: number) => {
//   //   const id = cartId || localStorage.getItem("guestCartId");
//   //   if (!id) return;

//   //   await fetch("/api/remove-from-cart", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({ cartId: id, item_id }),
//   //   });

//   //   await refreshCart();
//   // };

//   /* ---------- Remove Item ---------- */
// const removeFromCart = async (item_id: number) => {
//   try {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;

//     const res = await fetch("/api/remove-from-cart", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       console.error("❌ Remove from cart failed:", data);
//       throw new Error(data.message || "Failed to remove item");
//     }

//     // refresh cart after successful remove
//     await refreshCart();
//   } catch (err: any) {
//     console.error("❌ Remove from cart error:", err);
//     throw err; // propagate to frontend
//   }
// };

//   /* ---------- Clear Cart ---------- */

//   const clearCart = () => {
//     setCart([]);
//     setCartId(null);
//     localStorage.removeItem("guestCartId");
//   };

//   /* ---------- Load Cart on Start ---------- */

//   useEffect(() => {
//     const stored = localStorage.getItem("guestCartId");
//     if (stored) {
//       setCartId(stored);
//       refreshCart();
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{ cart, cartId, addToCart, updateCartItem, removeFromCart, clearCart, refreshCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /* ================= HOOK ================= */

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };



//full working code 
//"use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// /* ================= TYPES ================= */

// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
//   stock: number;
// };

// export type CartItem = Product & {
//   item_id: number;
//   qty: number;
// };

// type AddToCartResult = {
//   success: boolean;
//   message?: string;
// };

// type CartContextType = {
//   cart: CartItem[];
//   cartId: string | null;
//   addToCart: (product: Product, qty?: number) => Promise<AddToCartResult>;
//   updateCartItem: (item_id: number, qty: number) => Promise<void>;
//   removeFromCart: (item_id: number) => Promise<void>;
//   clearCart: () => void;
//   refreshCart: () => Promise<void>;
// };

// /* ================= CONTEXT ================= */

// const CartContext = createContext<CartContextType | null>(null);

// /* ================= PROVIDER ================= */

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartId, setCartId] = useState<string | null>(null);

//   const saveCartId = (id: string) => {
//     if (!id || id.includes("<!DOCTYPE")) return;
//     localStorage.setItem("guestCartId", id);
//     setCartId(id);
//   };

//   const getCartId = async (): Promise<string> => {
//     let id = cartId || localStorage.getItem("guestCartId");
//     if (id) return id;

//     const res = await fetch("/api/guest-cart", { method: "POST" });
//     const newId = (await res.text()).trim();
//     saveCartId(newId);
//     return newId;
//   };

//   /* ---------- Refresh Cart ---------- */
//   const refreshCart = async () => {
//     try {
//       const id = cartId || localStorage.getItem("guestCartId");
//       if (!id) return;

//       const res = await fetch(`/api/cart?cartId=${id}`);
//       if (!res.ok) return;

//       const data = await res.json();

//       const items: CartItem[] = (data.items || []).map((item: any) => ({
//         item_id: item.item_id,
//         sku: item.sku,
//         title: item.name,
//         price: item.price,
//         qty: item.qty,
//         image: item.extension_attributes?.image,
//         stock: 0,
//       }));

//       setCart(items);
//     } catch {
//       setCart([]);
//     }
//   };

//   /* ---------- ADD TO CART ---------- */
//   const addToCart = async (
//     product: Product,
//     qty = 1
//   ): Promise<AddToCartResult> => {
//     try {
//       const id = await getCartId();
//       const existing = cart.find((i) => i.sku === product.sku);
//       const finalQty = existing ? existing.qty + qty : qty;

//       const payload = {
//         cartItem: {
//           sku: product.sku,
//           qty: finalQty,
//           quote_id: id,
//           item_id: existing?.item_id,
//         },
//       };

//       const res = await fetch("/api/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       // 🔴 ALWAYS FAIL → message "Quantity is not available"
//       if (!res.ok || data?.message?.includes("Not enough")) {
//         return { success: false, message: "Quantity is not available" };
//       }

//       // ✅ SUCCESS
//       if (existing) {
//         setCart((prev) =>
//           prev.map((i) =>
//             i.sku === product.sku ? { ...i, qty: finalQty } : i
//           )
//         );
//       } else {
//         setCart((prev) => [
//           ...prev,
//           { ...product, item_id: data.item_id, qty },
//         ]);
//       }

//       return { success: true };
//     } catch {
//       return { success: false, message: "Quantity is not available" };
//     }
//   };

//   /* ---------- Update Qty ---------- */
//   const updateCartItem = async (item_id: number, qty: number) => {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;
//     if (qty <= 0) return removeFromCart(item_id);

//     await fetch("/api/update-cart-item", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id, qty }),
//     });

//     await refreshCart();
//   };

//   /* ---------- Remove Item ---------- */
//   const removeFromCart = async (item_id: number) => {
//     try {
//       const id = cartId || localStorage.getItem("guestCartId");
//       if (!id) return;

//       const res = await fetch("/api/remove-from-cart", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cartId: id, item_id }),
//       });

//       if (res.ok) await refreshCart();
//     } catch {
//       /* silent */
//     }
//   };

//   /* ---------- Clear Cart ---------- */
//   const clearCart = () => {
//     setCart([]);
//     setCartId(null);
//     localStorage.removeItem("guestCartId");
//   };

//   /* ---------- Load Cart on Start ---------- */
//   useEffect(() => {
//     const stored = localStorage.getItem("guestCartId");
//     if (stored) {
//       setCartId(stored);
//       refreshCart();
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         cartId,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//         clearCart,
//         refreshCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /* ================= HOOK ================= */
// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };




// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// /* ================= TYPES ================= */

// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
//   stock: number;
// };

// export type CartItem = Product & {
//   item_id: number;
//   qty: number;
// };

// type AddToCartResult = {
//   success: boolean;
//   message?: string;
// };

// type CartContextType = {
//   cart: CartItem[];
//   cartId: string | null;
//   addToCart: (product: Product, qty?: number) => Promise<AddToCartResult>;
//   updateCartItem: (item_id: number, qty: number) => Promise<void>;
//   removeFromCart: (item_id: number) => Promise<void>;
//   clearCart: () => void;
//   refreshCart: () => Promise<void>;
// };

// /* ================= CONTEXT ================= */

// const CartContext = createContext<CartContextType | null>(null);

// /* ================= PROVIDER ================= */

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartId, setCartId] = useState<string | null>(null);

//   /* ---------- Helper to Save Cart ID ---------- */
//   const saveCartId = (id: string) => {
//     if (!id || id.includes("<!DOCTYPE")) return;
//     localStorage.setItem("guestCartId", id);
//     setCartId(id);
//   };

//   /* ---------- Get or Create Guest Cart ---------- */
//   const getCartId = async (): Promise<string> => {
//     let id = cartId || localStorage.getItem("guestCartId");
//     if (id) return id;

//     const res = await fetch("/api/guest-cart", { method: "POST" });
//     const newId = (await res.text()).trim();
//     saveCartId(newId);
//     return newId;
//   };

//   /* ---------- Refresh Cart from Magento ---------- */
//   const refreshCart = async () => {
//     try {
//       const id = await getCartId();
//       const res = await fetch(`/api/cart?cartId=${id}`);
//       if (!res.ok) return;

//       const data = await res.json();
//       const items: CartItem[] = (data.items || []).map((item: any) => ({
//         item_id: item.item_id,
//         sku: item.sku,
//         title: item.name,
//         price: item.price,
//         qty: item.qty,
//         image:
//           item.extension_attributes?.image ||
//           `/media/catalog/product/${item.sku}.jpg`,
//         stock: item.extension_attributes?.stock ?? 0,
//       }));

//       setCart(items);
//     } catch {
//       setCart([]);
//     }
//   };

//   /* ---------- Add to Cart ---------- */
//   const addToCart = async (
//     product: Product,
//     qty = 1
//   ): Promise<AddToCartResult> => {
//     try {
//       const id = await getCartId();

//       const existing = cart.find((i) => i.sku === product.sku);
//       const finalQty = existing ? existing.qty + qty : qty;

//       const payload = {
//         cartItem: {
//           sku: product.sku,
//           qty: finalQty,
//           quote_id: id,
//           item_id: existing?.item_id,
//         },
//       };

//       const res = await fetch("/api/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok || data?.message?.includes("Not enough")) {
//         return { success: false, message: "Quantity is not available" };
//       }

//       if (existing) {
//         setCart((prev) =>
//           prev.map((i) =>
//             i.sku === product.sku ? { ...i, qty: finalQty } : i
//           )
//         );
//       } else {
//         setCart((prev) => [
//           ...prev,
//           { ...product, item_id: data.item_id, qty: finalQty },
//         ]);
//       }

//       return { success: true };
//     } catch (err) {
//       console.error("Add to Cart Error:", err);
//       return { success: false, message: "Failed to add product" };
//     }
//   };

//   /* ---------- Update Cart Item ---------- */
//   const updateCartItem = async (item_id: number, qty: number) => {
//     const id = await getCartId();
//     if (!id) return;
//     if (qty <= 0) return removeFromCart(item_id);

//     await fetch("/api/update-cart-item", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id, qty }),
//     });

//     await refreshCart();
//   };

//   /* ---------- Remove from Cart ---------- */
//   const removeFromCart = async (item_id: number) => {
//     try {
//       const id = await getCartId();
//       if (!id) return;

//       const res = await fetch("/api/remove-from-cart", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cartId: id, item_id }),
//       });

//       if (res.ok) await refreshCart();
//     } catch {
//       /* silent */
//     }
//   };

//   /* ---------- Clear Cart ---------- */
//   const clearCart = () => {
//     setCart([]);
//     setCartId(null);
//     localStorage.removeItem("guestCartId");
//   };

//   /* ---------- Load Cart on Start ---------- */
//   useEffect(() => {
//     const init = async () => {
//       const stored = localStorage.getItem("guestCartId");
//       if (stored) {
//         setCartId(stored);
//         await refreshCart();
//       }
//     };
//     init();
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         cartId,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//         clearCart,
//         refreshCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// /* ================= HOOK ================= */
// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };


// "use client";

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// /* ================= TYPES ================= */
// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
//   stock: number;
// };

// export type CartItem = Product & {
//   item_id: number;
//   qty: number;
// };

// type AddToCartResult = {
//   success: boolean;
//   message?: string;
// };

// type CartContextType = {
//   cart: CartItem[];
//   cartId: string | null;
//   addToCart: (product: Product, qty?: number) => Promise<AddToCartResult>;
//   updateCartItem: (item_id: number, qty: number) => Promise<void>;
//   removeFromCart: (item_id: number) => Promise<void>;
//   clearCart: () => Promise<void>;
//   refreshCart: () => Promise<void>;
// };

// /* ================= CONTEXT ================= */
// const CartContext = createContext<CartContextType | null>(null);

// /* ================= PROVIDER ================= */
// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartId, setCartId] = useState<string | null>(null);

//   const saveCartId = (id: string) => {
//     if (!id || id.includes("<!DOCTYPE")) return;
//     localStorage.setItem("guestCartId", id);
//     setCartId(id);
//   };

//   const getCartId = async (): Promise<string> => {
//     let id = cartId || localStorage.getItem("guestCartId");
//     if (id) return id;

//     const res = await fetch("/api/guest-cart", { method: "POST" });
//     const newId = (await res.text()).trim();
//     saveCartId(newId);
//     return newId;
//   };

//   const refreshCart = async () => {
//     try {
//       const id = cartId || localStorage.getItem("guestCartId");
//       if (!id) return;

//       const res = await fetch(`/api/cart?cartId=${id}`);
//       if (!res.ok) return;

//       const data = await res.json();
//       const items: CartItem[] = (data.items || []).map((item: any) => ({
//         item_id: item.item_id,
//         sku: item.sku,
//         title: item.name,
//         price: item.price,
//         qty: item.qty,
//         image: item.extension_attributes?.image,
//         stock: 0,
//       }));
//       setCart(items);
//     } catch {
//       setCart([]);
//     }
//   };

//   const addToCart = async (product: Product, qty = 1): Promise<AddToCartResult> => {
//     try {
//       const id = await getCartId();
//       const existing = cart.find((i) => i.sku === product.sku);
//       const finalQty = existing ? existing.qty + qty : qty;

//       const payload = {
//         cartItem: {
//           sku: product.sku,
//           qty: finalQty,
//           quote_id: id,
//           ...(existing?.item_id && { item_id: existing.item_id }),
//         },
//       };

//       const res = await fetch("/api/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok || data?.message) {
//         return { success: false, message: data?.message || "Add to cart failed" };
//       }

//       if (existing) {
//         setCart((prev) =>
//           prev.map((i) => (i.sku === product.sku ? { ...i, qty: finalQty } : i))
//         );
//       } else {
//         setCart((prev) => [...prev, { ...product, item_id: data.item_id, qty }]);
//       }

//       return { success: true };
//     } catch {
//       return { success: false, message: "Add to cart error" };
//     }
//   };

//   const updateCartItem = async (item_id: number, qty: number) => {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;

//     if (qty <= 0) {
//       await removeFromCart(item_id);
//       return;
//     }

//     await fetch("/api/update-cart-item", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id, qty }),
//     });

//     await refreshCart();
//   };

//   const removeFromCart = async (item_id: number) => {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;

//     await fetch("/api/remove-from-cart", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id }),
//     });

//     await refreshCart();
//   };

//   const clearCart = async () => {
//     setCart([]);
//     setCartId(null);
//     localStorage.removeItem("guestCartId");

//     // 🔹 Generate new guest cart automatically
//     try {
//       const res = await fetch("/api/guest-cart", { method: "POST" });
//       const newId = (await res.text()).trim();
//       localStorage.setItem("guestCartId", newId);
//       setCartId(newId);
//       console.log("🆕 New guestCartId:", newId);
//     } catch (err) {
//       console.error("❌ Failed to generate new guest cart:", err);
//     }
//   };

//   useEffect(() => {
//     const stored = localStorage.getItem("guestCartId");
//     if (stored) {
//       setCartId(stored);
//       refreshCart();
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         cartId,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//         clearCart,
//         refreshCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };


// "use client";

// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// export type Product = {
//   sku: string;
//   title: string;
//   price: number;
//   image?: string;
//   stock: number;
// };

// export type CartItem = Product & {
//   item_id: number;
//   qty: number;
// };

// type AddToCartResult = {
//   success: boolean;
//   message?: string;
// };

// type CartContextType = {
//   cart: CartItem[];
//   cartId: string | null;
//   addToCart: (product: Product, qty?: number) => Promise<AddToCartResult>;
//   updateCartItem: (item_id: number, qty: number) => Promise<void>;
//   removeFromCart: (item_id: number) => Promise<void>;
//   clearCart: () => void;
//   refreshCart: () => Promise<void>;
// };

// const CartContext = createContext<CartContextType | null>(null);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [cartId, setCartId] = useState<string | null>(null);

//   /* ---------- SAVE CART ID ---------- */
//   const saveCartId = (id: string) => {
//     if (!id || id.includes("<!DOCTYPE")) return;
//     localStorage.setItem("guestCartId", id);
//     setCartId(id);
//   };

//   /* ---------- GET / CREATE CART ---------- */
//   const getCartId = async (): Promise<string> => {
//     let id = cartId || localStorage.getItem("guestCartId");
//     if (id) return id;

//     const res = await fetch("/api/guest-cart", { method: "POST" });
//     const newId = (await res.text()).trim();
//     saveCartId(newId);
//     return newId;
//   };

//   /* ---------- REFRESH CART ---------- */
//   const refreshCart = async () => {
//     try {
//       const id = cartId || localStorage.getItem("guestCartId");
//       if (!id) return;

//       const res = await fetch(`/api/cart?cartId=${id}`);
//       if (!res.ok) return;

//       const data = await res.json();

//       const items: CartItem[] = (data.items || []).map((item: any) => ({
//         item_id: item.item_id,
//         sku: item.sku,
//         title: item.name,
//         price: item.price,
//         qty: item.qty,
//         image: item.extension_attributes?.image,
//         stock: 0,
//       }));

//       setCart(items);
//     } catch {
//       setCart([]);
//     }
//   };

//   /* ---------- ADD TO CART ---------- */
//   const addToCart = async (product: Product, qty = 1): Promise<AddToCartResult> => {
//     try {
//       const id = await getCartId();

//       const existing = cart.find((i) => i.sku === product.sku);
//       const finalQty = existing ? existing.qty + qty : qty;

//       const payload = {
//         cartItem: {
//           sku: product.sku,
//           qty: finalQty,
//           quote_id: id,
//           ...(existing?.item_id && { item_id: existing.item_id }),
//         },
//       };

//       const res = await fetch("/api/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok || data?.message) {
//         // 🔹 If cart invalid, clear cart and retry once
//         if (data?.message?.includes("No such entity")) {
//           clearCart();
//           const newId = await getCartId();
//           payload.cartItem.quote_id = newId;

//           const retryRes = await fetch("/api/add-to-cart", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//           });
//           const retryData = await retryRes.json();
//           if (!retryRes.ok || retryData?.message) {
//             return { success: false, message: retryData?.message || "Add to cart failed" };
//           }
//           setCart((prev) => [
//             ...prev,
//             { ...product, item_id: retryData.item_id, qty },
//           ]);
//           return { success: true };
//         }

//         return {
//           success: false,
//           message: data?.message || "Add to cart failed",
//         };
//       }

//       // ✅ UPDATE LOCAL CART
//       if (existing) {
//         setCart((prev) =>
//           prev.map((i) =>
//             i.sku === product.sku ? { ...i, qty: finalQty } : i
//           )
//         );
//       } else {
//         setCart((prev) => [
//           ...prev,
//           { ...product, item_id: data.item_id, qty },
//         ]);
//       }

//       return { success: true };
//     } catch {
//       return { success: false, message: "Add to cart error" };
//     }
//   };

//   /* ---------- UPDATE QTY ---------- */
//   const updateCartItem = async (item_id: number, qty: number) => {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;

//     if (qty <= 0) {
//       await removeFromCart(item_id);
//       return;
//     }

//     await fetch("/api/update-cart-item", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id, qty }),
//     });

//     await refreshCart();
//   };

//   /* ---------- REMOVE ITEM ---------- */
//   const removeFromCart = async (item_id: number) => {
//     const id = cartId || localStorage.getItem("guestCartId");
//     if (!id) return;

//     await fetch("/api/remove-from-cart", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartId: id, item_id }),
//     });

//     await refreshCart();
//   };

//   /* ---------- CLEAR CART ---------- */
//   const clearCart = () => {
//     setCart([]);
//     setCartId(null);
//     localStorage.removeItem("guestCartId");
//   };

//   /* ---------- LOAD CART ON START ---------- */
//   useEffect(() => {
//     const stored = localStorage.getItem("guestCartId");
//     if (stored) {
//       setCartId(stored);
//       refreshCart();
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         cartId,
//         addToCart,
//         updateCartItem,
//         removeFromCart,
//         clearCart,
//         refreshCart,
        
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };



"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* ================= TYPES ================= */

export type Product = {
  sku: string;
  title: string;
  price: number;
  image?: string;
  stock: number;
};

export type CartItem = Product & {
  item_id: number;
  qty: number;
};

type AddToCartResult = {
  success: boolean;
  message?: string;
};

type CartContextType = {
  cart: CartItem[];
  cartId: string | null;

  addToCart: (product: Product, qty?: number) => Promise<AddToCartResult>;
  updateCartItem: (item_id: number, qty: number) => Promise<void>;
  removeFromCart: (item_id: number) => Promise<void>;
  clearCart: () => void;
  refreshCart: () => Promise<void>;

  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

/* ================= PROVIDER ================= */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);

  /* 🔥 DRAWER STATE */
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  /* ---------- SAVE CART ID ---------- */
  const saveCartId = (id: string) => {
    if (!id || id.includes("<!DOCTYPE")) return;
    localStorage.setItem("guestCartId", id);
    setCartId(id);
  };

  /* ---------- GET / CREATE CART ---------- */
  const getCartId = async (): Promise<string> => {
    let id = cartId || localStorage.getItem("guestCartId");
    if (id) return id;

    const res = await fetch("/api/guest-cart", { method: "POST" });
    const newId = (await res.text()).trim();
    saveCartId(newId);
    return newId;
  };

  /* ---------- REFRESH CART ---------- */
  const refreshCart = async () => {
    try {
      const id = cartId || localStorage.getItem("guestCartId");
      if (!id) return;

      const res = await fetch(`/api/cart?cartId=${id}`);
      if (!res.ok) return;

      const data = await res.json();

      const items: CartItem[] = (data.items || []).map((item: any) => ({
        item_id: item.item_id,
        sku: item.sku,
        title: item.name,
        price: item.price,
        qty: item.qty,
        image: item.extension_attributes?.image,
        stock: 0,
      }));

      setCart(items);
    } catch {
      setCart([]);
    }
  };

  /* ---------- ADD TO CART ---------- */
  const addToCart = async (
    product: Product,
    qty = 1
  ): Promise<AddToCartResult> => {
    try {
      const id = await getCartId();

      const existing = cart.find((i) => i.sku === product.sku);
      const finalQty = existing ? existing.qty + qty : qty;

      const payload = {
        cartItem: {
          sku: product.sku,
          qty: finalQty,
          quote_id: id,
          ...(existing?.item_id && { item_id: existing.item_id }),
        },
      };

      const res = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data?.message) {
        return { success: false, message: data?.message };
      }

      if (existing) {
        setCart((prev) =>
          prev.map((i) =>
            i.sku === product.sku ? { ...i, qty: finalQty } : i
          )
        );
      } else {
        setCart((prev) => [
          ...prev,
          { ...product, item_id: data.item_id, qty },
        ]);
      }

      /* 🔥 ENSURE DRAWER OPENS AFTER STATE UPDATE */
      setTimeout(() => openDrawer(), 0);

      return { success: true };
    } catch {
      return { success: false, message: "Add to cart error" };
    }
  };

  /* ---------- UPDATE QTY ---------- */
  // const updateCartItem = async (item_id: number, qty: number) => {
  //   const id = cartId || localStorage.getItem("guestCartId");
  //   if (!id) return;

  //   try {
  //     await fetch("/api/update-cart-item", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ cartId: id, item_id, qty }),
  //     });

  //     await refreshCart();

  //     /* 🔥 KEEP DRAWER OPEN */
  //     setTimeout(() => openDrawer(), 0);
  //   } catch {
  //     throw new Error("Quantity is not available");
  //   }
  // };
  const updateCartItem = async (item_id: number, qty: number) => {
  const id = cartId || localStorage.getItem("guestCartId");
  if (!id) return;

  const res = await fetch("/api/update-cart-item", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartId: id, item_id, qty }),
  });

  const data = await res.json();

  // 🔴 THIS IS THE MISSING PART
  if (!res.ok) {
    throw new Error(data?.message || "Quantity is not available");
  }

  await refreshCart();

  /* 🔥 KEEP DRAWER OPEN */
  setTimeout(() => openDrawer(), 0);
  };


  /* ---------- REMOVE ITEM ---------- */
  const removeFromCart = async (item_id: number) => {
    const id = cartId || localStorage.getItem("guestCartId");
    if (!id) return;

    await fetch("/api/remove-from-cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId: id, item_id }),
    });

    await refreshCart();
  };

  /* ---------- CLEAR CART ---------- */
  const clearCart = () => {
    setCart([]);
    setCartId(null);
    localStorage.removeItem("guestCartId");
    closeDrawer();
  };

  /* ---------- LOAD CART ---------- */
  useEffect(() => {
    const stored = localStorage.getItem("guestCartId");
    if (stored) {
      setCartId(stored);
      refreshCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,

        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refreshCart,

        drawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
