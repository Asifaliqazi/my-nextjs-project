//flip flop
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const res = await fetch(process.env.API_BASE_URL!, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     const data = await res.json();
//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("Server-side fetch failed:", err);
//     return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// export async function GET() {
//   try {
//     const token = await getMagentoToken();

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/categories`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         cache: "no-store",
//       }
//     );

//     const text = await res.text();

//     // ❌ Token expired / HTML response
//     if (res.status === 401 || text.startsWith("<")) {
//       console.warn("🔒 Token invalid, clearing cache");
//       clearMagentoToken();
//       throw new Error("Token expired");
//     }

//     const data = JSON.parse(text);
//     return NextResponse.json(data);

//   } catch (err) {
//     console.error("❌ fetchCategories failed:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// export async function GET() {
//   try {
//     const token = await getMagentoToken();

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/categories`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         cache: "no-store",
//       }
//     );

//     const text = await res.text();

//     if (res.status === 401 || text.startsWith("<")) {
//       clearMagentoToken();
//       throw new Error("Token expired");
//     }

//     const data = JSON.parse(text);

//     // ✅ Console log to check
//     console.log("🟢 Raw categories response:", data);

//     return NextResponse.json(data);

//   } catch (err) {
//     console.error("❌ fetchCategories failed:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

// export async function GET() {
//   try {
//     const token = await getMagentoToken();

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/categories`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         cache: "no-store",
//       }
//     );

//     const text = await res.text();

//     // Handle expired token or invalid response
//     if (res.status === 401 || text.startsWith("<")) {
//       clearMagentoToken();
//       throw new Error("Token expired");
//     }

//     const data = JSON.parse(text);

//     // ================= FILTER =================
//     // Remove Slider / Promo / any unwanted categories recursively
//     function filterCategories(cat: any): any {
//       if (!cat || !cat.children_data) return cat;

//       const filteredChildren = cat.children_data
//         .filter(
//           (child: any) =>
//             child.is_active &&
//             !["slider", "promo"].some((word) =>
//               child.name.toLowerCase().includes(word)
//             )
//         )
//         .map((child: any) => filterCategories(child)); // recursive

//       return { ...cat, children_data: filteredChildren };
//     }

//     const filteredData = filterCategories(data);

//     console.log("🟢 Filtered categories response:", filteredData);

//     return NextResponse.json(filteredData);
//   } catch (err) {
//     console.error("❌ fetchCategories failed:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { getMagentoToken, clearMagentoToken } from "@/lib/magentoToken";

export async function GET() {
  try {
    const token = await getMagentoToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const text = await res.text();

    // Handle expired token or invalid response
    if (res.status === 401 || text.startsWith("<")) {
      clearMagentoToken();
      throw new Error("Token expired");
    }

    const data = JSON.parse(text);

    // ================= FILTER =================
    function filterCategories(cat: any): any {
      if (!cat || !cat.children_data) return cat;

      const filteredChildren = cat.children_data
        .filter(
          (child: any) =>
            child.is_active &&
            !["slider", "promo"].some((word) =>
              child.name.toLowerCase().includes(word)
            )
        )
        .map((child: any) => filterCategories(child));

      return { ...cat, children_data: filteredChildren };
    }

    const filteredData = filterCategories(data);

    return NextResponse.json(filteredData);
  } catch (err) {
    console.error("❌ fetchCategories failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}






//yas
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const res = await fetch(process.env.API_BASE_URL!, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//     const data = await res.json();

//     // 🔹 Debug: Print structure to terminal
//     console.log("Fetched categories data:");
//     console.dir(data, { depth: null }); // poora nested object dekhne ke liye

//     // 🔹 Optional: Pretty print
//     // console.log(JSON.stringify(data, null, 2));

//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("Server-side fetch failed:", err);
//     return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const basicUser = process.env.BASIC_AUTH_USER;
//     const basicPass = process.env.BASIC_AUTH_PASS;

//     console.log("📦 CATEGORY FETCH START");

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing BASIC AUTH env variables");
//     }

//     const url = `${baseUrl.replace(/\/$/, "")}/rest/V1/categories`;
//     console.log("➡️ HITTING:", url);

//     const basicAuth = Buffer.from(
//       `${basicUser}:${basicPass}`
//     ).toString("base64");

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Authorization": `Basic ${basicAuth}`,
//         "Accept": "application/json",
//       },
//       cache: "no-store",
//     });

//     console.log("STATUS:", res.status);

//     const raw = await res.text();
//     console.log("RAW RESPONSE (first 200):", raw.slice(0, 200));

//     if (!res.ok) {
//       return NextResponse.json(
//         {
//           success: false,
//           status: res.status,
//           error: raw,
//         },
//         { status: res.status }
//       );
//     }

//     const data = JSON.parse(raw);

//     return NextResponse.json({
//       success: true,
//       categories: data,
//     });

//   } catch (err: any) {
//     console.error("🔥 CATEGORY FETCH ERROR:", err.message);

//     return NextResponse.json(
//       {
//         success: false,
//         error: err.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// /app/api/fetchCategories/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const basicUser = process.env.BASIC_AUTH_USER;
//     const basicPass = process.env.BASIC_AUTH_PASS;

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing BASIC AUTH env variables");
//     }

//     // Construct URL safely
//     const url = `${baseUrl.replace(/\/$/, "")}/rest/V1/categories`;

//     // Basic Auth header
//     const basicAuth = Buffer.from(`${basicUser}:${basicPass}`).toString("base64");

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `Basic ${basicAuth}`,
//         Accept: "application/json",
//       },
//       cache: "no-store",
//     });

//     const raw = await res.text();

//     // Check HTTP status
//     if (!res.ok) {
//       return NextResponse.json(
//         {
//           success: false,
//           status: res.status,
//           error: raw,
//         },
//         { status: res.status }
//       );
//     }

//     // Parse JSON safely
//     let data;
//     try {
//       data = JSON.parse(raw);
//     } catch (err) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Failed to parse JSON response from Magento",
//           raw: raw.slice(0, 200),
//         },
//         { status: 500 }
//       );
//     }

//     // ✅ Return success + categories
//     return NextResponse.json({
//       success: true,
//       categories: data,
//     });
//   } catch (err: any) {
//     console.error("🔥 CATEGORY FETCH ERROR:", err.message);
//     return NextResponse.json(
//       {
//         success: false,
//         error: err.message,
//       },
//       { status: 500 }
//     );
//   }
// }

