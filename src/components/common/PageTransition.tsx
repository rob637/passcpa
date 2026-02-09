import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

// Google-style fade + subtle slide transition
const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.2, 0, 0, 1] as const, // Google's standard easing
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

/**
 * PageTransition - Wraps page content with smooth fade transitions
 * 
 * Following Google Material Design 3 motion principles:
 * - Subtle vertical movement (8px) during entrance
 * - Quick fade out on exit (150ms)
 * - Uses standard Material easing curves
 * 
 * Usage:
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Simpler fade-only transition for modals and overlays
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.15 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.1 }
  },
};

// Slide up transition for bottom sheets
export const slideUpVariants = {
  hidden: { 
    y: '100%',
    opacity: 0.5,
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300,
    },
  },
  exit: { 
    y: '100%',
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

// Scale transition for cards/interactive elements
export const scaleVariants = {
  initial: { scale: 1 },
  tap: { 
    scale: 0.97,
    transition: { duration: 0.1 }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
};

export default PageTransition;
