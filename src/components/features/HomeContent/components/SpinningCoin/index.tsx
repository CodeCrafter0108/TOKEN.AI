'use client';
import { Coin, CoinFace, CoinWrapper } from './styles';

export default function SpinningCoin() {
  return (
    <CoinWrapper>
      <Coin
        animate={{
          rotateY: [0, 360]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'linear'
        }}
      >
        <CoinFace src='/images/homepage/coin_back.png' alt='Coin front side' />
        <CoinFace src='/images/homepage/coin_back.png' alt='Coin back side' className='back' />
      </Coin>
    </CoinWrapper>
  );
}
