import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  duration?: number;
  condition?: boolean;
  delay?: number;
}

const Spring = ({ children, condition = true }: AnimatedWrapperProps) => {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 15
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Opacity = ({ children, duration = 0.5, condition = true, delay = 0 }: AnimatedWrapperProps) => {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration,
            ease: 'easeInOut',
            delay
          }}
          style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AnimatedWrapper = { Opacity, Spring };
