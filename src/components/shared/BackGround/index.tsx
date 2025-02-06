'use client';
import Image from 'next/image';
import { BackgroundWrapper } from './styles';

interface BackGroundProps {
  children: React.ReactNode;
}

export const BackGround = ({ children }: BackGroundProps) => {
  return (
    <BackgroundWrapper>
      <Image
        alt='bg'
        src={'/images/background.png'}
        quality={100}
        priority
        fill
        sizes='100vw'
        style={{
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      {children}
    </BackgroundWrapper>
  );
};
