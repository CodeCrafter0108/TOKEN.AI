import { Breakpoints } from '@/styles/breakpoints';
import { Box } from '@/styles/global';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulseScale = keyframes`
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.1);
  }
  100% {
    transform: scaleY(1);
  }
`;

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
  font-size: 18px;
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
  padding-top: ${({ $hasMetrics }) => ($hasMetrics ? '8px' : '0')};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: ${Breakpoints.md}) {
    padding-top: ${({ $hasMetrics }) => ($hasMetrics ? '16px' : '0')};
  }
`;

export const Metrics = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;

  line-height: 1;
  padding-top: 8px;

  @media screen and (min-width: ${Breakpoints.md}) {
    padding-top: 16px;
    flex-direction: row;
    gap: 32px;
  }
`;

export const Grid = styled.div<{ $hasMetrics?: boolean }>`
  display: grid;
  gap: 6px;
  width: 100%;
  grid-template-columns: 1fr;

  ${({ $hasMetrics }) =>
    $hasMetrics &&
    `
@media screen and (min-width: ${Breakpoints.md}) {
  grid-template-columns: 1fr 1fr;
  
  & > *:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }
  
  & > *:nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }
  
  & > *:nth-child(3) {
    grid-column: 2;
    grid-row: 1 / span 2;
    justify-self: end; 
  }
}`}
`;

export const Bar = styled.div<{ width: number }>`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  transition: width 0.3s ease;
  background: linear-gradient(90deg, #f79d00 0%, #94e927 100%), #d9d9d9;
  background-size: 200% 100%;
  border-radius: 12px;
  box-shadow: 0px 0px 11.4px 0px rgba(126, 196, 37, 0.2);
  animation: 
    ${gradientShift} 2s ease-in-out infinite,
    ${pulseScale} 2s ease-in-out infinite;
  
  transform-origin: center;
`;

export const BarWrapper = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 12px;
  background: var(--background-clr);
  overflow: hidden;
`;

export const BarValue = styled.div`
  font-size: 12px;
  color: var(--accent-clr);
  line-height: 1;
`;

export const BarTitle = styled(BarValue)`
  color: rgba(255, 255, 255, 0.6);
`;

export const SocialNetworkWrapper = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: ${Breakpoints.md}) {
    justify-content: flex-end;
  }
`;