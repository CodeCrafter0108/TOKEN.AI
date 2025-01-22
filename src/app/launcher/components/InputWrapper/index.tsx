import { memo, ReactNode } from 'react';
import { Container, Error, InputContainer, Label } from './styles';

interface InputWrapperProps {
  children: ReactNode;
  label: string;
  htmlFor: string;
  isActive: boolean;
  textError?: string;
  isRequired?: boolean
}

const InpupWrapper = ({ children, label, htmlFor, isActive, textError, isRequired = true }: InputWrapperProps) => {
  return (
    <Container>
      <InputContainer $isError={!!textError}>
        <Label htmlFor={htmlFor} $isActive={isActive} $isRequired={isRequired}>{label}</Label>
        {children}
      </InputContainer>
      {textError && <Error>{textError}</Error>}
    </Container>
  );
};

export default memo(InpupWrapper);
