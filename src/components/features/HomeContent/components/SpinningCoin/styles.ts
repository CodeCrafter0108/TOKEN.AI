import { Breakpoints } from '@/styles/breakpoints';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CoinWrapper = styled.div`
  width: 250px;
  height: 250px;
  perspective: 1000px;

  @media screen and (min-width: ${Breakpoints.lg}) {
    width: 350px;
    height: 350px;
  }
`;

export const Coin = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
`;

export const CoinFace = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  object-fit: contain;

  &.back {
    transform: rotateY(180deg);
  }
`;
