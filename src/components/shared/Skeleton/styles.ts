import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    background-color: #818181;
  }
  50% {
    background-color: #413f3f;
  }
  100% {
    background-color: #818181;
  }
`;

export const SkeletonWrapper = styled.div<{
  $width: number;
  $height: number;
  $shape?: 'rect' | 'circle' | 'round';
  $borderRadius?: number;
}>`
  width: ${(props: { $width: number }) => props.$width}px;
  height: ${(props: { $height: number }) => props.$height}px;
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props: { $shape?: 'rect' | 'circle' | 'round'; $borderRadius?: number }) =>
    props.$shape === 'circle' ? '50%' : props.$shape === 'round' ? `${props.$borderRadius}px` : '0'};
  position: relative;
  animation: ${pulse} 2s infinite ease-in-out;
`;
