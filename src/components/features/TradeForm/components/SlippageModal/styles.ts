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
  justify-content: flex-start;
  gap: 4px;

  input {
    display: none;
  }

  &:before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border: 1.5px solid var(--white-clr);
    border-radius: 50%;
    color: var(--primary-clr);
    margin-left: 8px;
  }

  ${({ $isSelected }) => $isSelected && `
    &:before {
      background-color: var(--white-clr);
    }
  `}
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  font-size: 16px;
  font-weight: ${({ $isSelected }) => ($isSelected ? 500 : 400)};
`;
