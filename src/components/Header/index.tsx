'use client';
import ConnectButton from '../ConnectButton';
import { Logo } from '@/components/Logo/index';
import { Container } from '@/styles/global';
import { NavigationWrapper, Wrapper, StyledHeader } from './styles';
import { MarqueeAnimation } from '../Marquee';
import { Navigation } from './components/Navigation';
import { Burger } from './components/Burger';
import { useState } from 'react';
import { MobileMenu } from './components/MobileMenu';

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <StyledHeader>
        <Container>
          <Wrapper>
            <Logo />
            <NavigationWrapper>
              <Navigation />
              <ConnectButton styles={{ width: '165px' }} />
            </NavigationWrapper>
            <Burger setIsOpen={setIsOpen} isOpen={isOpen} />
          </Wrapper>
        </Container>
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
      </StyledHeader>
      <MarqueeAnimation />
    </>
  );
};
