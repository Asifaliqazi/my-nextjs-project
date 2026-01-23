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



// app/api/fetchCategories/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MAGENTO_URL;
    const token = process.env.INTEGRATION_API_TOKEN;

    if (!baseUrl || !token) {
      throw new Error(
        "Environment variables NEXT_PUBLIC_MAGENTO_URL or INTEGRATION_API_TOKEN missing"
      );
    }

    const url = `${baseUrl}/rest/V1/categories`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("Server-side fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
