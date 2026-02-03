//flip flop code
// // app/api/fetchProducts/route.ts
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id"); // ?id=10

//     if (!categoryId) {
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     const apiUrl = `https://test.flipflops.cc/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;

//     const res = await fetch(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("API fetch error:", errText);
//       return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
//     }

//     const data = await res.json();

//     // Optional: sirf required fields return karo
//     const products = data.items?.map((item: any) => ({
//       id: item.id,
//       sku: item.sku,
//       name: item.name,
//       price: item.price,
//       image: item.media_gallery_entries?.[0]?.file || null,
//     })) || [];

//     return NextResponse.json(products);
//   } catch (err) {
//     console.error("Server error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }



// app/api/fetchProducts/route.ts
// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken"; // import your token functions

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id"); // ?id=10

//     if (!categoryId) {
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     // ✅ Get Magento token dynamically
//     let token: string;
//     try {
//       token = await getMagentoToken();
//     } catch (err) {
//       console.error("Token fetch error:", err);
//       return NextResponse.json({ error: "Failed to get Magento token" }, { status: 500 });
//     }

//     const apiUrl = `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products?` +
//       `searchCriteria[filter_groups][0][filters][0][field]=category_id&` +
//       `searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&` +
//       `searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;

//     const res = await fetch(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     // ✅ If token expired (401), clear cache and retry once
//     if (res.status === 401) {
//       console.warn("⚠️ Token expired, clearing cached token and retrying...");
//       clearMagentoToken();
//       token = await getMagentoToken();

//       const retryRes = await fetch(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!retryRes.ok) {
//         const errText = await retryRes.text();
//         console.error("Retry API fetch error:", errText);
//         return NextResponse.json({ error: "Failed to fetch products" }, { status: retryRes.status });
//       }

//       const retryData = await retryRes.json();
//       const retryProducts = retryData.items?.map((item: any) => ({
//         id: item.id,
//         sku: item.sku,
//         name: item.name,
//         price: item.price,
//         image: item.media_gallery_entries?.[0]?.file || null,
//       })) || [];

//       return NextResponse.json(retryProducts);
//     }

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("API fetch error:", errText);
//       return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
//     }

//     const data = await res.json();

//     const products = data.items?.map((item: any) => ({
//       id: item.id,
//       sku: item.sku,
//       name: item.name,
//       price: item.price,
//       image: item.media_gallery_entries?.[0]?.file || null,
//     })) || [];

//     return NextResponse.json(products);
//   } catch (err) {
//     console.error("Server error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }





// //app/api/fetchProducts/route.ts
// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken"; // aapka token helper

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id"); // ?id=10

//     if (!categoryId) {
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     // ✅ Get dynamic token
//     let token = await getMagentoToken();

//     const apiUrl = `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products?` +
//       `searchCriteria[filter_groups][0][filters][0][field]=category_id&` +
//       `searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&` +
//       `searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;

//     let res = await fetch(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     // ✅ Retry once if token expired
//     if (res.status === 401) {
//       console.warn("⚠️ Token expired, retrying...");
//       clearMagentoToken();
//       token = await getMagentoToken();
//       res = await fetch(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//     }

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("API fetch error:", errText);
//       return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
//     }

//     const data = await res.json();

//     const products = data.items?.map((item: any) => ({
//       id: item.id,
//       sku: item.sku,
//       name: item.name,
//       price: item.price,
//       images: item.media_gallery_entries?.map((img: any) => img.file) || [],
//     })) || [];

//     return NextResponse.json(products);
//   } catch (err) {
//     console.error("Server error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


// app/api/fetchProducts/route.ts

import { NextResponse } from "next/server";
import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

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

    let token = await getMagentoToken();

    // 🔥 IMPORTANT: fields include media_gallery_entries
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
      cache: "no-store",
    });

    // 🔁 Retry if token expired
    if (res.status === 401) {
      console.warn("⚠️ Token expired, retrying...");
      clearMagentoToken();
      token = await getMagentoToken();

      res = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error("Magento API error:", errText);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: res.status }
      );
    }

    const data = await res.json();
    // ✅ RAW items return karo (frontend khud map karega)
    return NextResponse.json(data.items || []);
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}













//yas code 
// // app/api/fetchProducts/route.ts
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id"); // ?id=10

//     if (!categoryId) {
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     // ✅ Base URL & Basic Auth from env
//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const basicUser = process.env.BASIC_AUTH_USER;
//     const basicPass = process.env.BASIC_AUTH_PASS;

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing BASIC AUTH env variables");
//     }

//     const url = `${baseUrl.replace(/\/$/, "")}/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;

//     const basicAuth = Buffer.from(`${basicUser}:${basicPass}`).toString("base64");

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Authorization": `Basic ${basicAuth}`,
//         "Accept": "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("API fetch error:", errText);
//       return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
//     }

//     const data = await res.json();

//     // Optional: sirf required fields return karo
//     const products = data.items?.map((item: any) => ({
//       id: item.id,
//       sku: item.sku,
//       name: item.name,
//       price: item.price,
//       image: item.media_gallery_entries?.[0]?.file || null,
//     })) || [];

//     return NextResponse.json(products);

//   } catch (err: any) {
//     console.error("Server error:", err);
//     return NextResponse.json({ error: "Internal Server Error", message: err.message }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id");

//     if (!categoryId) {
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     const apiUrl =
//       `https://test.flipflops.cc/rest/V1/products?` +
//       `searchCriteria[filter_groups][0][filters][0][field]=category_ids` +
//       `&searchCriteria[filter_groups][0][filters][0][value]=${categoryId}` +
//       `&searchCriteria[filter_groups][0][filters][0][condition_type]=finset` +
//       `&searchCriteria[filter_groups][1][filters][0][field]=status` +
//       `&searchCriteria[filter_groups][1][filters][0][value]=1` +
//       `&searchCriteria[filter_groups][1][filters][0][condition_type]=eq` +
//       `&searchCriteria[filter_groups][2][filters][0][field]=visibility` +
//       `&searchCriteria[filter_groups][2][filters][0][value]=2,3,4` +
//       `&searchCriteria[filter_groups][2][filters][0][condition_type]=in`;

//     // Basic Auth
//     const username = process.env.BASIC_AUTH_USER;
//     const password = process.env.BASIC_AUTH_PASS;
//     const basicAuth = Buffer.from(`${username}:${password}`).toString("base64");

//     const res = await fetch(apiUrl, {
//       headers: {
//         Authorization: `Basic ${basicAuth}`,
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });

//     const data = await res.json();

//     const products =
//       data.items?.map((item: any) => ({
//         id: item.id,
//         sku: item.sku,
//         name: item.name,
//         price: item.price,
//         image: item.media_gallery_entries?.[0]?.file || null,
//       })) || [];

//     return NextResponse.json(products);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }


// // app/api/fetchProducts/route.ts
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id"); // ?id=123

//     if (!categoryId) {
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     // ✅ Base URL & Basic Auth from env
//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const basicUser = process.env.BASIC_AUTH_USER;
//     const basicPass = process.env.BASIC_AUTH_PASS;

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing BASIC AUTH env variables");
//     }

//     // ✅ Magento API URL with proper filters
//     const url = `${baseUrl.replace(/\/$/, "")}/rest/V1/products?` +
//       `searchCriteria[filter_groups][0][filters][0][field]=category_ids&` +
//       `searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&` +
//       `searchCriteria[filter_groups][0][filters][0][condition_type]=eq&` +
//       `searchCriteria[filter_groups][1][filters][0][field]=status&` +
//       `searchCriteria[filter_groups][1][filters][0][value]=1&` +
//       `searchCriteria[filter_groups][1][filters][0][condition_type]=eq&` +
//       `searchCriteria[filter_groups][2][filters][0][field]=visibility&` +
//       `searchCriteria[filter_groups][2][filters][0][value]=4&` +
//       `searchCriteria[filter_groups][2][filters][0][condition_type]=eq`;

//     const basicAuth = Buffer.from(`${basicUser}:${basicPass}`).toString("base64");

//     console.log("📦 Fetching products for category ID:", categoryId);
//     console.log("🔗 URL:", url);

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Authorization": `Basic ${basicAuth}`,
//         "Accept": "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("API fetch error:", errText);
//       return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
//     }

//     const data = await res.json();

//     console.log("📦 Raw API response for category", categoryId, ":", data.items);

//     // ✅ Map only required fields for frontend
//     const products = data.items?.map((item: any) => ({
//       id: item.id,
//       sku: item.sku,
//       name: item.name,
//       price: item.price,
//       image: item.media_gallery_entries?.[0]?.file
//         ? `${baseUrl}/media/catalog/product${item.media_gallery_entries[0].file}`
//         : "/no-image.png",
//     })) || [];

//     console.log("✅ Products mapped:", products);

//     return NextResponse.json(products);

//   } catch (err: any) {
//     console.error("Server error:", err);
//     return NextResponse.json({ error: "Internal Server Error", message: err.message }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id");

//     if (!categoryId) {
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const basicUser = process.env.BASIC_AUTH_USER;
//     const basicPass = process.env.BASIC_AUTH_PASS;

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing BASIC AUTH env variables");
//     }

//     const url = `${baseUrl.replace(/\/$/, "")}/rest/V1/products?` +
//       `searchCriteria[filter_groups][0][filters][0][field]=category_ids&` +
//       `searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&` +
//       `searchCriteria[filter_groups][0][filters][0][condition_type]=finset&` + // ✅ finset
//       `searchCriteria[filter_groups][1][filters][0][field]=status&` +
//       `searchCriteria[filter_groups][1][filters][0][value]=1&` +
//       `searchCriteria[filter_groups][1][filters][0][condition_type]=eq&` +
//       `searchCriteria[filter_groups][2][filters][0][field]=visibility&` +
//       `searchCriteria[filter_groups][2][filters][0][value]=2,3,4&` + // ✅ in values
//       `searchCriteria[filter_groups][2][filters][0][condition_type]=in`;

//     const basicAuth = Buffer.from(`${basicUser}:${basicPass}`).toString("base64");

//     console.log("📦 Fetching products for category ID:", categoryId);
//     console.log("🔗 URL:", url);

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Authorization": `Basic ${basicAuth}`,
//         "Accept": "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("API fetch error:", errText);
//       return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
//     }

//     const data = await res.json();

//     console.log("📦 Raw API response for category", categoryId, ":", data.items);

//     const products = data.items?.map((item: any) => ({
//       id: item.id,
//       sku: item.sku,
//       name: item.name,
//       price: item.price,
//       image: item.media_gallery_entries?.[0]?.file
//         ? `${baseUrl}/media/catalog/product${item.media_gallery_entries[0].file}`
//         : "/no-image.png",
//     })) || [];

//     console.log("✅ Products mapped:", products);

//     return NextResponse.json(products);

//   } catch (err: any) {
//     console.error("Server error:", err);
//     return NextResponse.json({ error: "Internal Server Error", message: err.message }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     // 1️⃣ URL se category ID lena
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id");

//     if (!categoryId) {
//       console.error("❌ Category ID missing");
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     // 2️⃣ Env variables
//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const basicUser = process.env.BASIC_AUTH_USER;
//     const basicPass = process.env.BASIC_AUTH_PASS;

//     console.log("🛠 Env variables:", {
//       baseUrl,
//       basicUser,
//       basicPass: basicPass ? "****" : null,
//     });

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing BASIC AUTH env variables");
//     }

//     // 3️⃣ Magento API URL
//     const url = `${baseUrl.replace(/\/$/, "")}/rest/V1/products?` +
//   `searchCriteria[filter_groups][0][filters][0][field]=category_ids&` +
//   `searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&` +
//   `searchCriteria[filter_groups][0][filters][0][condition_type]=finset&` +
//   `searchCriteria[filter_groups][1][filters][0][field]=status&` +
//   `searchCriteria[filter_groups][1][filters][0][value]=1&` +
//   `searchCriteria[filter_groups][1][filters][0][condition_type]=eq&` +
//   `searchCriteria[filter_groups][2][filters][0][field]=visibility&` +
//   `searchCriteria[filter_groups][2][filters][0][value]=2,3,4&` + // ✅ comma-separated string
//   `searchCriteria[filter_groups][2][filters][0][condition_type]=in`;


//     console.log("🔗 Fetch URL:", url);

//     // 4️⃣ Basic Auth
//     const basicAuth = Buffer.from(`${basicUser}:${basicPass}`).toString("base64");

//     // 5️⃣ Fetch API
//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Authorization": `Basic ${basicAuth}`,
//         "Accept": "application/json",
//       },
//       cache: "no-store",
//     });

//     console.log("📡 API status:", res.status);

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("❌ API fetch error:", errText);
//       return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
//     }

//     // 6️⃣ Parse JSON response
//     const data = await res.json();
//     console.log("📦 Raw API response (items length):", data.items?.length || 0);
//     console.log("📦 Raw API response full:", data);

//     // 7️⃣ Map products
//     const products = data.items?.map((item: any) => {
//       console.log("🖼 Product raw data:", item);
//       return {
//         id: item.id,
//         sku: item.sku,
//         name: item.name,
//         price: item.price,
//         image: item.media_gallery_entries?.[0]?.file
//           ? `${baseUrl}/media/catalog/product${item.media_gallery_entries[0].file}`
//           : "/no-image.png",
//       };
//     }) || [];

//     console.log("✅ Products mapped:", products);

//     // 8️⃣ Return response
//     return NextResponse.json(products);

//   } catch (err: any) {
//     console.error("💥 Server error:", err);
//     return NextResponse.json({ error: "Internal Server Error", message: err.message }, { status: 500 });
//   }
// }


// // app/api/fetchProducts/route.ts
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     // 1️⃣ URL se category ID lena
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id");

//     if (!categoryId) {
//       console.error("❌ Category ID missing");
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     // 2️⃣ Env variables
//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const basicUser = process.env.BASIC_AUTH_USER;
//     const basicPass = process.env.BASIC_AUTH_PASS;

//     console.log("🛠 Env variables:", {
//       baseUrl,
//       basicUser,
//       basicPass: basicPass ? "****" : null,
//     });

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing BASIC AUTH env variables");
//     }

//     // 3️⃣ Magento API URL (✅ category_id instead of category_ids)
//     const url = `${baseUrl.replace(/\/$/, "")}/rest/V1/products?` +
//       `searchCriteria[filter_groups][0][filters][0][field]=category_id&` +
//       `searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&` +
//       `searchCriteria[filter_groups][0][filters][0][condition_type]=eq&` +
//       `searchCriteria[filter_groups][1][filters][0][field]=status&` +
//       `searchCriteria[filter_groups][1][filters][0][value]=1&` +
//       `searchCriteria[filter_groups][1][filters][0][condition_type]=eq&` +
//       `searchCriteria[filter_groups][2][filters][0][field]=visibility&` +
//       `searchCriteria[filter_groups][2][filters][0][value]=2,3,4&` +
//       `searchCriteria[filter_groups][2][filters][0][condition_type]=in`;

//     console.log("🔗 Fetch URL:", url);

//     // 4️⃣ Basic Auth
//     const basicAuth = Buffer.from(`${basicUser}:${basicPass}`).toString("base64");

//     // 5️⃣ Fetch API
//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Authorization": `Basic ${basicAuth}`,
//         "Accept": "application/json",
//       },
//       cache: "no-store",
//     });

//     console.log("📡 API status:", res.status);

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("❌ API fetch error:", errText);
//       return NextResponse.json({ error: "Failed to fetch products", details: errText }, { status: res.status });
//     }

//     // 6️⃣ Parse JSON response
//     const data = await res.json();
//     console.log("📦 Raw API response (items length):", data.items?.length || 0);

//     // 7️⃣ Map products
//     const products = data.items?.map((item: any) => {
//       console.log("🖼 Product raw data:", item);
//       return {
//         id: item.id,
//         sku: item.sku,
//         name: item.name,
//         price: item.price,
//         image: item.media_gallery_entries?.[0]?.file
//           ? `${baseUrl}/media/catalog/product${item.media_gallery_entries[0].file}`
//           : "/no-image.png",
//       };
//     }) || [];

//     console.log("✅ Products mapped:", products);

//     // 8️⃣ Return response
//     return NextResponse.json(products);

//   } catch (err: any) {
//     console.error("💥 Server error:", err);
//     return NextResponse.json({ error: "Internal Server Error", message: err.message }, { status: 500 });
//   }
// }


// //app/api/fetchProducts/route.ts
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const categoryId = searchParams.get("id");

//     if (!categoryId) {
//       return NextResponse.json({ error: "Category ID missing" }, { status: 400 });
//     }

//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const basicUser = process.env.BASIC_AUTH_USER;
//     const basicPass = process.env.BASIC_AUTH_PASS;

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing BASIC AUTH env variables");
//     }

//     const cleanBaseUrl = baseUrl.replace(/\/$/, "");

//     const url =
//       `${cleanBaseUrl}/rest/V1/products?` +
//       `searchCriteria[filter_groups][0][filters][0][field]=category_id&` +
//       `searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&` +
//       `searchCriteria[filter_groups][0][filters][0][condition_type]=eq&` +
//       `searchCriteria[filter_groups][1][filters][0][field]=status&` +
//       `searchCriteria[filter_groups][1][filters][0][value]=1&` +
//       `searchCriteria[filter_groups][1][filters][0][condition_type]=eq&` +
//       `searchCriteria[filter_groups][2][filters][0][field]=visibility&` +
//       `searchCriteria[filter_groups][2][filters][0][value]=2,3,4&` +
//       `searchCriteria[filter_groups][2][filters][0][condition_type]=in`;

//     const basicAuth = Buffer.from(`${basicUser}:${basicPass}`).toString("base64");

//     const res = await fetch(url, {
//       headers: {
//         Authorization: `Basic ${basicAuth}`,
//         Accept: "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       const errText = await res.text();
//       return NextResponse.json(
//         { error: "Failed to fetch products", details: errText },
//         { status: res.status }
//       );
//     }

//     const data = await res.json();

//     const products =
//       data.items?.map((item: any) => {
//         let image = "/no-image.png";

//         if (item.media_gallery_entries?.[0]?.file) {
//           const file = item.media_gallery_entries[0].file.replace(/^\//, "");
//           image = `${cleanBaseUrl}/media/catalog/product/${file}`;
//         }
        
//         return {
//           id: item.id,
//           sku: item.sku,
//           name: item.name,
//           price: item.price,
//           image,
//         };
//       }) || [];
//       console.log("✅ Products mapped:", products);
//     return NextResponse.json(products);
//   } catch (err: any) {
//     console.error("Server error:", err);
//     return NextResponse.json(
//       { error: "Internal Server Error", message: err.message },
//       { status: 500 }
//     );
//   }
// }


// app/api/fetchProducts/route.ts
// import { NextResponse } from "next/server";

// export const runtime = "nodejs";

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

//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const basicUser = process.env.BASIC_AUTH_USER;
//     const basicPass = process.env.BASIC_AUTH_PASS;

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing env vars");
//     }

//     const cleanBaseUrl = baseUrl.replace(/\/$/, "");

//     // ✅ Gift Card category check
//     const isGiftCardCategory = categoryId === "2023";

//     let url =
//       `${cleanBaseUrl}/rest/V1/products?` +
//       `searchCriteria[filter_groups][0][filters][0][field]=category_id&` +
//       `searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&` +
//       `searchCriteria[filter_groups][0][filters][0][condition_type]=eq&` +
//       `searchCriteria[filter_groups][1][filters][0][field]=status&` +
//       `searchCriteria[filter_groups][1][filters][0][value]=1&` +
//       `searchCriteria[filter_groups][1][filters][0][condition_type]=eq`;

//     // 🎁 Gift Card ke liye visibility relax
//     if (isGiftCardCategory) {
//       url +=
//         `&searchCriteria[filter_groups][2][filters][0][field]=visibility&` +
//         `searchCriteria[filter_groups][2][filters][0][value]=1,2,3,4&` +
//         `searchCriteria[filter_groups][2][filters][0][condition_type]=in`;
//     } else {
//       url +=
//         `&searchCriteria[filter_groups][2][filters][0][field]=visibility&` +
//         `searchCriteria[filter_groups][2][filters][0][value]=2,3,4&` +
//         `searchCriteria[filter_groups][2][filters][0][condition_type]=in`;
//     }

//     const auth = Buffer.from(`${basicUser}:${basicPass}`).toString("base64");

//     const res = await fetch(url, {
//       headers: {
//         Authorization: `Basic ${auth}`,
//         Accept: "application/json",
//       },
//       cache: "no-store",
//     });

//     const data = await res.json();

//     const products =
//       data.items?.map((item: any) => {
//         let image = "/no-image.png";

//         if (item.media_gallery_entries?.[0]?.file) {
//           const file = item.media_gallery_entries[0].file.replace(/^\//, "");
//           image = `${cleanBaseUrl}/media/catalog/product/${file}`;
//         }

//         return {
//           id: item.id,
//           sku: item.sku,
//           name: item.name,
//           price: item.price,
//           type: item.type_id, // 👈 helpful
//           image,
//         };
//       }) || [];

//     console.log("✅ Products:", products);

//     return NextResponse.json(products);
//   } catch (err: any) {
//     console.error("🔥 Product Fetch Error:", err.message);
//     return NextResponse.json(
//       { error: err.message },
//       { status: 500 }
//     );
//   }
// }


