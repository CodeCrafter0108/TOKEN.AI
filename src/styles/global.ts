import styled from 'styled-components';
import { background, color, flexbox, grid, layout, position, space } from 'styled-system';
import { AbsoluteProps, BoxProps, FlexProps, GridProps, TextProps } from './types';
import { Breakpoints } from '@/styles/breakpoints';

const Box = styled.div<BoxProps>`
  ${background}
  ${layout}
    ${position}
    ${space}
    ${color}
`;

export const Flex = styled(Box)<FlexProps & { cursor?: string }>`
  display: flex;
  cursor: ${({ cursor }) => cursor || 'unset'};
  gap: ${({ gap }) => (typeof gap !== 'undefined' ? gap : 10)}px;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  position: ${({ position }) => position || 'relative'};
  border: ${({ border }) => (border ? '1px solid' : 'none')};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  ${flexbox}
`;

export const Grid = styled(Box)<GridProps>`
  display: grid;
  position: relative;
  gap: ${({ gap }) => (typeof gap !== 'undefined' ? gap : 10)}px;
  border: ${({ border }) => (border ? '1px solid' : 'none')};
  ${flexbox}
  ${grid}
`;

export const Text = styled.span<TextProps>`
  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  line-height: ${({ lineHeight }) => lineHeight || '1.5'};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || 'normal'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  color: ${({ color }) => color || '#262626'};
  white-space: ${({ wrap }) => wrap || 'unset'};
  height: ${({ height }) => height || 'auto'};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};

  user-select: ${({ selectable }) => (selectable || typeof selectable === 'undefined' ? 'unset' : 'none')};

  text-overflow: ${({ width }) => (width ? 'ellipsis' : 'unset')};
  overflow: ${({ width }) => (width ? 'hidden' : 'unset')};
  width: ${({ width }) => width || 'auto'};

  font-variant-numeric: ${({ tabular }) => (tabular ? 'tabular-nums' : 'unset')};

  &:hover {
    text-overflow: ${({ width }) => (width ? 'unset' : 'ellipsis')};
    width: ${({ width }) => (width ? 'unset' : 'auto')};
    background: ${({ width }) => (width ? 'rgba(0,0,0,1)' : 'none')};
    border-radius: ${({ width }) => (width ? '4px' : 'none')};
  }
`;

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
  gap: 12px;

  padding: 40px 0;

  @media screen and (max-width: ${Breakpoints.md}) {
    gap: 24px;
  }
`;

export const PageSearchWrapper = styled.div`
  display: flex;
  width: 286px;

  @media screen and (max-width: ${Breakpoints.lg}) {
    width: 100%;
  }
`;

export const Absolute = styled.div<AbsoluteProps>`
  position: absolute;
  top: ${({ top }) => top || 'unset'};
  left: ${({ left }) => left || 'unset'};
  bottom: ${({ bottom }) => bottom || 'unset'};
  right: ${({ right }) => right || 'unset'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  z-index: ${({ zIndex }) => zIndex || 0};
`;

export const BackgroundWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100svh;
  z-index: -2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
