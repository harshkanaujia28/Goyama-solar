import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cpu, Bot, ShieldCheck, Leaf, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import AnimatedCounter from "../components/AnimatedCounter";
import heroSunrise from "@/assets/hero-sunrise.jpg";
import facilityHero from "@/assets/facility-hero.jpg";
import solarPanel from "@/assets/solar-panel-product.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const featureCards = [
  { icon: Cpu, title: "Advanced Automation", desc: "State-of-the-art automated production lines for precision manufacturing." },
  { icon: Bot, title: "AI-Driven Production", desc: "Intelligent systems optimizing every stage of the manufacturing process." },
  { icon: ShieldCheck, title: "Quality Control Systems", desc: "Multi-point inspection ensuring every module meets international standards." },
  { icon: Leaf, title: "Sustainable Manufacturing", desc: "Environmentally responsible processes aligned with our Ahimsa philosophy." },
];

const products = [
  { title: "Solar Modules", desc: "High efficiency N-type TOPCon G12R and M10R modules", img: solarPanel },
  { title: "Industrial Components", desc: "Premium solar components for large-scale installations", img: solarPanel },
  { title: "High-Efficiency Panels", desc: "Next-generation panels with industry-leading performance", img: solarPanel },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroSunrise} alt="Solar farm at sunrise" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-foreground/60" />
          {/* Sun rays watermark */}
          <div className="absolute inset-0 opacity-10" style={{
            background: "radial-gradient(circle at 70% 40%, hsl(37, 100%, 50%) 0%, transparent 50%)",
          }} />
        </div>
        <div className="container-section relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="heading-xl text-background"
            >
              Empowering India's{" "}
              <span className="gradient-text">Renewable Future</span>{" "}
              Through Advanced Solar Manufacturing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="body-lg text-background/80 mt-6 max-w-2xl"
            >
              High-performance solar modules engineered for durability, efficiency, and scale.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link to="/products" className="gradient-bg text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Explore Products
              </Link>
              <Link to="/contact" className="border border-background/30 text-background px-8 py-3.5 rounded-lg font-semibold hover:bg-background/10 transition-colors">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding">
        <div className="container-section">
          <SectionHeading title="Who We Are" highlight="We Are" />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <p className="body-lg text-muted-foreground">
                <strong className="text-foreground">GOYAMA SOLAR</strong> is a registered trademark of Goyama International, established in 2025 to contribute meaningfully to India's renewable energy transition.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-6 rounded-xl bg-section-alt">
                  <div className="heading-md gradient-text">300,000</div>
                  <p className="text-sm text-muted-foreground mt-1">sq ft Manufacturing Facility</p>
                </div>
                <div className="p-6 rounded-xl bg-section-alt">
                  <div className="heading-md gradient-text">Karnal</div>
                  <p className="text-sm text-muted-foreground mt-1">Munak, District Karnal, Haryana</p>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              <img src={facilityHero} alt="Goyama Solar manufacturing facility" className="rounded-2xl shadow-xl w-full" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manufacturing Strength */}
      <section className="section-padding section-alt">
        <div className="container-section">
          <SectionHeading title="Manufacturing Strength" highlight="Strength" subtitle="Our facility combines cutting-edge technology with sustainable practices." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 rounded-xl border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-5">
                  <card.icon className="text-primary-foreground" size={22} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Showcase */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <img src={facilityHero} alt="Manufacturing facility aerial view" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="container-section relative z-10 text-center">
          <motion.h2 {...fadeUp} className="heading-lg text-background">
            300,000 sq ft <span className="gradient-text">State-of-the-Art</span> Manufacturing Facility
          </motion.h2>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <Link to="/manufacturing" className="inline-flex items-center gap-2 gradient-bg text-primary-foreground px-8 py-3.5 rounded-lg font-semibold mt-8 hover:opacity-90 transition-opacity">
              Learn More <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="section-padding">
        <div className="container-section">
          <SectionHeading title="Our Products" highlight="Products" subtitle="Engineered for performance, built for the future." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/products" className="inline-flex items-center gap-2 gradient-bg text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Mission Preview */}
      <section className="section-padding section-alt">
        <div className="container-section">
          <SectionHeading title="Vision & Mission" highlight="Vision" />
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div {...fadeUp} className="bg-background p-8 md:p-10 rounded-xl border border-border">
              <h3 className="heading-md mb-4">Our Vision</h3>
              <div className="divider-orange mb-4" />
              <p className="body-md text-muted-foreground">
                To support India's 2030 renewable goals and UNFCCC commitments through world-class solar manufacturing.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="bg-background p-8 md:p-10 rounded-xl border border-border">
              <h3 className="heading-md mb-4">Our Mission</h3>
              <div className="divider-orange mb-4" />
              <p className="body-md text-muted-foreground">
                Ethical, automated, environmentally responsible manufacturing aligned with the philosophy of Ahimsa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Goyama Solar */}
      <section className="section-padding">
        <div className="container-section">
          <SectionHeading title="Why Choose Goyama Solar" highlight="Goyama Solar" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
           <div className="text-center">
  {/* Number */}
  <div className="text-5xl md:text-6xl font-bold text-orange-500 leading-tight">
    1<span className="ml-1">GW</span>
  </div>

  {/* Label */}
  <p className="mt-2 text-sm md:text-base text-gray-600">
    Annual Production Capacity
  </p>
</div>
            <AnimatedCounter target={100} suffix="%" label="Advanced Automation" />
            <AnimatedCounter target={2025} label="Year Established" />
            <AnimatedCounter target={24} suffix="/7" label="Quality Monitoring" />
          </div>
        </div>
      </section>

      {/* Business Inquiry CTA */}
      <section className="gradient-bg py-20">
        <div className="container-section text-center">
          <motion.h2 {...fadeUp} className="heading-lg text-primary-foreground">
            Partner With a Responsible Solar Manufacturer
          </motion.h2>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="body-lg text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
            Join us in powering India's renewable energy future.
          </motion.p>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3.5 rounded-lg font-semibold mt-8 hover:bg-background/90 transition-colors">
              Request Manufacturing Inquiry <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="section-padding section-alt">
        <div className="container-section">
          <SectionHeading title="Get in Touch" highlight="Touch" />
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} />
              <span className="text-muted-foreground">Munak, Haryana (132040)</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-primary" size={20} />
              <a href="mailto:info@goyamasolar.com" className="text-muted-foreground hover:text-foreground transition-colors">info@goyamasolar.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={20} />
              <span className="text-muted-foreground">+91-9466666257 | +91-9896684435</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
