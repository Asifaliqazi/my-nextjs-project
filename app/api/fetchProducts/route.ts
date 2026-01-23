// // app/api/fetchProducts/route.ts
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     const res = await fetch(`https://test.flipflops.cc/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${id}&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`, {
//       headers: {
//         "Authorization": `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("API fetch error:", errText);
//       return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("Server error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

//full working route
// app/api/fetchProducts/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("id"); // ?id=10

    if (!categoryId) {
      return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
    }

    const apiUrl = `https://test.flipflops.cc/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;

    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("API fetch error:", errText);
      return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
    }

    const data = await res.json();

    // Optional: sirf required fields return karo
    const products = data.items?.map((item: any) => ({
      id: item.id,
      sku: item.sku,
      name: item.name,
      price: item.price,
      image: item.media_gallery_entries?.[0]?.file || null,
    })) || [];

    return NextResponse.json(products);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
