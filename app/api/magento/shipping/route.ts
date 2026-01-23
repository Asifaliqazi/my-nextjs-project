// /app/api/magento/shipping/route.ts
import { NextRequest, NextResponse } from "next/server";

const MAGENTO_BASE =
  process.env.NEXT_PUBLIC_MAGENTO_URL || "http://localhost:8080";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📦 Incoming shipping body:", JSON.stringify(body, null, 2));

    const { cartId, addressInformation } = body;

    if (!cartId) {
      return NextResponse.json(
        { message: "cartId missing" },
        { status: 400 }
      );
    }

    if (
      !addressInformation ||
      !addressInformation.shipping_address ||
      !addressInformation.billing_address
    ) {
      return NextResponse.json(
        { message: "Shipping or billing address missing" },
        { status: 400 }
      );
    }

    // 🔹 Magento expects EXACT structure
    const payload = {
      addressInformation: {
        shipping_address: addressInformation.shipping_address,
        billing_address: addressInformation.billing_address,
        shipping_method_code:
          addressInformation.shipping_method_code || "flatrate",
        shipping_carrier_code:
          addressInformation.shipping_carrier_code || "flatrate",
      },
    };

    console.log("🚀 Payload to Magento:", JSON.stringify(payload, null, 2));

    const magentoRes = await fetch(
      `${MAGENTO_BASE}/rest/V1/guest-carts/${cartId}/shipping-information`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await magentoRes.json();
    console.log("🟢 Magento shipping response:", data);

    if (!magentoRes.ok) {
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("❌ Shipping API error:", err);
    return NextResponse.json(
      { message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
