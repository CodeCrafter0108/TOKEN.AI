import Button from '@/components/shared/Button';
import { Breakpoints } from '@/styles/breakpoints';
import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';

export const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;

  li:not(:last-child) {
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(236, 236, 236, 0.12);
  }

  li:not(:first-child) {
    padding-top: 12px;
  }
`;

export const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex-direction: row;
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

const commonTitleStyles = css`
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

export const TokenLogo = styled(Image)``;

export const Title = styled.span`
  ${commonTitleStyles}
`;

export const ListItem = styled.li`
  scale: 1;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;

  &:hover {
    scale: 1.01;
  }

  &:hover ${Title} {
    color: var(--accent-clr);
  }
`;

export const TokenSymbol = styled.span`
  ${commonTitleStyles}
  font-size: 14px;
  font-weight: 400;
`;

export const MarketCupWrapper = styled.div`
  display: flex;
  gap: 4px;

  @media screen and (min-width: ${Breakpoints.sm}) {
    align-items: flex-end;
  }
`;

export const MarketCapValue = styled.span`
  ${commonTitleStyles}
  font-size: 14px;
  width: auto;
`;

export const ArrowWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${Breakpoints.sm}) {
    display: flex;
    align-items: center;
  }
`;

export const ViewMoreButton = styled(Button)`
  width: 100%;

  @media screen and (min-width: ${Breakpoints.sm}) {
    display: none;
  }
`;
