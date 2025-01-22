'use client';
import ConnectButton from '../ConnectButton';
import { Logo } from '@/components/Logo/index';
import { Container } from '@/styles/global';
import { NavigationWrapper, Wrapper } from './styles';
import { MarqueeAnimation } from '../Marquee';
import { Navigation } from './components/Navigation';

export const Header = () => {
  return (
    <>
      <header>
        <Container>
          <Wrapper>
            <Logo />
            <NavigationWrapper onClick={(e) => e.stopPropagation()}>
              <Navigation />
              <ConnectButton />
            </NavigationWrapper>
          </Wrapper>
        </Container>
      </header>
      <MarqueeAnimation />
    </>
  );
};
