import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 40px;

  @media screen and (min-width: ${Breakpoints.lg}) {
    align-items: flex-start;
    flex-direction: row;
    gap: 80px;
  }
`;