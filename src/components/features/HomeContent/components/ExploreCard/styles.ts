import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const Card = styled.li`
  max-height: 175px;
  min-height: 175px;
  flex: 1;
  overflow: hidden;

  a {
    height: 175px;
  }

  &:hover a div img {
    transform: scale(1.1);
  }

  @media screen and (min-width: ${Breakpoints.md}) {
    max-height: 250px;
    min-height: 250px;

    a {
    height: 250px;
  }
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const Text = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;

  @media screen and (min-width: ${Breakpoints.lg}) {
    font-size: 18px;
  }
`;
