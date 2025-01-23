import { Box, Flex } from '@/styles/global';
import { Description, AgentLogo, TokenLogo, MarketCapValue, Title } from './styles';
import { SocialNetworks } from '../SocialNetworks';

export const AgentCard = () => {
  return (
    <Box style={{ minWidth: '288px', maxWidth: '288px' }}>
      <Flex $gap={12} $align='center'>
        <AgentLogo width={100} height={100} alt='Agent logo' src={'/temp/agent.png'} priority />
        <Flex $direction={'column'} $gap={6}>
          <Title>Token name</Title>
          <Flex $gap={4} $align='center'>
            <TokenLogo src={'/temp/token.png'} alt='Token logo' width={12} height={12} priority />
            <span>Token name</span>
          </Flex>
          <Flex $gap={4}>
            <span>Market cap:</span>
            <MarketCapValue>$31M</MarketCapValue>
          </Flex>
          <SocialNetworks position='card' styles={{ flexDirection: 'row' }} />
        </Flex>
      </Flex>
      <Description>
        Creating cryptocurrency enables decentralized financial systems, allowing users to exchange
      </Description>
    </Box>
  );
};
