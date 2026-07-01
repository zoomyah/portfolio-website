import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-[60vh]"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
