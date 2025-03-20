'use client';
import { CoinImage, CoinWrapper } from "./styles";

export default function SpinningCoin() {
  return (
    <CoinWrapper>
      <CoinImage
        src="/images/homepage/coin.png"
        alt="Spinning coin"
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'linear',
        }}
      />
    </CoinWrapper>
  );
}
