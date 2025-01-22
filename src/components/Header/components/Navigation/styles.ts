import Link from "next/link";
import styled from "styled-components";

export const NavigationContent = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  font-weight: 500;
  line-height: 1.5;
`;

export const StyledLink = styled(Link)<{$isActive: boolean}>`
  padding: 1.5rem 0.75rem;
  font-weight: ${({ $isActive }) => $isActive ? 600 : 500};
  color: ${({ $isActive }) => $isActive ? 'var(--accent-clr)' : 'var(--primary-text-clr)'};

  &:hover {
    font-weight: 600;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

`;