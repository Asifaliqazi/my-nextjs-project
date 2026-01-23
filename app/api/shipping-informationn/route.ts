import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { cartId, addressInformation } = body;

  const cleanCartId = String(cartId).replace(/"/g, "");

  try {
    const res = await fetch(
      `https://test.flipflops.cc/rest/V1/guest-carts/${cleanCartId}/shipping-information`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressInformation),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Magento error:", data);
      return NextResponse.json({ error: data.message || "Magento error" }, { status: 400 });
    }
    console.log("✅ MAGENTO SHIPPING SAVED SUCCESSFULLY");
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("API route error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
