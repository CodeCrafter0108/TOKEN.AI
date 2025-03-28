import styled from 'styled-components';

export const Wrapper = styled.div<{ $hasBgImage?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  ${(props) =>
    props.$hasBgImage &&
    `
      border-radius: 16px;
      background: rgba(14, 14, 14, 0.6);
      box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1);
  `}
`;

export const Content = styled.div<{ $hasBgImage?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  padding-top: 70px;

  ${(props) =>
    props.$hasBgImage &&
    `
    background-image: url('/images/info/bg-nodata.png');
    background-size: cover;
    background-position-x: center;
    background-position-y: center;
    background-repeat: no-repeat;
  `}
`;

export const Title = styled.p`
  font-size: 18px;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 14px;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
`;
