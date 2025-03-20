import { Breakpoints } from '@/styles/breakpoints';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  height: 330px;
  width: 100%;
  display: flex;
  position: relative;

  @media screen and (min-width: ${Breakpoints.md}) {
    flex: 1;
    height: 100%;
  }
`;

export const Background = styled.div`
  background-image: url('/images/homepage/hero_background.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute;
  z-index: -1;
  right: 50%;
  transform: translateX(50%);

  max-width: 383px;
  width: 383px;
  height: 383px;

  top: -60px;

  @media screen and (min-width: ${Breakpoints.md}) {
    max-width: 533px;
    width: 533px;
    height: 533px;

    top: -250px;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    max-width: 833px;
    width: 833px;
    height: 833px;

    top: -400px;
  }
`;

const commonCurrencyStyles = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  overflow: hidden;

  font-weight: 400;
  font-size: 12px;

  @media screen and (min-width: ${Breakpoints.lg}) {
    font-size: 16px;
  }
`;

export const virtualStyles = css`
  ${commonCurrencyStyles}

  width: 53px;
  height: 53px;

  bottom: 90px;
  left: 50px;

  @media screen and (min-width: ${Breakpoints.md}) {
    width: 63px;
    height: 63px;

    bottom: 140px;
    left: 70px;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    bottom: 210px;
    left: 120px;

    width: 93px;
    height: 93px;
  }
`;

export const anonStyles = css`
  ${commonCurrencyStyles}

  width: 40px;
  height: 40px;

  bottom: 220px;
  left: 10px;

  @media screen and (min-width: ${Breakpoints.md}) {
    bottom: 320px;
    left: 20px;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    bottom: 490px;
    left: 35px;

    width: 70px;
    height: 70px;
  }
`;

export const aixbtStyles = css`
  ${commonCurrencyStyles}

  width: 40px;
  height: 40px;

  bottom: 330px;
  left: 50px;

  @media screen and (min-width: ${Breakpoints.md}) {
    bottom: 460px;
    left: 80px;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    bottom: 720px;
    left: 120px;

    width: 70px;
    height: 70px;
  }
`;

export const buzzStyles = css`
  ${commonCurrencyStyles}

  width: 35px;
  height: 35px;

  bottom: 120px;
  left: 330px;
  font-size: 11px;

  @media screen and (min-width: ${Breakpoints.md}) {
    bottom: 175px;
    left: 470px;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    bottom: 280px;
    left: 730px;

    width: 55px;
    height: 55px;
  }
`;

export const neurStyles = css`
  ${commonCurrencyStyles}

  width: 40px;
  height: 40px;

  bottom: 100px;
  left: -30px;

  @media screen and (min-width: ${Breakpoints.md}) {
    bottom: 150px;
    left: -20px;
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    bottom: 230px;
    left: -70px;

    width: 70px;
    height: 70px;
  }
`;
