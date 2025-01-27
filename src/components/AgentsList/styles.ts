import { Breakpoints } from '@/styles/breakpoints';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

export const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;

  li:not(:last-child) {
    padding-bottom: 12px;
    border-bottom: 1px solid #ececec;
  }

  li:not(:first-child) {
    padding-top: 12px;
  }
`;

export const ListItem = styled.li`
  scale: 1;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    scale: 1.01;
  }
`;

export const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  gap: 12px;

  @media screen and (min-width: ${Breakpoints.md}) {
    gap: 24px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 36px;
  }
`;

export const AgentLogo = styled(Image)`
  border-radius: 4px;
  object-fit: cover;
`;

export const TokenLogo = styled(Image)``;

export const Title = styled.span`
  width: 100%;
  font-size: 16px;
  /* font-weight: 500; */
  font-weight: 700;
  line-height: 1.3;
  font-feature-settings:
    'liga' off,
    'clig' off;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TokenSymbol = styled(Title)`
  font-size: 14px;
  font-weight: 400;
`;

export const MarketCapValue = styled(Title)`
  /* font-weight: 700; */
  font-size: 14px;
  /* font-weight: 400; */
`;
