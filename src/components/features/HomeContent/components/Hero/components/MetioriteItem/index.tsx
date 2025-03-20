import { useEffect, useState } from 'react';
import { ColorFilter, Wrapper, Img } from './styles';
import { RuleSet } from 'styled-components';

interface MeteoriteItemProps {
  label: string;
  interval: number;
  styles: RuleSet<object>;
  initialIndex?: number;
  duration?: number;
}

const colorsFilterData: string[] = ['#f064c6', '#7265e7', '#3b3b3b', '#33d349', '#e9c319', '#ec3e3e'];

export const MeteoriteItem = ({ label, interval, styles, duration = 1, initialIndex = 0 }: MeteoriteItemProps) => {
  const [currentColor, setCurrentColor] = useState<string>(colorsFilterData[initialIndex]);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * colorsFilterData.length);
      setCurrentColor(colorsFilterData[randomIndex]);
    }, interval);

    return () => clearInterval(colorInterval);
  }, [interval]);

  return (
    <Wrapper $styles={styles}>
      <Img />
      <ColorFilter animate={{ backgroundColor: currentColor }} transition={{ duration: duration, ease: 'easeInOut' }}>
        {label}
      </ColorFilter>
    </Wrapper>
  );
};
