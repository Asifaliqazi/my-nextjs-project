import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { cartId, item_id } = await req.json();

    if (!cartId || !item_id) {
      return NextResponse.json(
        { message: "cartId or item_id missing" },
        { status: 400 }
      );
    }

    const MAGENTO = process.env.NEXT_PUBLIC_MAGENTO_URL;

    const res = await fetch(
      `${MAGENTO}/rest/V1/guest-carts/${cartId}/items/${item_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Magento remove item error:", data);
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}
