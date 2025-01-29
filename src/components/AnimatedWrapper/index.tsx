import { motion } from 'framer-motion';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  duration?: number;
}

const Spring = ({ children }: AnimatedWrapperProps) => {
  return (
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
  );
};

const Opacity = ({ children, duration = 0.5 }: AnimatedWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration,
        ease: 'easeInOut'
      }}
      style={{display: 'flex', flexDirection: 'column', flex: 1}}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedWrapper = { Opacity, Spring };