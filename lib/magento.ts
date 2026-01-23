// const BASE_URL = process.env.API_BASE_URL!;
// const TOKEN = process.env.INTEGRATION_API_TOKEN!;

// export async function createGuestCart() {
//   const res = await fetch(`${BASE_URL}/rest/V1/guest-carts`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//       "Content-Type": "application/json",
//     },
//   });

//   return res.json(); // returns guest_cart_id
// }

// export async function addItemToGuestCart(
//   cartId: string,
//   sku: string,
//   qty: number
// ) {
//   const res = await fetch(
//     `${BASE_URL}/rest/V1/guest-carts/${cartId}/items`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         cartItem: {
//           sku,
//           qty,
//           quote_id: cartId,
//         },
//       }),
//     }
//   );

//   return res.json();
// }

const BASE_URL = process.env.API_BASE_URL!;
const TOKEN = process.env.INTEGRATION_API_TOKEN!;

// ✅ CREATE GUEST CART
export async function createGuestCart(): Promise<string> {
  const res = await fetch(`${BASE_URL}/rest/V1/guest-carts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();
  console.log("🧪 guest-cart raw:", text);

  if (!res.ok || text.startsWith("<")) {
    throw new Error("Magento guest-cart API failed");
  }

  return JSON.parse(text); // ✅ string cartId
}

// ✅ ADD ITEM TO GUEST CART
export async function addItemToGuestCart(
  cartId: string,
  sku: string,
  qty: number
) {
  const res = await fetch(
    `${BASE_URL}/rest/V1/guest-carts/${cartId}/items`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        cartItem: {
          sku,
          qty,
          quote_id: cartId,
        },
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("❌ addItem error:", data);
    throw new Error(data.message || "Add to cart failed");
  }

  return data;
}
