// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { cartId, addressInformation } = await req.json();

//   // 1️⃣ Cart Items
//   const itemsRes = await fetch(
//     `https://test.flipflops.cc/rest/V1/guest-carts/${cartId}/items`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
//       },
//     }
//   );
//   const items = await itemsRes.json();

//   // 2️⃣ Totals
//   const totalsRes = await fetch(
//     `https://test.flipflops.cc/rest/V1/guest-carts/${cartId}/totals-information`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ addressInformation }),
//     }
//   );
//   const totalsData = await totalsRes.json();

//   return NextResponse.json({
//     items,
//     totals: totalsData.totals,
//   });
// }
