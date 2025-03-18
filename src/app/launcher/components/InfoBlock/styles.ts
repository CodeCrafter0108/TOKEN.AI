import styled, { css } from 'styled-components';

export const textStyles = css`
  left: 0;

  position: absolute;
  width: 100%;

  color: var(--white-clr);
  background-color: var(--primary-clr);

  text-align: center;

  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;

  @media screen and (min-width: 420px) {
    font-size: 24px;
  }

  @media screen and (min-width: 560px) {
    font-size: 32px;
  }
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
`;

export const Description = styled.p`
  font-size: 12px;
  font-weight: 500;
`;