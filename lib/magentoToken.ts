let cachedToken: string | null = null;

/**
 * Get Magento Admin Token
 * Auto-generates if expired or missing
 */
export async function getMagentoToken(): Promise<string> {
  // ✅ TypeScript-safe check
  if (typeof cachedToken === "string") {
    return cachedToken;
  }

  console.log("🔄 Token expired or missing, generating new token...");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAGENTO_URL}/rest/V1/integration/admin/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: process.env.MAGENTO_ADMIN_USER,
        password: process.env.MAGENTO_ADMIN_PASS,
      }),
      cache: "no-store",
    }
  );

  const text = await res.text();

  if (!res.ok || text.startsWith("<")) {
    console.error("❌ Magento token generation failed:", text);
    throw new Error("Magento token generation failed");
  }

  cachedToken = JSON.parse(text);
  console.log("✅ New token generated");
  return cachedToken;
}

/**
 * Clear cached token (e.g., when 401 occurs)
 */
export function clearMagentoToken() {
  cachedToken = null;
}
