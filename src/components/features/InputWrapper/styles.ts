import styled, { RuleSet } from 'styled-components';
import CheckIcon from '@/assets/icons/check.svg';

export const Container = styled.div<{$styles?: RuleSet<object> }>`
  max-width: 666px;
  width: 100%;
  height: 67px;

  ${({ $styles }) => $styles}
`;

export const InputContainer = styled.div<{ $isError: boolean; $isDisabled: boolean; $styles?: RuleSet<object> }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(19, 19, 19, 0.6);
  border: 1px solid ${({ $isError }) => ($isError ? 'var(--error-clr)' : 'rgba(255, 255, 255, 0.04)')};
  outline: 1px solid ${({ $isError }) => ($isError ? 'var(--error-clr)' : 'transparent')};
  transition: all 0.2s ease-in-out;

  width: 100%;
  height: 44px;

  &:hover {
    border: 1px solid ${({ $isError }) => ($isError ? 'var(--error-clr)' : ' rgba(255, 255, 255, 0.12)')};
  }

  ${({ $isDisabled }) => $isDisabled && `pointer-events: none;`}

  ${({ $styles }) => $styles}
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
      color: var(--white-clr);
      margin-left: 4px;
    }`}

  color: var(--placeholder-clr);
`;

export const Error = styled.p`
  font-size: 12px;
  color: var(--error-clr);
`;

export const Badge = styled.div`
position: absolute;
top: 0;
left: 0;
padding: 12px;
height: 100%;
border-right: 1px solid rgba(255, 255, 255, 0.04);
width: 105px;

background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #151515;
`;