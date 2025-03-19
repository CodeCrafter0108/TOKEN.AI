import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-direction: column;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex-direction: row;
  }
`;
