import { Breakpoints } from '@/styles/breakpoints';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Menu = styled(motion.div)`
  position: absolute;
  width: 100dvw;
  height: 100%;
  padding: 72px 24px 12px 24px;

  top: 0;
  z-index: 150;

  background: var(--header-bg-clr);

  display: flex;
  flex-direction: column;
  gap: 18px;

  overflow-y: auto;

  @media screen and (min-width: ${Breakpoints.md}) {
    display: none;
  }
`;

export const ButtonWrapper = styled.div`
  padding-top: 18px;
  border-top: 1px solid rgba(137, 140, 144, 0.35);
`
