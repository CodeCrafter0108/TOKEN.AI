import Button from '@/components/shared/Button';
import { Breakpoints } from '@/styles/breakpoints';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const agentCardStyles = css`
  background-color: var(--secondary-box-bg-clr);
  width: 100%;

  @media screen and (min-width: ${Breakpoints.xl}) {
    max-width: 250px;
    min-width: 230px;
    min-height: 295px; // FIX
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 24px;

  @media screen and (max-width: 1700px) {
    overflow: hidden;
    position: relative;

    &::after {
      content: '';
      bottom: 0;
      right: 0;
      position: absolute;
      height: 90%;
      width: 10%;
      background: linear-gradient(to left, var(--background-clr), rgba(0, 0, 0, 0));
      pointer-events: none;
    }
  }
`;

export const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const CarouselButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;

  border-radius: 50%;
  border: 1px solid var(--white-clr);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--accent-clr);
  }
`;

export const SlidesWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  width: 100%;

  transition: transform 0.2s ease;
`;

export const SlideItem = styled(motion.div)`
  flex: 0 0 100%;

  @media (min-width: 540px) {
    flex: 0 0 50%;
  }

  @media (min-width: 790px) {
    flex: 0 0 33%;
  }

  @media (min-width: 1050px) {
    flex: 0 0 25%;
  }

  @media (min-width: 1300px) {
    flex: 0 0 20%;
  }

  @media (min-width: 1780px) {
    flex: 0 0 16.5%;
  }
`;

export const SlideContent = styled.div`
  transition: all 0.2s ease;
  transform-origin: center;
  width: 100%;
`;

export const CarouselFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  position: relative;
`;

export const Blur = styled.div`
  width: 524px;
  height: 11px;
  flex-shrink: 0;
  border-radius: 524px;
  background: rgba(53, 83, 49, 0.58);
  z-index: -1;

  filter: blur(18.399999618530273px);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
