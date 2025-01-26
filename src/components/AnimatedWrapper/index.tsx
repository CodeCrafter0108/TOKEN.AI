import { motion } from 'framer-motion';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  duration?: number;
}

const AnimatedWrapper = ({ children, duration = 0.5 }: AnimatedWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
