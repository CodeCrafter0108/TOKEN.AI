import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const RadioLabel = styled.label<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;

  cursor: pointer;

  transition: all 0.2s ease-in-out;

  font-size: 16px;
  font-weight: ${({ $isSelected }) => ($isSelected ? 500 : 400)};
`;
