import { Variants } from 'framer-motion';

export const cardVariants: Variants = {
  initial: { opacity: 0, x: -50, scale: 0.8 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } }
};

