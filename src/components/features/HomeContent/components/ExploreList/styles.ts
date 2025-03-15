import { Breakpoints } from '@/styles/breakpoints';
import Image from 'next/image';
import styled, { css } from 'styled-components';

export const List = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex-direction: row;
    font-size: 24px;
    gap: 20px;
  }
`;

export const exploreAgentsStyles = css`
  position: relative;
  background-color: var(--secondary-box-bg-clr);
  width: 100%;
  height: 100%;
  gap: 0;
  justify-content: flex-end;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/images/homepage/explore_card_filter.svg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.75;
    z-index: 0;
  }
  
  &:hover::before {
    opacity: 1;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

export const TopAgentsIcon = styled(Image)`
  transition: transform 0.2s ease-in-out;

  @media screen and (min-width: ${Breakpoints.md}) {
    width: 196px;
    height: 193px;
  }
`;

export const AllAgentsIcon = styled(Image)`
  transition: transform 0.2s ease-in-out;

  @media screen and (min-width: ${Breakpoints.md}) {
    width: 324px;
    height: 131px;
  }
`;

export const NewAgentsIcon = styled(Image)`
  transition: transform 0.2s ease-in-out;
  @media screen and (min-width: ${Breakpoints.md}) {
    width: 176px;
    height: 173px;
  }
  `;