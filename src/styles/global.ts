import styled from 'styled-components';
import { background, color, flexbox, grid, layout, position, space } from 'styled-system';
import { AbsoluteProps, BoxProps, ContainerProps, FlexProps, GridProps, PageContainerProps, TextProps } from './types';
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
  line-height: ${({ lineHeight }) => lineHeight || '1.45'};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || '0.5px'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  color: ${({ color }) => color || '#fff'};
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

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  padding: 0 0.75rem;

  max-width: 1920px;
  margin: 0 auto;

  display: flex;
  flex: 1;
  flex-direction: column;

  @media screen and (min-width: ${Breakpoints.md}) {
    padding: 0 1.25rem;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    padding: 0 2.5rem;
  }

  @media screen and (min-width: ${Breakpoints.xl}) {
    padding: 0 7.5rem;
  }

  @media screen and (min-width: ${Breakpoints.xxl}) {
    padding: 0 3.75rem;
  }
`;

export const PageContainer = styled.div<PageContainerProps>`
  position: relative;
  display: grid;
  gap: 24px;

  padding: 24px;
  height: ${({ height }) => height || 'unset'};

  @media screen and (max-width: ${Breakpoints.lg}) {
    padding: 0;
    padding-bottom: 30px;
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

// export const FadeIn = styled.div<FadeInProps>`
//     height: ${({ height }) => height || '100%'};
//     animation: fadeIn ${({ duration = 0.3 }) => `${duration}s`} ease forwards;
//     animation-delay: ${({ delay }) => delay || '0s'};
//     opacity: 0;

//     @keyframes fadeIn {
//         0% {
//             opacity: 0;
//         }
//         100% {
//             opacity: 1;
//         }
//     }
// `;
