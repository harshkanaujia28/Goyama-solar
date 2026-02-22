import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("intro-seen", "1");
      setShow(false);
      setTimeout(onComplete, 500);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-white"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Large Video */}
        <motion.video
          className="w-[380px] sm:w-[520px] md:w-[700px] lg:w-[900px] xl:w-[1100px] object-contain"
          src="/sunrise-intro.tmp"
          autoPlay
          muted
          playsInline
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Skip Button */}
        <button
          className="absolute bottom-6 right-6 text-sm text-gray-500 hover:text-black transition-colors"
          onClick={() => {
            sessionStorage.setItem("intro-seen", "1");
            onComplete();
          }}
        >
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;