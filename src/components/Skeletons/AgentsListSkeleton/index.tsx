import Arrow from '@/assets/icons/right-arrow.svg';
import {
  ArrowWrapper,
  InfoWrapper,
  List,
  ListItem,
  MarketCupWrapper,
  ViewMoreButton
} from '@/components/features/AgentsList/styles';
import { Skeleton } from '@/components/shared/Skeleton';
import { Box, Flex } from '@/styles/global';
import { CSSProperties } from 'react';
import { skeletonRectangleStyles, SymbolWrapper } from './styles';

interface AgentListSkeletonProps {
  rows: number;
  hasArrow?: boolean;
  styles?: CSSProperties;
  hasButton?: boolean;
}

export const AgentsListSkeleton = ({ rows, styles, hasArrow = true, hasButton }: AgentListSkeletonProps) => {
  const rowsArray: number[] = new Array(rows).fill(0);
  return (
    <Box style={{ gap: '0px', padding: '16px 0', ...styles }}>
      <List>
        {rowsArray.map((_, index) => (
          <ListItem key={index}>
            <Flex $gap={12} $align='center'>
              <Skeleton width={65} height={65} borderRadius='50%' />
              <InfoWrapper>
                <Skeleton width={90} height={18} styles={skeletonRectangleStyles} />
                <SymbolWrapper>
                  <Skeleton width={18} height={18} borderRadius='50%' />
                  <Skeleton width={70} height={18} styles={skeletonRectangleStyles} />
                </SymbolWrapper>
                <MarketCupWrapper>
                  <Skeleton width={150} height={18} styles={skeletonRectangleStyles} />
                </MarketCupWrapper>
              </InfoWrapper>
              {hasArrow && (
                <ArrowWrapper>
                  <Arrow />
                </ArrowWrapper>
              )}
            </Flex>
            {hasButton && (
              <ViewMoreButton style={{ pointerEvents: 'none', marginTop: '24px' }}>View more</ViewMoreButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
