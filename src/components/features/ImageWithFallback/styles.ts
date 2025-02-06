import styled from "styled-components";

export const ImageWrapper = styled.div<{ $size: number }>`
  min-width: ${({$size}) => `${$size}px`};
  min-height: ${({$size}) => `${$size}px`};
  max-width: ${({$size}) => `${$size}px`};
  max-height: ${({$size}) => `${$size}px`};
  position: relative;
`;
