// import { NextRequest, NextResponse } from "next/server";

// export async function PUT(req: NextRequest) {
//   try {
//     const { cartId, item_id, qty } = await req.json();

//     if (!cartId || !item_id) {
//       return NextResponse.json(
//         { message: "cartId or item_id missing" },
//         { status: 400 }
//       );
//     }

//     const MAGENTO = process.env.NEXT_PUBLIC_MAGENTO_URL;

//     const res = await fetch(
//       `${MAGENTO}/rest/V1/guest-carts/${cartId}/items/${item_id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           cartItem: {
//             item_id,
//             qty,
//           },
//         }),
//       }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//       console.error("❌ Magento update error:", data);
//       return NextResponse.json(data, { status: res.status });
//     }

//     return NextResponse.json(data);
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Server error", error: String(err) },
//       { status: 500 }
//     );
//   }
// }



import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { cartId, item_id, qty } = await req.json();

    if (!cartId || !item_id || !qty) {
      return NextResponse.json(
        { message: "cartId, item_id or qty missing" },
        { status: 400 }
      );
    }

    const MAGENTO = process.env.NEXT_PUBLIC_MAGENTO_URL;

    const res = await fetch(
      `${MAGENTO}/rest/V1/guest-carts/${cartId}/items/${item_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItem: {
            item_id,
            qty,
            quote_id: cartId, // ✅ important!
          },
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      console.error("❌ Magento update error:", data);
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}
