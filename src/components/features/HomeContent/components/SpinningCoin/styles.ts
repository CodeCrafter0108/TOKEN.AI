import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CoinWrapper = styled.div`
  width: 350px;
  height: 350px;
  perspective: 1000px;
`;

export const CoinImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform-style: preserve-3d;
`;