import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Clock, User, Tag, ArrowRight, Check, Sun } from "lucide-react";

const stats = [
  { value: "₹7–14L", label: "Starting investment" },
  { value: "15–30%", label: "Blended dealer margin" },
  { value: "80 GW", label: "India 2026–28 addition" },
  { value: "5%", label: "GST on solar modules" },
];

const investmentRows: [string, string][] = [
  ["Shop or office (lease + interiors)", "₹1.5 – 3 lakh"],
  ["Initial inventory (modules, inverters, cables)", "₹3 – 7 lakh"],
  ["Marketing and signage", "₹50,000 – 1 lakh"],
  ["Working capital buffer", "₹2 – 3 lakh"],
  ["Total", "₹7 – 14 lakh"],
];

const marginRows: [string, string][] = [
  ["Solar modules", "8 – 12%"],
  ["Inverters and batteries", "12 – 20%"],
  ["Mounting structures, cables, accessories", "15 – 25%"],
  ["End-to-end EPC services", "20 – 30%"],
  ["Overall dealership (blended)", "15 – 30%"],
];

const licenses = [
  "GST registration — mandatory. Solar modules attract 5% GST (reduced from 12% in Sept 2025).",
  "MSME / Udyam registration — opens MSME loans and government tenders.",
  "Shops and Establishments licence from your local municipal body.",
  "Electrical contractor or supervisor licence if you intend to install (state-specific).",
  "PAN and Current Account — essential for banking and manufacturer credit terms.",
  "DISCOM empanelment in your state — required for PM Surya Ghar projects.",
];

const partnerChecks = [
  "ALMM listing under List-I — required for PM Surya Ghar, PM-KUSUM, net-metering.",
  "BIS certification (IS/IEC 61215 and IS/IEC 61730) — mandatory for India.",
  "TOPCon and bifacial product lines — what C&I customers demand through 2026+.",
  "Clear, published ex-factory rate cards so you can plan margins without guessing.",
  "30-day credit terms once you establish a track record.",
  "Co-branded marketing materials and territory exclusivity agreements.",
  "Local technical support within your state.",
];

const leadGen = [
  "Google Search ads targeting local intent — 'solar panel dealer near me', 'rooftop solar [city]'.",
  "WhatsApp-based CRM with automated responses and follow-up sequences.",
  "RWA and housing society awareness camps offering free rooftop audits.",
  "Referral programmes paying ₹2,000 to 5,000 per converted lead.",
  "Partnerships with electricians, architects, and builders who already have customer trust.",
];

const related = [
  { title: "TOPCon vs Mono PERC: Dealer Decision Guide 2026", to: "/blog/topcon-vs-monoperc-solar-panels-2026" },
  { title: "Indian Manufacturer vs Imports in 2026", to: "/blog/indian-manufacturer-vs-imports-2026" },
  { title: "PM Surya Ghar Yojana: Full Subsidy Guide", to: "/blog" },
];

const BlogDealerGuide = () => {
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
              <span className="text-foreground">Become a Solar Dealer in India 2026</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">B2B Dealer Guide</span>
            </div>

            <h1 className="heading-xl mb-6">
              How to Become a <span className="gradient-text">Solar Panel Dealer</span> in India: Complete Guide for 2026
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> June 8, 2026</span>
              <span className="inline-flex items-center gap-1.5"><User size={14} /> Goyama Team</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={14} /> 7 min read</span>
              <span className="inline-flex items-center gap-1.5"><Tag size={14} /> Dealer / Business</span>
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
              India is on track to add over 80 GW of solar capacity between 2026 and 2028 — driven by PM Surya Ghar, PM-KUSUM, commercial rooftop demand and utility-scale tenders.
            </p>
            <p className="body-lg text-muted-foreground mb-10">
              For entrepreneurs in tier-2 and tier-3 cities — and for existing electrical or construction businesses — solar dealership is one of the clearest business opportunities available today. This guide walks you through every step for 2026.
            </p>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">Step 1: Choose Your Business Model</h2>
            <ul className="space-y-2.5 mb-6 text-muted-foreground">
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span><strong className="text-foreground">Dealer / Retailer:</strong> Buy from manufacturer/distributor and sell to end customers. ₹2 – 10 lakh start.</span></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span><strong className="text-foreground">Distributor:</strong> Stock inventory for a region and supply sub-dealers. ₹15 – 50 lakh.</span></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span><strong className="text-foreground">EPC / Installer:</strong> Design, install and maintain complete systems — highest margins, needs technical staff.</span></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-12">
              For first-time entrants, the dealer model offers the fastest market entry and the lowest capital lock-in. You can expand into distribution or EPC as your volume stabilises over 12 to 18 months.
            </p>

            <h2 className="heading-md mb-5 pl-4 border-l-[3px] border-primary">Step 2: Investment Required</h2>
            <div className="overflow-x-auto rounded-xl border border-border mb-12">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-4 font-semibold">Item</th>
                    <th className="text-left p-4 font-semibold">Estimated Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentRows.map(([i, c], idx) => (
                    <tr key={i} className={`border-t border-border ${idx === investmentRows.length - 1 ? "bg-primary/5" : ""}`}>
                      <td className={`p-4 ${idx === investmentRows.length - 1 ? "font-bold text-primary" : "font-medium"}`}>{i}</td>
                      <td className={`p-4 ${idx === investmentRows.length - 1 ? "font-bold text-primary" : ""}`}>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">Step 3: Licenses and Registrations</h2>
            <ul className="space-y-2.5 mb-12 text-muted-foreground">
              {licenses.map((l) => (
                <li key={l} className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span>{l}</span></li>
              ))}
            </ul>

            <h2 className="heading-md mb-5 pl-4 border-l-[3px] border-primary">Step 4: Expected Margins in 2026</h2>
            <div className="overflow-x-auto rounded-xl border border-border mb-12">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-4 font-semibold">Product Line</th>
                    <th className="text-left p-4 font-semibold">Gross Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {marginRows.map(([p, m], idx) => (
                    <tr key={p} className={`border-t border-border ${idx === marginRows.length - 1 ? "bg-primary/5" : ""}`}>
                      <td className={`p-4 ${idx === marginRows.length - 1 ? "font-bold text-primary" : "font-medium"}`}>{p}</td>
                      <td className={`p-4 ${idx === marginRows.length - 1 ? "font-bold text-primary" : ""}`}>{m}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">Step 5: Building Your Manufacturer Partnership</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              This is the single most important decision you will make as a new dealer. Before signing with any manufacturer, verify:
            </p>
            <ul className="space-y-2.5 mb-12 text-muted-foreground">
              {partnerChecks.map((c) => (
                <li key={c} className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span>{c}</span></li>
              ))}
            </ul>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">Step 6: Negotiate Territory Exclusivity</h2>
            <div className="bg-primary/10 border-l-4 border-primary rounded-r-xl p-5 mb-12">
              <p className="text-sm md:text-base text-foreground">
                A credible manufacturer will not flood a single district with five competing dealers. Negotiate territory exclusivity for your pin codes <strong>before</strong> you sign — this protects your investment and maintains price discipline. Get it documented in the dealer agreement.
              </p>
            </div>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">Step 7: Lead Generation From Day One</h2>
            <ul className="space-y-2.5 mb-12 text-muted-foreground">
              {leadGen.map((l) => (
                <li key={l} className="flex gap-3"><Check className="w-5 h-5 text-primary flex-none mt-0.5" /><span>{l}</span></li>
              ))}
            </ul>

            <h2 className="heading-md mb-4 pl-4 border-l-[3px] border-primary">Why Goyama Solar Is the Right First Partner</h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              Goyama Solar's 1 GW Panipat facility manufactures BIS-certified TOPCon, Mono PERC and bifacial modules — all ALMM-eligible. We offer structured dealer onboarding with transparent pricing, territory protection and full subsidy portal training for PM Surya Ghar.
            </p>

            <div className="relative overflow-hidden rounded-2xl p-8 md:p-10 text-primary-foreground gradient-bg">
              <Sun className="absolute top-4 right-4 w-36 h-36 opacity-10 pointer-events-none" />
              <h3 className="heading-md mb-3 relative text-primary-foreground">Launch Your Solar Dealership in 2026</h3>
              <p className="text-primary-foreground/90 mb-6 max-w-xl relative">
                Connect with the Goyama Solar dealer team to receive a pricing sheet, territory check and onboarding kit.
              </p>
              <Link to="/contact" className="relative inline-flex items-center gap-2 bg-background text-primary font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                Get Dealer Pricing <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-[11px] font-bold tracking-wider text-primary mb-4">AT A GLANCE</div>
              <ul className="space-y-3 text-sm">
                {[
                  ["Start-up cost", "₹7–14L"],
                  ["GST on modules", "5%"],
                  ["Blended margin", "15–30%"],
                  ["EPC margin", "20–30%"],
                  ["Goyama dispatch", "48–72 hrs"],
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
              <p className="text-xs text-primary-foreground/90 mb-4">Monthly pricing, protected territories, 48–72hr dispatch.</p>
              <Link to="/contact" className="block w-full bg-background text-primary font-semibold py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
                Get Dealer Pack →
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

export default BlogDealerGuide;
