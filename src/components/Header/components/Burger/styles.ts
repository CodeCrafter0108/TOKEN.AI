import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const BurgerWrapper = styled.div<{ $isOpened: boolean }>`
  width: 22px;
  height: 22px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;

  z-index: 200;

  span {
    width: 27px;
    height: 2px;
    background: var(--primary-clr);
    position: ${({ $isOpened }) => ($isOpened ? 'absolute' : 'static')};
    transition: all 0.2s ease;
  }

  span:nth-child(1) {
    transform: ${({ $isOpened }) => ($isOpened ? 'rotate(45deg)' : 'none')};
  }

  span:nth-child(2) {
    opacity: ${({ $isOpened }) => ($isOpened ? 0 : 1)};
  }

  span:nth-child(3) {
    transform: ${({ $isOpened }) => ($isOpened ? 'rotate(-45deg)' : 'none')};
  }

  @media screen and (min-width: ${Breakpoints.md}) {
    display: none;
  }
`;
