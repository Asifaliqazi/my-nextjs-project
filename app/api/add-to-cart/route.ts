// import { NextResponse } from "next/server";
// import { addItemToGuestCart } from "@/lib/magento";

// export async function POST(req: Request) {
//   const { cartId, sku, qty } = await req.json();

//   const result = await addItemToGuestCart(cartId, sku, qty);

//   return NextResponse.json(result);
// }


// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { cartId, sku, qty } = body;

//     const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const cleanCartId = cartId.replace(/"/g, "");

//     const response = await fetch(`${MAGENTO_URL}/rest/V1/guest-carts/${cleanCartId}/items`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         cartItem: { quote_id: cleanCartId, sku, qty }
//       }),
//     });

//     const data = await response.json();

//     return new Response(JSON.stringify(data), {
//       status: response.status,
//       headers: { "Content-Type": "application/json" },
//     });

//   } catch (err) {
//     return new Response(JSON.stringify({ message: "Server error", error: err }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }


// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { cartId, sku, qty } = body;

//     console.log("🟡 Backend received AddToCart request:", body);

//     if (!cartId || !sku || !qty) {
//       return new Response(JSON.stringify({ message: "Missing cartId / sku / qty" }), { status: 400 });
//     }

//     const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const cleanCartId = String(cartId).replace(/"/g, "");

//     const magentoEndpoint = `${MAGENTO_URL}/rest/V1/guest-carts/${cleanCartId}/items`;
//     console.log("🟡 Hitting Magento API:", magentoEndpoint);

//     const response = await fetch(magentoEndpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartItem: { quote_id: cleanCartId, sku, qty } }),
//     });

//     const data = await response.json();
//     console.log("🟢 Magento Response:", data);

//     return new Response(JSON.stringify(data), {
//       status: response.status,
//       headers: { "Content-Type": "application/json" },
//     });

//   } catch (err) {
//     console.error("🔴 AddToCart API Error:", err);
//     return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";

// const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const cartItem = body.cartItem;
//     if (!cartItem?.quote_id || !cartItem?.sku || !cartItem?.qty) {
//       return NextResponse.json(
//         { message: "Missing quote_id / sku / qty" },
//         { status: 400 }
//       );
//     }

//     const response = await fetch(
//       `${MAGENTO_URL}/rest/V1/guest-carts/${cartItem.quote_id}/items`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ cartItem }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(data, { status: response.status });
//     }

//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("❌ Add to cart API error:", err);
//     return NextResponse.json(
//       { message: "Server error", error: err },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server";

const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;
const ADMIN_TOKEN = process.env.MAGENTO_ADMIN_TOKEN!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📥 Add to cart API body:", body);

    const { cartItem } = body;

    if (!cartItem?.quote_id || !cartItem?.sku || !cartItem?.qty) {
      return NextResponse.json(
        { message: "Missing quote_id / sku / qty" },
        { status: 400 }
      );
    }

    const magentoUrl = `${MAGENTO_URL}/rest/V1/guest-carts/${cartItem.quote_id}/items`;

    console.log("🚀 Magento URL:", magentoUrl);
    console.log("📤 Payload:", JSON.stringify({ cartItem }));

    const res = await fetch(magentoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ cartItem }),
    });

    const text = await res.text();
    console.log("📥 Magento response:", text);

    if (!res.ok) {
      return NextResponse.json(
        { message: "Magento rejected add to cart", error: text },
        { status: 500 }
      );
    }

    return NextResponse.json(JSON.parse(text));
  } catch (err: any) {
    console.error("❌ Add to cart server error:", err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
