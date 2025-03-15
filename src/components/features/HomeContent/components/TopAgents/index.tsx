import ArrowLeft from '@/assets/icons/arrowChevronLeft.svg';
import ArrowRight from '@/assets/icons/arrowChevronRight.svg';
import { AgentCard } from '@/components/features/AgentCard';
import { ButtonVariants } from '@/components/shared/Button/types';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { Flex, H3 } from '@/styles/global';
import { IToken } from '@/types/common';
import { useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { LinkToTopAgent } from '../LinkToTopAgent';
import { NextSlide, PrevSlide, agentCardStyles } from './styles';

interface TopAgentsProps {
  agents?: IToken[];
  isLoading: boolean;
}

export const TopAgents = ({ agents = [] }: TopAgentsProps) => {
  const { width } = useWindowSize();
  const swiperRef = useRef<SwiperRef | null>(null);

  const getSlidesPerView = (): number => {
    if (width >= NumberBreakpoints.xxl) {
      return 6;
    }
    if (width >= 1780) {
      return 4;
    }
    if (width >= 1480) {
      return 4;
    }
    if (width >= 1000) {
      return 3;
    }
    if (width >= NumberBreakpoints.md) {
      return 2;
    }
    return 1;
  };

  const disableNavigation = agents?.length <= getSlidesPerView();

  return (
    <div>
      <Flex $justify='space-between' $align='center'>
        <H3>Top Agents</H3>
        <LinkToTopAgent title='View all top agents' params='top' />
      </Flex>

      <div style={{ position: 'relative', minHeight: '171px' }}>
        <NextSlide
          variants={ButtonVariants.CLEAR}
          onClick={() => swiperRef?.current?.swiper.slideNext()}
          disabled={disableNavigation}
          aria-label='Next slide'
        >
          <ArrowLeft width={40} height={40} />
        </NextSlide>
        <Swiper
          spaceBetween={8}
          loop={getSlidesPerView() < agents?.length}
          slidesPerView={getSlidesPerView()}
          autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={1000}
          ref={swiperRef}
          style={{ margin: '0  30px' }}
          modules={[Autoplay]}
        >
          {agents.map((agent: IToken) => {
            const { id } = agent || {};
            return (
              <SwiperSlide key={id}>
                <AgentCard agent={agent} styles={agentCardStyles} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <PrevSlide
          variants={ButtonVariants.CLEAR}
          onClick={() => swiperRef?.current?.swiper.slidePrev()}
          disabled={disableNavigation}
          aria-label='Previous slide'
        >
          <ArrowRight width={40} height={40} />
        </PrevSlide>
      </div>
    </div>
  );
};
