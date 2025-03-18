import styled from 'styled-components';
import CheckIcon from '@/assets/icons/check.svg';

export const Container = styled.div`
  max-width: 666px;
  width: 100%;
  height: 67px;
`;

export const InputContainer = styled.div<{ $isError: boolean, $isDisabled: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(19, 19, 19, 0.60);
  border: 1px solid ${({ $isError }) => ($isError ? 'var(--error-clr)' : 'rgba(255, 255, 255, 0.04)')};
  outline: 1px solid ${({ $isError }) => ($isError ? 'var(--error-clr)' : 'transparent')};
  transition: all 0.2s ease-in-out;

  width: 100%;
  height: 44px;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.12)
  }

  ${({ $isDisabled }) => $isDisabled && `pointer-events: none;`}
`;

export const Check = styled(CheckIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
`;

export const Label = styled.label<{ $isActive: boolean; $isRequired: boolean }>`
  position: absolute;
  top: ${({ $isActive }) => ($isActive ? '2px' : '10px')};
  font-size: ${({ $isActive }) => ($isActive ? '10px' : '14px')};
  left: 12px;
  transition: 0.3s ease;
  pointer-events: none;
  transition: all 0.2s ease;

  ${({ $isRequired }) =>
    $isRequired &&
    `&::after {
      content: '*';
      color: var(--required-clr);
      margin-left: 4px;
    }`}

  color: var(--placeholder-clr);
`;

export const Error = styled.p``;
