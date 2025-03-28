import { Flex } from '@/styles/global';
import { Title } from '../../styles';
import { ProgressBar } from '../ProgressBar';

export const TradingAnalytics = () => {
  return (
    <Flex $justify='space-between'>
      <Flex $direction='column' $gap={20}>
        <div>
          <Flex $gap={4}>
            <Title>TXNS: 694</Title>
          </Flex>
          <ProgressBar
            firstParam={367}
            secondParam={327}
            titleFirstParam='Buys'
            titleSecondParam='Sells'
            textFirstParam='367'
            textSecondParam='327'
          />
        </div>
        <div>
          <Flex $gap={4}>
            <Title>Volume: $120k</Title>
          </Flex>
          <ProgressBar
            firstParam={61}
            secondParam={59}
            titleFirstParam='Buy vol.'
            titleSecondParam='Sell vol.'
            textFirstParam='$61k'
            textSecondParam='$59k'
          />
        </div>
        <div>
          <Flex $gap={4}>
            <Title>Makers: 388</Title>
          </Flex>
          <ProgressBar
            firstParam={184}
            secondParam={251}
            titleFirstParam='Buyers'
            titleSecondParam='Sellers'
            textFirstParam='184'
            textSecondParam='251'
          />
        </div>
      </Flex>
    </Flex>
  );
};
