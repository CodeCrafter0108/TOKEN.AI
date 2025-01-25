import { Box, Flex } from '@/styles/global';
import Arrow from '@/assets/icons/right-arrow.svg';
import {
  List,
  ListItem,
  InfoWrapper,
  AgentLogo,
  MarketCapValue,
  TokenLogo,
  Title,
  TokenSymbol,
  StyledLink,
  AgentLogoWrapper,
  TokenLogoWrapper
} from './styles';

interface AgentCardProps {
  hasArrow?: boolean;
}

export const AgentsList = ({ hasArrow = true }: AgentCardProps): React.JSX.Element => {
  return (
    <Box style={{ padding: '12px', gap: '0px' }}>
      <List>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <ListItem key={index}>
              <StyledLink href={'#'}>
                <AgentLogoWrapper>
                  <AgentLogo
                    fill
                    alt='Agent logo'
                    src={'/temp/agent.png'}
                    priority
                    style={{ objectFit: 'cover' }}
                    sizes='100%'
                  />
                </AgentLogoWrapper>
                <InfoWrapper>
                  <Title>Token name</Title>
                  <Flex $gap={4} $align='center'>
                    <TokenLogoWrapper>
                      <TokenLogo
                        src={'/temp/token.png'}
                        alt='Token logo'
                        fill
                        sizes='100%'
                        priority
                        style={{ objectFit: 'cover' }}
                      />
                    </TokenLogoWrapper>
                    <TokenSymbol>Token name</TokenSymbol>
                  </Flex>
                  <Flex $gap={4} $align='baseline'>
                    <span style={{ whiteSpace: 'nowrap' }}>Market cap:</span>
                    <MarketCapValue>$31M</MarketCapValue>
                  </Flex>
                </InfoWrapper>
                {hasArrow && (
                  <Flex $justify='flex-end' $align='center' style={{ width: 'auto' }}>
                    <Arrow />
                  </Flex>
                )}
              </StyledLink>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};
