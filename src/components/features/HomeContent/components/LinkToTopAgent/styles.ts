import styled from 'styled-components';
import Arrow from '@/assets/icons/right-arrow.svg';

export const LinkText = styled.span`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.14px;
`;

export const LinkContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledArrow = styled(Arrow)`
  transform: rotate(-45deg);
`;
