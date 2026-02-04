export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { type } = await req.json();

  if (type === "products") revalidateTag("products");
  if (type === "categories") revalidateTag("categories");
  if (type === "all") {
    revalidateTag("products");
    revalidateTag("categories");
  }

  return NextResponse.json({ revalidated: true });
}
