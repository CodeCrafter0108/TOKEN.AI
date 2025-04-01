import LeftArrow from '@/assets/icons/arrowChevronLeft.svg';
import RightArrow from '@/assets/icons/arrowChevronRight.svg';
import { AgentCard } from '@/components/features/AgentCard';
import { ButtonVariants } from '@/components/shared/Button/types';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { H3 } from '@/styles/global';
import { IToken } from '@/types/common';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
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


export const TopAgents = ({ agents = [] }: TopAgentsProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(3);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const { width } = useWindowSize();
  const visibleItemCount: number = useMemo(() => (width > 1780 ? 6 : 5), [width]);
  const autoplayIntervalRef = useRef<null | NodeJS.Timeout>(null);
  const autoplayDelay: number = 2000;

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
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : agents.length - 1));
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
    setCurrentIndex((prev) => (prev < agents.length - 1 ? prev + 1 : 0));
    setTimeout(() => {
      if (!isPaused) {
        startAutoplay();
      }
    }, 500);
  };

  const getVisibleItems = (): IToken[] => {
    if (!agents.length) return [];
    const result = [];
    for (let i = 0; i < visibleItemCount; i++) {
      const itemIndex = (currentIndex + i) % agents.length;
      result.push({
        ...agents[itemIndex],
        index: i
      });
    }
    return result;
  };

  const getItemStyle = (index: number): { rotation: number; verticalOffset: number } => {
    const rotation: number = (index - visibleItemCount / 2 + 0.5) * 1.5;
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
          {
          getVisibleItems().map((item, idx) => {
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
        <LinkToTopAgent title='View all top agents' params='top' styles={{ padding: '12px 0' }} />
      </CarouselFooter>
    </CarouselContainer>
  );
};
