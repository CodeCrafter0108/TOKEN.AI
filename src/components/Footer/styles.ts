import { Breakpoints } from '@/styles/breakpoints';
import Link from 'next/link';
import styled from 'styled-components';

export const StyledFooter = styled.footer`
  background-color: var(--footer-bg-clr);
`;

export const Wrapper = styled.div`
  padding-top: 28px;
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: ${Breakpoints.md}) {
    padding: 36px 0;
  }
`;

export const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.14px;
`;

export const StyledLink = styled(Link)`
  font-size: 14px;
  letter-spacing: -0.14px;
  line-height: 1.5;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: var(--accent-clr);
  }
`;

export const Copyright = styled.p`
  color: var(--secondary-text-clr);
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.14px;

  @media screen and (min-width: ${Breakpoints.md}) {
    margin-top: 40px;
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
  gap: 12px;
  padding-bottom: 28px;
  padding-top: 12px;

  @media screen and (min-width: ${Breakpoints.md}) {
    display: none;
  }
`;

export const DesktopContainer = styled.div`
   @media screen and (max-width:  ${Breakpoints.md}) {
    display: none;
  }
`;