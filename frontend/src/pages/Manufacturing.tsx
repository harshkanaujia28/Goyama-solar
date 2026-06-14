import { motion } from "framer-motion";
import { Cpu, Bot, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import facilityHero from "@/assets/facility-hero.jpg";
import manufacturingInterior from "@/assets/manufacturing-interior.jpg";
import { Sparkles } from "lucide-react";

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
            Manufacturing <span className="gradient-text">Facility</span>
          </h1>
          <p className="body-lg text-muted-foreground">
            300,000 sq ft of cutting-edge solar manufacturing technology.
          </p>
        </motion.div>
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
