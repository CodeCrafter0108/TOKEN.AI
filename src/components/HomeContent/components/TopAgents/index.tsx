import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Flex, H3 } from '@/styles/global';
import { AgentCard } from '@/components/AgentCard';
import { LinkToTopAgent } from '../LinkToTopAgent';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { useRef, useState } from 'react';
import { ButtonVariants } from '@/components/Button/types';
import ArrowLeft from '@/assets/icons/arrowChevronLeft.svg';
import ArrowRight from '@/assets/icons/arrowChevronRight.svg';
import { NextSlide, PrevSlide } from './styles';

export const TopAgents = () => {
  const { width } = useWindowSize();
  const swiperRef = useRef<SwiperRef | null>(null);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);

  const getSlidesPerView = (): number => {
    if (width > NumberBreakpoints.xxl) {
      return 6;
    }
    if (width > 1730) {
      return 5;
    }
    if (width > NumberBreakpoints.xl) {
      return 4;
    }
    if (width > 1000) {
      return 3;
    }
    if (width > NumberBreakpoints.md) {
      return 2;
    }
    return 1;
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsEnd(swiperRef.current.swiper.isEnd);
      setIsStart(swiperRef.current.swiper.isBeginning);
    }
  };
  return (
    <div>
      <Flex $justify='space-between' $align='center'>
        <H3>Top Agents</H3>
        <LinkToTopAgent title='View all top agents' />
      </Flex>

      <div style={{ position: 'relative' }}>
        <NextSlide
          variants={ButtonVariants.CLEAR}
          onClick={() => swiperRef?.current?.swiper.slideNext()}
          disabled={isEnd}
        >
          <ArrowLeft width={40} height={40} />
        </NextSlide>
        <Swiper spaceBetween={16} slidesPerView={getSlidesPerView()} ref={swiperRef} onSlideChange={handleSlideChange} style={{ margin: '0  25px' }}>
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <SwiperSlide key={index} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <AgentCard />
              </SwiperSlide>
            ))}
        </Swiper>
        <PrevSlide
          variants={ButtonVariants.CLEAR}
          onClick={() => swiperRef?.current?.swiper.slidePrev()}
          disabled={isStart}
        >
          <ArrowRight width={40} height={40} />
        </PrevSlide>
      </div>
    </div>
  );
};
