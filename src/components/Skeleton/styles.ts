import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    background-color: #d0d0d0;
  }
  50% {
    background-color: #e5e5e5;
  }
  100% {
    background-color: #d0d0d0; 
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
  border-radius: ${(props: { $shape?: 'rect' | 'circle' | 'round', $borderRadius?: number }) =>
    props.$shape === 'circle' ? '50%' : props.$shape === 'round' ? `${props.$borderRadius}px` : '0'};
  position: relative;
  animation: ${pulse} 2s infinite ease-in-out;
`;
