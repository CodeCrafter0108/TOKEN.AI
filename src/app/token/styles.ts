import Button from '@/components/shared/Button';
import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const BackButton = styled(Button)`
  svg {
    transform: rotate(180deg);
  }

  font-feature-settings:
    'liga' off,
    'clig' off;
  font-size: 16px;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: -0.16px;

  display: flex;
  gap: 4px;
  align-items: center;

  transition: all 0.2s ease-in-out;

  &:hover {
    color: var(--accent-clr);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: ${Breakpoints.lg}) {
    flex-direction: row;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: ${Breakpoints.lg}) {
    width: 70%
  }
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: ${Breakpoints.lg}) {
    width: 30%
  }
`;