import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { Sparkles } from "lucide-react";

const certifications = [
  { name: "ISO 9001:2015", category: "Quality Management System", desc: "International standard for quality management systems." },
  { name: "ISO 14001:2015", category: "Environmental Management", desc: "Environmental management system certification." },
  { name: "ISO 45001:2018", category: "Occupational Safety", desc: "Occupational health and safety management." },
  { name: "IEC 61215", category: "Module Design Qualification", desc: "Design qualification and type approval for photovoltaic modules." },
  { name: "IEC 61730", category: "Module Safety", desc: "Photovoltaic module safety qualification." },
  { name: "BIS Certification", category: "Indian Standards", desc: "Bureau of Indian Standards compliance for domestic market." },
  { name: "ALMM Listed", category: "Government Approval", desc: "Approved List of Models and Manufacturers by MNRE." },
  { name: "CE Marking", category: "European Compliance", desc: "Conformity with European health, safety, and environmental standards." },
];

const Certifications = () => (
  <div>
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 section-alt">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(27 100% 50%) 0%, transparent 70%)" }} />
      <div className="container-section relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">India's Trusted Solar Manufacturer</span>
          </div>
          <h1 className="heading-xl mb-5">
            Our <span className="gradient-text">Certifications</span>
          </h1>
          <p className="body-lg text-muted-foreground">
            Meeting and exceeding international quality and safety standards.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-section">
        <SectionHeading title="Our Certifications & Standards" highlight="Standards" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-background p-6 rounded-xl border border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary-foreground" size={22} />
              </div>
              <h3 className="font-display font-bold text-lg">{cert.name}</h3>
              <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">{cert.category}</p>
              <p className="text-sm text-muted-foreground mt-3">{cert.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Certifications;
