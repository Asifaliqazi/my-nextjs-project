// import { NextResponse } from "next/server";
// import { createGuestCart } from "@/lib/magento";

// export async function POST() {
//   const cartId = await createGuestCart();
//   return NextResponse.json({ cartId });
// }

// import { NextResponse } from "next/server";
// import { createGuestCart } from "@/lib/magento";

// export async function POST() {
//   try {
//     const cartId = await createGuestCart();
//     return NextResponse.json({ cartId });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: 500 }
//     );
//   }
// }

// app/api/guest-cart/route.ts
// import { NextResponse } from "next/server";
// import { createGuestCart } from "@/lib/magento";

// export async function POST() {
//   try {
//     const cartId = await createGuestCart(); // server-side call
//     return NextResponse.json({ cartId });
//   } catch (err) {
//     return NextResponse.json({ error: "Failed to create guest cart" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const cartId = "guest_" + Date.now(); // simple example
//     return NextResponse.json({ cartId });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
//   }
// }


// // app/api/guest-cart/route.ts
// import { NextResponse } from "next/server";

// const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL;

// export async function POST(req: Request) {
//   try {
//     // Magento guest cart create
//     const response = await fetch(`${MAGENTO_URL}/rest/V1/guest-carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const cartId = await response.text(); // Magento returns string

//     if (!response.ok) {
//       return NextResponse.json(
//         { message: "Magento API failed", cartId },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json({ cartId });
//   } catch (err) {
//     console.error("❌ Guest cart API error:", err);
//     return NextResponse.json({ message: "Server error", error: err }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";

const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL;

export async function POST() {
  try {
    const response = await fetch(`${MAGENTO_URL}/rest/V1/guest-carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const cartId = await response.text(); // string with quotes

    if (!response.ok) {
      return NextResponse.json(
        { message: "Magento API failed" },
        { status: response.status }
      );
    }

    // 🔥 IMPORTANT: string ko clean karo
    const cleanCartId = cartId.replace(/"/g, "");

    // 👇 frontend ko direct string bhejo
    return new NextResponse(cleanCartId, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("❌ Guest cart API error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
