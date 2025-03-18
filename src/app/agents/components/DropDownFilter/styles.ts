import ChevronIcon from '@/assets/icons/chevron.svg';
import Button from '@/components/shared/Button';
import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled(Button)`
  width: 100%;
  color: var(--accent-clr);
  background-color: var(--primary-box-bg-clr);
  padding: 12px 30px 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: 106%;
  left: 0;
  width: 100%;
  padding: 16px;
  background-color: rgb(19, 19, 19);
  border-radius: 16px;
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
  color: ${({ $isSelected }) => ($isSelected ? 'var(--accent-clr)' : 'var(--primary-text-clr)')};
  cursor: pointer;

  svg path {
    color: ${({ $isSelected }) => ($isSelected ? 'var(--accent-clr)' : 'var(--primary-text-clr)')};
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const Icon = styled(ChevronIcon)<{ $isOpen: boolean }>`
  transition: all 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  color: ${({ $isOpen }) => ($isOpen ? 'var(--accent-clr)' : 'var(--placeholder-clr)')};
`;
