import { Breakpoints } from '@/styles/breakpoints';
import styled, { css } from 'styled-components';
import Button from '@/components/Button';

export const cardStyles = css`
  margin: 0 !important;
  @media screen and (min-width: ${Breakpoints.md}) {
    width: calc((100% - 12px) / 2);
    max-width: calc((100% - 12px) / 2);
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    width: calc((100% - 36px) / 4);
    max-width: calc((100% - 36px) / 4);
  }

  @media screen and (min-width: ${Breakpoints.xxl}) {
    width: calc((100% - 60px) / 6);
    max-width: calc((100% - 60px) / 6);
  }
`;

export const FiltersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding-bottom: 12px;

  border-bottom: 1px solid var(--border-clr);

  @media screen and (min-width: ${Breakpoints.md}) {
    flex-direction: row;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const LoadMore = styled(Button)`
  height: 36px;
  align-self: center;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  letter-spacing: -0.14px;

  transition: all 0.2s ease-in-out;

  :hover {
    color: var(--accent-clr);
  }
`;
