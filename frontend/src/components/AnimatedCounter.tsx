import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  target: number;
  suffix?: string;
  label: string;
}

const AnimatedCounter = ({ target, suffix = "", label }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      start += step;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  // 🔥 Smart formatter
  const formatNumber = (value: number) => {
    // If label contains "Year", don't add comma
    if (label.toLowerCase().includes("year")) {
      return value.toString();
    }

    // Otherwise use Indian number format
    return new Intl.NumberFormat("en-IN").format(value);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="heading-xl gradient-text">
        {formatNumber(count)}
        {suffix}
      </div>

      <p className="body-md text-muted-foreground mt-2">
        {label}
      </p>
    </motion.div>
  );
};

export default AnimatedCounter;