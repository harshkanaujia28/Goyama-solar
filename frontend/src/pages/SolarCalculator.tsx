import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Zap, IndianRupee, Clock, Leaf, TrendingUp, ArrowRight, CheckCircle2,
  Phone, MessageCircle, Sparkles, ShieldCheck, Award, Factory, Calculator,
} from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// ---------- Constants ----------
const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu",
  "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const STATE_SUN_HOURS: Record<string, number> = {
  "Rajasthan": 5.8, "Gujarat": 5.6, "Madhya Pradesh": 5.5, "Maharashtra": 5.4,
  "Karnataka": 5.4, "Telangana": 5.5, "Andhra Pradesh": 5.5, "Tamil Nadu": 5.4,
  "Haryana": 5.3, "Punjab": 5.2, "Delhi": 5.2, "Uttar Pradesh": 5.1,
  "Bihar": 5.0, "West Bengal": 4.9, "Assam": 4.5,
};

const TARIFF: Record<string, number> = { Residential: 7.5, Commercial: 9.5 };

const ROOF_FACTORS: Record<string, number> = {
  "RCC / Concrete": 1.0,
  "Metal Sheet": 0.95,
  "Tile Roof": 0.92,
  "Ground Mount": 1.05,
};

const PRICING: Record<string, Record<string, number>> = {
  Residential: { DCR: 45000, "Non-DCR": 35000 },
  Commercial: { DCR: 35000, "Non-DCR": 25000 },
};

const SYSTEM_EFFICIENCY = 0.77;
const UTILIZATION = 0.9;
const CO2_PER_KWH = 0.716;

type ConsumerType = "Residential" | "Commercial";
type PanelType = "DCR" | "Non-DCR";
type RoofType = keyof typeof ROOF_FACTORS;

interface CalcInputs {
  monthlyBill: number;
  state: string;
  consumerType: ConsumerType;
  panelType: PanelType;
  roofType: RoofType;
}

interface CalcResult {
  capacity: number;
  monthlySavings: number;
  annualSavings: number;
  lifetimeSavings: number;
  paybackYears: number;
  annualGeneration: number;
  co2Reduction: number;
  systemCost: number;
  subsidy: number;
  netInvestment: number;
}

function calcSubsidy(capacity: number, consumerType: ConsumerType, panelType: PanelType): number {
  if (!(consumerType === "Residential" && panelType === "DCR")) return 0;
  if (capacity <= 2) return capacity * 30000;
  if (capacity <= 3) return 60000;
  return 78000;
}

function calculate(inputs: CalcInputs): CalcResult {
  const tariff = TARIFF[inputs.consumerType];
  const sunHours = STATE_SUN_HOURS[inputs.state] ?? 5.0;
  const roofFactor = ROOF_FACTORS[inputs.roofType];

  const monthlyUnits = inputs.monthlyBill / tariff;
  let capacity = monthlyUnits / (30 * sunHours * roofFactor * SYSTEM_EFFICIENCY);
  capacity = Math.max(1, Math.round(capacity * 10) / 10);

  const dailyGeneration = capacity * sunHours * roofFactor * SYSTEM_EFFICIENCY;
  const annualGeneration = dailyGeneration * 365;
  const annualConsumption = monthlyUnits * 12;

  const annualSavings = Math.min(annualGeneration, annualConsumption) * tariff * UTILIZATION;
  const monthlySavings = annualSavings / 12;

  let lifetime = 0;
  for (let y = 0; y < 25; y++) {
    const degraded = Math.pow(1 - 0.005, y);
    const escalated = Math.pow(1.03, y);
    lifetime += annualSavings * degraded * escalated;
  }

  const systemCost = capacity * PRICING[inputs.consumerType][inputs.panelType];
  const subsidy = calcSubsidy(capacity, inputs.consumerType, inputs.panelType);
  const netInvestment = systemCost - subsidy;
  const paybackYears = Math.round((netInvestment / annualSavings) * 10) / 10;
  const co2Reduction = annualGeneration * CO2_PER_KWH;

  return {
    capacity, monthlySavings, annualSavings, lifetimeSavings: lifetime,
    paybackYears, annualGeneration, co2Reduction,
    systemCost, subsidy, netInvestment,
  };
}

const fmtINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtLakh = (n: number) => `₹${(n / 100000).toFixed(2)} Lakh`;

const leadSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit phone"),
  email: z.string().trim().email("Invalid email").max(255),
  city: z.string().trim().min(2, "City is required").max(100),
});

// ---------- Sub-components ----------
const StepBadge = ({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) => (
  <div className="flex items-center gap-3">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${done ? "gradient-bg border-transparent text-white" :
        active ? "bg-primary/10 border-primary text-primary" :
          "bg-muted border-border text-muted-foreground"
      }`}>
      {done ? <CheckCircle2 className="w-5 h-5" /> : n}
    </div>
    <div className="hidden md:block">
      <div className={`text-[10px] uppercase tracking-wider ${active || done ? "text-foreground" : "text-muted-foreground"}`}>Step {n}</div>
      <div className={`text-sm font-semibold ${active || done ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
    </div>
  </div>
);

const ResultCard = ({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string; accent?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`relative overflow-hidden rounded-2xl p-5 border ${accent
        ? "gradient-bg border-transparent text-white shadow-lg"
        : "bg-card border-border shadow-sm hover:shadow-md transition-shadow"
      }`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${accent ? "bg-white/20" : "bg-primary/10"}`}>
      <Icon className={`w-5 h-5 ${accent ? "text-white" : "text-primary"}`} />
    </div>
    <div className={`text-xs uppercase tracking-wider mb-1 ${accent ? "text-white/80" : "text-muted-foreground"}`}>{label}</div>
    <div className={`text-2xl font-bold ${accent ? "text-white" : "text-foreground"}`} style={{ fontFamily: "var(--heading-display)" }}>
      {value}
    </div>
  </motion.div>
);

// ---------- Main Page ----------
export default function SolarCalculator() {
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const proposalRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [monthlyBill, setMonthlyBill] = useState(3000);
  const [state, setState] = useState("Maharashtra");
  const [consumerType, setConsumerType] = useState<ConsumerType>("Residential");
  const [panelType, setPanelType] = useState<PanelType>("DCR");
  const [roofType, setRoofType] = useState<RoofType>("RCC / Concrete");

  const [result, setResult] = useState<CalcResult | null>(null);
  const [lead, setLead] = useState({ name: "", phone: "", email: "", city: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleCalculate = () => {
    if (monthlyBill < 500) {
      toast({ title: "Bill too low", description: "Please enter monthly bill of at least ₹500", variant: "destructive" });
      return;
    }
    const r = calculate({ monthlyBill, state, consumerType, panelType, roofType });
    setResult(r);
    setStep(2);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(lead);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    if (result) {
      const subject = `New Solar Lead — ${lead.name} (${result.capacity} kW)`;
      const body =
        `New Solar Calculator Lead

Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
City: ${lead.city}
State: ${state}
Consumer Type: ${consumerType}
Panel Type: ${panelType}
Roof Type: ${roofType}
Monthly Bill: ₹${monthlyBill}

— Recommended System —
Capacity: ${result.capacity} kW
Monthly Savings: ${fmtINR(result.monthlySavings)}
Annual Savings: ${fmtINR(result.annualSavings)}
Payback: ${result.paybackYears} years
System Cost: ${fmtINR(result.systemCost)}
Subsidy: ${fmtINR(result.subsidy)}
Net Investment: ${fmtINR(result.netInvestment)}`;
      try {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/solar-lead`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lead,
              calculator: {
                monthlyBill,
                state,
                consumerType,
                panelType,
                roofType,
              },
              result,
            }),
          }
        );
      } catch { }
    }

    setTimeout(() => {
      setSubmitting(false);
      setStep(4);
      toast({ title: "Proposal Unlocked!", description: "Our solar expert will contact you within 24 hours." });
      setTimeout(() => proposalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }, 600);
  };

  const billPresets = [1500, 3000, 5000, 8000, 15000, 25000];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
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
              Calculate Your <span className="gradient-text">Solar Savings</span>
            </h1>
            <p className="body-lg text-muted-foreground">
              Get an instant estimate of how much you can save with Goyama Solar — backed by tier-1 manufacturing and 25-year performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-y border-border">
        <div className="container-section py-4 flex items-center justify-between gap-4 overflow-x-auto">
          <StepBadge n={1} label="Usage" active={step === 1} done={step > 1} />
          <div className="flex-1 h-px bg-border min-w-[20px]" />
          <StepBadge n={2} label="Savings" active={step === 2} done={step > 2} />
          <div className="flex-1 h-px bg-border min-w-[20px]" />
          <StepBadge n={3} label="Details" active={step === 3} done={step > 3} />
          <div className="flex-1 h-px bg-border min-w-[20px]" />
          <StepBadge n={4} label="Proposal" active={step === 4} done={step > 4} />
        </div>
      </section>

      {/* STEP 1: INPUT */}
      <section className="py-12 md:py-16">
        <div className="container-section max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl p-6 md:p-10 border border-border shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-md">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--heading-display)" }}>Your Usage Details</h2>
                <p className="text-sm text-muted-foreground">Tell us about your electricity consumption</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Monthly Bill */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-3 text-foreground">Monthly Electricity Bill</label>
                <div className="section-alt border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                    <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2 shadow-sm">
                      <IndianRupee className="w-6 h-6 text-primary" />
                      <input
                        type="number"
                        min={0}
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(Math.max(0, Number(e.target.value) || 0))}
                        placeholder="Enter your bill"
                        className="bg-transparent text-3xl md:text-4xl font-bold w-44 outline-none text-foreground placeholder:text-muted-foreground/50"
                        style={{ fontFamily: "var(--heading-display)" }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">per month (₹)</span>
                  </div>
                  <input
                    type="range" min={500} max={50000} step={500}
                    value={Math.min(monthlyBill, 50000)}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground mt-1 mb-3">
                    <span>₹500</span><span>₹25,000</span><span>₹50,000+</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-muted-foreground self-center mr-1">Quick select:</span>
                    {billPresets.map((p) => (
                      <button key={p} onClick={() => setMonthlyBill(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${monthlyBill === p
                            ? "gradient-bg border-transparent text-white shadow-sm"
                            : "bg-card border-border text-foreground hover:border-primary/50"
                          }`}>
                        ₹{p.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    💡 Tip: You can drag the slider, click a preset, or type your exact bill above.
                  </p>
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">State</label>
                <select value={state} onChange={(e) => setState(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary text-foreground">
                  {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Roof */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Roof Type</label>
                <select value={roofType} onChange={(e) => setRoofType(e.target.value as RoofType)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary text-foreground">
                  {Object.keys(ROOF_FACTORS).map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Consumer Type */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Consumer Type</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-muted border border-border rounded-xl">
                  {(["Residential", "Commercial"] as ConsumerType[]).map((t) => (
                    <button key={t} onClick={() => setConsumerType(t)}
                      className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${consumerType === t ? "gradient-bg text-white shadow" : "text-muted-foreground hover:text-foreground"
                        }`}>{t}</button>
                  ))}
                </div>
              </div>

              {/* Panel Type */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Panel Type</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-muted border border-border rounded-xl">
                  {(["DCR", "Non-DCR"] as PanelType[]).map((t) => (
                    <button key={t} onClick={() => setPanelType(t)}
                      className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${panelType === t ? "gradient-bg text-white shadow" : "text-muted-foreground hover:text-foreground"
                        }`}>{t}</button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {panelType === "DCR" ? "DCR panels qualify for govt subsidy (residential)" : "Non-DCR: lower cost, no subsidy"}
                </p>
              </div>
            </div>

            <button onClick={handleCalculate}
              className="mt-8 w-full gradient-bg text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/30 transition-all group">
              <Calculator className="w-5 h-5" />
              Calculate My Savings
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* STEP 2: SAVINGS RESULTS */}
      <AnimatePresence>
        {result && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-12 md:py-16 section-alt"
          >
            <div className="container-section max-w-6xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold">Your Savings Potential</span>
                </div>
                <h2 className="heading-lg mb-3">
                  ⚡ You Can Save <span className="gradient-text">{fmtINR(result.monthlySavings)}</span> Every Month
                </h2>
                <p className="text-muted-foreground">With a {result.capacity} kW Goyama Solar system</p>
              </div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden rounded-3xl p-8 md:p-12 mb-8 text-center gradient-bg shadow-xl"
              >
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
                  backgroundSize: "30px 30px"
                }} />
                <div className="relative">
                  <div className="text-sm uppercase tracking-widest text-white/90 mb-3">25-Year Lifetime Savings</div>
                  <div className="text-5xl md:text-7xl font-black text-white mb-3" style={{ fontFamily: "var(--heading-display)" }}>
                    {fmtLakh(result.lifetimeSavings)}
                  </div>
                  <div className="text-white/90 text-sm">Includes 3% annual tariff escalation & 0.5% panel degradation</div>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <ResultCard icon={Zap} label="Recommended Capacity" value={`${result.capacity} kW`} />
                <ResultCard icon={IndianRupee} label="Annual Savings" value={fmtINR(result.annualSavings)} />
                <ResultCard icon={TrendingUp} label="Monthly Savings" value={fmtINR(result.monthlySavings)} />
                <ResultCard icon={Clock} label="Payback Period" value={`${result.paybackYears} yrs`} />
                <ResultCard icon={Sun} label="Annual Generation" value={`${Math.round(result.annualGeneration).toLocaleString("en-IN")} kWh`} />
                <ResultCard icon={Leaf} label="CO₂ Reduction / yr" value={`${(result.co2Reduction / 1000).toFixed(1)} T`} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 bg-card rounded-2xl p-6 md:p-8 border border-border shadow-md text-center"
              >
                <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: "var(--heading-display)" }}>
                  Want the full proposal with pricing & subsidy?
                </h3>
                <p className="text-muted-foreground mb-5">
                  Unlock your detailed system cost, subsidy eligibility, and net investment.
                </p>
                <button
                  onClick={() => {
                    setStep(3);
                    setTimeout(() => leadRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
                  }}
                  className="gradient-bg text-white font-bold py-3 px-8 rounded-xl inline-flex items-center gap-2 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  Get Your Detailed Proposal
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* STEP 3: LEAD FORM */}
      <AnimatePresence>
        {result && step >= 3 && step < 4 && (
          <motion.section
            ref={leadRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 md:py-16"
          >
            <div className="container-section max-w-2xl">
              <div className="bg-card rounded-3xl p-6 md:p-10 border border-border shadow-xl">
                <div className="text-center mb-8">
                  <div className="inline-flex w-14 h-14 rounded-2xl gradient-bg items-center justify-center mb-4 shadow-md">
                    <ShieldCheck className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="heading-md mb-2">Almost There!</h2>
                  <p className="text-muted-foreground">Get your detailed proposal with pricing & subsidy details.</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                    { key: "phone", label: "Phone Number", type: "tel", placeholder: "10-digit mobile" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "you@email.com" },
                    { key: "city", label: "City", type: "text", placeholder: "Your city" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-sm font-semibold mb-2 text-foreground">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={(lead as any)[f.key]}
                        onChange={(e) => setLead({ ...lead, [f.key]: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/60"
                      />
                      {errors[f.key] && <p className="text-destructive text-xs mt-1">{errors[f.key]}</p>}
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full gradient-bg text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Unlock Detailed Proposal"}
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    🔒 Your information is secure. We respect your privacy.
                  </p>
                </form>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* STEP 4: PROPOSAL */}
      <AnimatePresence>
        {result && step === 4 && (
          <motion.section
            ref={proposalRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 md:py-20 section-alt"
          >
            <div className="container-section max-w-5xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-xs uppercase tracking-wider text-green-600 font-semibold">Proposal Unlocked</span>
                </div>
                <h2 className="heading-lg mb-3">Your <span className="gradient-text">Goyama Solar</span> Proposal</h2>
                <p className="text-muted-foreground">Hi {lead.name}, here's your complete solar investment breakdown.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <ResultCard icon={IndianRupee} label="System Cost" value={fmtINR(result.systemCost)} />
                <ResultCard
                  icon={Award}
                  label={result.subsidy > 0 ? "Govt Subsidy" : "Subsidy"}
                  value={result.subsidy > 0 ? fmtINR(result.subsidy) : "Not Eligible"}
                />
                <ResultCard icon={TrendingUp} label="Net Investment" value={fmtINR(result.netInvestment)} accent />
              </div>

              <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-bold" style={{ fontFamily: "var(--heading-display)" }}>Proposal Summary</h3>
                </div>
                <div className="divide-y divide-border">
                  {[
                    ["Recommended Capacity", `${result.capacity} kW`],
                    ["Panel Type", `${panelType} (Goyama Tier-1)`],
                    ["Roof Type", roofType],
                    ["Consumer Type", consumerType],
                    ["State", state],
                    ["Annual Generation", `${Math.round(result.annualGeneration).toLocaleString("en-IN")} kWh`],
                    ["Annual Savings", fmtINR(result.annualSavings)],
                    ["25-Year Lifetime Savings", fmtLakh(result.lifetimeSavings)],
                    ["System Cost", fmtINR(result.systemCost)],
                    ["Government Subsidy", result.subsidy > 0 ? `− ${fmtINR(result.subsidy)}` : "Not applicable"],
                    ["Net Investment", fmtINR(result.netInvestment)],
                    ["Payback Period", `${result.paybackYears} years`],
                    ["CO₂ Offset / Year", `${(result.co2Reduction / 1000).toFixed(2)} tonnes`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center px-6 py-3.5">
                      <span className="text-muted-foreground text-sm">{k}</span>
                      <span className="font-semibold text-foreground">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                <a href="tel:+919999999999"
                  className="gradient-bg text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Phone className="w-5 h-5" /> Talk to Solar Expert
                </a>
                <a href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi Goyama Solar, I just generated a proposal for ${result.capacity} kW. Please contact me.`)}`}
                  target="_blank" rel="noreferrer"
                  className="bg-[#25D366] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-xl transition-all">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </a>
              </div>

              <p className="text-center text-muted-foreground text-sm mt-6">
                Our solar expert will reach out within 24 hours with a site survey & customized quote.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Why Goyama */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container-section max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-3">Why <span className="gradient-text">Goyama Solar</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">National-scale manufacturing, ethical practices, and 25-year performance you can trust.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Factory, title: "300,000 sq ft Facility", desc: "State-of-the-art manufacturing plant" },
              { icon: Award, title: "Tier-1 Quality", desc: "Premium solar modules with global certifications" },
              { icon: ShieldCheck, title: "25-Year Warranty", desc: "Performance guarantee for long-term peace of mind" },
              { icon: Leaf, title: "Ethical & Eco-First", desc: "Ahimsa philosophy in every panel we build" },
            ].map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-1.5" style={{ fontFamily: "var(--heading-display)" }}>{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
