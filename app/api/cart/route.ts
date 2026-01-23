// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cartId = searchParams.get("cartId");

    if (!cartId) {
      return NextResponse.json({ message: "cartId missing" }, { status: 400 });
    }

    const cleanCartId = cartId.replace(/"/g, "");
    const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_URL;

    const res = await fetch(`${MAGENTO_URL}/rest/V1/guest-carts/${cleanCartId}`);
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ message: "Magento fetch failed", detail: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: "Server error", error: String(err) }, { status: 500 });
  }
}
