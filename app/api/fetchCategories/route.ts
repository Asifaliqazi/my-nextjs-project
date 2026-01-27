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

// export async function GET() {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const token = process.env.INTEGRATION_API_TOKEN;

//     if (!baseUrl || !token) {
//       throw new Error("Environment variables API_BASE_URL or INTEGRATION_API_TOKEN missing");
//     }

//     const url = `${baseUrl}/rest/V1/categories`;

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();

//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("Server-side fetch failed:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }



// // app/api/fetchCategories/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Server-side environment variables (secret, client-side not visible)
//     const baseUrl = process.env.MAGENTO_URL;
//     const token = process.env.MAGENTO_API_TOKEN;
    
//     if (!baseUrl || !token) {
//       throw new Error(
//         "Environment variables MAGENTO_URL or MAGENTO_API_TOKEN missing"
//       );
//     }

//     const url = `${baseUrl}/rest/V1/categories`;

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();

//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("Server-side fetch failed:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     console.log("MAGENTO_URL =", process.env.NEXT_PUBLIC_MAGENTO_URL);
//     console.log("TOKEN_EXISTS =", !!process.env.INTEGRATION_API_TOKEN);

//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const token = process.env.INTEGRATION_API_TOKEN;

//     if (!baseUrl || !token) {
//       return NextResponse.json(
//         { error: "ENV MISSING", baseUrl, tokenExists: !!token },
//         { status: 500 }
//       );
//     }

//     const res = await fetch(`${baseUrl}/rest/V1/categories`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const text = await res.text();
//     return NextResponse.json({ status: res.status, text });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "FAILED" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const apiUrl = process.env.API_BASE_URL;
//     const token = process.env.INTEGRATION_API_TOKEN;

//     // 🔍 DEBUG LOGS
//     console.log("API URL:", apiUrl);
//     console.log("TOKEN EXISTS:", !!token);
//     console.log("TOKEN LENGTH:", token?.length);

//     if (!apiUrl || !token) {
//       console.error("❌ ENV MISSING");
//       return NextResponse.json(
//         { error: "Env vars missing" },
//         { status: 500 }
//       );
//     }

//     const res = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });

//     console.log("Magento status:", res.status);

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("Magento response:", text);
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     return NextResponse.json(data);

//   } catch (err) {
//     console.error("❌ Server-side fetch failed:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const apiUrl = process.env.API_BASE_URL;
//     const token = process.env.INTEGRATION_API_TOKEN;
//     console.log("API URL:", process.env.API_BASE_URL);
//     console.log("Token length:", process.env.INTEGRATION_API_TOKEN?.length);

//     if (!apiUrl || !token) {
//       return NextResponse.json({ error: "Env vars missing" }, { status: 500 });
//     }

//     const res = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("Magento response:", text);
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     return NextResponse.json(data);

//   } catch (err) {
//     console.error("Server-side fetch failed:", err);
//     return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // 🔥 DEBUG LINE (IMPORTANT)
//     console.log("VERCEL TOKEN:", process.env.INTEGRATION_API_TOKEN);

//     const res = await fetch(
//       "https://test.flipflops.cc/rest/V1/categories",
//       {
//         method: "GET",
//         headers: {
//   "Accept": "application/json",
//   "Content-Type": "application/json",
//   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
//   "Referer": "https://my-nextjs-project-five-red.vercel.app",
//   "Origin": "https://my-nextjs-project-five-red.vercel.app"
// },
//         cache: "no-store",
//       }
//     );

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("Magento Error:", res.status, text);

//       return NextResponse.json(
//         { error: "Magento API failed", details: text },
//         { status: res.status }
//       );
//     }

//     const data = await res.json();
//     return NextResponse.json(data);

//   } catch (err: any) {
//     console.error("Fetch crashed:", err);
//     return NextResponse.json(
//       { error: err.message },
//       { status: 500 }
//     );
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



// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const baseUrl = "https://staging.yourartsupplies.com/"; // 👈 MAGENTO BASE URL

//     // ❌ env ki jagah direct value
//     const basicUser = "gkmtqhrawb";
//     const basicPass = "nN8BwhpEum";

//     console.log("📦 CATEGORY FETCH START");

//     if (!baseUrl || !basicUser || !basicPass) {
//       throw new Error("Missing BASIC AUTH credentials");
//     }

//     const url = `${baseUrl.replace(/\/$/, "")}/rest/V1/categories`;
//     console.log("➡️ HITTING:", url);

//     const basicAuth = Buffer.from(
//       `${basicUser}:${basicPass}`
//     ).toString("base64");

//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         Authorization: `Basic ${basicAuth}`,
//         Accept: "application/json",
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



import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
    const basicUser = process.env.BASIC_AUTH_USER;
    const basicPass = process.env.BASIC_AUTH_PASS;

    console.log("📦 CATEGORY FETCH START");

    if (!baseUrl || !basicUser || !basicPass) {
      throw new Error("Missing BASIC AUTH env variables");
    }

    const url = `${baseUrl.replace(/\/$/, "")}/rest/V1/categories`;
    console.log("➡️ HITTING:", url);

    const basicAuth = Buffer.from(
      `${basicUser}:${basicPass}`
    ).toString("base64");

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${basicAuth}`,
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    console.log("STATUS:", res.status);

    const raw = await res.text();
    console.log("RAW RESPONSE (first 200):", raw.slice(0, 200));

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          error: raw,
        },
        { status: res.status }
      );
    }

    const data = JSON.parse(raw);

    return NextResponse.json({
      success: true,
      categories: data,
    });

  } catch (err: any) {
    console.error("🔥 CATEGORY FETCH ERROR:", err.message);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}



// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     console.log("📦 CATEGORY FETCH START");

//     /* ===============================
//        ENV CONFIG
//     =============================== */

//     const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
//     const BASIC_USER = process.env.BASIC_AUTH_USER;
//     const BASIC_PASS = process.env.BASIC_AUTH_PASS;
//     const MAGENTO_TOKEN = process.env.MAGENTO_TOKEN;

//     if (!baseUrl || !BASIC_USER || !BASIC_PASS || !MAGENTO_TOKEN) {
//       throw new Error("Missing ENV variables (URL / Auth / Token)");
//     }

//     /* ===============================
//        URL
//     =============================== */
//     const url = `${baseUrl.replace(/\/$/, "")}/rest/V1/categories`;
//     console.log("➡️ HITTING:", url);

//     /* ===============================
//        BASIC AUTH
//     =============================== */
//     const basicAuth = Buffer.from(
//       `${BASIC_USER}:${BASIC_PASS}`
//     ).toString("base64");

//     /* ===============================
//        FETCH
//     =============================== */
//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         // 🔐 Server Basic Auth
//         Authorization: `Basic ${basicAuth}`,

//         // 🔑 Magento Token
//         "Authorization-Token": `Bearer ${MAGENTO_TOKEN}`,

//         Accept: "application/json",
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


