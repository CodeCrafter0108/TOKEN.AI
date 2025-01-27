import Button from '@/components/Button';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 7px 0 27px 0;
  border-bottom: 1px solid var(--border-clr);
  margin-bottom: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const CloseButton = styled(Button)`
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--modal-hover-clr);
  }

  &:active {
    background-color: var(--primary-clr);
  }
`;
