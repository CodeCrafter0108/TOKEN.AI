import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { memo, ReactNode } from 'react';
import { Check, Container, Error, InputContainer, Label } from './styles';

interface InputWrapperProps {
  children: ReactNode;
  label: string;
  htmlFor: string;
  isActive: boolean;
  value: string;
  textError?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  hasCheckIcon?: boolean;
}

const InpupWrapper = ({
  children,
  label,
  htmlFor,
  isActive,
  textError,
  isRequired = true,
  value,
  isDisabled = false,
  hasCheckIcon = true
}: InputWrapperProps) => {
  return (
    <Container>
      <InputContainer $isError={!!textError} $isDisabled={isDisabled}>
        <Label htmlFor={htmlFor} $isActive={isActive} $isRequired={isRequired}>
          {label}
        </Label>
        {children}
        <AnimatedWrapper.Opacity condition={Boolean(!textError && value && hasCheckIcon)}>
          <Check />
        </AnimatedWrapper.Opacity>
      </InputContainer>

      <AnimatedWrapper.Opacity condition={!!textError}>
        <Error>{textError}</Error>
      </AnimatedWrapper.Opacity>
    </Container>
  );
};

export default memo(InpupWrapper);
