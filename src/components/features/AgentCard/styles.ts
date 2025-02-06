import { Breakpoints } from '@/styles/breakpoints';
import { Box } from '@/styles/global';
import styled from 'styled-components';

export const Container = styled(Box)`
  min-width: 280px;
  /* max-width: 286px; */
  margin: 3px 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  scale: 1;

  &:hover {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
  }
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  font-feature-settings:
    'liga' off,
    'clig' off;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Value = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 1;
`;

export const Description = styled.p<{ $hasMetrics?: boolean }>`
  width: 100%;
  border-top: 1px solid ${({ $hasMetrics }) => ($hasMetrics ? 'var(--border-clr)' : 'transparent')};
  padding-top: ${({ $hasMetrics }) => ($hasMetrics ? '8px' : '0')};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Metrics = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  line-height: 1;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;

    div:nth-child(2) {
      justify-content: center;
    }

    div:nth-child(3) {
      justify-content: flex-end;
    }
  }
`;
