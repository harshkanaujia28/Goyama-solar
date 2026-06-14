import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Clock, User, Tag, ArrowRight, Check, Sun } from "lucide-react";

const stats = [
  { value: "50%+", label: "Effective duty on imports" },
  { value: "48–72h", label: "Goyama dispatch time" },
  { value: "30 Yrs", label: "Linear performance warranty" },
  { value: "1 GW", label: "Panipat facility capacity" },
];

const compareRows = [
  ["Effective Cost (Wp)", "₹13–15 non-DCR / ₹26–28 DCR", "₹13–15 + 50%+ duties"],
  ["ALMM Compliance", "✔ Fully eligible", "✘ Most imports not listed"],
  ["Delivery Lead Time", "3–7 days", "35–55 days"],
  ["Warranty Enforcement", "Indian entity, Indian law", "Cross-border claim, email queue"],
  ["GST / Customs", "5% GST only", "20% BCD + 30% Anti-dumping"],
  ["Working Capital", "Low — short cycle", "₹15–25L tied per shipment"],
];

const dutyRows: [string, string, boolean?][] = [
  ["Basic Customs Duty (BCD)", "20%"],
  ["Anti-Dumping Duty (ADD)", "30%"],
  ["Landing charges + freight", "~4–6%"],
  ["Total effective duty stack", "50%+", true],
  ["Indian manufacturer (GST)", "5% only"],
];

const faqs = [
  {
    q: "What is ALMM and why does it matter for dealers?",
    a: "Since April 2024, ALMM is mandatory for all subsidised and government projects. Non-ALMM panels are rejected at the PM Surya Ghar portal and fail net-metering inspections, blocking dealer payouts.",
  },
  {
    q: "Are Indian TOPCon modules quality-comparable to Chinese Tier-1?",
    a: "Yes. BIS + IEC certified modules deliver 99% first-year output with 0.4% annual degradation — matching or exceeding Chinese Tier-1 specifications.",
  },
  {
    q: "What is the difference between DCR and non-DCR modules?",
    a: "DCR modules use Indian cells and are mandatory for government tenders. From July 2026, cells must come from ALMM List-II approved Indian manufacturers.",
  },
  {
    q: "How does Goyama Solar's dealer program work?",
    a: "Monthly transparent pricing, protected territories, 48–72hr dispatch and a dedicated onboarding manager. Backed by a 12-year product and 30-year linear performance warranty.",
  },
];

const related = [
  { title: "PM Surya Ghar Yojana: Full Subsidy Guide 2026", date: "May 2026" },
  { title: "TOPCon vs PERC: Which Panel for Your Dealer Stock?", date: "May 2026" },
  { title: "ALMM List 2026: How to Check Before You Buy", date: "April 2026" },
];

const GoyamaBlogPost = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {/* Hero — matches site-wide pattern */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 section-alt">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(27 100% 50%) 0%, transparent 70%)" }}
        />
        <div className="container-section relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <nav className="text-xs text-muted-foreground mb-5">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <span className="mx-2">›</span>
              <span className="text-foreground">Indian Manufacturer vs Imports 2026</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">B2B Dealer Guide</span>
            </div>

            <h1 className="heading-xl mb-6">
              Why Partnering with an <span className="gradient-text">Indian Solar Manufacturer</span> Is Better Than Importing in 2026
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> June 2026</span>
              <span className="inline-flex items-center gap-1.5"><User size={14} /> Goyama Editorial</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} /> 6 min read</span>
              <span className="inline-flex items-center gap-1.5"><Tag size={14} /> B2B / Dealer</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/60 transition-colors"
                >
                  <div className="text-2xl md:text-3xl font-extrabold gradient-text">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-section grid lg:grid-cols-[1fr_300px] gap-10">
          <article className="min-w-0">
            <p className="body-lg text-muted-foreground mb-5">
              India's solar industry has transformed. Dealers who haven't updated their sourcing strategy are paying for it every quarter — in duties, in lead times, and in working capital tied up at the port.
            </p>
            <p className="body-lg text-muted-foreground mb-10">
              This article covers 5 concrete reasons why partnering with an Indian solar panel manufacturer is the smarter B2B move in 2026, and what it means for your margins, compliance, and customer commitments.
            </p>

            {/* Comparison Table */}
            <h2 className="heading-md mb-5 pl-4 border-l-[3px] border-primary">
              India vs Imports: At a Glance
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border mb-12">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="bg-muted text-left p-4 font-semibold">Factor</th>
                    <th className="gradient-bg text-primary-foreground text-left p-4 font-semibold">🇮🇳 Indian Manufacturer</th>
                    <th className="bg-muted/60 text-left p-4 font-semibold">📦 Imported Modules</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(([f, ind, imp]) => (
                    <tr key={f} className="border-t border-border">
                      <td className="p-4 font-medium">{f}</td>
                      <td className="p-4 bg-primary/5 text-primary font-semibold">{ind}</td>
                      <td className="p-4 text-muted-foreground">{imp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 1 */}
            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">
              1. The BCD-plus-AD Wall: Imports Are Structurally More Expensive
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              The Basic Customs Duty (BCD) on solar modules is now 20%, layered with a 30% Anti-Dumping Duty on Chinese, Vietnamese and Thai imports. Add freight and clearance, and the total effective duty stack crosses 50% — before a single panel reaches your warehouse.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border mb-12">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-4 font-semibold">Duty Component</th>
                    <th className="text-left p-4 font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {dutyRows.map(([c, r, hl]) => (
                    <tr
                      key={c}
                      className={`border-t border-border ${hl ? "bg-primary/5" : ""}`}
                    >
                      <td className={`p-4 ${hl ? "font-bold text-primary" : ""}`}>{c}{hl ? " ←" : ""}</td>
                      <td className={`p-4 ${hl ? "font-bold text-primary" : ""}`}>{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 2 */}
            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">
              2. ALMM Is No Longer Optional
            </h2>
            <div className="bg-primary/10 border-l-4 border-primary rounded-r-xl p-5 mb-12">
              <p className="text-sm md:text-base text-foreground">
                <strong>Critical for dealers:</strong> A non-ALMM imported panel will be rejected at the PM Surya Ghar subsidy portal, will fail net-metering inspection, and cannot be used in any government project. From July 2026, cells must also be from List-II-approved Indian manufacturers.
              </p>
            </div>

            {/* Section 3 */}
            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">
              3. Faster Delivery, Faster Cash Cycle
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              From Goyama's 1 GW Panipat facility, modules dispatch in 48–72 hours and reach North India dealers within 3–7 days. Imports take 35–55 days door-to-door — a delay that translates directly into blocked working capital and lost project windows.
            </p>
            <div className="bg-card border-l-4 border-primary rounded-r-xl p-5 mb-12">
              <p className="text-sm md:text-base text-foreground">
                <strong className="text-primary">Working capital impact:</strong> 45-day holding cost ties up ₹15–25 lakh of working capital per shipment cycle.
              </p>
            </div>

            {/* Section 4 */}
            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">
              4. Warranty That Lives at Your Doorstep
            </h2>
            <ul className="space-y-2.5 mb-12 text-muted-foreground">
              {[
                "12-year product warranty",
                "30-year linear performance warranty",
                "First-year output: 99%",
                "Annual degradation: 0.4%",
                "~87% output at year 30",
                "Claims handled by Indian entity under Indian law",
              ].map((b) => (
                <li key={b} className="flex gap-3 items-start">
                  <Check className="w-5 h-5 text-primary flex-none mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Section 5 */}
            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">
              5. Price Competitiveness After All Duties
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              At ₹13–15/Wp for non-DCR TOPCon and ₹26–28/Wp for DCR, Indian modules now sit within — or below — landed import cost. The quality gap has closed: BIS marks, IEC certifications, PID and damp-heat tested at independent labs.
            </p>

            <div className="bg-primary/10 border-l-4 border-primary rounded-r-xl p-5 mb-12">
              <p className="text-sm md:text-base text-foreground">
                <strong className="text-primary">Dealer opportunity:</strong> Every major government programme — PM Surya Ghar, PM-KUSUM, CPSU solar parks — mandates domestic sourcing.
              </p>
            </div>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">
              Why Goyama Solar
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              1 GW Panipat facility producing TOPCon, Mono PERC and bifacial modules. BIS-certified, ALMM-eligible, backed by a 30-year linear performance warranty and a dealer programme with transparent monthly pricing and protected territories.
            </p>

            {/* FAQ */}
            <h2 className="heading-md mb-6 pl-4 border-l-[3px] border-primary">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 mb-12">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={f.q}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-4 text-left p-5 font-semibold"
                    >
                      <span>{f.q}</span>
                      <span
                        className={`text-primary text-2xl leading-none transition-transform ${open ? "rotate-45" : ""}`}
                      >
                        +
                      </span>
                    </button>
                    {open && (
                      <div className="border-t border-border p-5 text-muted-foreground text-sm md:text-base leading-relaxed">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div
              id="dealer"
              className="relative overflow-hidden rounded-2xl p-8 md:p-10 text-primary-foreground gradient-bg"
            >
              <Sun className="absolute top-4 right-4 w-36 h-36 opacity-10 pointer-events-none" />
              <h3 className="heading-md mb-3 relative text-primary-foreground">
                Ready to Switch to a Domestic Partner?
              </h3>
              <p className="text-primary-foreground/90 mb-6 max-w-xl relative">
                Contact Goyama Solar today for dealer pricing, territory allocation and a complete onboarding pack.
              </p>
              <Link
                to="/contact"
                className="relative inline-flex items-center gap-2 bg-background text-primary font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Dealer Pricing <ArrowRight size={16} />
              </Link>
            </div>

            <p className="text-xs italic text-muted-foreground mt-8">
              Sources: DGTR Final Findings Sept 2025; Union Budget 2025-26; MNRE ALMM Notification.
            </p>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-[11px] font-bold tracking-wider text-primary mb-4">
                AT A GLANCE
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  ["Effective import duty", "50%+"],
                  ["Goyama GST only", "5%"],
                  ["Delivery Indian", "3–7 days"],
                  ["Delivery imported", "35–55 days"],
                  ["Performance warranty", "30 years"],
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
              <h4 className="text-lg font-extrabold mb-2">Become a Dealer</h4>
              <p className="text-xs text-primary-foreground/90 mb-4">
                Monthly pricing, protected territories, 48–72hr dispatch.
              </p>
              <Link
                to="/contact"
                className="block w-full bg-background text-primary font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                Get Dealer Pack →
              </Link>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-4">
                RELATED POSTS
              </div>
              <ul className="space-y-4">
                {related.map((r) => (
                  <li key={r.title} className="group cursor-pointer">
                    <div className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                      {r.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1">{r.date}</div>
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

export default GoyamaBlogPost;
