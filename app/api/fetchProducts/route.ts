

// app/api/fetchProducts/route.ts

// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id");

//     if (!categoryId) {
//       return NextResponse.json(
//         { error: "Category ID missing" },
//         { status: 400 }
//       );
//     }

//     let token = await getMagentoToken();

//     // 🔥 IMPORTANT: fields include media_gallery_entries
//     const apiUrl =
//       `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products?` +
//       `searchCriteria[filter_groups][0][filters][0][field]=category_id&` +
//       `searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&` +
//       `searchCriteria[filter_groups][0][filters][0][condition_type]=eq&` +
//       `searchCriteria[pageSize]=50&` +
//       `fields=items[id,sku,name,price,type_id,media_gallery_entries,custom_attributes,extension_attributes]`;

//     let res = await fetch(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });

//     // 🔁 Retry if token expired
//     if (res.status === 401) {
//       console.warn("⚠️ Token expired, retrying...");
//       clearMagentoToken();
//       token = await getMagentoToken();

//       res = await fetch(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         cache: "no-store",
//       });
//     }

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("Magento API error:", errText);
//       return NextResponse.json(
//         { error: "Failed to fetch products" },
//         { status: res.status }
//       );
//     }

//     const data = await res.json();
//     // ✅ RAW items return karo (frontend khud map karega)
//     return NextResponse.json(data.items || []);
//   } catch (err) {
//     console.error("Server error:", err);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";
import { unstable_cache } from "next/cache";

// ✅ Magento fetch wrapped in cache
const getCachedCategoryProducts = unstable_cache(
  async (categoryId: string) => {
    let token = await getMagentoToken();

    const apiUrl =
      `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products?` +
      `searchCriteria[filter_groups][0][filters][0][field]=category_id&` +
      `searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&` +
      `searchCriteria[filter_groups][0][filters][0][condition_type]=eq&` +
      `searchCriteria[pageSize]=50&` +
      `fields=items[id,sku,name,price,type_id,media_gallery_entries,custom_attributes,extension_attributes]`;

    let res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // 🔁 Token expired retry (same logic)
    if (res.status === 401) {
      clearMagentoToken();
      token = await getMagentoToken();
      res = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }

    const data = await res.json();
    return data.items || [];
  },
  ["products-by-category"],
  {
    tags: ["products"], // 🔥 important
    revalidate: 300, // 5 min fallback
  }
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("id");

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID missing" },
        { status: 400 }
      );
    }

    const products = await getCachedCategoryProducts(categoryId);
    return NextResponse.json(products);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}











