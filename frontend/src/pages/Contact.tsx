import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(100).optional(),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast({
        title: "Inquiry Submitted",
        description: "We'll get back to you within 24 hours.",
      });

      setForm({
        name: "",
        company: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border ${errors[field] ? "border-destructive" : "border-border"} bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors`;

  return (
    <div>
      <section className="gradient-bg py-20">
        <div className="container-section text-center">
          <motion.h1 {...fadeUp} className="heading-xl text-primary-foreground">Contact Us</motion.h1>
          <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="body-lg text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
            Ready to partner with a responsible solar manufacturer? Get in touch.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div {...fadeUp}>
              <SectionHeading title="Get in Touch" highlight="Touch" center={false} />
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-semibold text-lg">GOYAMA INTERNATIONAL</h3>
                  <p className="text-muted-foreground mt-1">Solar Manufacturing Division</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-0.5 shrink-0" size={20} />
                    <span className="text-muted-foreground">Khewat No-112, Kohand to Assandh Road, VPO Munak, District Karnal, Haryana, India- 132040</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary shrink-0" size={20} />
                    <a href="mailto:info@goyamasolar.com" className="text-muted-foreground hover:text-foreground transition-colors">info@goyamasolar.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary shrink-0" size={20} />
                    <div className="text-muted-foreground">
                      <a href="tel:+919466666257" className="hover:text-foreground transition-colors">+91-9466666257</a>
                      <span className="mx-2">|</span>
                      <a href="tel:+919896684435" className="hover:text-foreground transition-colors">+91-9896684435</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="mt-8 rounded-xl overflow-hidden border border-border h-[280px]">
                <iframe
                  src="https://www.google.com/maps?q=29.502909,76.8680218&hl=en&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Goyama Solar Location"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <form
                onSubmit={handleSubmit}
                className="bg-section-alt p-8 md:p-10 rounded-2xl space-y-5"
              >
                <h3 className="heading-md mb-2">Send an Inquiry</h3>
                <div className="divider-orange mb-6" />

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name *</label>
                  <input
                    className={inputClass("name")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Company</label>
                  <input
                    className={inputClass("company")}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                    <input
                      className={inputClass("phone")}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91-XXXXXXXXXX"
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <input
                      className={inputClass("email")}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message *</label>
                  <textarea
                    className={`${inputClass("message")} min-h-[120px] resize-y`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your requirements..."
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-bg text-primary-foreground py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
                >
                  <Send size={18} />
                  {loading ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
