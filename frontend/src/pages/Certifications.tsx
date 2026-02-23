import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

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
    <section className="gradient-bg py-20">
      <div className="container-section text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="heading-xl text-primary-foreground"
        >
          Certifications
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="body-lg text-primary-foreground/80 mt-4 max-w-2xl mx-auto"
        >
          Meeting and exceeding international quality and safety standards.
        </motion.p>
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
