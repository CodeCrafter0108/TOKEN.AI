import { Breakpoints } from '@/styles/breakpoints';
import Image from 'next/image';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Title = styled.h2`
  padding: 0 20px;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
`;

export const Description = styled.p`
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  max-width: 350px;
  height: max-content;

  padding: 16px 0;
  border-radius: 32px;
  background: rgba(10, 10, 10, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;

    right: -62.488px;
    top: -129px;

    width: 197px;
    height: 506.65px;
    transform: rotate(19.315deg);

    z-index: -1;
    background-color: #497844;
    filter: blur(100.6500015258789px);
  }

  @media screen and (min-width: ${Breakpoints.lg}) {
    max-width: 380px;
  }
`;

export const StyledImage = styled(Image)`
  width: 100%;
  max-width: 190px;
  max-height: 180px;

  @media screen and (min-width: ${Breakpoints.lg}) {
    max-width: 280px;
    max-height: 270px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 1px;
    background-color: #5d5a61;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 1px;
    background-color: #5d5a61;
  }
`;

export const Blur = styled.div`
  display: none;
  width: 387px;
  height: 11px;
  flex-shrink: 0;

  border-radius: 387px;
  background: rgba(53, 83, 49, 0.58);
  filter: blur(18.399999618530273px);

  @media screen and (min-width: ${Breakpoints.lg}) {
    display: block;
  }
`;
