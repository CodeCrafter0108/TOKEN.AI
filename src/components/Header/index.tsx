'use client';
import ConnectButton from '../ConnectButton';
import { Logo } from '@/components/Logo/index';
import { Container } from '@/styles/global';
import { NavigationWrapper, Wrapper } from './styles';
import { MarqueeAnimation } from '../Marquee';
import { Navigation } from './components/Navigation';
import { Burger } from './components/Burger';
import { useState } from 'react';
import { MobileMenu } from './components/MobileMenu';

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <header>
        <Container>
          <Wrapper>
            <Logo />
            <NavigationWrapper onClick={(e) => e.stopPropagation()}>
              <Navigation />
              <ConnectButton styles={{ width: '165px' }} />
            </NavigationWrapper>
            <Burger onClick={() => setIsOpen((prev) => !prev)} isOpened={isOpen} />
          </Wrapper>
        </Container>
        <MobileMenu isOpen={isOpen} />
      </header>
      <MarqueeAnimation />
    </>
  );
};
