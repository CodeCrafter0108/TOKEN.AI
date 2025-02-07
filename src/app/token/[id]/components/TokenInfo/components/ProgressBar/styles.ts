import styled from "styled-components";

export const Bar = styled.div<{ width: number }>`
  height: 100%;
  width: ${({ width }) => `${width}%`};
  transition: width 0.3s ease;
`;