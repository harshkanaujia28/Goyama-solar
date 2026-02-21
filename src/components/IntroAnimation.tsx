import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoyamaLogo from "./GoyamaLogo";

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"white" | "logo" | "sunrise" | "done">("white");

  useEffect(() => {
    // Check session storage
    if (sessionStorage.getItem("intro-seen")) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase("logo"), 300);
    const t2 = setTimeout(() => setPhase("sunrise"), 1100);
    const t3 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("intro-seen", "1");
      setTimeout(onComplete, 600);
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (sessionStorage.getItem("intro-seen")) return null;

  const rays = Array.from({ length: 12 }, (_, i) => i);

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "hsl(0, 0%, 100%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sunrise glow */}
          {(phase === "sunrise") && (
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: "200vw", height: "200vh", opacity: 0.6 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            >
              <div className="w-full h-full intro-sunrise" />
            </motion.div>
          )}

          {/* Rays */}
          {phase === "sunrise" && rays.map((i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 left-1/2 origin-bottom"
              style={{
                width: "2px",
                height: "100vh",
                rotate: `${i * 30 - 165}deg`,
                background: `linear-gradient(to top, hsl(37, 100%, 50%), transparent)`,
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.15 }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: "easeOut" }}
            />
          ))}

          {/* Logo */}
          {phase !== "white" && (
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={
                phase === "sunrise"
                  ? { opacity: 1, scale: 0.7, y: -200 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative z-10"
            >
             <GoyamaLogo className="w-[320px] sm:w-[420px] md:w-[520px] lg:w-[600px]" />
            </motion.div>
          )}

          {/* Skip button */}
          <motion.button
            className="absolute bottom-6 right-6 text-sm font-body text-muted-foreground hover:text-foreground transition-colors z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              sessionStorage.setItem("intro-seen", "1");
              onComplete();
            }}
          >
            Skip
          </motion.button>

          {/* Flash overlay */}
          {phase === "sunrise" && (
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              style={{ backgroundColor: "hsl(37, 100%, 50%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.15, 0] }}
              transition={{ duration: 2.5, times: [0, 0.8, 0.9, 1] }}
            />
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroAnimation;
