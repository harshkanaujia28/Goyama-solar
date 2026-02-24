import { motion, AnimatePresence } from "framer-motion";

interface Props {
  visible: boolean;
}

const IntroAnimation = ({ visible }: Props) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.video
            className="w-[420px] sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] object-contain"
            src="/rays.mp4"
            autoPlay
            muted
            playsInline
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;