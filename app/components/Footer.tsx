import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-12">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Reveredtech
          </h3>
          <p className="text-sm text-gray-400">
            
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/category/flavoured">Flavoured</Link></li>
            <li><Link href="/category/menthol">Menthol</Link></li>
            <li><Link href="/category/light">Light</Link></li>
            <li><Link href="/category/full-flavour">Full-Flavour</Link></li>
          </ul>
        </div>

        {/* Empty column (spacing ke liye, future use) */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Information</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Return Policy</li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Address</h3>
          <p className="text-sm text-gray-300 leading-6">
            Temp Address Line 1 <br />
            Temp City, Temp State <br />
            000000
          </p>

          <p className="mt-3 text-sm text-gray-300 flex items-center gap-2">
            ✉️ reveredtesting@gmail.com
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-400">
          © 2026 Reveredtech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
