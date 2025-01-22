import { Breakpoints } from '@/styles/breakpoints';
import Link from 'next/link';
import styled from 'styled-components';

export const NavigationContent = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }
`;

export const StyledLink = styled(Link)<{ $isActive: boolean }>`
  color: ${({ $isActive }) => ($isActive ? 'var(--accent-clr)' : 'var(--primary-text-clr)')};
  padding: 8px 12px;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  font-size: 18px;
  line-height: 1.5;
  transition: all 0.2s ease;

  @media screen and (min-width: ${Breakpoints.md}) {
    font-size: 14px;
    padding: 24px 12px;
  }

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
