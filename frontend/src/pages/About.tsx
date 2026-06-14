import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import facilityHero from "@/assets/facility-hero.jpg";
import { Sparkles } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const About = () => (
  <div>
    {/* Page Header */}
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
            About <span className="gradient-text">Us</span>
          </h1>
          <p className="body-lg text-muted-foreground">
            Discover the story behind Goyama Solar and our commitment to India's renewable future.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Company Overview */}
    <section className="section-padding">
      <div className="container-section">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <SectionHeading title="Company Overview" highlight="Overview" center={false} />
            <p className="body-md text-muted-foreground">
              GOYAMA SOLAR is a registered trademark of Goyama International, established in 2025 with a clear vision: to contribute meaningfully to India's renewable energy transition through advanced solar manufacturing.
            </p>
            <p className="body-md text-muted-foreground mt-4">
              Our 300,000 sq ft state-of-the-art manufacturing facility in Munak, District Karnal, Haryana, represents a significant investment in India's clean energy infrastructure.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <img src={facilityHero} alt="Goyama Solar facility" className="rounded-2xl shadow-xl" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Establishment */}
    <section className="section-padding section-alt">
      <div className="container-section max-w-4xl">
        <SectionHeading title="Established in 2025" highlight="2025" subtitle="Founded with the ambition to be at the forefront of India's solar manufacturing revolution." />
        <motion.div {...fadeUp} className="bg-background p-8 md:p-12 rounded-xl border border-border">
          <p className="body-md text-muted-foreground">
            Goyama International identified the urgent need for domestic solar manufacturing capacity to support India's ambitious renewable energy targets. In 2025, we established Goyama Solar with a world-class manufacturing facility designed to produce high-efficiency solar modules at scale.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Philosophy of Ahimsa */}
    <section className="section-padding">
      <div className="container-section max-w-4xl">
        <SectionHeading title="Philosophy of Ahimsa" highlight="Ahimsa" subtitle="Our manufacturing philosophy is rooted in the principle of non-harm." />
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Environmental Harmony", desc: "Every manufacturing process is designed to minimize environmental impact while maximizing energy output." },
            { title: "Ethical Practices", desc: "We uphold the highest standards of ethical manufacturing, ensuring fair practices across our entire value chain." },
            { title: "Community Welfare", desc: "Our operations are designed to benefit local communities through employment and sustainable development." },
            { title: "Renewable Commitment", desc: "We are deeply committed to accelerating India's transition to clean, renewable energy sources." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border"
            >
              <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
