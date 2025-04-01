import { Flex } from '@/styles/global';
import { IToken, ITokenData24h } from '@/types/common';
import { shortNumber } from '@/utils/formatters';
import { useMemo } from 'react';
import { TIME_MS, token24hZeroData } from '../../constants';
import { Title } from '../../styles';
import { isValidTimeframe } from '../../utils';
import { ProgressBar } from '../ProgressBar';

interface TradingAnalyticsProps {
  agent?: IToken;
}

export const TradingAnalytics = ({ agent }: TradingAnalyticsProps) => {
  const { date } = agent?.token24hData?.[0] || {};
  const token24hData: ITokenData24h = useMemo(
    () =>
      agent?.token24hData?.[0] && date && isValidTimeframe(+date, TIME_MS.DAY)
        ? agent?.token24hData?.[0]
        : token24hZeroData,
    [agent?.token24hData, date]
  );

  const {
    buys24h = '0',
    sells24h = '0',
    buyVolumeUsd24h = '0',
    sellVolumeUsd24h = '0',
    sellers24h = [],
    buyers24h = []
  } = token24hData;

  return (
    <Flex $justify='space-between'>
      <Flex $direction='column' $gap={20}>
        <div>
          <Flex $gap={4}>
            <Title>{`TXNS: ${Number(buys24h) + Number(sells24h)}`}</Title>
          </Flex>
          <ProgressBar
            firstParam={Number(buys24h)}
            secondParam={Number(sells24h)}
            titleFirstParam='Buys'
            titleSecondParam='Sells'
            textFirstParam={buys24h}
            textSecondParam={sells24h}
          />
        </div>
        <div>
          <Flex $gap={4}>
            <Title>{`Volume: $${shortNumber(Number(buyVolumeUsd24h) + Number(sellVolumeUsd24h))}`}</Title>
          </Flex>
          <ProgressBar
            firstParam={Number(buyVolumeUsd24h)}
            secondParam={Number(sellVolumeUsd24h)}
            titleFirstParam='Buy vol.'
            titleSecondParam='Sell vol.'
            textFirstParam={`$${shortNumber(Number(buyVolumeUsd24h))}`}
            textSecondParam={`$${shortNumber(Number(sellVolumeUsd24h))}`}
          />
        </div>
        <div>
          <Flex $gap={4}>
            <Title>{`Makers: ${buyers24h.length + sellers24h.length}`}</Title>
          </Flex>
          <ProgressBar
            firstParam={buyers24h.length}
            secondParam={sellers24h.length}
            titleFirstParam='Buyers'
            titleSecondParam='Sellers'
            textFirstParam={buyers24h.length.toString()}
            textSecondParam={sellers24h.length.toString()}
          />
        </div>
      </Flex>
    </Flex>
  );
};
