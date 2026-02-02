// app/api/fetchImage/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Missing image URL parameter" },
        { status: 400 }
      );
    }

    const basicUser = process.env.BASIC_AUTH_USER;
    const basicPass = process.env.BASIC_AUTH_PASS;

    if (!basicUser || !basicPass) {
      throw new Error("Missing BASIC AUTH env variables");
    }

    const basicAuth = Buffer.from(`${basicUser}:${basicPass}`).toString("base64");

    const res = await fetch(encodeURI(imageUrl), {
      method: "GET",
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        {
          success: false,
          status: res.status,
          error: text.slice(0, 200),
        },
        { status: res.status }
      );
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": res.headers.get("content-type") || "image/jpeg",
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    console.error("🔥 IMAGE PROXY ERROR:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
