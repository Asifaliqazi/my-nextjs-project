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



import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.API_BASE_URL;
    const token = process.env.INTEGRATION_API_TOKEN;
    console.log("API URL:", process.env.API_BASE_URL);
    console.log("Token length:", process.env.INTEGRATION_API_TOKEN?.length);

    if (!apiUrl || !token) {
      return NextResponse.json({ error: "Env vars missing" }, { status: 500 });
    }

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Magento response:", text);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (err) {
    console.error("Server-side fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
