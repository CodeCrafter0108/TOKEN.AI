import Marquee from 'react-fast-marquee';
import { Wrapper } from './styles';
import { DeFAI } from '../DeFAI';
import { useRouter } from 'next/navigation';

interface MarqueeWrapperProps {
  direction?: 'left' | 'right' | 'up' | 'down';
}

export const MarqueeAnimation = ({ direction = 'right' }: MarqueeWrapperProps) => {
  useRouter();
  return (
    <Wrapper>
      <Marquee
        speed={50}
        direction={direction}
      >
        {Array(60).fill(0).map((__, index) => (
          <DeFAI key={index} />
        ))}
      </Marquee>
    </Wrapper>
  );
};
