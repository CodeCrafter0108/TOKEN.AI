import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Flex, H3 } from '@/styles/global';
import { AgentCard } from '@/components/AgentCard';
import { LinkToTopAgent } from '../LinkToTopAgent';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { useRef} from 'react';
import { ButtonVariants } from '@/components/Button/types';
import ArrowLeft from '@/assets/icons/arrowChevronLeft.svg';
import ArrowRight from '@/assets/icons/arrowChevronRight.svg';
import { NextSlide, PrevSlide } from './styles';

export const TopAgents = () => {
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

  const slides = Array(16).fill(0);
  const disableNavigation = slides.length <= getSlidesPerView();

  return (
    <div>
      <Flex $justify='space-between' $align='center'>
        <H3>Top Agents</H3>
        <LinkToTopAgent title='View all top agents' params='filter=top'/>
      </Flex>

      <div style={{ position: 'relative' }}>
        <NextSlide
          variants={ButtonVariants.CLEAR}
          onClick={() => swiperRef?.current?.swiper.slideNext()}
          disabled={disableNavigation}
        >
          <ArrowLeft width={40} height={40} />
        </NextSlide>
        <Swiper
          spaceBetween={8}
          loop={true}
          slidesPerView={getSlidesPerView()}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          speed={1000}
          ref={swiperRef}
          style={{ margin: '0  30px' }}
          modules={[Autoplay]}
        >
          {slides.map((_, index) => (
            <SwiperSlide key={index}>
              <AgentCard />
            </SwiperSlide>
          ))}
        </Swiper>
        <PrevSlide
          variants={ButtonVariants.CLEAR}
          onClick={() => swiperRef?.current?.swiper.slidePrev()}
          disabled={disableNavigation}
        >
          <ArrowRight width={40} height={40} />
        </PrevSlide>
      </div>
    </div>
  );
};
