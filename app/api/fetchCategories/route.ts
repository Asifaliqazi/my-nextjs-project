import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(process.env.API_BASE_URL!, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.INTEGRATION_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Server-side fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
