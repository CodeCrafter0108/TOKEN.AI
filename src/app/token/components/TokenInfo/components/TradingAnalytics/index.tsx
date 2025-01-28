import { Flex } from '@/styles/global';
import { Title, Text } from '../../styles';
import { ProgressBar } from '../ProgressBar';

export const TradingAnalytics = () => {
  return (
    <Flex $justify='space-between'>
      <Flex $direction='column' $justify='space-between' style={{ borderRight: '1px solid var(--border-clr)' }}>
        <Flex $gap={4}>
          <Title>TXNS:</Title>
          <Text>694</Text>
        </Flex>
        <Flex $gap={4}>
          <Title>Volume</Title>
          <Text>$120k</Text>
        </Flex>
        <Flex $gap={4}>
          <Title>Makers:</Title>
          <Text>388</Text>
        </Flex>
      </Flex>
      <Flex $direction='column' $gap={8} style={{ paddingLeft: '16px' }}>
        <ProgressBar
          firstParam={367}
          secondParam={327}
          titleFirstParam='Buys'
          titleSecondParam='Sells'
          textFirstParam='367'
          textSecondParam='327'
        />
        <ProgressBar
          firstParam={61}
          secondParam={59}
          titleFirstParam='Buy vol.'
          titleSecondParam='Sell vol.'
          textFirstParam='$61k'
          textSecondParam='$59k'
        />
        <ProgressBar
          firstParam={184}
          secondParam={251}
          titleFirstParam='Buyers'
          titleSecondParam='Sellers'
          textFirstParam='184'
          textSecondParam='251'
        />
      </Flex>
    </Flex>
  );
};
