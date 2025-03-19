import { Breakpoints } from '@/styles/breakpoints';
import Link from 'next/link';
import styled, { css } from 'styled-components';

export const StyledFooter = styled.footer`
  background-color: var(--header-bg-clr);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
  padding: 32px 0;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    padding: 36px 0;
    
  }
`;

export const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media screen and (min-width: ${Breakpoints.md}) {
    gap: 40px;
  }
`;

export const StyledLink = styled(Link)`
  font-size: 14px;
  letter-spacing: -0.14px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: var(--accent-clr);
  }
`;

export const Copyright = styled.p`
  display: flex;
  align-items: center;
  color: var(--secondary-text-clr);
  font-size: 12px;
  font-weight: 300;
  letter-spacing: -0.12px;
`;

export const socialNetworksStyles = css`
  flex-direction: row;
  gap: 20px;
  width: 50%;

  @media screen and (min-width: ${Breakpoints.md}) {
    gap: 40px;
    border-left: 1px solid rgba(255, 255, 255, 0.12);
    border-right: 1px solid rgba(255, 255, 255, 0.12);
  }


  justify-content: center;

  a {
    box-shadow: none;
    background-color: transparent;
  }

  a div {
    background-color: transparent;
  }
`;
