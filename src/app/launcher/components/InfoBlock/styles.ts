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
  line-height: 1.5;
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
  line-height: 1.5;
`;

export const Description = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
`;

export const VideoWrapper = styled.div`
  max-width: 666px;
  position: relative;
  overflow: hidden;
  border-radius: 9px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Video = styled.video`
  height: 100%;
  width: 100%;
  z-index: -1;
`;

export const TextTop = styled.div`
  position: relative;
  top: 0;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  ${textStyles}

  span {
    color: var(--accent-clr);
  }
`;

export const TextBottom = styled.div`
  bottom: 0;
  ${textStyles}
`;
