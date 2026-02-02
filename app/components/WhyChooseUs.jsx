// components/WhyChooseUs.jsx
import { Shield, Store, Truck } from "lucide-react"; // ✅ Lucide icons

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-black" />,
      title: "No Taxes. No Surprises.",
      description:
        "All orders ship from tax-exempt land, giving you a 100% tax-free shopping experience — no hidden fees, no added costs.",
    },
    {
      icon: <Store className="h-8 w-8 text-black" />,
      title: "Authentic Brands. Legally Sourced.",
      description:
        "We’re a fully licensed retailer in Canada, sourcing directly from trusted suppliers so you get only verified, premium products.",
    },
    {
      icon: <Truck className="h-8 w-8 text-black" />,
      title: "Fast, Discreet Delivery Anywhere in Canada",
      description:
        "Enjoy free Xpresspost™ shipping from coast to coast — secure, tracked, and packed for privacy every time.",
    },
  ];

  return (
    <section className="py-16 bg-[#f7fcf9]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
