import ChevronIcon from '@/assets/icons/chevron.svg';
import Button from '@/components/shared/Button';
import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled(Button)`
  width: 100%;
  background-color: var(--box-bg-clr);
  padding: 12px 30px 12px 16px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;

  &:hover {
    border: 1px solid var(--accent-clr);
  }
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 105%;
  left: 0;
  width: 100%;
  padding: 16px;
  background-color: var(--box-bg-clr);
  border-radius: 8px;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 12px;
  z-index: 10;
`;

export const DropdownItem = styled.li<{ $isSelected: boolean }>`
  display: flex;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 8px;
  color: ${({ $isSelected }) => ($isSelected ? 'var(--accent-clr)' : 'var(--primary-clr)')};
  cursor: pointer;

  svg path {
    color: ${({ $isSelected }) => ($isSelected ? 'var(--accent-clr)' : 'var(--primary-clr)')};
  }

  &:hover {
    background-color: var(--modal-hover-clr);
  }
`;

export const Icon = styled(ChevronIcon)<{ $isOpen: boolean }>`
  transition: all 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  color: ${({ $isOpen }) => ($isOpen ? 'var(--accent-clr)' : 'var(--primary-clr)')};
`;
