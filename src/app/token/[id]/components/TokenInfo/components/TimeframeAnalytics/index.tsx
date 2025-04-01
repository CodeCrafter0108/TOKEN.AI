import { Flex } from '@/styles/global';
import { IToken, ITokenData24h, ITokenPriceData } from '@/types/common';
import { useMemo } from 'react';
import { TIME_MS } from '../../constants';
import { Text, Title } from '../../styles';
import { CalculatePriceChangeReturn } from '../../types';
import { getPriceChange } from '../../utils';

interface TimeframeAnalyticsProps {
  agent?: IToken;
}

export const TimeframeAnalytics = ({ agent }: TimeframeAnalyticsProps) => {
  const currentPrice: number = +(agent?.price ?? '0');

  const price24hData: ITokenData24h | undefined = agent?.token24hData?.[0];
  const token6hData: ITokenPriceData | undefined = agent?.tokenPrice6h?.[0];
  const tokenHourData: ITokenPriceData | undefined = agent?.tokenPriceHour?.[0];
  const token5mData: ITokenPriceData | undefined = agent?.tokenPrice5m?.[0];

  const priceChange24hData: CalculatePriceChangeReturn = useMemo(
    () => getPriceChange(currentPrice, price24hData, TIME_MS.DAY),
    [price24hData, currentPrice]
  );
  const priceChange6hData: CalculatePriceChangeReturn = useMemo(
    () => getPriceChange(currentPrice, token6hData, TIME_MS.SIX_HOUR),
    [token6hData, currentPrice]
  );
  const priceChangeHourData: CalculatePriceChangeReturn = useMemo(
    () => getPriceChange(currentPrice, tokenHourData, TIME_MS.HOUR),
    [tokenHourData, currentPrice]
  );
  const priceChange5mData: CalculatePriceChangeReturn = useMemo(
    () => getPriceChange(currentPrice, token5mData, TIME_MS.FIVE_MIN),
    [token5mData, currentPrice]
  );

  return (
    <Flex $gap={8} $justify='space-between' style={{ padding: '8px', backgroundColor: 'rgba(246, 250, 255, 0.04)' }}>
      <Flex $gap={8} $direction='column' $align='center' style={{ borderRight: '1px solid rgba(137, 140, 144, 0.35)' }}>
        <Title>5m</Title>
        <Text
          $increased={priceChange5mData.increased}
          $decreased={priceChange5mData.decreased}
        >{`${priceChange5mData.decreased ? '-' : ''}${priceChange5mData.increased ? '+' : ''}${priceChange5mData.change}%`}</Text>
      </Flex>
      <Flex $gap={8} $direction='column' $align='center' style={{ borderRight: '1px solid rgba(137, 140, 144, 0.35)' }}>
        <Title>1h</Title>
        <Text
          $increased={priceChangeHourData.increased}
          $decreased={priceChangeHourData.decreased}
        >{`${priceChangeHourData.decreased ? '-' : ''}${priceChangeHourData.increased ? '+' : ''}${priceChangeHourData.change}%`}</Text>
      </Flex>
      <Flex $gap={8} $direction='column' $align='center' style={{ borderRight: '1px solid rgba(137, 140, 144, 0.35)' }}>
        <Title>6h</Title>
        <Text
          $increased={priceChange6hData.increased}
          $decreased={priceChange6hData.decreased}
        >{`${priceChange6hData.decreased ? '-' : ''}${priceChange6hData.increased ? '+' : ''}${priceChange6hData.change}%`}</Text>
      </Flex>
      <Flex $gap={8} $direction='column' $align='center'>
        <Title>24h</Title>
        <Text
          $increased={priceChange24hData.increased}
          $decreased={priceChange24hData.decreased}
        >{`${priceChange24hData.decreased ? '-' : ''}${priceChange24hData.increased ? '+' : ''}${priceChange24hData.change}%`}</Text>
      </Flex>
    </Flex>
  );
};
