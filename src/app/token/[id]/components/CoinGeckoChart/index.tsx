'use client';

import { useEffect, useState } from 'react';
import { Wrapper } from './styles';
import axios from 'axios';

interface CoinGeckoChartProps {
  chainName: string;
  poolAddress: string;
}

export default function CoinGeckoChart({ chainName, poolAddress }: CoinGeckoChartProps) {
  const [isUrlValid, setIsUrlValid] = useState<boolean>(false);

  useEffect(() => {
    const checkUrl = async () => {
      try {
        const response = await axios.get(
          `https://www.geckoterminal.com/${chainName}/pools/${poolAddress}?embed=1&info=0&swaps=0&grayscale=0&light_chart=0`
        );
        if (response.data) {
          setIsUrlValid(true);
        } else {
          setIsUrlValid(false);
        }
      } catch (error) {
        console.log('Error checking URL:', error);
        setIsUrlValid(false);
      }
    };

    checkUrl();
  }, [chainName, poolAddress]);

  return (
    <Wrapper>
      {isUrlValid ? (
        <iframe
          height='500px'
          width='100%'
          id='geckoterminal-embed'
          title='GeckoTerminal Embed'
          src={`https://www.geckoterminal.com/${chainName}/pools/${poolAddress}?embed=1&info=0&swaps=0&grayscale=0&light_chart=0`}
          frameBorder='0'
          allow='clipboard-write'
          allowFullScreen
        />
      ) : (
        <div style={{fontSize: '16px'}}>Low liquidity pool</div>
      )}
    </Wrapper>
  );
}
