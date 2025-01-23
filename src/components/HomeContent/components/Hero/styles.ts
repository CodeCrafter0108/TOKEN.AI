import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 40px;
  gap: 24px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledImage = styled(Image)``;

export const Title = styled.h1`
  span {
    font-size: 24px;
    line-height: 1.11;
    letter-spacing: 0.72px;
    font-weight: 400;

    &:last-child {
      font-weight: 700;
    }
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ListItem = styled.li`
  position: relative;
  padding-left: 16px;

  font-feature-settings:
      'liga' off,
      'clig' off;
    font-size: 14px;
    line-height: 1.6;
`;

export const ListItemTitle = styled.span`
  font-weight: 700;
`;

export const Dot = styled.div`
  position: absolute;
  border-radius: 40px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  background: var(--accent-clr);
  width: 6px;
  height: 6px;
`;
