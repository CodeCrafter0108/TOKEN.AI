import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const StyledHeader = styled.header`
  background-color: var(--header-bg-clr);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

export const NavigationWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${Breakpoints.md}) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }
`;
