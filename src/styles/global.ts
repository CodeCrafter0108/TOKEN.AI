import { Breakpoints } from '@/styles/breakpoints';
import styled, { RuleSet } from 'styled-components';
import { FlexProps } from './types';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 12px;

  max-width: 1920px;
  margin: 0 auto;

  display: flex;
  flex: 1;
  flex-direction: column;

  @media screen and (min-width: ${Breakpoints.md}) {
    padding: 0 20px;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    padding: 0 40px;
  }

  @media screen and (min-width: ${Breakpoints.xl}) {
    padding: 0 120px;
  }

  @media screen and (min-width: ${Breakpoints.xxl}) {
    padding: 0 60px;
  }
`;

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 24px;

  padding: 40px 0;
`;

export const PageSearchWrapper = styled.div`
  display: flex;
  width: 286px;

  @media screen and (max-width: ${Breakpoints.lg}) {
    width: 100%;
  }
`;

export const H2 = styled.h2`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.72px;

  @media screen and (min-width: ${Breakpoints.lg}) {
    font-size: 36px;
  }
`;

export const H3 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.6px;
`;

export const Box = styled.div<{ $styles?: RuleSet<object> }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;

  background-color: var(--primary-box-bg-clr);
  border-radius: 16px;
  box-shadow: var(--box-shadow);

  ${({ $styles }) => $styles && $styles};
`;

export const Flex = styled.div<FlexProps>`
  width: 100%;
  display: ${(props) => (props.$inline ? 'inline-flex' : 'flex')};
  flex-direction: ${(props) => props.$direction || 'row'};
  justify-content: ${(props) => props.$justify || 'flex-start'};
  align-items: ${(props) => props.$align || 'stretch'};
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : '0px')};
  flex-wrap: ${(props) => props.$wrap || 'nowrap'};
`;

export const FirstBlur = styled.div`
  position: absolute;
  top: 0;
  z-index: -1;
  filter: blur(100.6500015258789px);
  background: rgba(53, 83, 49, 0.58);
  transform: rotate(50deg);

  width: 80px;
  height: 280px;
  left: 0;

  @media screen and (min-width: ${Breakpoints.md}) {
    width: 120px;
    left: 20%;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    height: 500px;
    left: 20%;
  }
`;

export const SecondBlur = styled.div`
  position: absolute;
  top: 0;
  z-index: -1;
  filter: blur(100.6500015258789px);
  background: rgba(53, 83, 49, 0.58);
  transform: rotate(50deg);

  width: 108px;
  height: 430px;
  right: 0;

  @media screen and (min-width: ${Breakpoints.md}) {
    width: 208px;
    right:  0%;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    height: 680px;
    right: 10%;
  }
`;