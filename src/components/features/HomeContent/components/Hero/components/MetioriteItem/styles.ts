import { motion } from 'framer-motion';
import styled, { RuleSet } from 'styled-components';

export const Wrapper = styled.div<{ $styles: RuleSet<object> }>`
  ${({ $styles }) => $styles}
`;

export const Img = styled.div`
  width: 120%;
  height: 120%;
  background-image: url('/images/homepage/circle_white.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.75;
`;

export const ColorFilter = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
`;
