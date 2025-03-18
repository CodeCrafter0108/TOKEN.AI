import { motion } from 'framer-motion';
import styled, { RuleSet } from 'styled-components';

export const Overlay = styled(motion.div)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Wrapper = styled(motion.div)<{ $styles?: RuleSet<object> }>`
  width: 95%;
  max-width: 410px;
  padding: 16px;
  ${({ $styles }) => $styles && $styles};
  background-color: var(--header-bg-clr);
  border-radius: 8px;
  outline: none;
`;
