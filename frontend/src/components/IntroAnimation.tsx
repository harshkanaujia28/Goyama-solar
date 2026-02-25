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
            className="w-[280px] sm:w-[380px] md:w-[500px] lg:w-[600px] xl:w-[700px] max-w-[90vw] object-contain"
            src="/goyama-rays 1.mp4"
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