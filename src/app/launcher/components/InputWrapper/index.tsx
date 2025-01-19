import { ReactNode } from 'react';
import { Container, Error, InputContainer, Label } from './styles';

interface InputWrapperProps {
  children: ReactNode;
  label: string;
  htmlFor: string;
  isActive: boolean;
  isError: boolean;
  textError?: string;
  isRequired?: boolean
}

export const InpupWrapper = ({ children, label, htmlFor, isActive, isError, textError, isRequired = true }: InputWrapperProps) => {
  return (
    <Container>
      <InputContainer $isError={isError}>
        <Label htmlFor={htmlFor} $isActive={isActive} $isRequired={isRequired}>{label}</Label>
        {children}
      </InputContainer>
      {isError && <Error>{textError}</Error>}
    </Container>
  );
};
