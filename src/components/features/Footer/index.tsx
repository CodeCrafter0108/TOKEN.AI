'use client';
import { Container } from '@/styles/global';
import { MarqueeAnimation } from '@/components/shared/Marquee';
import { SocialNetworks } from '../SocialNetworks';
import { BlockWrapper, Copyright, socialNetworksStyles, StyledFooter, StyledLink, Wrapper } from './styles';

export const Footer = () => {
  return (
    <>
      <MarqueeAnimation direction='left' />
      <StyledFooter>
        <Container>
          <Wrapper>
            <BlockWrapper>
              <StyledLink href={'#'}>Documentation</StyledLink>
              <StyledLink href={'#'}>Privacy</StyledLink>
            </BlockWrapper>
            <SocialNetworks styles={socialNetworksStyles} socialUrl='#' chatUrl='#' />
            <Copyright>{`© ${new Date().getFullYear()} TOKIO.AI. All Rights Reserved.`}</Copyright>
          </Wrapper>
        </Container>
      </StyledFooter>
    </>
  );
};
