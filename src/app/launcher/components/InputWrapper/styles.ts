import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 67px;
`;

export const InputContainer = styled.div<{ $isError: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 8px;
  overflow: hidden;
  background: #110827;
  border: 1px solid ${({ $isError }) => ($isError ? 'red' : 'green')};
  outline: none;

  width: 100%;
  height: 44px;
`;

export const Label = styled.label<{ $isActive: boolean; $isRequired: boolean }>`
  position: absolute;
  top: ${({ $isActive }) => ($isActive ? '0px' : '11px')};
  font-size: ${({ $isActive }) => ($isActive ? '11px' : '14px')};
  left: 12px;
  transition: 0.3s ease;
  pointer-events: none;

  ${({ $isRequired }) =>
    $isRequired &&
    `&::after {
      content: '*';
      color: red;
      margin-left: 2px;
    }`}

  color: #ffffff;
  line-height: 1.5;
`;

export const Error = styled.p`
  color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
`;
