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
      <body>
        <CartProvider>
          <Header /> {/* Header hamesha visible */}
          <main>{children}</main> {/* CategoryPage, ProductPage, etc */}
          <Footer /> {/* Footer hamesha visible */}
        </CartProvider>
      </body>
    </html>
  );
}
