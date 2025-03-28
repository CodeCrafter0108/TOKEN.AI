import styled from 'styled-components';
import BottomBgHome from '@/assets/bg/home/bottom.svg';
import RightBgHome from '@/assets/bg/home/right.svg';
import LeftBgTrade from '@/assets/bg/trade/left.svg';
import RightBgTrade from '@/assets/bg/trade/right.svg';
import { Breakpoints } from '@/styles/breakpoints';

export const BackgroundWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Blur = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 197px;
  height: 506.65px;
  transform: rotate(-150deg);
  flex-shrink: 0;
  background-color: rgba(53, 83, 49, 0.58);
  filter: blur(100.6500015258789px);
`;

export const BottomBgHomeIcon = styled(BottomBgHome)`
  position: absolute;
  bottom: 0;
  left: 0;
  object-fit: contain;
  z-index: -1;

  display: none;

  @media screen and (min-width: ${Breakpoints.lg}) {
    display: block;
  }
`;

export const RightBgHomeIcon = styled(RightBgHome)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  object-fit: contain;
  z-index: -1;

  display: none;

  @media screen and (min-width: ${Breakpoints.lg}) {
    display: block;
  }
`;

export const LeftBgTradeIcon = styled(LeftBgTrade)`
  position: absolute;
  bottom: 0;
  left: 0;
  object-fit: contain;
  z-index: -1;

  display: none;

  @media screen and (min-width: ${Breakpoints.lg}) {
    display: block;
  }
`;

export const RightBgTradeIcon = styled(RightBgTrade)`
  position: absolute;
  bottom: 0;
  right: 0;
  object-fit: contain;
  z-index: -1;

  @media screen and (max-width: ${Breakpoints.md}) {
    transform: scale(0.7);
    transform-origin: bottom right;
  }
`;
