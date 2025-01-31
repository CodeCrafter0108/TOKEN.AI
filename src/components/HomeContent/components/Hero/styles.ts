import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';
import { Container } from '@/styles/global';

export const HeroWrapper = styled.div`
  background-color: var(--hero-bg-clr);
`;

export const HeroContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0 20px 0;
  gap: 24px;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex-direction: row;
  }
`;


export const   VideoWrapper = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
`;

export const Video = styled.video`
  width: 100%;
  max-width: 750px;
`;

export const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 0 12px;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex: 1.5;
    align-items: flex-start;
    padding: 0;
  }

  @media screen and (min-width: 920px) {
    flex: 1;
  }
`;


export const Title = styled.h1`
  max-width: 400px;
  font-size: 24px;
  line-height: 1.11;
  letter-spacing: 0.72px;

  @media screen and (min-width: ${Breakpoints.lg}) {
    font-size: 36px;
    max-width: 600px;
  }

  span {
    font-weight: 400;

    &:last-child {
      font-weight: 700;
    }
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ListItem = styled.li`
  position: relative;
  padding-left: 16px;

  font-feature-settings:
    'liga' off,
    'clig' off;
  line-height: 1.6;

  @media screen and (min-width: ${Breakpoints.xl}) {
    font-size: 16px;
  }
`;

export const ListItemTitle = styled.span`
  font-weight: 700;
`;

export const Dot = styled.div`
  position: absolute;
  border-radius: 40px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  background: var(--accent-clr);
  width: 6px;
  height: 6px;
`;
