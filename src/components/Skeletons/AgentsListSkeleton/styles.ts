import { Breakpoints } from '@/styles/breakpoints';
import styled, { css } from 'styled-components';

export const SymbolWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 4px;

  @media screen and (min-width: ${Breakpoints.md}) {
    justify-content: center;
  }
`;

export const skeletonRectangleStyles = css`
  @media screen and (max-width: ${Breakpoints.md}) {
    width: 100%;
  }
`;
