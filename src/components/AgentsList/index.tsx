import { Box, Flex } from '@/styles/global';
import {
  List,
  ListItem,
  InfoWrapper,
  AgentLogo,
  MarketCapValue,
  TokenLogo,
  Title,
  TokenSymbol,
  StyledLink
} from './styles';

export const AgentsList = () => {
  return (
    <Box style={{ padding: '12px', gap: '0px' }}>
      <List>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <ListItem key={index}>
              <StyledLink href={'#'}>
                <div style={{ minWidth: '60px', minHeight: '60px', position: 'relative' }}>
                  <AgentLogo
                    fill
                    alt='Agent logo'
                    src={'/temp/agent.png'}
                    priority
                    style={{ objectFit: 'cover' }}
                    sizes='100%'
                  />
                </div>
                <InfoWrapper>
                  <Title>Token name</Title>
                  <Flex $gap={4} $align='center'>
                    <div style={{ minWidth: '16px', minHeight: '16px', position: 'relative' }}>
                      <TokenLogo
                        src={'/temp/token.png'}
                        alt='Token logo'
                        fill
                        sizes='100%'
                        priority
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <TokenSymbol>Token name</TokenSymbol>
                  </Flex>
                  <Flex $gap={4} $align='baseline'>
                    <span style={{ whiteSpace: 'nowrap' }}>Market cap:</span>
                    <MarketCapValue>$31M</MarketCapValue>
                  </Flex>
                </InfoWrapper>
              </StyledLink>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};
