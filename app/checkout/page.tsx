//single payment method 
// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// type Totals = {
//   grand_total: number;
//   base_grand_total: number;
//   subtotal: number;
//   base_subtotal: number;
//   discount_amount: number;
//   shipping_amount?: number;
//   tax_amount?: number;
// };

// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     country_id: "IN",
//     telephone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [totals, setTotals] = useState<Totals | null>(null);

//   const [paymentMethod, setPaymentMethod] = useState("checkmo"); // COD default

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 🔹 Save Shipping Address
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!cartId) return alert("❌ Cart not initialized");

//     if (
//       !form.firstname ||
//       !form.lastname ||
//       !form.email ||
//       !form.street ||
//       !form.city ||
//       !form.region ||
//       !form.postcode
//     ) {
//       return alert("❌ Please fill all required fields");
//     }

//     const cleanCartId = String(cartId).replace(/"/g, "");

//     const address = {
//       firstname: form.firstname,
//       lastname: form.lastname,
//       email: form.email,
//       street: [form.street],
//       city: form.city,
//       region: form.region,
//       postcode: form.postcode,
//       country_id: form.country_id,
//       telephone: form.telephone || "9999999999",
//       save_in_address_book: 0,
//     };

//     const payload = {
//       cartId: cleanCartId,
//       addressInformation: {
//         shipping_address: address,
//         billing_address: address,
//         shipping_method_code: "flatrate",
//         shipping_carrier_code: "flatrate",
//       },
//     };

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       console.log("📥 Magento API Response:", data);

//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       if (data.totals) setTotals(data.totals);
//       alert("✅ Shipping address saved!");
//     } catch (err: any) {
//       console.error("🔥 Shipping Error:", err);
//       setError(err.message || "Shipping error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Place Order with COD
//   const handlePlaceOrder = async () => {
//     if (!cartId) return alert("❌ Cart not initialized");
//     if (!totals) return alert("❌ Please save shipping first");

//     const cleanCartId = String(cartId).replace(/"/g, "");

//       const payload = {
//       cartId: cartId, // from useCart() or state
//       email: form.email,
//       paymentMethod: { method: "checkmo" },
//       billingAddress: {
//         firstname: form.firstname,
//         lastname: form.lastname,
//         email: form.email,
//         street: [form.street],
//         city: form.city,
//         region: form.region, 
//         postcode: form.postcode,
//         country_id: form.country_id,
//         telephone: form.telephone || "9999999999",
//       },
//     };


//     console.log("💳 Place Order Payload:", payload);

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       console.log("📥 Place Order Response:", data);

//       if (!res.ok) throw new Error(data.message || "Order placement failed");

//       alert("✅ Order placed successfully!");
//     } catch (err: any) {
//       console.error("🔥 Place Order Error:", err);
//       setError(err.message || "Order placement error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row justify-center p-6 gap-6">
//       {/* LEFT SIDE - Shipping Form */}
//       <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow">
//         <h1 className="text-xl font-semibold mb-4 border-b pb-2">Checkout</h1>

//         <form onSubmit={handleSubmitShipping} className="space-y-4">
//           <input name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="street" placeholder="Street Address" value={form.street} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="region" placeholder="State / Region" value={form.region} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="postcode" placeholder="Postal Code" value={form.postcode} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="telephone" placeholder="Phone Number" value={form.telephone} onChange={handleChange} className="w-full p-2 border rounded" />

//           <button type="submit" disabled={loading} className={`w-full py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
//             {loading ? "Saving..." : "Save Shipping"}
//           </button>

//           {error && <p className="text-red-600">{error}</p>}
//         </form>
//       </div>

//       {/* RIGHT SIDE - Order Summary + COD */}
//       {totals && (
//         <div className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-2">Order Summary</h2>

//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>₹{totals.subtotal.toFixed(2)}</span>
//           </div>

//           {totals.shipping_amount !== undefined && (
//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span>₹{totals.shipping_amount.toFixed(2)}</span>
//             </div>
//           )}

//           {totals.tax_amount !== undefined && (
//             <div className="flex justify-between">
//               <span>Tax</span>
//               <span>₹{totals.tax_amount.toFixed(2)}</span>
//             </div>
//           )}

//           <div className="flex justify-between font-bold border-t pt-1">
//             <span>Grand Total</span>
//             <span>₹{totals.grand_total.toFixed(2)}</span>
//           </div>

//           {/* Payment Method - COD */}
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2">Payment Method</h3>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="payment"
//                 value="checkmo"
//                 checked={paymentMethod === "checkmo"}
//                 onChange={() => setPaymentMethod("checkmo")}
//               />
//               Cash on Delivery
//             </label>

//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className={`w-full mt-4 py-2 text-white rounded ${
//                 loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
//               }`}
//             >
//               {loading ? "Placing Order..." : "Place Order"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//double payment method 
// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// type Totals = {
//   grand_total: number;
//   base_grand_total: number;
//   subtotal: number;
//   base_subtotal: number;
//   discount_amount: number;
//   shipping_amount?: number;
//   tax_amount?: number;
// };

// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     country_id: "IN",
//     telephone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [totals, setTotals] = useState<Totals | null>(null);

//   const [paymentMethod, setPaymentMethod] = useState("checkmo"); // default COD

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 🔹 Save Shipping Address
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!cartId) return alert("❌ Cart not initialized");

//     if (
//       !form.firstname ||
//       !form.lastname ||
//       !form.email ||
//       !form.street ||
//       !form.city ||
//       !form.region ||
//       !form.postcode
//     ) {
//       return alert("❌ Please fill all required fields");
//     }

//     const cleanCartId = String(cartId).replace(/"/g, "");

//     const address = {
//       firstname: form.firstname,
//       lastname: form.lastname,
//       email: form.email,
//       street: [form.street],
//       city: form.city,
//       region: form.region,
//       postcode: form.postcode,
//       country_id: form.country_id,
//       telephone: form.telephone || "9999999999",
//       save_in_address_book: 0,
//     };

//     const payload = {
//       cartId: cleanCartId,
//       addressInformation: {
//         shipping_address: address,
//         billing_address: address,
//         shipping_method_code: "flatrate",
//         shipping_carrier_code: "flatrate",
//       },
//     };

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       console.log("📥 Magento API Response:", data);

//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       if (data.totals) setTotals(data.totals);
//       alert("✅ Shipping address saved!");
//     } catch (err: any) {
//       console.error("🔥 Shipping Error:", err);
//       setError(err.message || "Shipping error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Place Order (COD or Stripe)
//   const handlePlaceOrder = async () => {
//     if (!cartId) return alert("❌ Cart not initialized");
//     if (!totals) return alert("❌ Please save shipping first");

//     const cleanCartId = String(cartId).replace(/"/g, "");

//     const payload = {
//       cartId: cleanCartId,
//       email: form.email,
//       paymentMethod: { method: paymentMethod }, // 🔹 dynamic
//       billingAddress: {
//         firstname: form.firstname,
//         lastname: form.lastname,
//         email: form.email,
//         street: [form.street],
//         city: form.city,
//         region: form.region,
//         postcode: form.postcode,
//         country_id: form.country_id,
//         telephone: form.telephone || "9999999999",
//       },
//     };

//     console.log("💳 Place Order Payload:", payload);

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       console.log("📥 Place Order Response:", data);

//       if (!res.ok) throw new Error(data.message || "Order placement failed");

//       alert("✅ Order placed successfully!");
//     } catch (err: any) {
//       console.error("🔥 Place Order Error:", err);
//       setError(err.message || "Order placement error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const paymentOptions = [
//     { code: "checkmo", title: "Cash on Delivery" },
//     { code: "stripe_payments", title: "Credit Card" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row justify-center p-6 gap-6">
//       {/* LEFT SIDE - Shipping Form */}
//       <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow">
//         <h1 className="text-xl font-semibold mb-4 border-b pb-2">Checkout</h1>

//         <form onSubmit={handleSubmitShipping} className="space-y-4">
//           <input name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="street" placeholder="Street Address" value={form.street} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="region" placeholder="State / Region" value={form.region} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="postcode" placeholder="Postal Code" value={form.postcode} onChange={handleChange} className="w-full p-2 border rounded" required />
//           <input name="telephone" placeholder="Phone Number" value={form.telephone} onChange={handleChange} className="w-full p-2 border rounded" />

//           <button type="submit" disabled={loading} className={`w-full py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
//             {loading ? "Saving..." : "Save Shipping"}
//           </button>

//           {error && <p className="text-red-600">{error}</p>}
//         </form>
//       </div>

//       {/* RIGHT SIDE - Order Summary + Payment */}
//       {totals && (
//         <div className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-2">Order Summary</h2>

//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>₹{totals.subtotal.toFixed(2)}</span>
//           </div>

//           {totals.shipping_amount !== undefined && (
//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span>₹{totals.shipping_amount.toFixed(2)}</span>
//             </div>
//           )}

//           {totals.tax_amount !== undefined && (
//             <div className="flex justify-between">
//               <span>Tax</span>
//               <span>₹{totals.tax_amount.toFixed(2)}</span>
//             </div>
//           )}

//           <div className="flex justify-between font-bold border-t pt-1">
//             <span>Grand Total</span>
//             <span>₹{totals.grand_total.toFixed(2)}</span>
//           </div>

//           {/* Payment Method Selection */}
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2">Payment Method</h3>
//             {paymentOptions.map((p) => (
//               <label key={p.code} className="flex items-center gap-2 mt-1">
//                 <input
//                   type="radio"
//                   name="payment"
//                   value={p.code}
//                   checked={paymentMethod === p.code}
//                   onChange={() => setPaymentMethod(p.code)}
//                 />
//                 {p.title}
//               </label>
//             ))}

//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className={`w-full mt-4 py-2 text-white rounded ${
//                 loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
//               }`}
//             >
//               {loading ? "Placing Order..." : "Place Order"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// type Totals = {
//   grand_total: number;
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
// };

// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   const [form, setForm] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     country_id: "IN",
//     telephone: "",
//   });

//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   /* ---------------- SHIPPING SAVE ---------------- */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not ready");

//     const cleanCartId = String(cartId).replace(/"/g, "");

//     const address = {
//       firstname: form.firstname,
//       lastname: form.lastname,
//       email: form.email,
//       street: [form.street],
//       city: form.city,
//       region: form.region,
//       postcode: form.postcode,
//       country_id: form.country_id,
//       telephone: form.telephone || "9999999999",
//       save_in_address_book: 0,
//     };

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: cleanCartId,
//           addressInformation: {
//             shipping_address: address,
//             billing_address: address,
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- PLACE ORDER ---------------- */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: {
//             ...form,
//             street: [form.street],
//             telephone: form.telephone || "9999999999",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       alert("✅ Order placed successfully");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* ================= LEFT : SHIPPING ADDRESS ================= */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="font-semibold text-lg mb-4 border-b pb-2">
//             Shipping Address
//           </h2>

//           {/* <form onSubmit={handleSubmitShipping} className="space-y-3">
//             <input name="email" placeholder="Email Address" onChange={handleChange} className="input" />
//             <div className="border gap-3">
//               <input name="firstname" placeholder="First Name" onChange={handleChange} className="input" />
//             </div>
//               <input name="lastname" placeholder="Last Name" onChange={handleChange} className="input" />
          
//             <input name="street" placeholder="Street Address" onChange={handleChange} className="input" />
//             <input name="city" placeholder="City" onChange={handleChange} className="input" />
//             <input name="region" placeholder="State" onChange={handleChange} className="input" />
//             <input name="postcode" placeholder="Zip Code" onChange={handleChange} className="input" />
//             <input name="telephone" placeholder="Phone Number" onChange={handleChange} className="input" />

//             <button className="w-full bg-blue-600 text-white py-2 rounded">
//               Save Address
//             </button>
//           </form> */}
//           <form onSubmit={handleSubmitShipping} className="space-y-4">

//             <div>
//               <label className="text-sm font-medium block mb-1">Email Address</label>
//               <input
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium block mb-1">First Name</label>
//                 <input
//                   name="firstname"
//                   value={form.firstname}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium block mb-1">Last Name</label>
//                 <input
//                   name="lastname"
//                   value={form.lastname}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-medium block mb-1">Street Address</label>
//               <input
//                 name="street"
//                 value={form.street}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium block mb-1">City</label>
//               <input
//                 name="city"
//                 value={form.city}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium block mb-1">State</label>
//               <input
//                 name="region"
//                 value={form.region}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium block mb-1">Zip Code</label>
//               <input
//                 name="postcode"
//                 value={form.postcode}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium block mb-1">Phone</label>
//               <input
//                 name="telephone"
//                 value={form.telephone}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
//             >
//               Next
//             </button>

//           </form>

//         </div>

//         {/* ================= MIDDLE : SHIPPING + PAYMENT ================= */}
//         <div className="bg-white p-6 rounded shadow space-y-6">
//           <h2 className="font-semibold text-lg border-b pb-2">
//             Shipping Method
//           </h2>
//           <p className="text-sm text-gray-600">
//             Flat Rate – Fixed
//           </p>

//           <h2 className="font-semibold text-lg border-b pb-2">
//             Payment Method
//           </h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           <button
//             disabled={!totals}
//             onClick={handlePlaceOrder}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>
//         </div>

//         {/* ================= RIGHT : ORDER SUMMARY ================= */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="font-semibold text-lg mb-4 border-b pb-2">
//             Order Summary
//           </h2>

//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Save shipping address to see summary
//             </p>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// /* ---------- SMALL HELPER ---------- */
// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );


//validation or cash on delivery
// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= COMPONENT ================= */
// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!form.email) newErrors.email = "Email is required";
//     else if (!/^\S+@\S+\.\S+$/.test(form.email))
//       newErrors.email = "Invalid email address";

//     if (!form.firstname) newErrors.firstname = "First name is required";
//     if (!form.lastname) newErrors.lastname = "Last name is required";
//     if (!form.street) newErrors.street = "Street address is required";
//     if (!form.city) newErrors.city = "City is required";
//     if (!form.region) newErrors.region = "State is required";

//     if (!form.postcode) newErrors.postcode = "Zip code is required";
//     else if (form.postcode.length < 4)
//       newErrors.postcode = "Invalid zip code";

//     if (!form.telephone) newErrors.telephone = "Phone number is required";
//     else if (!/^[0-9]{10}$/.test(form.telephone))
//       newErrors.telephone = "Enter valid 10 digit number";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: {
//               ...form,
//               street: [form.street],
//               save_in_address_book: 0,
//             },
//             billing_address: {
//               ...form,
//               street: [form.street],
//             },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: {
//             ...form,
//             street: [form.street],
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* ===== LEFT : SHIPPING ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Shipping Address
//           </h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email Address" name="email" form={form} errors={errors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={errors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={errors} onChange={handleChange} />
//             </div>
//             <Input label="Street Address" name="street" form={form} errors={errors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={errors} onChange={handleChange} />
//             <Input label="State / Region" name="region" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Zip Code" name="postcode" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Phone Number" name="telephone" form={form} errors={errors} onChange={handleChange} />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
//             >
//               {loading ? "Saving..." : "Save Address"}
//             </button>
//           </form>
//         </div>

//         {/* ===== MIDDLE : PAYMENT ===== */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Payment Method
//           </h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* ===== RIGHT : SUMMARY ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Order Summary
//           </h2>

//           {totals ? (
//             <>
//               <SummaryRow label="Subtotal" value={totals.subtotal} />
//               <SummaryRow label="Shipping" value={totals.shipping_amount || 0} />
//               <SummaryRow label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Save address to view order summary
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= REUSABLE COMPONENTS ================= */
// const Input = ({ label, name, form, errors, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name]}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 focus:ring-2 ${
//         errors[name]
//           ? "border-red-500 focus:ring-red-500"
//           : "border-gray-300 focus:ring-blue-500"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const SummaryRow = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );


// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= COMPONENT ================= */
// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!form.email) newErrors.email = "Email is required";
//     else if (!/^\S+@\S+\.\S+$/.test(form.email))
//       newErrors.email = "Invalid email address";

//     if (!form.firstname) newErrors.firstname = "First name is required";
//     if (!form.lastname) newErrors.lastname = "Last name is required";
//     if (!form.street) newErrors.street = "Street address is required";
//     if (!form.city) newErrors.city = "City is required";
//     if (!form.region) newErrors.region = "State is required";

//     if (!form.postcode) newErrors.postcode = "Zip code is required";
//     if (!form.telephone) newErrors.telephone = "Phone number is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: {
//               ...form,
//               street: [form.street],
//               save_in_address_book: 0,
//             },
//             billing_address: {
//               ...form,
//               street: [form.street],
//             },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     if (paymentMethod === "stripe_payments") {
//       alert("⚠️ Stripe real integration abhi pending hai");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: {
//             ...form,
//             street: [form.street],
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully (COD)");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* ===== LEFT : SHIPPING ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Shipping Address
//           </h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={errors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={errors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={errors} onChange={handleChange} />
//             </div>
//             <Input label="Street Address" name="street" form={form} errors={errors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={errors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Zip Code" name="postcode" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={errors} onChange={handleChange} />

//             <button className="w-full bg-blue-600 text-white py-2 rounded">
//               Save Address
//             </button>
//           </form>
//         </div>

//         {/* ===== MIDDLE : PAYMENT ===== */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Payment Method
//           </h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           {/* CARD OPTIONS */}
//           {paymentMethod === "stripe_payments" && (
//             <div className="border rounded p-4 bg-gray-50">
//               <p className="text-sm mb-2">Card Details</p>
//               <input className="w-full border px-3 py-2 rounded mb-2" placeholder="Card Number" />
//               <div className="grid grid-cols-2 gap-2">
//                 <input className="border px-3 py-2 rounded" placeholder="MM / YY" />
//                 <input className="border px-3 py-2 rounded" placeholder="CVV" />
//               </div>
//               <p className="text-xs text-gray-500 mt-2">
//                 🔒 Secure payment powered by Stripe
//               </p>
//             </div>
//           )}

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* ===== RIGHT : SUMMARY ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Order Summary
//           </h2>

//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Save address to view summary
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name]}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 focus:ring-2 ${
//         errors[name]
//           ? "border-red-500 focus:ring-red-500"
//           : "border-gray-300 focus:ring-blue-500"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );




// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= COMPONENT ================= */
// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] =
//     useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//   };

//   /* ================= VALIDATION ================= */
//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!form.email) newErrors.email = "Email is required";
//     if (!form.firstname) newErrors.firstname = "First name is required";
//     if (!form.lastname) newErrors.lastname = "Last name is required";
//     if (!form.street) newErrors.street = "Street is required";
//     if (!form.city) newErrors.city = "City is required";
//     if (!form.region) newErrors.region = "State is required";
//     if (!form.postcode) newErrors.postcode = "Zip is required";
//     if (!form.telephone) newErrors.telephone = "Phone is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: {
//               ...form,
//               street: [form.street],
//               save_in_address_book: 0,
//             },
//             billing_address: {
//               ...form,
//               street: [form.street],
//             },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     if (paymentMethod === "stripe_payments") {
//       alert("Stripe integration pending");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* ===== SHIPPING ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Shipping Address
//           </h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={errors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={errors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={errors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={errors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={errors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={errors} onChange={handleChange} />

//             <button className="w-full bg-blue-600 text-white py-2 rounded">
//               Next
//             </button>
//           </form>
//         </div>

//         {/* ===== PAYMENT ===== */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Payment Method
//           </h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           {/* BILLING CHECKBOX */}
//           <div className="border rounded p-4 bg-gray-50 space-y-3">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={useSameBilling}
//                 onChange={() => setUseSameBilling(!useSameBilling)}
//               />
//               My billing and shipping address are the same
//             </label>

//             {!useSameBilling && (
//               <div className="space-y-3">
//                 <Input label="First Name" name="firstname" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* ===== SUMMARY ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Order Summary
//           </h2>

//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Save address to view summary
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${
//         errors[name] ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );


// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// type FormData = {
//   firstname: string;
//   lastname: string;
//   street: string;
//   city: string;
//   region: string;
//   postcode: string;
//   telephone: string;
//   country_id: string;
//   email?: string; // optional for billingForm
// };

// /* ================= COMPONENT ================= */
// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState<FormData>({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState<FormData>({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] =
//     useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validateForm = (data: FormData) => {
//     const newErrors: Record<string, string> = {};

//     if (!data.firstname) newErrors.firstname = "First name is required";
//     else if (!/^[A-Za-z\s]+$/.test(data.firstname))
//       newErrors.firstname = "First name should contain only letters";

//     if (!data.lastname) newErrors.lastname = "Last name is required";
//     else if (!/^[A-Za-z\s]+$/.test(data.lastname))
//       newErrors.lastname = "Last name should contain only letters";

//     if (!data.street) newErrors.street = "Street is required";

//     if (!data.city) newErrors.city = "City is required";
//     else if (!/^[A-Za-z\s]+$/.test(data.city))
//       newErrors.city = "City should contain only letters";

//     if (!data.region) newErrors.region = "State is required";
//     else if (!/^[A-Za-z\s]+$/.test(data.region))
//       newErrors.region = "State should contain only letters";

//     if (!data.postcode) newErrors.postcode = "Zip is required";
//     else if (!/^\d{4,10}$/.test(data.postcode))
//       newErrors.postcode = "Zip should contain only numbers";

//     if (!data.telephone) newErrors.telephone = "Phone is required";
//     else if (!/^\d{7,15}$/.test(data.telephone))
//       newErrors.telephone = "Phone should contain only numbers";

//     // Email validation only if present (shippingForm)
//     if ("email" in data) {
//       if (!data.email) newErrors.email = "Email is required";
//       else if (
//         !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email)
//       )
//         newErrors.email = "Please enter a valid email";
//     }

//     return newErrors;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");

//     const shippingErrors = validateForm(form);
//     let billingErrors: Record<string, string> = {};
//     if (!useSameBilling) billingErrors = validateForm(billingForm);

//     const combinedErrors = { ...shippingErrors, ...billingErrors };
//     if (Object.keys(combinedErrors).length > 0) {
//       setErrors(combinedErrors);
//       return;
//     }

//     setErrors({});
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: { ...form, street: [form.street], save_in_address_book: 0 },
//             billing_address: useSameBilling
//               ? { ...form, street: [form.street] }
//               : { ...billingForm, street: [billingForm.street] },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     setLoading(true);
//     setError("");

//     try {
//       if (paymentMethod === "stripe_payments") {
//         alert("Stripe integration pending");
//         setLoading(false);
//         return;
//       }

//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* ===== SHIPPING ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">Shipping Address</h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={errors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={errors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={errors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={errors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={errors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={errors} onChange={handleChange} />

//             <button className="w-full bg-blue-600 text-white py-2 rounded">
//               Next
//             </button>
//           </form>
//         </div>

//         {/* ===== PAYMENT ===== */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">Payment Method</h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           {/* BILLING CHECKBOX */}
//           <div className="border rounded p-4 bg-gray-50 space-y-3">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={useSameBilling}
//                 onChange={() => setUseSameBilling(!useSameBilling)}
//               />
//               My billing and shipping address are the same
//             </label>

//             {!useSameBilling && (
//               <div className="space-y-3">
//                 <Input label="First Name" name="firstname" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} errors={errors} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* ===== SUMMARY ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">Order Summary</h2>

//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">Save address to view summary</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${
//         errors[name] ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );



// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// type FormData = {
//   firstname: string;
//   lastname: string;
//   street: string;
//   city: string;
//   region: string;
//   postcode: string;
//   telephone: string;
//   country_id: string;
//   email?: string; // optional for billingForm
// };

// /* ================= COMPONENT ================= */
// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState<FormData>({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState<FormData>({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] =
//     useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validateForm = (data: FormData) => {
//     const newErrors: Record<string, string> = {};

//     if (!data.firstname) newErrors.firstname = "First name is required";
//     else if (!/^[A-Za-z\s]+$/.test(data.firstname))
//       newErrors.firstname = "First name should contain only letters";

//     if (!data.lastname) newErrors.lastname = "Last name is required";
//     else if (!/^[A-Za-z\s]+$/.test(data.lastname))
//       newErrors.lastname = "Last name should contain only letters";

//     if (!data.street) newErrors.street = "Street is required";

//     if (!data.city) newErrors.city = "City is required";
//     else if (!/^[A-Za-z\s]+$/.test(data.city))
//       newErrors.city = "City should contain only letters";

//     if (!data.region) newErrors.region = "State is required";
//     else if (!/^[A-Za-z\s]+$/.test(data.region))
//       newErrors.region = "State should contain only letters";

//     if (!data.postcode) newErrors.postcode = "Zip is required";
//     else if (!/^\d{4,10}$/.test(data.postcode))
//       newErrors.postcode = "Zip should contain only numbers";

//     if (!data.telephone) newErrors.telephone = "Phone is required";
//     else if (!/^\d{7,15}$/.test(data.telephone))
//       newErrors.telephone = "Phone should contain only numbers";

//     // Email validation only if present (shippingForm)
//     if ("email" in data) {
//       if (!data.email) newErrors.email = "Email is required";
//       else if (
//         !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email)
//       )
//         newErrors.email = "Please enter a valid email";
//     }

//     return newErrors;
//   };

//   const isShippingFormValid = () => {
//     const shippingErrors = validateForm(form);
//     return Object.keys(shippingErrors).length === 0;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");

//     const shippingErrors = validateForm(form);
//     let billingErrors: Record<string, string> = {};
//     if (!useSameBilling) billingErrors = validateForm(billingForm);

//     const combinedErrors = { ...shippingErrors, ...billingErrors };
//     if (Object.keys(combinedErrors).length > 0) {
//       setErrors(combinedErrors);
//       return;
//     }

//     setErrors({});
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: { ...form, street: [form.street], save_in_address_book: 0 },
//             billing_address: useSameBilling
//               ? { ...form, street: [form.street] }
//               : { ...billingForm, street: [billingForm.street] },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     setLoading(true);
//     setError("");

//     try {
//       if (paymentMethod === "stripe_payments") {
//         alert("Stripe integration pending");
//         setLoading(false);
//         return;
//       }

//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* ===== SHIPPING ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">Shipping Address</h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={errors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={errors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={errors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={errors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={errors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={errors} onChange={handleChange} />

//             <button className="w-full bg-blue-600 text-white py-2 rounded">
//               Next
//             </button>
//           </form>
//         </div>

//         {/* ===== PAYMENT ===== */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">Payment Method</h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           {/* BILLING CHECKBOX */}
//           <div className="border rounded p-4 bg-gray-50 space-y-3">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={useSameBilling}
//                 onChange={() => setUseSameBilling(!useSameBilling)}
//               />
//               My billing and shipping address are the same
//             </label>

//             {!useSameBilling && (
//               <div className="space-y-3">
//                 <Input label="First Name" name="firstname" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} errors={errors} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* ===== SUMMARY ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">Order Summary</h2>

//           {isShippingFormValid() && totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Fill all shipping fields to view summary
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${
//         errors[name] ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );


//working code haa full bas validation nahi ha 
// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= COMPONENT ================= */
// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] =
//     useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//   };

//   /* ================= VALIDATION ================= */
//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!form.email) newErrors.email = "Email is required";
//     if (!form.firstname) newErrors.firstname = "First name is required";
//     if (!form.lastname) newErrors.lastname = "Last name is required";
//     if (!form.street) newErrors.street = "Street is required";
//     if (!form.city) newErrors.city = "City is required";
//     if (!form.region) newErrors.region = "State is required";
//     if (!form.postcode) newErrors.postcode = "Zip is required";
//     if (!form.telephone) newErrors.telephone = "Phone is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: {
//               ...form,
//               street: [form.street],
//               save_in_address_book: 0,
//             },
//             billing_address: {
//               ...form,
//               street: [form.street],
//             },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     if (paymentMethod === "stripe_payments") {
//       alert("Stripe integration pending");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* ===== SHIPPING ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Shipping Address
//           </h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={errors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={errors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={errors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={errors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={errors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={errors} onChange={handleChange} />

//             <button className="w-full bg-blue-600 text-white py-2 rounded">
//               Next
//             </button>
//           </form>
//         </div>

//         {/* ===== PAYMENT ===== */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Payment Method
//           </h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           {/* BILLING CHECKBOX */}
//           <div className="border rounded p-4 bg-gray-50 space-y-3">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={useSameBilling}
//                 onChange={() => setUseSameBilling(!useSameBilling)}
//               />
//               My billing and shipping address are the same
//             </label>

//             {!useSameBilling && (
//               <div className="space-y-3">
//                 <Input label="First Name" name="firstname" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* ===== SUMMARY ===== */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Order Summary
//           </h2>

//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Save address to view summary
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${
//         errors[name] ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );



// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= REGEX ================= */
// const nameRegex = /^[A-Za-z ]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const streetRegex = /^[A-Za-z0-9\s,\/-]+$/;
// const zipRegex = /^[0-9]+$/;
// const phoneRegex = /^[0-9]{10,15}$/;

// /* ================= COMPONENT ================= */
// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] =
//     useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//   };

//   /* ================= VALIDATION (SHIPPING ONLY) ================= */
//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!form.email) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(form.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!form.firstname) {
//       newErrors.firstname = "First name is required";
//     } else if (!nameRegex.test(form.firstname)) {
//       newErrors.firstname = "Please enter a valid name";
//     }

//     if (!form.lastname) {
//       newErrors.lastname = "Last name is required";
//     } else if (!nameRegex.test(form.lastname)) {
//       newErrors.lastname = "Please enter a valid last name";
//     }

//     if (!form.street) {
//       newErrors.street = "Street is required";
//     } else if (!streetRegex.test(form.street)) {
//       newErrors.street = "Please enter a valid street address";
//     }

//     if (!form.city) {
//       newErrors.city = "City is required";
//     } else if (!nameRegex.test(form.city)) {
//       newErrors.city = "Please enter a valid city";
//     }

//     if (!form.region) {
//       newErrors.region = "State is required";
//     } else if (!nameRegex.test(form.region)) {
//       newErrors.region = "Please enter a valid state";
//     }

//     if (!form.postcode) {
//       newErrors.postcode = "Zip is required";
//     } else if (!zipRegex.test(form.postcode)) {
//       newErrors.postcode = "Please enter a valid zip code";
//     }

//     if (!form.telephone) {
//       newErrors.telephone = "Phone is required";
//     } else if (!phoneRegex.test(form.telephone)) {
//       newErrors.telephone = "Please enter a valid phone number";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: {
//               ...form,
//               street: [form.street],
//               save_in_address_book: 0,
//             },
//             billing_address: {
//               ...form,
//               street: [form.street],
//             },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     if (paymentMethod === "stripe_payments") {
//       alert("Stripe integration pending");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* SHIPPING */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Shipping Address
//           </h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={errors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={errors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={errors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={errors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={errors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={errors} onChange={handleChange} />

//             <button className="w-full bg-blue-600 text-white py-2 rounded">
//               Next
//             </button>
//           </form>
//         </div>

//         {/* PAYMENT */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Payment Method
//           </h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           <div className="border rounded p-4 bg-gray-50">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={useSameBilling}
//                 onChange={() => setUseSameBilling(!useSameBilling)}
//               />
//               My billing and shipping address are the same
//             </label>
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Order Summary
//           </h2>

//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Save address to view summary
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${
//         errors[name] ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );



// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= REGEX ================= */
// const nameRegex = /^[A-Za-z ]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const streetRegex = /^[A-Za-z0-9\s,\/-]+$/;
// const zipRegex = /^[0-9]+$/;
// const phoneRegex = /^[0-9]{10,15}$/;

// /* ================= COMPONENT ================= */
// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] =
//     useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//   };

//   /* ================= SHIPPING VALIDATION ================= */
//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!form.email) newErrors.email = "Email is required";
//     else if (!emailRegex.test(form.email))
//       newErrors.email = "Please enter a valid email address";

//     if (!form.firstname) newErrors.firstname = "First name is required";
//     else if (!nameRegex.test(form.firstname))
//       newErrors.firstname = "Please enter a valid name";

//     if (!form.lastname) newErrors.lastname = "Last name is required";
//     else if (!nameRegex.test(form.lastname))
//       newErrors.lastname = "Please enter a valid last name";

//     if (!form.street) newErrors.street = "Street is required";
//     else if (!streetRegex.test(form.street))
//       newErrors.street = "Please enter a valid street address";

//     if (!form.city) newErrors.city = "City is required";
//     else if (!nameRegex.test(form.city))
//       newErrors.city = "Please enter a valid city";

//     if (!form.region) newErrors.region = "State is required";
//     else if (!nameRegex.test(form.region))
//       newErrors.region = "Please enter a valid state";

//     if (!form.postcode) newErrors.postcode = "Zip is required";
//     else if (!zipRegex.test(form.postcode))
//       newErrors.postcode = "Please enter a valid zip code";

//     if (!form.telephone) newErrors.telephone = "Phone is required";
//     else if (!phoneRegex.test(form.telephone))
//       newErrors.telephone = "Please enter a valid phone number";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: {
//               ...form,
//               street: [form.street],
//               save_in_address_book: 0,
//             },
//             billing_address: {
//               ...form,
//               street: [form.street],
//             },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* SHIPPING */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Shipping Address
//           </h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={errors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={errors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={errors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={errors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={errors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={errors} onChange={handleChange} />

//             <button className="w-full bg-blue-600 text-white py-2 rounded">
//               Next
//             </button>
//           </form>
//         </div>

//         {/* PAYMENT + BILLING */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Payment Method
//           </h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           <div className="border rounded p-4 bg-gray-50 space-y-3">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={useSameBilling}
//                 onChange={() => setUseSameBilling(!useSameBilling)}
//               />
//               My billing and shipping address are the same
//             </label>

//             {!useSameBilling && (
//               <div className="space-y-3 pt-2">
//                 <Input label="First Name" name="firstname" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Order Summary
//           </h2>

//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Save address to view summary
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${
//         errors[name] ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );




// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= REGEX ================= */
// const nameRegex = /^[A-Za-z ]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const streetRegex = /^[A-Za-z0-9\s,\/-]+$/;
// const zipRegex = /^[0-9]+$/;
// const phoneRegex = /^[0-9]{10,15}$/;

// /* ================= COMPONENT ================= */
// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] =
//     useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   /* ================= SHIPPING + BILLING VALIDATION ================= */
//   const validateForm = (isBilling = false) => {
//     const targetForm = isBilling ? billingForm : form;
//     const newErrors: Record<string, string> = {};

//     if (!isBilling) {
//       if (!targetForm.email) newErrors.email = "Email is required";
//       else if (!emailRegex.test(targetForm.email))
//         newErrors.email = "Please enter a valid email address";
//     }

//     if (!targetForm.firstname) newErrors.firstname = "First name is required";
//     else if (!nameRegex.test(targetForm.firstname))
//       newErrors.firstname = "Please enter a valid name";

//     if (!targetForm.lastname) newErrors.lastname = "Last name is required";
//     else if (!nameRegex.test(targetForm.lastname))
//       newErrors.lastname = "Please enter a valid last name";

//     if (!targetForm.street) newErrors.street = "Street is required";
//     else if (!streetRegex.test(targetForm.street))
//       newErrors.street = "Please enter a valid street address";

//     if (!targetForm.city) newErrors.city = "City is required";
//     else if (!nameRegex.test(targetForm.city))
//       newErrors.city = "Please enter a valid city";

//     if (!targetForm.region) newErrors.region = "State is required";
//     else if (!nameRegex.test(targetForm.region))
//       newErrors.region = "Please enter a valid state";

//     if (!targetForm.postcode) newErrors.postcode = "Zip is required";
//     else if (!zipRegex.test(targetForm.postcode))
//       newErrors.postcode = "Please enter a valid zip code";

//     if (!targetForm.telephone) newErrors.telephone = "Phone is required";
//     else if (!phoneRegex.test(targetForm.telephone))
//       newErrors.telephone = "Please enter a valid phone number";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: {
//               ...form,
//               street: [form.street],
//               save_in_address_book: 0,
//             },
//             billing_address: {
//               ...form,
//               street: [form.street],
//             },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     // Agar billing alag hai to billing validation bhi check karna
//     if (!useSameBilling && !validateForm(true)) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* SHIPPING */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Shipping Address
//           </h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={errors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={errors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={errors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={errors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={errors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={errors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={errors} onChange={handleChange} />

//             <button className="w-full bg-blue-600 text-white py-2 rounded">
//               Next
//             </button>
//           </form>
//         </div>

//         {/* PAYMENT + BILLING */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Payment Method
//           </h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           <div className="border rounded p-4 bg-gray-50 space-y-3">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={useSameBilling}
//                 onChange={() => setUseSameBilling(!useSameBilling)}
//               />
//               My billing and shipping address are the same
//             </label>

//             {!useSameBilling && (
//               <div className="space-y-3 pt-2">
//                 <Input label="First Name" name="firstname" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} errors={errors} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} errors={errors} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Order Summary
//           </h2>

//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Save address to view summary
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${
//         errors[name] ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );


// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= REGEX ================= */
// const nameRegex = /^[A-Za-z ]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const streetRegex = /^[A-Za-z0-9\s,\/-]+$/;
// const zipRegex = /^[0-9]+$/;
// const phoneRegex = /^[0-9]{10,15}$/;

// /* ================= COMPONENT ================= */
// export default function CheckoutPage() {
//   const { cartId } = useCart();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);

//   // 🔥 Separate error states
//   const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
//   const [billingErrors, setBillingErrors] = useState<Record<string, string>>({});

//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] =
//     useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setShippingErrors({ ...shippingErrors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//     setBillingErrors({ ...billingErrors, [e.target.name]: "" });
//   };

//   /* ================= SHIPPING + BILLING VALIDATION ================= */
//   const validateForm = (isBilling = false) => {
//     const targetForm = isBilling ? billingForm : form;
//     const newErrors: Record<string, string> = {};

//     if (!isBilling) {
//       if (!targetForm.email) newErrors.email = "Email is required";
//       else if (!emailRegex.test(targetForm.email))
//         newErrors.email = "Please enter a valid email address";
//     }

//     if (!targetForm.firstname) newErrors.firstname = "First name is required";
//     else if (!nameRegex.test(targetForm.firstname))
//       newErrors.firstname = "Please enter a valid name";

//     if (!targetForm.lastname) newErrors.lastname = "Last name is required";
//     else if (!nameRegex.test(targetForm.lastname))
//       newErrors.lastname = "Please enter a valid last name";

//     if (!targetForm.street) newErrors.street = "Street is required";
//     else if (!streetRegex.test(targetForm.street))
//       newErrors.street = "Please enter a valid street address";

//     if (!targetForm.city) newErrors.city = "City is required";
//     else if (!nameRegex.test(targetForm.city))
//       newErrors.city = "Please enter a valid city";

//     if (!targetForm.region) newErrors.region = "State is required";
//     else if (!nameRegex.test(targetForm.region))
//       newErrors.region = "Please enter a valid state";

//     if (!targetForm.postcode) newErrors.postcode = "Zip is required";
//     else if (!zipRegex.test(targetForm.postcode))
//       newErrors.postcode = "Please enter a valid zip code";

//     if (!targetForm.telephone) newErrors.telephone = "Phone is required";
//     else if (!phoneRegex.test(targetForm.telephone))
//       newErrors.telephone = "Please enter a valid phone number";

//     // 🔥 Set correct error state
//     if (isBilling) setBillingErrors(newErrors);
//     else setShippingErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: {
//               ...form,
//               street: [form.street],
//               save_in_address_book: 0,
//             },
//             billing_address: {
//               ...form,
//               street: [form.street],
//             },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;

//     if (!useSameBilling && !validateForm(true)) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* SHIPPING */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Shipping Address
//           </h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={shippingErrors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={shippingErrors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={shippingErrors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={shippingErrors} onChange={handleChange} />

//             <button className="w-full bg-black text-white py-2 rounded">
//               Next
//             </button>
//           </form>
//         </div>

//         {/* PAYMENT + BILLING */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Payment Method
//           </h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           <div className="border rounded p-4 bg-gray-50 space-y-3">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={useSameBilling}
//                 onChange={() => setUseSameBilling(!useSameBilling)}
//               />
//               My billing and shipping address are the same
//             </label>

//             {!useSameBilling && (
//               <div className="space-y-3 pt-2">
//                 <Input label="First Name" name="firstname" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             Place Order
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Order Summary
//           </h2>

//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Save address to view summary
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${
//         errors[name] ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );



// "use client";

// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= REGEX ================= */
// const nameRegex = /^[A-Za-z ]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const streetRegex = /^[A-Za-z0-9\s,\/-]+$/;
// const zipRegex = /^[0-9]+$/;
// const phoneRegex = /^[0-9]{10,15}$/;

// export default function CheckoutPage() {
//   const { cartId, clearCart } = useCart();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
//   const [billingErrors, setBillingErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setShippingErrors({ ...shippingErrors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//     setBillingErrors({ ...billingErrors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validateForm = (isBilling = false) => {
//     const targetForm = isBilling ? billingForm : form;
//     const newErrors: Record<string, string> = {};

//     if (!isBilling) {
//       if (!targetForm.email) newErrors.email = "Email is required";
//       else if (!emailRegex.test(targetForm.email)) newErrors.email = "Invalid email";
//     }

//     if (!targetForm.firstname) newErrors.firstname = "First name required";
//     else if (!nameRegex.test(targetForm.firstname)) newErrors.firstname = "Invalid name";

//     if (!targetForm.lastname) newErrors.lastname = "Last name required";
//     else if (!nameRegex.test(targetForm.lastname)) newErrors.lastname = "Invalid last name";

//     if (!targetForm.street) newErrors.street = "Street required";
//     else if (!streetRegex.test(targetForm.street)) newErrors.street = "Invalid street";

//     if (!targetForm.city) newErrors.city = "City required";
//     else if (!nameRegex.test(targetForm.city)) newErrors.city = "Invalid city";

//     if (!targetForm.region) newErrors.region = "State required";
//     else if (!nameRegex.test(targetForm.region)) newErrors.region = "Invalid state";

//     if (!targetForm.postcode) newErrors.postcode = "Zip required";
//     else if (!zipRegex.test(targetForm.postcode)) newErrors.postcode = "Invalid zip";

//     if (!targetForm.telephone) newErrors.telephone = "Phone required";
//     else if (!phoneRegex.test(targetForm.telephone)) newErrors.telephone = "Invalid phone";

//     if (isBilling) setBillingErrors(newErrors);
//     else setShippingErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: { ...form, street: [form.street], save_in_address_book: 0 },
//             billing_address: { ...form, street: [form.street] },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;
//     if (!useSameBilling && !validateForm(true)) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");

//       // 🔹 CLEAR CART after order
//       clearCart();

//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* SHIPPING */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">Shipping Address</h2>
//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={shippingErrors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={shippingErrors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={shippingErrors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={shippingErrors} onChange={handleChange} />
//             <button className="w-full bg-black text-white py-2 rounded">{loading ? "Saving..." : "Next"}</button>
//           </form>
//         </div>

//         {/* PAYMENT + BILLING */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">Payment Method</h2>
//           <label className="flex items-center gap-2">
//             <input type="radio" checked={paymentMethod === "checkmo"} onChange={() => setPaymentMethod("checkmo")} />
//             Cash on Delivery
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="radio" checked={paymentMethod === "stripe_payments"} onChange={() => setPaymentMethod("stripe_payments")} />
//             Credit / Debit Card
//           </label>

//           <div className="border rounded p-4 bg-gray-50 space-y-3">
//             <label className="flex items-center gap-2 text-sm">
//               <input type="checkbox" checked={useSameBilling} onChange={() => setUseSameBilling(!useSameBilling)} />
//               My billing and shipping address are the same
//             </label>
//             {!useSameBilling && (
//               <div className="space-y-3 pt-2">
//                 <Input label="First Name" name="firstname" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button onClick={handlePlaceOrder} disabled={!totals || loading} className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50">
//             {loading ? "Placing..." : "Place Order"}
//           </button>
//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">Order Summary</h2>
//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">Save address to view summary</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">{label} <span className="text-red-500">*</span></label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${errors[name] ? "border-red-500" : "border-gray-300"}`}
//     />
//     {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );



// "use client";

// import { useState, useEffect } from "react";
// import { useCart } from "@/context/CartContext";
// import { useRouter } from "next/navigation";


// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= REGEX ================= */
// const nameRegex = /^[A-Za-z ]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const streetRegex = /^[A-Za-z0-9\s,\/-]+$/;
// const zipRegex = /^[0-9]+$/;
// const phoneRegex = /^[0-9]{10,15}$/;

// export default function CheckoutPage() {
//   const { cartId, clearCart } = useCart();
//   const router = useRouter(); // ✅ ye miss tha

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
//   const [billingErrors, setBillingErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setShippingErrors({ ...shippingErrors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//     setBillingErrors({ ...billingErrors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validateForm = (isBilling = false) => {
//     const targetForm = isBilling ? billingForm : form;
//     const newErrors: Record<string, string> = {};

//     if (!isBilling) {
//       if (!targetForm.email) newErrors.email = "Email is required";
//       else if (!emailRegex.test(targetForm.email)) newErrors.email = "Invalid email";
//     }

//     if (!targetForm.firstname) newErrors.firstname = "First name required";
//     else if (!nameRegex.test(targetForm.firstname)) newErrors.firstname = "Invalid name";

//     if (!targetForm.lastname) newErrors.lastname = "Last name required";
//     else if (!nameRegex.test(targetForm.lastname)) newErrors.lastname = "Invalid last name";

//     if (!targetForm.street) newErrors.street = "Street required";
//     else if (!streetRegex.test(targetForm.street)) newErrors.street = "Invalid street";

//     if (!targetForm.city) newErrors.city = "City required";
//     else if (!nameRegex.test(targetForm.city)) newErrors.city = "Invalid city";

//     if (!targetForm.region) newErrors.region = "State required";
//     else if (!nameRegex.test(targetForm.region)) newErrors.region = "Invalid state";

//     if (!targetForm.postcode) newErrors.postcode = "Zip required";
//     else if (!zipRegex.test(targetForm.postcode)) newErrors.postcode = "Invalid zip";

//     if (!targetForm.telephone) newErrors.telephone = "Phone required";
//     else if (!phoneRegex.test(targetForm.telephone)) newErrors.telephone = "Invalid phone";

//     if (isBilling) setBillingErrors(newErrors);
//     else setShippingErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= FETCH TOTALS ON LOAD ================= */
//   useEffect(() => {
//     if (!cartId) return;

//     const fetchTotals = async () => {
//       try {
//         const res = await fetch("/api/magento/shipping", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             cartId: String(cartId).replace(/"/g, ""),
//             addressInformation: {
//               shipping_address: { ...form, street: [form.street], save_in_address_book: 0 },
//               billing_address: { ...form, street: [form.street] },
//               shipping_method_code: "flatrate",
//               shipping_carrier_code: "flatrate",
//             },
//           }),
//         });
//         const data = await res.json();
//         if (res.ok) setTotals(data.totals);
//       } catch (err) {
//         console.error("Failed to fetch totals:", err);
//       }
//     };

//     fetchTotals();
//   }, [cartId]);

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: { ...form, street: [form.street], save_in_address_book: 0 },
//             billing_address: { ...form, street: [form.street] },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
      
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;
//     if (!useSameBilling && !validateForm(true)) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       alert("✅ Order placed successfully");
//       clearCart();
//        // 🔹 Redirect to Thank You page with order ID (optional)
//       router.push(`/thank-you?order=${data.orderId || ""}`);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* SHIPPING */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">Shipping Address</h2>
//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={shippingErrors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={shippingErrors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={shippingErrors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={shippingErrors} onChange={handleChange} />
//             <button className="w-full bg-black text-white py-2 rounded">{loading ? "Saving..." : "Next"}</button>
//           </form>
//         </div>

//         {/* PAYMENT + BILLING */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">Payment Method</h2>
//           <label className="flex items-center gap-2">
//             <input type="radio" checked={paymentMethod === "checkmo"} onChange={() => setPaymentMethod("checkmo")} />
//             Cash on Delivery
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="radio" checked={paymentMethod === "stripe_payments"} onChange={() => setPaymentMethod("stripe_payments")} />
//             Credit / Debit Card
//           </label>
//           <div className="grid grid-cols-2 gap-3">
//           <input placeholder="Card Number" className="border p-2 rounded" />
//           <input placeholder="MM / YY" className="border p-2 rounded" />
//           <input placeholder="CVV" className="border p-2 rounded col-span-2" />
//           </div>

//           <div className="border rounded p-4 bg-gray-50 space-y-3">
//             <label className="flex items-center gap-2 text-sm">
//               <input type="checkbox" checked={useSameBilling} onChange={() => setUseSameBilling(!useSameBilling)} />
//               My billing and shipping address are the same
//             </label>
//             {!useSameBilling && (
//               <div className="space-y-3 pt-2">
//                 <Input label="First Name" name="firstname" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button onClick={handlePlaceOrder} disabled={!totals || loading} className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50">
//             {loading ? "Placing..." : "Place Order"}
//           </button>
//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">Order Summary</h2>
//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">Loading order summary...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">{label} <span className="text-red-500">*</span></label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${errors[name] ? "border-red-500" : "border-gray-300"}`}
//     />
//     {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );



// "use client";

// import { useState, useEffect } from "react";
// import { useCart } from "@/context/CartContext";
// import { useRouter } from "next/navigation";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= REGEX ================= */
// const nameRegex = /^[A-Za-z ]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const streetRegex = /^[A-Za-z0-9\s,\/-]+$/;
// const zipRegex = /^[0-9]+$/;
// const phoneRegex = /^[0-9]{10,15}$/;

// export default function CheckoutPage() {
//   const { cartId, clearCart } = useCart();
//   const router = useRouter();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
//   const [billingErrors, setBillingErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setShippingErrors({ ...shippingErrors, [e.target.name]: "" });
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBillingForm({ ...billingForm, [e.target.name]: e.target.value });
//     setBillingErrors({ ...billingErrors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validateForm = (isBilling = false) => {
//     const targetForm = isBilling ? billingForm : form;
//     const newErrors: Record<string, string> = {};

//     if (!isBilling) {
//       if (!targetForm.email) newErrors.email = "Email is required";
//       else if (!emailRegex.test(targetForm.email)) newErrors.email = "Invalid email";
//     }

//     if (!targetForm.firstname) newErrors.firstname = "First name required";
//     else if (!nameRegex.test(targetForm.firstname)) newErrors.firstname = "Invalid name";

//     if (!targetForm.lastname) newErrors.lastname = "Last name required";
//     else if (!nameRegex.test(targetForm.lastname)) newErrors.lastname = "Invalid last name";

//     if (!targetForm.street) newErrors.street = "Street required";
//     else if (!streetRegex.test(targetForm.street)) newErrors.street = "Invalid street";

//     if (!targetForm.city) newErrors.city = "City required";
//     else if (!nameRegex.test(targetForm.city)) newErrors.city = "Invalid city";

//     if (!targetForm.region) newErrors.region = "State required";
//     else if (!nameRegex.test(targetForm.region)) newErrors.region = "Invalid state";

//     if (!targetForm.postcode) newErrors.postcode = "Zip required";
//     else if (!zipRegex.test(targetForm.postcode)) newErrors.postcode = "Invalid zip";

//     if (!targetForm.telephone) newErrors.telephone = "Phone required";
//     else if (!phoneRegex.test(targetForm.telephone)) newErrors.telephone = "Invalid phone";

//     if (isBilling) setBillingErrors(newErrors);
//     else setShippingErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= FETCH TOTALS ON LOAD ================= */
//   useEffect(() => {
//     if (!cartId) return;

//     const fetchTotals = async () => {
//       try {
//         const res = await fetch("/api/magento/shipping", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             cartId: String(cartId).replace(/"/g, ""),
//             addressInformation: {
//               shipping_address: { ...form, street: [form.street], save_in_address_book: 0 },
//               billing_address: { ...form, street: [form.street] },
//               shipping_method_code: "flatrate",
//               shipping_carrier_code: "flatrate",
//             },
//           }),
//         });
//         const data = await res.json();
//         if (res.ok) setTotals(data.totals);
//       } catch (err) {
//         console.error("Failed to fetch totals:", err);
//       }
//     };

//     fetchTotals();
//   }, [cartId]);

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return alert("Cart not initialized");
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: { ...form, street: [form.street], save_in_address_book: 0 },
//             billing_address: { ...form, street: [form.street] },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Shipping failed");

//       setTotals(data.totals);
      
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;
//     if (!useSameBilling && !validateForm(true)) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Order failed");

//       // alert("✅ Order placed successfully");
//       clearCart();
//       router.push(`/thank-you?order=${data.orderId || ""}`);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* SHIPPING */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">Shipping Address</h2>
//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={shippingErrors} onChange={handleChange} />
//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={shippingErrors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={shippingErrors} onChange={handleChange} />
//             </div>
//             <Input label="Street" name="street" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={shippingErrors} onChange={handleChange} />
//             <button className="w-full bg-black text-white py-2 rounded">{loading ? "Saving..." : "Next"}</button>
//           </form>
//         </div>

//         {/* PAYMENT + BILLING */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">Payment Method</h2>
//           <label className="flex items-center gap-2">
//             <input type="radio" checked={paymentMethod === "checkmo"} onChange={() => setPaymentMethod("checkmo")} />
//             Cash on Delivery
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="radio" checked={paymentMethod === "stripe_payments"} onChange={() => setPaymentMethod("stripe_payments")} />
//             Credit / Debit Card
//           </label>

//           {/* Card fields only show if stripe_payments is selected */}
//           {paymentMethod === "stripe_payments" && (
//             <div className="grid grid-cols-2 gap-3 mt-2">
//               <input placeholder="Card Number" className="border p-2 rounded col-span-2" />
//               <input placeholder="MM / YY" className="border p-2 rounded" />
//               <input placeholder="CVV" className="border p-2 rounded" />
//             </div>
//           )}

//           <div className="border rounded p-4 bg-gray-50 space-y-3 mt-4">
//             <label className="flex items-center gap-2 text-sm">
//               <input type="checkbox" checked={useSameBilling} onChange={() => setUseSameBilling(!useSameBilling)} />
//               My billing and shipping address are the same
//             </label>
//             {!useSameBilling && (
//               <div className="space-y-3 pt-2">
//                 <Input label="First Name" name="firstname" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button onClick={handlePlaceOrder} disabled={!totals || loading} className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50 mt-4">
//             {loading ? "Placing..." : "Place Order"}
//           </button>
//           {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">Order Summary</h2>
//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">Loading order summary...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">{label} <span className="text-red-500">*</span></label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${errors[name] ? "border-red-500" : "border-gray-300"}`}
//     />
//     {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );



// "use client";

// import { useState, useEffect } from "react";
// import { useCart } from "@/context/CartContext";
// import { useRouter } from "next/navigation";

// /* ================= TYPES ================= */
// type Totals = {
//   subtotal: number;
//   shipping_amount?: number;
//   tax_amount?: number;
//   grand_total: number;
// };

// /* ================= REGEX ================= */
// const nameRegex = /^[A-Za-z ]+$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const streetRegex = /^[A-Za-z0-9\s,\/-]+$/;
// const zipRegex = /^[0-9]+$/;
// const phoneRegex = /^[0-9]{10,15}$/;

// export default function CheckoutPage() {
//   const { cartId, clearCart } = useCart();
//   const router = useRouter();

//   /* ---------- SHIPPING FORM ---------- */
//   const [form, setForm] = useState({
//     email: "",
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   /* ---------- BILLING FORM ---------- */
//   const [billingForm, setBillingForm] = useState({
//     firstname: "",
//     lastname: "",
//     street: "",
//     city: "",
//     region: "",
//     postcode: "",
//     telephone: "",
//     country_id: "IN",
//   });

//   const [useSameBilling, setUseSameBilling] = useState(true);
//   const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
//   const [billingErrors, setBillingErrors] = useState<Record<string, string>>({});
//   const [totals, setTotals] = useState<Totals | null>(null);
//   const [paymentMethod, setPaymentMethod] =
//     useState<"checkmo" | "stripe_payments">("checkmo");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= HANDLERS ================= */
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//     setShippingErrors(prev => ({ ...prev, [name]: "" }));
//   };

//   const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setBillingForm(prev => ({ ...prev, [name]: value }));
//     setBillingErrors(prev => ({ ...prev, [name]: "" }));
//   };

//   /* ================= VALIDATION ================= */
//   const validateForm = (isBilling = false) => {
//     const targetForm = isBilling ? billingForm : form;
//     const newErrors: Record<string, string> = {};

//     // ✅ FIXED: email sirf shipping form se check hoga
//     if (!isBilling) {
//       if (!form.email) newErrors.email = "Email is required";
//       else if (!emailRegex.test(form.email))
//         newErrors.email = "Invalid email";
//     }

//     if (!targetForm.firstname)
//       newErrors.firstname = "First name required";
//     else if (!nameRegex.test(targetForm.firstname))
//       newErrors.firstname = "Invalid name";

//     if (!targetForm.lastname)
//       newErrors.lastname = "Last name required";
//     else if (!nameRegex.test(targetForm.lastname))
//       newErrors.lastname = "Invalid last name";

//     if (!targetForm.street)
//       newErrors.street = "Street required";
//     else if (!streetRegex.test(targetForm.street))
//       newErrors.street = "Invalid street";

//     if (!targetForm.city)
//       newErrors.city = "City required";
//     else if (!nameRegex.test(targetForm.city))
//       newErrors.city = "Invalid city";

//     if (!targetForm.region)
//       newErrors.region = "State required";
//     else if (!nameRegex.test(targetForm.region))
//       newErrors.region = "Invalid state";

//     if (!targetForm.postcode)
//       newErrors.postcode = "Zip required";
//     else if (!zipRegex.test(targetForm.postcode))
//       newErrors.postcode = "Invalid zip";

//     if (!targetForm.telephone)
//       newErrors.telephone = "Phone required";
//     else if (!phoneRegex.test(targetForm.telephone))
//       newErrors.telephone = "Invalid phone";

//     if (isBilling) setBillingErrors(newErrors);
//     else setShippingErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= FETCH TOTALS ================= */
//   useEffect(() => {
//     if (!cartId) return;

//     const fetchTotals = async () => {
//       try {
//         const res = await fetch("/api/magento/shipping", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             cartId: String(cartId).replace(/"/g, ""),
//             addressInformation: {
//               shipping_address: {
//                 ...form,
//                 street: [form.street],
//                 save_in_address_book: 0,
//               },
//               billing_address: {
//                 ...form,
//                 street: [form.street],
//               },
//               shipping_method_code: "flatrate",
//               shipping_carrier_code: "flatrate",
//             },
//           }),
//         });

//         const data = await res.json();
//         if (res.ok) setTotals(data.totals);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchTotals();
//   }, [cartId]);

//   /* ================= SAVE SHIPPING ================= */
//   const handleSubmitShipping = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cartId) return;
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/shipping", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           addressInformation: {
//             shipping_address: {
//               ...form,
//               street: [form.street],
//               save_in_address_book: 0,
//             },
//             billing_address: {
//               ...form,
//               street: [form.street],
//             },
//             shipping_method_code: "flatrate",
//             shipping_carrier_code: "flatrate",
//           },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       setTotals(data.totals);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PLACE ORDER ================= */
//   const handlePlaceOrder = async () => {
//     if (!cartId || !totals) return;
//     if (!useSameBilling && !validateForm(true)) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/magento/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cartId: String(cartId).replace(/"/g, ""),
//           email: form.email,
//           paymentMethod: { method: paymentMethod },
//           billingAddress: useSameBilling
//             ? { ...form, street: [form.street] }
//             : { ...billingForm, street: [billingForm.street] },
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       clearCart();
//       router.push(`/thank-you?order=${data.orderId || ""}`);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* SHIPPING */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Shipping Address
//           </h2>

//           <form onSubmit={handleSubmitShipping} className="space-y-4">
//             <Input label="Email" name="email" form={form} errors={shippingErrors} onChange={handleChange} />

//             <div className="grid grid-cols-2 gap-4">
//               <Input label="First Name" name="firstname" form={form} errors={shippingErrors} onChange={handleChange} />
//               <Input label="Last Name" name="lastname" form={form} errors={shippingErrors} onChange={handleChange} />
//             </div>

//             <Input label="Street" name="street" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="City" name="city" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="State" name="region" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="Zip" name="postcode" form={form} errors={shippingErrors} onChange={handleChange} />
//             <Input label="Phone" name="telephone" form={form} errors={shippingErrors} onChange={handleChange} />

//             <button className="w-full bg-black text-white py-2 rounded">
//               {loading ? "Saving..." : "Next"}
//             </button>
//           </form>
//         </div>

//         {/* PAYMENT + BILLING */}
//         <div className="bg-white p-6 rounded shadow space-y-4">
//           <h2 className="text-lg font-semibold border-b pb-2">
//             Payment Method
//           </h2>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "checkmo"}
//               onChange={() => setPaymentMethod("checkmo")}
//             />
//             Cash on Delivery
//           </label>

//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               checked={paymentMethod === "stripe_payments"}
//               onChange={() => setPaymentMethod("stripe_payments")}
//             />
//             Credit / Debit Card
//           </label>

//           {paymentMethod === "stripe_payments" && (
//             <div className="grid grid-cols-2 gap-3">
//               <input className="border p-2 rounded col-span-2" placeholder="Card Number" />
//               <input className="border p-2 rounded" placeholder="MM / YY" />
//               <input className="border p-2 rounded" placeholder="CVV" />
//             </div>
//           )}

//           <div className="border rounded p-4 bg-gray-50 space-y-3">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={useSameBilling}
//                 onChange={() => setUseSameBilling(!useSameBilling)}
//               />
//               My billing and shipping address are the same
//             </label>

//             {!useSameBilling && (
//               <div className="space-y-3">
//                 <Input label="First Name" name="firstname" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Last Name" name="lastname" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Street" name="street" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="City" name="city" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="State" name="region" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Zip" name="postcode" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//                 <Input label="Phone" name="telephone" form={billingForm} errors={billingErrors} onChange={handleBillingChange} />
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handlePlaceOrder}
//             disabled={!totals || loading}
//             className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
//           >
//             {loading ? "Placing..." : "Place Order"}
//           </button>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-lg font-semibold border-b pb-2 mb-4">
//             Order Summary
//           </h2>

//           {totals ? (
//             <>
//               <Row label="Subtotal" value={totals.subtotal} />
//               <Row label="Shipping" value={totals.shipping_amount || 0} />
//               <Row label="Tax" value={totals.tax_amount || 0} />
//               <div className="flex justify-between font-bold border-t pt-2 mt-2">
//                 <span>Order Total</span>
//                 <span>₹{totals.grand_total}</span>
//               </div>
//             </>
//           ) : (
//             <p className="text-gray-500 text-sm">
//               Loading order summary...
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */
// const Input = ({ label, name, form, errors = {}, onChange }: any) => (
//   <div>
//     <label className="text-sm font-medium block mb-1">
//       {label} <span className="text-red-500">*</span>
//     </label>
//     <input
//       name={name}
//       value={form[name] || ""}
//       onChange={onChange}
//       className={`w-full border rounded px-3 py-2 ${
//         errors[name] ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {errors[name] && (
//       <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
//     )}
//   </div>
// );

// const Row = ({ label, value }: { label: string; value: number }) => (
//   <div className="flex justify-between text-sm mb-1">
//     <span>{label}</span>
//     <span>₹{value}</span>
//   </div>
// );


"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */
type Totals = {
  subtotal: number;
  shipping_amount?: number;
  tax_amount?: number;
  grand_total: number;
};

type Region = { id: number; code: string; name: string };

/* ================= REGEX ================= */
const nameRegex = /^[A-Za-z ]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const streetRegex = /^[A-Za-z0-9\s,\/-]+$/;
// ✅ Zip can have letters, numbers, spaces
const zipRegex = /^[A-Za-z0-9 ]+$/;
const phoneRegex = /^[0-9]{10,15}$/;

export default function CheckoutPage() {
  const { cartId, clearCart } = useCart();
  const router = useRouter();

  /* ---------- SHIPPING FORM ---------- */
  const [form, setForm] = useState<any>({
    email: "",
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    region: "",
    region_code: "",
    region_id: 0,
    postcode: "",
    telephone: "",
    country_id: "CA",
  });

  /* ---------- BILLING FORM ---------- */
  const [billingForm, setBillingForm] = useState<any>({
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    region: "",
    region_code: "",
    region_id: 0,
    postcode: "",
    telephone: "",
    country_id: "CA",
  });

  const [regions, setRegions] = useState<Region[]>([]);
  const [useSameBilling, setUseSameBilling] = useState(true);
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [billingErrors, setBillingErrors] = useState<Record<string, string>>({});
  const [totals, setTotals] = useState<Totals | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("banktransfer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH CANADA REGIONS ================= */
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch("/api/magento/countries/CA");
        const data = await res.json();
        if (data.available_regions) setRegions(data.available_regions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRegions();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
    setShippingErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingForm((prev: any) => ({ ...prev, [name]: value }));
    setBillingErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRegionChange = (value: string, isBilling = false) => {
    const matched = regions.find(
      (r) => r.name.toLowerCase() === value.toLowerCase()
    );

    if (isBilling) {
      setBillingForm((prev: any) => ({
        ...prev,
        region: matched ? matched.name : value,
        region_code: matched ? matched.code : "",
        region_id: matched ? matched.id : 0,
      }));
      setBillingErrors((prev) => ({ ...prev, region: "" }));
    } else {
      setForm((prev: any) => ({
        ...prev,
        region: matched ? matched.name : value,
        region_code: matched ? matched.code : "",
        region_id: matched ? matched.id : 0,
      }));
      setShippingErrors((prev) => ({ ...prev, region: "" }));
    }
  };

  /* ================= VALIDATION ================= */
  const validateForm = (isBilling = false) => {
    const targetForm = isBilling ? billingForm : form;
    const newErrors: Record<string, string> = {};

    if (!isBilling) {
      if (!form.email) newErrors.email = "Email is required";
      else if (!emailRegex.test(form.email))
        newErrors.email = "Invalid email";
    }

    if (!targetForm.firstname)
      newErrors.firstname = "First name required";
    else if (!nameRegex.test(targetForm.firstname))
      newErrors.firstname = "Invalid name";

    if (!targetForm.lastname)
      newErrors.lastname = "Last name required";
    else if (!nameRegex.test(targetForm.lastname))
      newErrors.lastname = "Invalid last name";

    if (!targetForm.street)
      newErrors.street = "Street required";
    else if (!streetRegex.test(targetForm.street))
      newErrors.street = "Invalid street";

    if (!targetForm.city)
      newErrors.city = "City required";
    else if (!nameRegex.test(targetForm.city))
      newErrors.city = "Invalid city";

    if (!targetForm.region)
      newErrors.region = "State required";

    if (!targetForm.postcode)
      newErrors.postcode = "Zip required";
    else if (!zipRegex.test(targetForm.postcode))
      newErrors.postcode = "Invalid zip";

    if (!targetForm.telephone)
      newErrors.telephone = "Phone required";
    else if (!phoneRegex.test(targetForm.telephone))
      newErrors.telephone = "Invalid phone";

    if (isBilling) setBillingErrors(newErrors);
    else setShippingErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================= FETCH TOTALS ================= */
  useEffect(() => {
    if (!cartId) return;

    const fetchTotals = async () => {
      try {
        const res = await fetch("/api/magento/shipping", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartId: String(cartId).replace(/"/g, ""),
            addressInformation: {
              shipping_address: {
                ...form,
                street: [form.street],
                save_in_address_book: 0,
              },
              billing_address: {
                ...form,
                street: [form.street],
              },
              shipping_method_code: "flatrate",
              shipping_carrier_code: "flatrate",
            },
          }),
        });
        const data = await res.json();
        if (res.ok) setTotals(data.totals);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTotals();
  }, [cartId, form]);

  /* ================= SAVE SHIPPING ================= */
  const handleSubmitShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartId) return;
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/magento/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: String(cartId).replace(/"/g, ""),
          addressInformation: {
            shipping_address: {
              ...form,
              street: [form.street],
              save_in_address_book: 0,
            },
            billing_address: {
              ...form,
              street: [form.street],
            },
            shipping_method_code: "flatrate",
            shipping_carrier_code: "flatrate",
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setTotals(data.totals);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = async () => {
    if (!cartId || !totals) return;
    if (!useSameBilling && !validateForm(true)) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/magento/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: String(cartId).replace(/"/g, ""),
          email: form.email,
          paymentMethod: { method: paymentMethod },
          billingAddress: useSameBilling
            ? { ...form, street: [form.street] }
            : { ...billingForm, street: [billingForm.street] },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      clearCart();
      router.push(`/thank-you?order=${data.orderId || ""}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SHIPPING */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">
            Shipping Address
          </h2>

          <form onSubmit={handleSubmitShipping} className="space-y-4">
            <Input
              label="Email"
              name="email"
              form={form}
              errors={shippingErrors}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstname"
                form={form}
                errors={shippingErrors}
                onChange={handleChange}
              />
              <Input
                label="Last Name"
                name="lastname"
                form={form}
                errors={shippingErrors}
                onChange={handleChange}
              />
            </div>

            <Input
              label="Street"
              name="street"
              form={form}
              errors={shippingErrors}
              onChange={handleChange}
            />
            <Input
              label="City"
              name="city"
              form={form}
              errors={shippingErrors}
              onChange={handleChange}
            />

            {/* ✅ Region text input */}
            <div>
              <label className="text-sm font-medium block mb-1">
                State / Province <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="region"
                value={form.region}
                onChange={(e) => handleRegionChange(e.target.value)}
                className={`w-full border rounded px-3 py-2 ${
                  shippingErrors.region ? "border-red-500" : "border-gray-300"
                }`}
                list="region-list"
              />
              <datalist id="region-list">
                {regions.map((r) => (
                  <option key={r.id} value={r.name} />
                ))}
              </datalist>
              {shippingErrors.region && (
                <p className="text-red-500 text-xs mt-1">{shippingErrors.region}</p>
              )}
            </div>

            <Input
              label="Zip"
              name="postcode"
              form={form}
              errors={shippingErrors}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="telephone"
              form={form}
              errors={shippingErrors}
              onChange={handleChange}
            />

            <button className="w-full bg-black text-white py-2 rounded">
              {loading ? "Saving..." : "Next"}
            </button>
          </form>
        </div>

        {/* PAYMENT + BILLING */}
        <div className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Payment Method
          </h2>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={paymentMethod === "banktransfer"}
              onChange={() => setPaymentMethod("banktransfer")}
            />
            E-Transfer Payment
          </label>

          <div className="border rounded p-4 bg-gray-50 space-y-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={useSameBilling}
                onChange={() => setUseSameBilling(!useSameBilling)}
              />
              My billing and shipping address are the same
            </label>

            {!useSameBilling && (
              <div className="space-y-3">
                <Input
                  label="First Name"
                  name="firstname"
                  form={billingForm}
                  errors={billingErrors}
                  onChange={handleBillingChange}
                />
                <Input
                  label="Last Name"
                  name="lastname"
                  form={billingForm}
                  errors={billingErrors}
                  onChange={handleBillingChange}
                />
                <Input
                  label="Street"
                  name="street"
                  form={billingForm}
                  errors={billingErrors}
                  onChange={handleBillingChange}
                />
                <Input
                  label="City"
                  name="city"
                  form={billingForm}
                  errors={billingErrors}
                  onChange={handleBillingChange}
                />

                {/* ✅ Billing Region text input */}
                <div>
                  <label className="text-sm font-medium block mb-1">
                    State / Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={billingForm.region}
                    onChange={(e) => handleRegionChange(e.target.value, true)}
                    className={`w-full border rounded px-3 py-2 ${
                      billingErrors.region ? "border-red-500" : "border-gray-300"
                    }`}
                    list="region-list"
                  />
                  {billingErrors.region && (
                    <p className="text-red-500 text-xs mt-1">{billingErrors.region}</p>
                  )}
                </div>

                <Input
                  label="Zip"
                  name="postcode"
                  form={billingForm}
                  errors={billingErrors}
                  onChange={handleBillingChange}
                />
                <Input
                  label="Phone"
                  name="telephone"
                  form={billingForm}
                  errors={billingErrors}
                  onChange={handleBillingChange}
                />
              </div>
            )}
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={!totals || loading}
            className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Placing..." : "Place Order"}
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">
            Order Summary
          </h2>

          {totals ? (
            <>
              <Row label="Subtotal" value={totals.subtotal} />
              <Row label="Shipping" value={totals.shipping_amount || 0} />
              <Row label="Tax" value={totals.tax_amount || 0} />
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Order Total</span>
                <span>₹{totals.grand_total}</span>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm">Loading order summary...</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */
const Input = ({ label, name, form, errors = {}, onChange }: any) => (
  <div>
    <label className="text-sm font-medium block mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      name={name}
      value={form[name] || ""}
      onChange={onChange}
      className={`w-full border rounded px-3 py-2 ${
        errors[name] ? "border-red-500" : "border-gray-300"
      }`}
    />
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
  </div>
);

const Row = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between text-sm mb-1">
    <span>{label}</span>
    <span>₹{value}</span>
  </div>
);
