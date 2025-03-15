'use client';
import { Logo } from '@/components/shared/Logo/index';
import { Container } from '@/styles/global';
import { useState } from 'react';
import ConnectButton from '../ConnectButton';
// import { MarqueeAnimation } from '@/components/shared/Marquee';
import { Burger } from './components/Burger';
import { MobileMenu } from './components/MobileMenu';
import { Navigation } from './components/Navigation';
import { NavigationWrapper, StyledHeader, Wrapper } from './styles';


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
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </StyledHeader>
      {/* <MarqueeAnimation /> */}
    </>
  );
};
