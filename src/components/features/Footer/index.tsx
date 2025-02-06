'use client';
import { Logo } from '@/components/shared/Logo/index';
import { Container } from '@/styles/global';
import { MarqueeAnimation } from '@/components/shared/Marquee';
import { SocialNetworks } from '../SocialNetworks';
import {
  BlockWrapper,
  Copyright,
  DesktopContainer,
  LogoWrapper,
  MobileContainer,
  StyledFooter,
  StyledLink,
  Title,
  Wrapper
} from './styles';

export const Footer = () => {
  return (
    <>
      <MarqueeAnimation direction='left' />
      <StyledFooter>
        <Container>
          <Wrapper>
            <BlockWrapper>
              <Title>Documentation</Title>
              <StyledLink href={'#'}>Terms of use</StyledLink>
              <StyledLink href={'#'}>Privacy</StyledLink>
              <DesktopContainer>
                <Copyright>{`© ${new Date().getFullYear()} TOKIO.AI. All Rights Reserved.`}</Copyright>
              </DesktopContainer>
            </BlockWrapper>
            <BlockWrapper>
              <Title>Socials</Title>
              <SocialNetworks socialUrl='#' chatUrl='#' />
            </BlockWrapper>
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
          </Wrapper>
          <MobileContainer>
            <Logo />
            <Copyright>{`© ${new Date().getFullYear()} TOKIO.AI. All Rights Reserved.`}</Copyright>
          </MobileContainer>
        </Container>
      </StyledFooter>
    </>
  );
};
