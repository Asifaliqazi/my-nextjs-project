// app/layout.tsx
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Header /> {/* Header hamesha visible */}
          <main className="flex-1 min-h-[400px]">{children}</main> {/* CategoryPage, ProductPage, etc */}
          <Footer /> {/* Footer hamesha visible */}
        </CartProvider>
      </body>
    </html>
  );
}
