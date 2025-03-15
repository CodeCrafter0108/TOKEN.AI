import { Box, Flex } from '@/styles/global';
import { Title } from './styles';
import { TimeframeAnalytics } from './components/TimeframeAnalytics';
import { TradingAnalytics } from './components/TradingAnalytics';

export const TokenInfo = () => {
  return (
    <Box style={{ gap: '16px', width: '100%' }}>
      <Flex
        $direction={'column'}
        $gap={12}
        style={{ paddingBottom: '16px', borderBottom: '1px solid var(--separator-clr)'}}
      >
        <Flex $gap={4} $justify='space-between'>
          <Title>Price USD:</Title>
          <Title>$1.0</Title>
        </Flex>
        <Flex $gap={4} $justify='space-between'>
          <Title>Price:</Title>
          <Title>0,00026 ETH</Title>
        </Flex>
      </Flex>
      <Flex
        $direction={'column'}
        $gap={12}
        style={{ paddingBottom: '16px', borderBottom: '1px solid var(--separator-clr)' }}
      >
        <Flex $gap={4} $justify='space-between'>
          <Title>FDV:</Title>
          <Title>$2.0M</Title>
        </Flex>
        <Flex $gap={4} $justify='space-between'>
          <Title>Market cap:</Title>
          <Title>$2.0M</Title>
        </Flex>
      </Flex>
      <TimeframeAnalytics />
      <TradingAnalytics />
    </Box>
  );
};
