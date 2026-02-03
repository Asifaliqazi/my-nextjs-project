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



// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// export async function GET() {
//   try {
//     let token = await getMagentoToken();

//     let res = await fetch(
//       `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products?searchCriteria=`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // 🔁 Token expire ho gaya ho to retry
//     if (res.status === 401) {
//       console.warn("⚠️ Token expired, regenerating...");
//       clearMagentoToken();
//       token = await getMagentoToken();

//       res = await fetch(
//         `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products?searchCriteria=`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     if (!res.ok) {
//       return NextResponse.json({ error: "Magento API error" }, { status: res.status });
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("API error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// export async function GET() {
//   try {
//     let token = await getMagentoToken();
//     console.log("🔑 Using token:", token); // 🔹 token dekh sakte ho

//     let res = await fetch(
//       `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products?searchCriteria=`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // 🔁 Token expire → retry
//     if (res.status === 401) {
//       console.warn("⚠️ Token expired, regenerating...");
//       clearMagentoToken();
//       token = await getMagentoToken();
//       console.log("🔑 New token:", token);

//       res = await fetch(
//         `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products?searchCriteria=`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     // 🔹 Check response status
//     console.log("📦 Magento API response status:", res.status);

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("❌ Magento API failed:", errText);
//       return NextResponse.json({ error: "Magento API error" }, { status: res.status });
//     }

//     const data = await res.json();

//     // 🔹 Log full data to terminal
//     console.log("📦 Magento API response data:", JSON.stringify(data, null, 2));

//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("💥 API error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// export async function GET() {
//   try {
//     let token = await getMagentoToken();
//     console.log("🔑 Using token:", token);

//     // 🔹 Step 1: Get product list
//     let res = await fetch(
//       `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products?searchCriteria=`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // 🔁 Token expired → retry
//     if (res.status === 401) {
//       console.warn("⚠️ Token expired, regenerating...");
//       clearMagentoToken();
//       token = await getMagentoToken();
//       console.log("🔑 New token:", token);

//       res = await fetch(
//         `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products?searchCriteria=`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("❌ Magento API failed:", errText);
//       return NextResponse.json({ error: "Magento API error" }, { status: res.status });
//     }

//     const data = await res.json();

//     // 🔹 Step 2: Fetch stock for each product
//     const productsWithStock = await Promise.all(
//       data.items.map(async (product: any) => {
//         try {
//           const stockRes = await fetch(
//             `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/stockItems/${product.sku}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           if (!stockRes.ok) {
//             console.warn(`⚠️ Stock API failed for SKU: ${product.sku}`);
//             return { ...product, stock: 0, is_in_stock: false };
//           }

//           const stockData = await stockRes.json();

//           return {
//             ...product,
//             stock: stockData.qty,
//             is_in_stock: stockData.is_in_stock,
//           };
//         } catch (err) {
//           console.error(`💥 Stock fetch error for SKU: ${product.sku}`, err);
//           return { ...product, stock: 0, is_in_stock: false };
//         }
//       })
//     );

//     console.log("📦 Products with stock:", JSON.stringify(productsWithStock, null, 2));

//     return NextResponse.json(productsWithStock);
//   } catch (err) {
//     console.error("💥 API error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }


// app/api/product/route.ts
// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const sku = searchParams.get("sku");

//     if (!sku) {
//       return NextResponse.json(
//         { error: "SKU missing" },
//         { status: 400 }
//       );
//     }

//     console.log("👉 API HIT | SKU:", sku);

//     let token = await getMagentoToken();
//     console.log("🔑 Token:", token);

//     /* ========== PRODUCT FETCH ========== */
//     let res = await fetch(
//       `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products/${sku}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         cache: "no-store",
//       }
//     );

//     //console.log("📡 Product API status:", res.status);

//     // 🔁 Token expired
//     if (res.status === 401) {
//       console.warn("⚠️ Token expired, regenerating...");
//       clearMagentoToken();
//       token = await getMagentoToken();

//       res = await fetch(
//         `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products/${sku}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           cache: "no-store",
//         }
//       );
//     }

//     if (!res.ok) {
//       const errText = await res.text();
//       console.error("❌ Product fetch failed:", errText);

//       return NextResponse.json(
//         { error: "Product not found", details: errText },
//         { status: res.status }
//       );
//     }

//     const product = await res.json();

//     /* ========== STOCK FETCH ========== */
//     const stockRes = await fetch(
//       `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/stockItems/${sku}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         cache: "no-store",
//       }
//     );

//     let stockData = { qty: 0, is_in_stock: false };

//     if (stockRes.ok) {
//       stockData = await stockRes.json();
//     }

//     return NextResponse.json({
//       ...product,
//       stock: stockData.qty,
//       is_in_stock: stockData.is_in_stock,
//     });
//   } catch (error) {
//     console.error("💥 API ERROR:", error);
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }



// app/api/product/route.ts
// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const sku = searchParams.get("sku");

//     if (!sku) {
//       return NextResponse.json({ error: "SKU missing" }, { status: 400 });
//     }

//     let token = await getMagentoToken();

//     // 🔹 PRODUCT FETCH
//     let res = await fetch(
//       `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products/${sku}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         cache: "no-store",
//       }
//     );

//     // 🔁 Token expired
//     if (res.status === 401) {
//       clearMagentoToken();
//       token = await getMagentoToken();
//       res = await fetch(
//         `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products/${sku}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           cache: "no-store",
//         }
//       );
//     }

//     if (!res.ok) {
//       const errText = await res.text();
//       return NextResponse.json(
//         { error: "Product not found", details: errText },
//         { status: res.status }
//       );
//     }

//     const product = await res.json();

//     // 🔹 EXTRACT CUSTOM ATTRIBUTES
//     const customAttr = product.custom_attributes || [];
//     const getAttr = (code: string) => {
//       const attr = customAttr.find((a: any) => a.attribute_code === code);
//       return attr ? attr.value : null;
//     };

//     // 🔹 IMAGES
//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL || "";
//     const images = (product.media_gallery_entries || [])
//       .filter((img: any) => img.media_type === "image" && !img.disabled)
//       .map((img: any) => baseUrl + "/pub/media/catalog/product" + img.file);

//     // 🔹 FINAL RESPONSE
//     const responseData = {
//       id: product.id,
//       sku: product.sku,
//       name: product.name,
//       price: product.price,
//       description: getAttr("description") || "",
//       short_description: getAttr("short_description") || "",
//       images,
//       stock: product.extension_attributes?.stock_item?.qty || 0,
//       is_in_stock: product.extension_attributes?.stock_item?.is_in_stock || false,
//     };

//     return NextResponse.json(responseData);
//   } catch (error) {
//     console.error("💥 API ERROR:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sku = searchParams.get("sku");

    if (!sku) {
      return NextResponse.json({ error: "SKU missing" }, { status: 400 });
    }

    let token = await getMagentoToken();

    // 🔹 PRODUCT FETCH
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products/${sku}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    // 🔁 Token expired
    if (res.status === 401) {
      clearMagentoToken();
      token = await getMagentoToken();
      res = await fetch(
        `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/products/${sku}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );
    }

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: "Product not found", details: errText },
        { status: res.status }
      );
    }

    const product = await res.json();

    // 🔹 STOCK MERGE
    const stockItem = product.extension_attributes?.stock_item;
    const responseData = {
      ...product, // pura original product JSON
      stock: stockItem?.qty || 0,
      is_in_stock: stockItem?.is_in_stock || false,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("💥 API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}








// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const sku = searchParams.get("sku");

//   if (!sku) {
//     return NextResponse.json({ error: "SKU missing" }, { status: 400 });
//   }

//   try {
//     const magentoUrl =
//       `https://test.flipflops.cc/rest/V1/products` +
//       `?searchCriteria[filter_groups][0][filters][0][field]=sku` +
//       `&searchCriteria[filter_groups][0][filters][0][value]=${encodeURIComponent(sku)}` +
//       `&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;

//     const res = await fetch(magentoUrl, {
//       headers: {
//         Authorization: `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await res.json();

//     if (!res.ok || !data.items?.length) {
//       return NextResponse.json(
//         { error: "Product not found" },
//         { status: 404 }
//       );
//     }

//     // ✅ product mil gaya
//     return NextResponse.json(data.items[0]);
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }



// app/api/fetchProductBySku/route.ts
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const sku = searchParams.get("sku");

//     if (!sku) {
//       return NextResponse.json({ error: "SKU missing" }, { status: 400 });
//     }

//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const basicUser = process.env.BASIC_AUTH_USER;
//     const basicPass = process.env.BASIC_AUTH_PASS;

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing Magento URL or BASIC AUTH env variables");
//     }

//     const cleanBaseUrl = baseUrl.replace(/\/$/, "");

//     const url =
//       `${cleanBaseUrl}/rest/V1/products?` +
//       `searchCriteria[filter_groups][0][filters][0][field]=sku&` +
//       `searchCriteria[filter_groups][0][filters][0][value]=${encodeURIComponent(sku)}&` +
//       `searchCriteria[filter_groups][0][filters][0][condition_type]=eq`;

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
//         { error: "Failed to fetch product", details: errText },
//         { status: res.status }
//       );
//     }

//     const data = await res.json();

//     if (!data.items?.length) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     const item = data.items[0];

//     let image = "/no-image.png";
//     if (item.media_gallery_entries?.[0]?.file) {
//       const file = item.media_gallery_entries[0].file.replace(/^\//, "");
//       image = `${cleanBaseUrl}/media/catalog/product/${file}`;
//     }

//     const product = {
//   id: item.id,
//   sku: item.sku,
//   name: item.name,
//   price: item.price,
//   image,
//   stock:
//     item.extension_attributes?.stock_item?.qty ??
//     item.extension_attributes?.quantity ??
//     0,
// };


//     console.log("✅ Product fetched:", product);

//     return NextResponse.json(product);
//   } catch (err: any) {
//     console.error("Server error:", err);
//     return NextResponse.json(
//       { error: "Internal Server Error", message: err.message },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const sku = searchParams.get("sku");

//   if (!sku) {
//     return NextResponse.json({ error: "SKU missing" }, { status: 400 });
//   }

//   try {
//     // ✅ Basic auth setup
//     const basicUser = process.env.BASIC_AUTH_USER || "";
//     const basicPass = process.env.BASIC_AUTH_PASS || "";
//     const basicAuth = Buffer.from(`${basicUser}:${basicPass}`).toString("base64");

//     const url = `https://staging.yourartsupplies.com/rest/V1/products/${sku}`;

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `Basic ${basicAuth}`,
//         Accept: "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
