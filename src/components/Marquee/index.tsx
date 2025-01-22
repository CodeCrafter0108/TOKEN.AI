import Marquee from 'react-fast-marquee';
import { Wrapper } from './styles';
import { MarqueeItem } from './components/MarqueeItem';

interface MarqueeWrapperProps {
  direction?: 'left' | 'right' | 'up' | 'down';
}

export const MarqueeAnimation = ({ direction = 'right' }: MarqueeWrapperProps) => {
  return (
    <Wrapper>
      <Marquee
        speed={50}
        direction={direction}
      >
        {Array(100).fill(0).map((__, index) => (
          <MarqueeItem key={index} />
        ))}
      </Marquee>
    </Wrapper>
  );
};
