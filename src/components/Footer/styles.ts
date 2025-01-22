import { Breakpoints } from '@/styles/breakpoints';
import Link from 'next/link';
import styled from 'styled-components';

export const StyledFooter = styled.footer`
  margin-top: auto;
  background-color: var(--footer-bg-clr);
`;

export const Wrapper = styled.div`
  padding-top: 1.75rem;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: ${Breakpoints.md}) {
    padding: 2.25rem 0;
  }
`;

export const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.14px;
`;

export const StyledLink = styled(Link)`
  font-size: 0.875rem;
  letter-spacing: -0.14px;
  line-height: 1.5;
`;

export const Copyright = styled.p`
  color: var(--secondary-text-clr);
  font-size: 0.875rem;
  font-weight: 300;
  letter-spacing: -0.14px;

  @media screen and (min-width: ${Breakpoints.md}) {
    margin-top: 2.5rem;
  }
`;

export const LogoWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${Breakpoints.md}) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

export const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 1.75rem;
  padding-top: 0.75rem;

  @media screen and (min-width: ${Breakpoints.md}) {
    display: none;
  }
`;

export const DesktopContainer = styled.div`
   @media screen and (max-width:  ${Breakpoints.md}) {
    display: none;
  }
`;