import { Box, Flex } from '@/styles/global';
import Arrow from '@/assets/icons/right-arrow.svg';
import { List, ListItem, InfoWrapper, MarketCapValue, Title, TokenSymbol, StyledLink } from './styles';
import { ImageWithFallback } from '../ImageWithFallback';
import { AppRoutes } from '@/constants/routes';

interface AgentCardProps {
  hasArrow?: boolean;
}

export const AgentsList = ({ hasArrow = true }: AgentCardProps): React.JSX.Element => {
  return (
    <Box style={{ gap: '0px' }}>
      <List>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <ListItem key={index}>
              <StyledLink href={AppRoutes.TOKEN}>
                <ImageWithFallback
                  fill
                  alt='Agent logo'
                  src={'/temp/agent.png'}
                  priority
                  style={{ objectFit: 'cover', borderRadius: '4px' }}
                  sizes='100%'
                  widthSkeleton={60}
                  heightSkeleton={60}
                />
                <InfoWrapper>
                  <Title>Token name</Title>
                  <Flex $gap={4} $align='center'>
                    <ImageWithFallback
                      fill
                      alt='Token logo'
                      src={'/temp/token.png'}
                      priority
                      style={{ objectFit: 'cover' }}
                      sizes='100%'
                      widthSkeleton={16}
                      heightSkeleton={16}
                    />
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
