import Button from '@/components/shared/Button';
import styled from 'styled-components';

export const StyledButton = styled(Button)<{ $isActive?: boolean }>`
  border-radius: 16px;
  height: 44px;
  width: 100%;
  transition: all 0.2 ease-in-out;

  color: ${({ $isActive }) => ($isActive ? 'var(--accent-clr)' : 'var(--white-clr)')};
  background: rgba(19, 19, 19, 0.6);

  border: 1px solid rgba(255, 255, 255, 0.04);

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
`;
