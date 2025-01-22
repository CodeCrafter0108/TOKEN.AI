'use client';
import { Container } from '@/styles/global';
import { Logo } from '@/components/Logo/index';
import {
  BlockWrapper,
  Title,
  StyledLink,
  Copyright,
  LogoWrapper,
  Wrapper,
  StyledFooter,
  MobileContainer,
  DesktopContainer
} from './styles';
import { SocialNetworks } from '../SocialNetworks';
import { MarqueeAnimation } from '../Marquee';

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
              <SocialNetworks />
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
