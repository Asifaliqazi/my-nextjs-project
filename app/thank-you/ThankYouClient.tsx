"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded shadow max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Thank You for Your Order!</h1>

        {orderId && (
          <p className="text-gray-700">
            Your Order ID is:{" "}
            <span className="font-mono">{orderId}</span>
          </p>
        )}

        <p className="text-gray-600">
          We have received your order and it is being processed.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-black-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
