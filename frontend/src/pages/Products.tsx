import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import solarPanel from "@/assets/solar-panel-product.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const productCategories = [
  {
    title: "Mono PERC Half-Cut Modules",
    power: "540W – 560W",
    efficiency: "21.3%",
    desc: "Premium monocrystalline PERC technology with half-cut cell design for superior shade tolerance and higher energy yield.",
    specs: [
      { label: "Cell Type", value: "Mono PERC Half-Cut" },
      { label: "Module Efficiency", value: "Up to 21.3%" },
      { label: "Dimensions", value: "2278 × 1134 × 35 mm" },
      { label: "Weight", value: "28.5 kg" },
      { label: "Warranty", value: "25 Years Linear" },
    ],
  },
  {
    title: "TOPCon Bifacial Modules",
    power: "570W – 600W",
    efficiency: "22.5%",
    desc: "Next-generation TOPCon technology with bifacial design capturing energy from both sides for maximum output.",
    specs: [
      { label: "Cell Type", value: "N-Type TOPCon Bifacial" },
      { label: "Module Efficiency", value: "Up to 22.5%" },
      { label: "Dimensions", value: "2384 × 1134 × 30 mm" },
      { label: "Weight", value: "29.8 kg" },
      { label: "Warranty", value: "30 Years Linear" },
    ],
  },
  {
    title: "Industrial Solar Components",
    power: "Custom",
    efficiency: "Varies",
    desc: "Purpose-built solar components for large-scale industrial and utility projects, engineered for extreme durability.",
    specs: [
      { label: "Applications", value: "Utility & Industrial" },
      { label: "Configuration", value: "Custom Solutions" },
      { label: "Certifications", value: "IEC, BIS, ISO" },
      { label: "MOQ", value: "Contact for details" },
      { label: "Warranty", value: "Project-specific" },
    ],
  },
];

const Products = () => (
  <div>
    <section className="gradient-bg py-20">
      <div className="container-section text-center">
        <motion.h1 {...fadeUp} className="heading-xl text-primary-foreground">Our Products</motion.h1>
        <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="body-lg text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
          High-performance solar modules engineered for the future.
        </motion.p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-section">
        <div className="space-y-20">
          {productCategories.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="aspect-square rounded-2xl overflow-hidden border border-border">
                    <img src={solarPanel} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <h2 className="heading-md">{product.title}</h2>
                  <div className="divider-orange mt-3 mb-4" />
                  <div className="flex gap-4 mb-4">
                    <span className="gradient-bg text-primary-foreground px-3 py-1 rounded-md text-sm font-semibold">{product.power}</span>
                    <span className="border border-primary text-primary px-3 py-1 rounded-md text-sm font-semibold">{product.efficiency} Eff.</span>
                  </div>
                  <p className="body-md text-muted-foreground mb-6">{product.desc}</p>

                  {/* Spec table */}
                  <div className="border border-border rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {product.specs.map((spec, j) => (
                          <tr key={spec.label} className={j % 2 === 0 ? "bg-section-alt" : "bg-background"}>
                            <td className="px-4 py-3 font-medium text-foreground">{spec.label}</td>
                            <td className="px-4 py-3 text-muted-foreground">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Link to="/contact" className="inline-flex gradient-bg text-primary-foreground px-6 py-3 rounded-lg font-semibold mt-6 hover:opacity-90 transition-opacity">
                    Enquire Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Products;
