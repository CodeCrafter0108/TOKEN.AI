import Arrow from '@/assets/icons/right-arrow.svg';
import { ChainId, CHAINS_ICON_PATH } from '@/constants/blockchain/networks';
import { AppRoutes } from '@/constants/routes';
import { Box, Flex } from '@/styles/global';
import { IToken } from '@/types/common';
import { shortNumber } from '@/utils/formatters';
import { CSSProperties } from 'styled-components';
import { ImageWithFallback } from '../ImageWithFallback';
import { InfoWrapper, List, ListItem, MarketCapValue, StyledLink, Title, TokenSymbol } from './styles';

interface AgentCardProps {
  isLoading: boolean;
  agents?: IToken[];
  hasArrow?: boolean;
  styles?: CSSProperties;
}

export const AgentsList = ({ hasArrow = true, agents = [], styles }: AgentCardProps): React.JSX.Element => {
  return (
    <Box style={{ gap: '0px', padding: '16px 0', ...styles }}>
      <List>
        {agents.map((agent: IToken) => {
          const { id, imageUrl, name, symbol, marketCap, address } = agent || {};
          return (
            <ListItem key={id}>
              <StyledLink href={`${AppRoutes.TOKEN}/${address}`}>
                <ImageWithFallback
                  fill
                  alt='Agent logo'
                  src={imageUrl}
                  loading='lazy'
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                  sizes='100%'
                  widthSkeleton={60}
                  heightSkeleton={60}
                  shape={'circle'}
                />
                <InfoWrapper>
                  <Title>{name}</Title>
                  <Flex $gap={4} $align='center'>
                    <ImageWithFallback
                      fill
                      alt='Token logo'
                      src={CHAINS_ICON_PATH[ChainId.SONIC]}
                      loading='lazy'
                      style={{ objectFit: 'cover' }}
                      sizes='100%'
                      widthSkeleton={16}
                      heightSkeleton={16}
                      shape='circle'
                    />
                    <TokenSymbol>{symbol}</TokenSymbol>
                  </Flex>
                  <Flex $gap={4} $align='baseline' $justify='flex-end'>
                    <span style={{ whiteSpace: 'nowrap' }}>Market cap:</span>
                    <MarketCapValue>{`$${shortNumber(+marketCap)}`}</MarketCapValue>
                  </Flex>
                </InfoWrapper>
                {hasArrow && (
                  <Flex $justify='flex-end' $align='center' style={{ width: 'auto' }}>
                    <Arrow />
                  </Flex>
                )}
              </StyledLink>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
