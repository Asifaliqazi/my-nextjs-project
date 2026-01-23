// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const sku = searchParams.get("sku");

//   if (!sku) {
//     return NextResponse.json({ error: "SKU missing" }, { status: 400 });
//   }

//   try {
//     const res = await fetch(
//       `https://test.flipflops.cc/rest/V1/products/${sku}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!res.ok) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (err) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sku = searchParams.get("sku");

  if (!sku) {
    return NextResponse.json({ error: "SKU missing" }, { status: 400 });
  }

  try {
    const magentoUrl =
      `https://test.flipflops.cc/rest/V1/products` +
      `?searchCriteria[filter_groups][0][filters][0][field]=sku` +
      `&searchCriteria[filter_groups][0][filters][0][value]=${encodeURIComponent(sku)}` +
      `&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;

    const res = await fetch(magentoUrl, {
      headers: {
        Authorization: `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok || !data.items?.length) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // ✅ product mil gaya
    return NextResponse.json(data.items[0]);
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
