import { NextRequest, NextResponse } from "next/server";

const MAGENTO_BASE =
  process.env.NEXT_PUBLIC_MAGENTO_URL || "http://localhost:8080";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // safe destructuring
    const cartId = body.cartId || body.cartid;
    const email = body.email;
    const paymentMethod = body.paymentMethod;
    const billingAddress = body.billingAddress;

    if (!cartId || !paymentMethod || !billingAddress) {
      return NextResponse.json(
        { message: "cartId, paymentMethod, and billingAddress are required" },
        { status: 400 }
      );
    }

    const magentoPayload = {
      email,
      paymentMethod,
      billingAddress,
    };

    console.log(
      "💳 Magento Place Order Payload:",
      JSON.stringify(magentoPayload, null, 2)
    );

    // 🔹 Call Magento API
    const res = await fetch(
      `${MAGENTO_BASE}/rest/V1/guest-carts/${cartId}/payment-information`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(magentoPayload),
      }
    );

    const data = await res.json();
    console.log("📥 Magento Response:", data);

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Magento place order failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({ message: "Order placed successfully!", data });
  } catch (err: any) {
    console.error("🔥 Place Order Catch Error:", err);
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
