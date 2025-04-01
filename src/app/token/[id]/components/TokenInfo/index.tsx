import { Box, Flex } from '@/styles/global';
import { Title } from './styles';
import { TimeframeAnalytics } from './components/TimeframeAnalytics';
import { TradingAnalytics } from './components/TradingAnalytics';
import { IToken } from '@/types/common';
import { formatNumber, shortNumber } from '@/utils/formatters';

interface TokenInfoProps {
  agent?: IToken;
}

export const TokenInfo = ({agent}: TokenInfoProps) => {
  const  {price = '0', priceInNative ='0', marketCap = '0'} = agent || {};
  return (
    <Box style={{ gap: '16px', width: '100%' }}>
      <Flex
        $direction={'column'}
        $gap={12}
        style={{ paddingBottom: '16px', borderBottom: '1px solid var(--separator-clr)' }}
      >
        <Flex $gap={4} $justify='space-between'>
          <Title>Price USD:</Title>
          <Title>{`$${formatNumber(+price)}`}</Title>
        </Flex>
        <Flex $gap={4} $justify='space-between'>
          <Title>Price:</Title>
          <Title>{`${formatNumber(+priceInNative)} S`}</Title>
        </Flex>
      </Flex>
      <Flex
        $direction={'column'}
        $gap={12}
        style={{ paddingBottom: '16px', borderBottom: '1px solid var(--separator-clr)' }}
      >
        {/* <Flex $gap={4} $justify='space-between'>
          <Title>FDV:</Title>
          <Title>$2.0M</Title>
        </Flex> */}
        <Flex $gap={4} $justify='space-between'>
          <Title>Market cap:</Title>
          <Title>{`$${shortNumber(+marketCap)}`}</Title>
        </Flex>
      </Flex>
      <TimeframeAnalytics agent={agent}/>
      <TradingAnalytics agent={agent}/>
    </Box>
  );
};
