import { motion } from "framer-motion";
import { Cpu, Bot, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import facilityHero from "@/assets/facility-hero.jpg";
import manufacturingInterior from "@/assets/manufacturing-interior.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const timelineSteps = [
  { step: "01", title: "Raw Material Inspection", desc: "Rigorous quality checks on all incoming materials" },
  { step: "02", title: "Cell Sorting & Testing", desc: "AI-powered sorting for optimal efficiency matching" },
  { step: "03", title: "String & Layup", desc: "Automated cell interconnection with precision soldering" },
  { step: "04", title: "Lamination", desc: "High-temperature lamination for weather resistance" },
  { step: "05", title: "Testing & Inspection", desc: "Multi-point EL and flash testing" },
  { step: "06", title: "Packaging & Dispatch", desc: "Secure packaging for safe transportation" },
];

const Manufacturing = () => (
  <div>
    <section className="gradient-bg py-20">
      <div className="container-section text-center">
        <motion.h1 {...fadeUp} className="heading-xl text-primary-foreground">Manufacturing Facility</motion.h1>
        <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="body-lg text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
          300,000 sq ft of cutting-edge solar manufacturing technology.
        </motion.p>
      </div>
    </section>

    {/* Facility Overview */}
    <section className="section-padding">
      <div className="container-section">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <SectionHeading title="Facility Overview" highlight="Overview" center={false} />
            <p className="body-md text-muted-foreground">
              Our manufacturing facility in Munak, Haryana spans 300,000 sq ft and is equipped with the latest automated production lines, AI-driven quality systems, and sustainable manufacturing processes.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: Cpu, label: "Fully Automated Production Lines" },
                { icon: Bot, label: "AI-Driven Quality Optimization" },
                { icon: ShieldCheck, label: "International Quality Standards" },
                { icon: Leaf, label: "Eco-Friendly Processes" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <item.icon className="text-primary-foreground" size={18} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <img src={facilityHero} alt="Manufacturing facility" className="rounded-2xl shadow-xl" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Interior Showcase */}
    <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
      <img src={manufacturingInterior} alt="Manufacturing interior" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="container-section relative z-10 text-center">
        <motion.h2 {...fadeUp} className="heading-lg text-background">
          <span className="gradient-text">AI-Driven</span> Automation & Integration
        </motion.h2>
      </div>
    </section>

    {/* Production Timeline */}
    <section className="section-padding section-alt">
      <div className="container-section">
        <SectionHeading title="Production Process" highlight="Process" subtitle="A streamlined, quality-focused manufacturing workflow." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {timelineSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background p-6 rounded-xl border border-border relative overflow-hidden"
            >
              <span className="absolute top-4 right-4 text-5xl font-display font-bold text-primary/10">{s.step}</span>
              <div className="flex items-center gap-2 mb-3">
                <ArrowRight className="text-primary" size={16} />
                <h3 className="font-display font-semibold">{s.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Manufacturing;
