import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

interface ButtonLoaderProps {
  text: string;
  speedMultiplier?: number;
  styles?: React.CSSProperties;
  color?: string;
  size?: number;
}
export const ButtonLoader = ({
  text,
  speedMultiplier = 0.7,
  styles = { marginLeft: '4px' },
  color = 'var(--black-text-clr)',
  size = 4
}: ButtonLoaderProps) => {
  return (
    <span>
      <span>{text}</span>
      <PulseLoader color={color} size={size} cssOverride={styles} speedMultiplier={speedMultiplier} />
    </span>
  );
};
