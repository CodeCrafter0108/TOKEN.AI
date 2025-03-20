import LeftArrow from '@/assets/icons/arrowChevronLeft.svg';
import RightArrow from '@/assets/icons/arrowChevronRight.svg';
import { AgentCard } from '@/components/features/AgentCard';
import { ButtonVariants } from '@/components/shared/Button/types';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { H3 } from '@/styles/global';
import { IToken } from '@/types/common';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LinkToTopAgent } from '../LinkToTopAgent';
import {
  agentCardStyles,
  Blur,
  ButtonsContainer,
  CarouselButton,
  CarouselContainer,
  CarouselFooter,
  CarouselHeader,
  SlideContent,
  SlideItem,
  SlidesWrapper
} from './styles';

interface TopAgentsProps {
  agents?: IToken[];
  isLoading: boolean;
}

const mock = [
  {
    id: '0x058e668427238e7ff56dc1050be62752d3d0e0a4',
    address: '0x058e668427238e7ff56dc1050be62752d3d0e0a4',
    blockTimestamp: '1738829594',
    chatUrl: 'https://en.wikipedia.org/wiki/James_Bond',
    description: 'James Bond',
    imageUrl:
      'https://134.209.194.104/v1/static/tokens/146/0/0x412c80f232c003b59f30edaabd89fa80f7005ca8a783942425c35e19ba200873.jpg',
    marketCap: '3.2215425',
    name: 'AGENT_007',
    price: '0.000000057987765',
    siteUrl: 'https://en.wikipedia.org/wiki/James_Bond',
    socialUrl: 'https://en.wikipedia.org/wiki/James_Bond',
    supply: '1000000000',
    symbol: 'AGENT_007',
    tokenOwner: '0xc1e65f29df5ece529719b6079d2624ab827f3aad',
    __typename: 'Token'
  },
  {
    id: '0xc2c5d7ace6a8daecf20c1b67ec94739856dc32b6',
    address: '0xc2c5d7ace6a8daecf20c1b67ec94739856dc32b6',
    blockTimestamp: '1738745947',
    chatUrl: 'https://www.google.com/',
    description: 'This is first token',
    imageUrl:
      'https://134.209.194.104/v1/static/tokens/146/0/0x0569e80571377b887ea089407af19e37d91ae17fbfecf025ca2739f4f6e79a53.png',
    marketCap: '2.998074020011795736307496072300776',
    name: 'First Token',
    price: '0.00000005396533236021232325353492930141397',
    siteUrl: 'https://www.google.com/',
    socialUrl: 'https://www.google.com/',
    supply: '1000000000',
    symbol: 'FRST',
    tokenOwner: '0xc1e65f29df5ece529719b6079d2624ab827f3aad',
    __typename: 'Token'
  },
  {
    id: '0x3d7a3b2c37e83919cdcf5ea4582d37716cab317f',
    address: '0x3d7a3b2c37e83919cdcf5ea4582d37716cab317f',
    blockTimestamp: '1738829255',
    chatUrl: 'https://www.olx.ua/',
    description: 'This is second token',
    imageUrl:
      'https://134.209.194.104/v1/static/tokens/146/0/0xbeafa9a4362cd061cc1c8c9c903924909e652bb184a6db0ec9abfcfd96085ca5.png',
    marketCap: '0.000000000003272972069142438667070486280238831',
    name: 'SECD',
    price: '0.00000000000000000005891349724456389600726875304429896',
    siteUrl: 'https://www.olx.ua/',
    socialUrl: 'https://www.olx.ua/',
    supply: '1000000000',
    symbol: 'SECD',
    tokenOwner: '0xc1e65f29df5ece529719b6079d2624ab827f3aad',
    __typename: 'Token'
  },
  {
    id: '0x058e668427238e7ff56dc1050be62752d3d0e0a412',
    address: '0x058e668427238e7ff56dc1050be62752d3d0e0a4',
    blockTimestamp: '1738829594',
    chatUrl: 'https://en.wikipedia.org/wiki/James_Bond',
    description: 'James Bond',
    imageUrl:
      'https://134.209.194.104/v1/static/tokens/146/0/0x412c80f232c003b59f30edaabd89fa80f7005ca8a783942425c35e19ba200873.jpg',
    marketCap: '3.2215425',
    name: 'AGENT_007',
    price: '0.000000057987765',
    siteUrl: 'https://en.wikipedia.org/wiki/James_Bond',
    socialUrl: 'https://en.wikipedia.org/wiki/James_Bond',
    supply: '1000000000',
    symbol: 'AGENT_007',
    tokenOwner: '0xc1e65f29df5ece529719b6079d2624ab827f3aad',
    __typename: 'Token'
  },
  {
    id: '0xc2c5d7ace6a8daecf20c1b67ec94739856dc32b623',
    address: '0xc2c5d7ace6a8daecf20c1b67ec94739856dc32b6',
    blockTimestamp: '1738745947',
    chatUrl: 'https://www.google.com/',
    description: 'This is first token',
    imageUrl:
      'https://134.209.194.104/v1/static/tokens/146/0/0x0569e80571377b887ea089407af19e37d91ae17fbfecf025ca2739f4f6e79a53.png',
    marketCap: '2.998074020011795736307496072300776',
    name: 'First Token',
    price: '0.00000005396533236021232325353492930141397',
    siteUrl: 'https://www.google.com/',
    socialUrl: 'https://www.google.com/',
    supply: '1000000000',
    symbol: 'FRST',
    tokenOwner: '0xc1e65f29df5ece529719b6079d2624ab827f3aad',
    __typename: 'Token'
  },
  {
    id: '0x3d7a3b2c37e83919cdcf5ea4582d37716cab317f43',
    address: '0x3d7a3b2c37e83919cdcf5ea4582d37716cab317f',
    blockTimestamp: '1738829255',
    chatUrl: 'https://www.olx.ua/',
    description: 'This is second token',
    imageUrl:
      'https://134.209.194.104/v1/static/tokens/146/0/0xbeafa9a4362cd061cc1c8c9c903924909e652bb184a6db0ec9abfcfd96085ca5.png',
    marketCap: '0.000000000003272972069142438667070486280238831',
    name: 'SECD',
    price: '0.00000000000000000005891349724456389600726875304429896',
    siteUrl: 'https://www.olx.ua/',
    socialUrl: 'https://www.olx.ua/',
    supply: '1000000000',
    symbol: 'SECD',
    tokenOwner: '0xc1e65f29df5ece529719b6079d2624ab827f3aad',
    __typename: 'Token'
  },
  {
    id: '0x058e668427238e7ff56dc1050be62752d3d0e0a4hj',
    address: '0x058e668427238e7ff56dc1050be62752d3d0e0a4',
    blockTimestamp: '1738829594',
    chatUrl: 'https://en.wikipedia.org/wiki/James_Bond',
    description: 'James Bond',
    imageUrl:
      'https://134.209.194.104/v1/static/tokens/146/0/0x412c80f232c003b59f30edaabd89fa80f7005ca8a783942425c35e19ba200873.jpg',
    marketCap: '3.2215425',
    name: 'AGENT_007',
    price: '0.000000057987765',
    siteUrl: 'https://en.wikipedia.org/wiki/James_Bond',
    socialUrl: 'https://en.wikipedia.org/wiki/James_Bond',
    supply: '1000000000',
    symbol: 'AGENT_007',
    tokenOwner: '0xc1e65f29df5ece529719b6079d2624ab827f3aad',
    __typename: 'Token'
  },
  {
    id: '0xc2c5d7ace6a8daecf20c1b67ec94739856dc32b6hj',
    address: '0xc2c5d7ace6a8daecf20c1b67ec94739856dc32b6',
    blockTimestamp: '1738745947',
    chatUrl: 'https://www.google.com/',
    description: 'This is first token',
    imageUrl:
      'https://134.209.194.104/v1/static/tokens/146/0/0x0569e80571377b887ea089407af19e37d91ae17fbfecf025ca2739f4f6e79a53.png',
    marketCap: '2.998074020011795736307496072300776',
    name: 'First Token',
    price: '0.00000005396533236021232325353492930141397',
    siteUrl: 'https://www.google.com/',
    socialUrl: 'https://www.google.com/',
    supply: '1000000000',
    symbol: 'FRST',
    tokenOwner: '0xc1e65f29df5ece529719b6079d2624ab827f3aad',
    __typename: 'Token'
  },
  {
    id: '0x3d7a3b2c37e83919cdcf5ea4582d37716cab317fhj',
    address: '0x3d7a3b2c37e83919cdcf5ea4582d37716cab317f',
    blockTimestamp: '1738829255',
    chatUrl: 'https://www.olx.ua/',
    description: 'This is second token',
    imageUrl:
      'https://134.209.194.104/v1/static/tokens/146/0/0xbeafa9a4362cd061cc1c8c9c903924909e652bb184a6db0ec9abfcfd96085ca5.png',
    marketCap: '0.000000000003272972069142438667070486280238831',
    name: 'SECD',
    price: '0.00000000000000000005891349724456389600726875304429896',
    siteUrl: 'https://www.olx.ua/',
    socialUrl: 'https://www.olx.ua/',
    supply: '1000000000',
    symbol: 'SECD',
    tokenOwner: '0xc1e65f29df5ece529719b6079d2624ab827f3aad',
    __typename: 'Token'
  }
];
export const TopAgents = ({ agents = [] }: TopAgentsProps) => {
  console.log("🚀 ~ TopAgents ~ agents:", agents)
  const [currentIndex, setCurrentIndex] = useState<number>(3);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const visibleItemCount: number = 5;
  const autoplayIntervalRef = useRef<null | NodeJS.Timeout>(null);
  const autoplayDelay: number = 2000;

  const { width } = useWindowSize();

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = null;
      }
    } else {
      startAutoplay();
    }
  }, [isPaused]);

  const startAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    autoplayIntervalRef.current = setInterval(() => {
      if (!isPaused) {
        handleNext();
      }
    }, autoplayDelay);
  };

  const handlePrevious = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mock.length - 1));
    setTimeout(() => {
      if (!isPaused) {
        startAutoplay();
      }
    }, 500);
  };

  const handleNext = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    setCurrentIndex((prev) => (prev < mock.length - 1 ? prev + 1 : 0));
    setTimeout(() => {
      if (!isPaused) {
        startAutoplay();
      }
    }, 500);
  };

  const getVisibleItems = (): IToken[] => {
    const result = [];
    for (let i = 0; i < visibleItemCount; i++) {
      const itemIndex = (currentIndex + i) % mock.length;
      result.push({
        ...mock[itemIndex],
        index: i
      });
    }
    //@ts-expect-error not ckecked
    return result;
  };

  const getItemStyle = (index: number): { rotation: number; verticalOffset: number } => {
    const rotation: number = (index - visibleItemCount / 2 + 0.5) * 2;
    const verticalOffset: number = Math.pow(Math.abs(index - visibleItemCount / 2 + 0.5), 2) * 4;

    return {
      rotation,
      verticalOffset
    };
  };

  return (
    <CarouselContainer onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <CarouselHeader>
        <H3>Top Agents</H3>
        <ButtonsContainer>
          <CarouselButton onClick={handlePrevious} variants={ButtonVariants.CLEAR}>
            <LeftArrow style={{ color: 'var(--white-clr)' }} width={20} height={20} />
          </CarouselButton>
          <CarouselButton onClick={handleNext} variants={ButtonVariants.CLEAR}>
            <RightArrow style={{ color: 'var(--white-clr)' }} width={20} height={20} />
          </CarouselButton>
        </ButtonsContainer>
      </CarouselHeader>
      <SlidesWrapper>
        <AnimatePresence initial={false} mode='popLayout'>
          {getVisibleItems().map((item, idx) => {
            const style = getItemStyle(idx);
            return (
              <SlideItem
                key={item.id}
                role='group'
                aria-roledescription='slide'
                layout
                initial={{ opacity: 0, x: 50, scale: 0.3 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{
                  layout: { type: 'spring', stiffness: 300, damping: 30 }
                }}
              >
                <SlideContent
                  style={
                    width >= NumberBreakpoints.xl
                      ? { transform: `rotate(${style.rotation}deg) translateY(${style.verticalOffset}%)` }
                      : {}
                  }
                >
                  <AgentCard agent={item} styles={agentCardStyles} />
                </SlideContent>
              </SlideItem>
            );
          })}
        </AnimatePresence>
      </SlidesWrapper>

      <CarouselFooter>
        <Blur />
        <LinkToTopAgent title='View all top agents' params='top' styles={{padding: '12px 0'}}/>
      </CarouselFooter>
    </CarouselContainer>
  );
};
