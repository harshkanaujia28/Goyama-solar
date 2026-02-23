import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const VisionMission = () => (
  <div>
    <section className="gradient-bg py-20">
      <div className="container-section text-center">
        <motion.h1 {...fadeUp} className="heading-xl text-primary-foreground">Vision & Mission</motion.h1>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-section max-w-4xl">
        <SectionHeading title="Our Vision" highlight="Vision" />
        <motion.div {...fadeUp} className="bg-section-alt p-10 md:p-14 rounded-2xl text-center">
          <p className="text-xl md:text-2xl font-display leading-relaxed text-foreground">
            To build a <span className="gradient-text font-bold">sustainable and energy-secure future</span> aligned with India's national renewable energy goals and global UNFCCC commitments.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Sunrise divider */}
    <div className="flex justify-center py-4">
      <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
        <path d="M0 59 Q60 0 120 59" stroke="url(#sunDivider)" strokeWidth="2" fill="none" />
        <circle cx="60" cy="20" r="10" fill="url(#sunDivider)" opacity="0.3" />
        <defs>
          <linearGradient id="sunDivider" x1="0" y1="0" x2="120" y2="0">
            <stop offset="0%" stopColor="hsl(27, 100%, 49%)" />
            <stop offset="100%" stopColor="hsl(37, 100%, 50%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <section className="section-padding">
      <div className="container-section max-w-4xl">
        <SectionHeading title="Our Mission" highlight="Mission" />
        <motion.div {...fadeUp} className="bg-section-alt p-10 md:p-14 rounded-2xl text-center">
          <p className="text-xl md:text-2xl font-display leading-relaxed text-foreground">
            To lead through <span className="gradient-text font-bold">ethical manufacturing</span>, advanced automation, and high-quality solar modules — in harmony with society, nature, and the philosophy of <span className="gradient-text font-bold">Ahimsa</span>.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Ethical Manufacturing", desc: "Transparent, fair, and responsible practices at every level." },
            { title: "Advanced Automation", desc: "AI and robotics driving precision and efficiency." },
            { title: "Environmental Harmony", desc: "Manufacturing in balance with nature's well-being." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-xl border border-border"
            >
              <h3 className="font-display font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default VisionMission;
