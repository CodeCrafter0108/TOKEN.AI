import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: ${Breakpoints.lg}) {
    flex-direction: row;
  }
`;

export const ListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CoinAnimationWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 12px;
align-items: center;

margin-top: 20px;

@media screen and (min-width: ${Breakpoints.lg}) {
  margin-top: 80px;
}

`;