import { motion } from 'framer-motion';
import styled, { RuleSet } from 'styled-components';
import Button from '../Button';
import ChevronIcon from '@/assets/icons/chevron.svg';

export const Wrapper = styled.div<{ $styles?: RuleSet<object> }>`
  overflow: hidden;

  ${({ $styles }) => $styles}
`;

export const Header = styled(Button)`
  width: 100%;
  padding: 16px 0;
  color: var(--white-clr);

  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const Indicator = styled(ChevronIcon)<{ $isOpen: boolean }>`
  transition: all 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

export const ContentWrapper = styled(motion.div)`
  overflow: hidden;
`;

export const Content = styled.div``;
