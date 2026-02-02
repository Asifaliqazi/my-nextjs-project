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




// import { NextResponse } from "next/server";

// const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;
// const ADMIN_TOKEN = process.env.MAGENTO_ADMIN_TOKEN!;

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     console.log("📥 Add to cart API body:", body);

//     const { cartItem } = body;

//     if (!cartItem?.quote_id || !cartItem?.sku || !cartItem?.qty) {
//       return NextResponse.json(
//         { message: "Missing quote_id / sku / qty" },
//         { status: 400 }
//       );
//     }

//     const magentoUrl = `${MAGENTO_URL}/rest/V1/guest-carts/${cartItem.quote_id}/items`;

//     console.log("🚀 Magento URL:", magentoUrl);
//     console.log("📤 Payload:", JSON.stringify({ cartItem }));

//     const res = await fetch(magentoUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${ADMIN_TOKEN}`,
//       },
//       body: JSON.stringify({ cartItem }),
//     });

//     const text = await res.text();
//     console.log("📥 Magento response:", text);

//     if (!res.ok) {
//       return NextResponse.json(
//         { message: "Magento rejected add to cart", error: text },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(JSON.parse(text));
//   } catch (err: any) {
//     console.error("❌ Add to cart server error:", err);
//     return NextResponse.json(
//       { message: "Server error", error: err.message },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("📥 Add to cart API body:", body);

//     const { cartItem } = body;

//     if (!cartItem?.quote_id || !cartItem?.sku || !cartItem?.qty) {
//       return NextResponse.json(
//         { message: "Missing quote_id / sku / qty" },
//         { status: 400 }
//       );
//     }

//     // 🔥 FIX: Magento payload mapping
//     const payload = {
//       cartItem: {
//         sku: cartItem.sku,
//         qty: cartItem.qty,
//         quoteId: cartItem.quote_id, // 👈 VERY IMPORTANT
//       },
//     };

//     const magentoUrl = `${MAGENTO_URL}/rest/V1/guest-carts/${cartItem.quote_id}/items`;

//     let token = await getMagentoToken();

//     let res = await fetch(magentoUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     // 🔁 Token expired
//     if (res.status === 401) {
//       clearMagentoToken();
//       token = await getMagentoToken();

//       res = await fetch(magentoUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });
//     }

//     const text = await res.text();
//     console.log("📥 Magento response:", text);

//     if (!res.ok) {
//       return NextResponse.json(
//         { message: "Magento rejected add to cart", error: text },
//         { status: res.status }
//       );
//     }

//     return NextResponse.json(JSON.parse(text));
//   } catch (err: any) {
//     console.error("❌ Add to cart server error:", err);
//     return NextResponse.json(
//       { message: "Server error", error: err.message },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";

// const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("📥 Add to cart API body:", body);

//     const { cartItem } = body;

//     if (!cartItem?.sku || !cartItem?.qty || !cartItem?.quote_id) {
//       return NextResponse.json(
//         { message: "Missing sku / qty / quote_id" },
//         { status: 400 }
//       );
//     }

//     const magentoUrl = `${MAGENTO_URL}/rest/V1/guest-carts/${cartItem.quote_id}/items`;

//     console.log("🚀 Magento URL:", magentoUrl);

//     // 🔥 IMPORTANT: quote_id REMOVE from payload
//     const payload = {
//       cartItem: {
//         sku: cartItem.sku,
//         qty: cartItem.qty,
//       },
//     };

//     console.log("📤 Payload to Magento:", JSON.stringify(payload, null, 2));

//     const res = await fetch(magentoUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // ❌ NO Authorization header for guest cart
//       },
//       body: JSON.stringify(payload),
//     });

//     const text = await res.text();
//     console.log("📥 Magento response:", text);

//     if (!res.ok) {
//       return NextResponse.json(
//         { message: "Magento rejected add to cart", error: text },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(JSON.parse(text));
//   } catch (err: any) {
//     console.error("❌ Add to cart server error:", err);
//     return NextResponse.json(
//       { message: "Server error", error: err.message },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";

// const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;

// export async function POST(req: Request) {
//   try {
//     console.log("🟡 Add to cart API HIT");

//     const body = await req.json();
//     console.log("📥 Request body:", JSON.stringify(body, null, 2));

//     const cartItem = body.cartItem;

//     if (!cartItem?.quote_id || !cartItem?.sku || !cartItem?.qty) {
//       console.error("❌ Missing required fields", cartItem);
//       return NextResponse.json(
//         { message: "Missing quote_id / sku / qty" },
//         { status: 400 }
//       );
//     }

//     const url = `${MAGENTO_URL}/rest/V1/guest-carts/${cartItem.quote_id}/items`;

//     console.log("🌍 Magento URL:", url);
//     console.log("📤 Payload to Magento:", JSON.stringify({ cartItem }, null, 2));

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ cartItem }),
//     });

//     console.log("📡 Magento status:", response.status);

//     const rawText = await response.text();
//     console.log("📥 Magento raw response:", rawText);

//     if (!response.ok) {
//       console.error("❌ Magento error");
//       return NextResponse.json(
//         { message: "Magento error", raw: rawText },
//         { status: response.status }
//       );
//     }

//     const data = JSON.parse(rawText);
//     console.log("✅ Add to cart success:", data);

//     return NextResponse.json(data);
//   } catch (err: any) {
//     console.error("🔥 SERVER CRASH:", err);
//     return NextResponse.json(
//       { message: "Server error", error: err.message },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;

// export async function POST(req: Request) {
//   try {
//     console.log("🟡 Add to cart API HIT");

//     const body = await req.json();
//     console.log("📥 Request body:", body);

//     const { cartItem } = body;

//     // ✅ Validation
//     if (!cartItem?.quote_id || !cartItem?.sku || !cartItem?.qty) {
//       console.error("❌ Missing required fields", cartItem);
//       return NextResponse.json(
//         { message: "Missing quote_id / sku / qty" },
//         { status: 400 }
//       );
//     }

//     const magentoUrl = `${MAGENTO_URL}rest/V1/guest-carts/${cartItem.quote_id}/items`;

//     // ✅ Token from helper
//     let token = await getMagentoToken();

//     console.log("🌍 Magento URL:", magentoUrl);
//     console.log("📤 Payload:", JSON.stringify({ cartItem }, null, 2));

//     let res = await fetch(magentoUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ cartItem }),
//     });

//     // 🔁 Token expired case
//     if (res.status === 401) {
//       console.warn("🔁 Token expired, regenerating...");
//       clearMagentoToken();
//       token = await getMagentoToken();

//       res = await fetch(magentoUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ cartItem }),
//       });
//     }

//     const text = await res.text();
//     console.log("📥 Magento response:", text);

//     if (!res.ok) {
//       return NextResponse.json(
//         { message: "Magento rejected add to cart", error: text },
//         { status: res.status }
//       );
//     }

//     return NextResponse.json(JSON.parse(text));
//   } catch (err: any) {
//     console.error("❌ Add to cart server error:", err);
//     return NextResponse.json(
//       { message: "Server error", error: err.message },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";

// const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL;

// export async function POST(req: Request) {
//   try {
//     const { cartId, sku, qty } = await req.json();

//     const response = await fetch(`${MAGENTO_URL}/rest/V1/guest-carts/${cartId}/items`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         cartItem: {
//           quote_id: cartId,
//           sku,
//           qty
//         }
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json({ message: "Magento add to cart failed", data }, { status: response.status });
//     }

//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("❌ Add to cart error:", err);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

// app/api/add-to-cart/route.ts
// "use server";

// import { NextResponse } from "next/server";

// const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL;

// export async function POST(req: Request) {
//   try {
//     // 1️⃣ Frontend se payload receive karo
//     const { cartItem } = await req.json();
//     console.log("📤 Frontend payload received:", cartItem);

//     if (!cartItem?.sku || !cartItem?.qty || !cartItem?.quote_id) {
//       return NextResponse.json(
//         { success: false, message: "Invalid payload from frontend" },
//         { status: 400 }
//       );
//     }

//     // 2️⃣ Magento ke liye payload convert karo (camelCase quoteId)
//     const magentoPayload = {
//       cartItem: {
//         quoteId: cartItem.quote_id, // camelCase required by Magento
//         sku: cartItem.sku,
//         qty: cartItem.qty
//       }
//     };

//     console.log("📤 Sending to Magento:", JSON.stringify(magentoPayload, null, 2));

//     // 3️⃣ Magento API call
//     const response = await fetch(
//       `${MAGENTO_URL}/rest/V1/guest-carts/${cartItem.quote_id}/items`,
      
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(magentoPayload)
//       }
//     );

//     const data = await response.json();
//     console.log("📥 Magento response:", data);

//     // 4️⃣ Handle Magento errors
//     if (!response.ok) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Magento add to cart failed",
//           data
//         },
//         { status: response.status }
//       );
//     }

//     // 5️⃣ Success response
//     return NextResponse.json({ success: true, data });
//   } catch (err) {
//     console.error("❌ Add to cart error:", err);
//     return NextResponse.json(
//       { success: false, message: "Server error", error: err },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken"; 
// 👆 path apne project ke hisaab se adjust kar lena

const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📥 Add to cart API body:", body);

    const { cartItem } = body;

    if (!cartItem?.quoteId || !cartItem?.sku || !cartItem?.qty) {
      return NextResponse.json(
        { message: "Missing quote_id / sku / qty" },
        { status: 400 }
      );
    }

    const magentoUrl = `${MAGENTO_URL}/rest/V1/guest-carts/${cartItem.quoteId}/items`;

    // 🔑 Auto token (cached / regenerated)
    let token = await getMagentoToken();
    console.log(getMagentoToken());
    console.log("🚀 Magento URL:", magentoUrl);
    console.log("📤 Payload:", JSON.stringify({ cartItem }));

    let res = await fetch(magentoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cartItem }),
    });

    // 🔁 If token expired → clear & retry once
    if (res.status === 401) {
      console.warn("⚠️ Token expired, retrying with new token...");
      clearMagentoToken();
      token = await getMagentoToken();

      res = await fetch(magentoUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItem }),
      });
    }

    const text = await res.text();
    console.log("📥 Magento response:", text);

    if (!res.ok) {
      return NextResponse.json(
        { message: "Magento rejected add to cart", error: text },
        { status: res.status }
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
