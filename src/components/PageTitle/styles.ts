import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media screen and (min-width: ${Breakpoints.md}) {
    padding: 10px 0;
  }
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.54px;

  @media screen and (min-width: ${Breakpoints.md}) {
    font-size: 24px;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    font-size: 36px;
  }
`;

export const SubTitle = styled.h2`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.6;

  @media screen and (min-width: ${Breakpoints.md}) {
    font-size: 18px;
  }

`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 4px;
  background-color: var(--badge-bg-clr);
  height: 30px;
`;

export const BadgeDescription = styled.p`
color: var(--white-clr);
font-size: 14px;
font-weight: 700;
`;
