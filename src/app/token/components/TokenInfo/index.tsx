import { Box, Flex } from '@/styles/global';
import { VerifiedBadge } from './components/VerifiedBadge';
import { Text, Title } from './styles';
import { TimeframeAnalytics } from './components/TimeframeAnalytics';
import { TradingAnalytics } from './components/TradingAnalytics';

export const TokenInfo = () => {
  return (
    <Box style={{ gap: '16px' }}>
      <Flex
        $direction={'column'}
        $gap={12}
        style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-clr)'}}
      >
        <Flex $gap={4}>
          <Title>Price USD:</Title>
          <Text>$1.0</Text>
        </Flex>
        <Flex $gap={4}>
          <Title>Price:</Title>
          <Text>0,00026 ETH</Text>
        </Flex>
      </Flex>
      <Flex
        $direction={'column'}
        $gap={12}
        style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-clr)' }}
      >
        <Flex $justify='space-between' $align='center'>
          <Flex $gap={4}>
            <Title>Liquidity:</Title>
            <Text>$377k</Text>
          </Flex>
          <VerifiedBadge />
        </Flex>
        <Flex $gap={4}>
          <Title>FDV:</Title>
          <Text>$2.0M</Text>
        </Flex>
        <Flex $gap={4}>
          <Title>Market cap:</Title>
          <Text>$2.0M</Text>
        </Flex>
      </Flex>
      <TimeframeAnalytics />
      <TradingAnalytics />
    </Box>
  );
};
