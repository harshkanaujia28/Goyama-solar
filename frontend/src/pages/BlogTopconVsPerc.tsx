import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Clock, User, Tag, ArrowRight, Check, Sun } from "lucide-react";

const stats = [
  { value: "23–25%", label: "TOPCon cell efficiency" },
  { value: "0.4%/yr", label: "TOPCon degradation" },
  { value: "5–10%", label: "Price premium vs PERC" },
  { value: "87%+", label: "Output at year 25/30" },
];

const techRows: [string, string, string][] = [
  ["Cell Efficiency", "22 – 22.5%", "23 – 25%"],
  ["Module Efficiency", "~20 – 21%", "~21 – 22.5%"],
  ["Temperature Coefficient", "-0.35%/°C", "-0.29 to -0.30%/°C"],
  ["First-Year Degradation", "~1.5 – 2%", "< 1%"],
  ["Annual Linear Degradation", "~0.55%", "~0.40%"],
  ["25/30-Year Output", "~84 – 85%", "~87%+"],
  ["Bifaciality Factor", "65 – 70%", "70 – 80%"],
];

const priceRows: [string, string, string][] = [
  ["Mono PERC", "540 – 550 Wp", "₹12 – 14/Wp"],
  ["N-type TOPCon", "575 – 620 Wp", "₹13 – 15/Wp"],
  ["TOPCon Bifacial G2G", "575 – 620 Wp", "₹15 – 18/Wp"],
  ["DCR TOPCon", "575 Wp+", "₹26 – 28/Wp"],
];

const recommendTopcon = [
  "Customer has limited rooftop area and needs maximum kWp per square metre.",
  "Site is in a high ambient temperature zone — most of North, West, Central India.",
  "Commercial / industrial user, RWA, school, hospital with 20–25 year ROI horizon.",
  "Bifacial-friendly mounting — carport, ground-mount, elevated commercial rooftop.",
  "Subsidy-eligible under PM Surya Ghar and wants maximum long-term yield.",
];

const recommendPerc = [
  "Customer has a strict budget and the ₹3,000 – 5,000 saving genuinely matters.",
  "System is small (1 – 2 kW) and roof space is not constrained.",
  "Quick replacement needed and Mono PERC inventory is more locally available.",
];

const stockTips = [
  "70% TOPCon, 30% Mono PERC for a mixed urban + rural customer base.",
  "90% TOPCon for territories dominated by C&I customers.",
  "Standardise on 144-cell M10 N-type TOPCon (560 – 620 Wp) as your default SKU.",
  "Keep a small Mono PERC buffer (540 – 550 Wp) for repair and replacement.",
];

const related = [
  { title: "How to Become a Solar Dealer in India 2026", to: "/blog/how-to-become-solar-panel-dealer-india-2026" },
  { title: "Indian Manufacturer vs Imports in 2026", to: "/blog/indian-manufacturer-vs-imports-2026" },
  { title: "PM Surya Ghar Yojana: Full Subsidy Guide", to: "/blog" },
];

const BlogTopconVsPerc = () => {
  return (
    <div>
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 section-alt">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(27 100% 50%) 0%, transparent 70%)" }}
        />
        <div className="container-section relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <nav className="text-xs text-muted-foreground mb-5">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <span className="mx-2">›</span>
              <span className="text-foreground">TOPCon vs Mono PERC 2026</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Technology Comparison</span>
            </div>

            <h1 className="heading-xl mb-6">
              <span className="gradient-text">TOPCon vs Mono PERC</span> Solar Panels: Which Should Your Customers Buy in 2026?
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> June 15, 2026</span>
              <span className="inline-flex items-center gap-1.5"><User size={14} /> Goyama Team</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} /> 7 min read</span>
              <span className="inline-flex items-center gap-1.5"><Tag size={14} /> Technology</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/60 transition-colors">
                  <div className="text-2xl md:text-3xl font-extrabold gradient-text">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-section grid lg:grid-cols-[1fr_300px] gap-10">
          <article className="min-w-0">
            <p className="body-lg text-muted-foreground mb-5">
              Three years ago, the default product on a solar dealer's shelf was Mono PERC. In 2026, that default has shifted decisively to TOPCon — and dealers who haven't updated their pitch are quietly losing C&I accounts to competitors who have.
            </p>
            <p className="body-lg text-muted-foreground mb-10">
              That said, Mono PERC still has a place in your inventory. This guide gives you a clear, practical comparison so you can stock and recommend the right technology for each customer segment.
            </p>

            <h2 className="heading-md mb-5 pl-4 border-l-[3px] border-primary">The Quick Verdict</h2>
            <ul className="space-y-2.5 mb-12 text-muted-foreground">
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span><strong className="text-foreground">Recommend TOPCon</strong> for commercial rooftops, housing societies, ground-mount, limited roof space, and 20-year+ horizons.</span></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span><strong className="text-foreground">Recommend Mono PERC</strong> for budget-sensitive residential customers and quick-replacement scenarios.</span></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span><strong className="text-foreground">Stock both</strong> through mid-2026, then transition primarily to TOPCon.</span></li>
            </ul>

            <h2 className="heading-md mb-5 pl-4 border-l-[3px] border-primary">Technical Comparison</h2>
            <div className="overflow-x-auto rounded-xl border border-border mb-12">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="bg-muted text-left p-4 font-semibold">Parameter</th>
                    <th className="bg-muted/60 text-left p-4 font-semibold">Mono PERC</th>
                    <th className="gradient-bg text-primary-foreground text-left p-4 font-semibold">N-type TOPCon</th>
                  </tr>
                </thead>
                <tbody>
                  {techRows.map(([p, m, t]) => (
                    <tr key={p} className="border-t border-border">
                      <td className="p-4 font-medium">{p}</td>
                      <td className="p-4 text-muted-foreground">{m}</td>
                      <td className="p-4 bg-primary/5 text-primary font-semibold">{t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="heading-md mb-5 pl-4 border-l-[3px] border-primary">Price Comparison in 2026</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              The price gap between TOPCon and Mono PERC has narrowed sharply — from a 20% premium in 2023 to roughly 5 – 10% today. For most customer segments, that small uplift pays back through higher yield within 12 to 18 months.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-12">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-4 font-semibold">Technology</th>
                    <th className="text-left p-4 font-semibold">Wattage</th>
                    <th className="text-left p-4 font-semibold">Dealer Price</th>
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map(([t, w, p]) => (
                    <tr key={t} className="border-t border-border">
                      <td className="p-4 font-medium">{t}</td>
                      <td className="p-4 text-muted-foreground">{w}</td>
                      <td className="p-4 text-primary font-semibold">{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">Recommend TOPCon When:</h2>
            <ul className="space-y-2.5 mb-12 text-muted-foreground">
              {recommendTopcon.map((r) => (
                <li key={r} className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span>{r}</span></li>
              ))}
            </ul>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">Recommend Mono PERC When:</h2>
            <ul className="space-y-2.5 mb-12 text-muted-foreground">
              {recommendPerc.map((r) => (
                <li key={r} className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span>{r}</span></li>
              ))}
            </ul>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">How to Stock in 2026</h2>
            <ul className="space-y-2.5 mb-12 text-muted-foreground">
              {stockTips.map((s) => (
                <li key={s} className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span>{s}</span></li>
              ))}
            </ul>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">What to Tell Your Customer</h2>
            <div className="bg-primary/10 border-l-4 border-primary rounded-r-xl p-5 mb-12">
              <p className="text-sm md:text-base text-foreground italic">
                "TOPCon costs around 5 – 10% more upfront, but gives you 3 – 5% more energy from day one, degrades 30% slower over time, and handles Indian summer heat better. Over 25 years, the savings are significantly higher from the same roof area. That's why most serious buyers choose TOPCon today."
              </p>
            </div>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">Why Goyama Solar</h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              Goyama Solar manufactures both N-type TOPCon bifacial and Mono PERC modules at its 1 GW Panipat facility — giving you a single ALMM-listed source for both technologies. Our dealer team helps you select and position the right product for every customer in your territory.
            </p>

            <div className="relative overflow-hidden rounded-2xl p-8 md:p-10 text-primary-foreground gradient-bg">
              <Sun className="absolute top-4 right-4 w-36 h-36 opacity-10 pointer-events-none" />
              <h3 className="heading-md mb-3 relative text-primary-foreground">Get Datasheets & 2026 Dealer Price List</h3>
              <p className="text-primary-foreground/90 mb-6 max-w-xl relative">
                Request the latest TOPCon and Mono PERC datasheets, wattage options and dealer pricing from Goyama Solar.
              </p>
              <Link to="/contact" className="relative inline-flex items-center gap-2 bg-background text-primary font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                Contact Dealer Team <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-[11px] font-bold tracking-wider text-primary mb-4">AT A GLANCE</div>
              <ul className="space-y-3 text-sm">
                {[
                  ["TOPCon efficiency", "23–25%"],
                  ["PERC efficiency", "22–22.5%"],
                  ["Price premium", "5–10%"],
                  ["TOPCon degradation", "0.4%/yr"],
                  ["Year-30 output", "87%+"],
                ].map(([l, v]) => (
                  <li key={l} className="flex justify-between gap-3 border-b border-border pb-2 last:border-0">
                    <span className="text-muted-foreground">{l}</span>
                    <span className="font-bold text-primary">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl p-6 text-center gradient-bg text-primary-foreground">
              <Sun className="w-8 h-8 mx-auto mb-2" />
              <h4 className="text-lg font-extrabold mb-2">Dealer Price List</h4>
              <p className="text-xs text-primary-foreground/90 mb-4">Latest TOPCon + Mono PERC datasheets and 2026 pricing.</p>
              <Link to="/contact" className="block w-full bg-background text-primary font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
                Request Now →
              </Link>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-4">RELATED POSTS</div>
              <ul className="space-y-4">
                {related.map((r) => (
                  <li key={r.title} className="group">
                    <Link to={r.to} className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors block">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default BlogTopconVsPerc;
