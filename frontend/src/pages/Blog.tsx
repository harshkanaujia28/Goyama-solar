import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, User, Tag, Sparkles } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import facilityHero from "@/assets/facility-hero.jpg";
import manufacturingInterior from "@/assets/manufacturing-interior.jpg";
import solarPanelProduct from "@/assets/solar-panel-product.jpg";
import heroSunrise from "@/assets/hero-sunrise.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
  featured?: boolean;
}

const posts: Post[] = [
  {
    id: 1,
    title: "PM Surya Ghar Yojana 2026: Complete Subsidy Guide for Indian Homeowners",
   excerpt:
  "Indian solar manufacturers are rapidly competing with imported modules on price, efficiency, and reliability. Learn how DCR policies, government incentives, warranty coverage, and long-term performance impact your solar investment decision in 2026.",
    category: "Industry Insights",
    author: "Goyama Editorial",
    date: "June 14, 2026",
    readTime: "6 min read",
    image: facilityHero,
    link: "/blog/indian-manufacturer-vs-imports-2026",
  },
  // {
  //   id: 2,
  //   slug: "pm-surya-ghar-yojana-guide",
  //   title: "Understanding PM Surya Ghar Subsidy: A Complete Guide",
  //   excerpt:
  //     "Everything residential consumers need to know about the PM Surya Ghar Muft Bijli Yojana and how to maximize subsidy benefits.",
  //   category: "Policy & Subsidy",
  //   author: "Policy Desk",
  //   date: "May 28, 2026",
  //   readTime: "8 min read",
  //   image: solarPanelProduct,
  // },
  // {
  //   id: 3,
  //   slug: "pm-surya-ghar-yojana-guide",
  //   title: "Inside Our 300,000 Sq Ft Manufacturing Facility",
  //   excerpt:
  //     "A behind-the-scenes look at the automated production lines, quality systems, and people powering Goyama Solar's Munak plant.",
  //   category: "Inside Goyama",
  //   author: "Operations Team",
  //   date: "May 20, 2026",
  //   readTime: "5 min read",
  //   image: manufacturingInterior,
  // },
  // {
  //   id: 4,
  //   slug: "pm-surya-ghar-yojana-guide",
  //   title: "DCR vs Non-DCR Modules: Which One Is Right For You?",
  //   excerpt:
  //     "A practical comparison of Domestic Content Requirement modules and their non-DCR counterparts for residential and commercial projects.",
  //   category: "Technology",
  //   author: "Engineering Team",
  //   date: "May 12, 2026",
  //   readTime: "7 min read",
  //   image: solarPanelProduct,
  // },
  // {
  //   id: 5,
  //   slug: "pm-surya-ghar-yojana-guide",
  //   title: "Ahimsa in Manufacturing: Our Ethical Production Philosophy",
  //   excerpt:
  //     "How the principle of non-harm shapes every decision at Goyama Solar — from supply chain to workforce welfare.",
  //   category: "Sustainability",
  //   author: "Goyama Editorial",
  //   date: "May 2, 2026",
  //   readTime: "4 min read",
  //   image: heroSunrise,
  // },
  // {
  //   id: 6,
  //   slug: "pm-surya-ghar-yojana-guide",
  //   title: "How to Calculate Solar ROI for Your Business",
  //   excerpt:
  //     "A step-by-step framework commercial buyers can use to evaluate payback period, lifetime savings, and CAPEX vs OPEX models.",
  //   category: "Industry Insights",
  //   author: "Goyama Editorial",
  //   date: "April 24, 2026",
  //   readTime: "9 min read",
  //   image: facilityHero,
  // },
];

const categories = ["All", "Industry Insights", "Policy & Subsidy", "Inside Goyama", "Technology", "Sustainability"];

const Blog = () => {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");



 const filtered = useMemo(
  () =>
    posts
      .filter((p) =>
        activeCat === "All"
          ? true
          : p.category === activeCat
      )
      .filter((p) =>
        query.trim() === ""
          ? true
          : (
              p.title +
              p.excerpt +
              p.category
            )
              .toLowerCase()
              .includes(query.toLowerCase())
      ),
  [query, activeCat]
);

  return (
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
              Goyama <span className="gradient-text">Blog</span>
            </h1>
            <p className="body-lg text-muted-foreground">
              Insights on solar manufacturing, policy, technology, and the people building India's renewable future.
            </p>
          </motion.div>
        </div>
      </section>



      {/* Filters + Grid */}
      <section className="section-padding section-alt">
        <div className="container-section">
          <SectionHeading title="Latest Articles" highlight="Articles" subtitle="Browse insights across manufacturing, policy, and clean energy." />

          {/* Search + Categories */}


          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No articles match your search.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-background/95 backdrop-blur text-foreground text-[11px] font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1">
                      <Tag size={11} /> {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                      <span className="inline-flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                      <span className="inline-flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-lg leading-snug mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--heading-display)" }}>
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    <Link
                      to={post.link}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold gradient-text hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRight size={14} className="text-primary" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding">
        <div className="container-section max-w-4xl">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl gradient-bg p-10 md:p-14 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="relative">
              <h3 className="heading-md text-primary-foreground">Stay Ahead in Solar</h3>
              <p className="body-md text-primary-foreground/90 mt-3 max-w-xl mx-auto">
                Subscribe for monthly insights on manufacturing, policy updates, and energy transition stories.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 bg-background text-foreground rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-background/60"
                />
                <button
                  type="submit"
                  className="bg-foreground text-background px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-primary-foreground/70 mt-3">
                <Link to="/contact" className="underline">Or get in touch</Link> with our team directly.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
