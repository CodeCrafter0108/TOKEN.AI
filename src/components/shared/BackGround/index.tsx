'use client';
// import Image from 'next/image';
import { BackgroundWrapper } from './styles';

interface BackGroundProps {
  children: React.ReactNode;
}

export const BackGround = ({ children }: BackGroundProps) => {
  return (
    <BackgroundWrapper>
      {/* <Image
        alt='bg'
        src={'/images/background/first_filter.png'}
        quality={100}
        priority
        fill
        sizes='100vw'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          objectFit: 'contain',
          zIndex: -1,
        }}
      /> */}
      {/* <FirstBlur />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '20%',
          zIndex: -1,
          width: '378px',
          height: '550px',
          filter: 'blur(100.6500015258789px)',
          background: 'rgba(53, 83, 49, 0.58)'
        }}
      /> */}
      {/* <Image
        alt='bg'
        src={'/images/background/second_filter.svg'}
        quality={100}
        priority
        fill
        sizes='100vw'
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          objectFit: 'contain',
          zIndex: -1,
        }}
      /> */}
      {children}
    </BackgroundWrapper>
  );
};
