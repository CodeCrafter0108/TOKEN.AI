import { memo, ReactNode } from 'react';
import { Container, Error, InputContainer, Label, Check } from './styles';
import { AnimatePresence } from 'framer-motion';

import AnimatedWrapper from '@/components/AnimatedWrapper';

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
        <AnimatePresence>
          {!textError && value && hasCheckIcon && (
            <AnimatedWrapper>
              <Check />
            </AnimatedWrapper>
          )}
        </AnimatePresence>
      </InputContainer>
      <AnimatePresence>
        {textError && (
          <AnimatedWrapper>
            <Error>{textError}</Error>
          </AnimatedWrapper>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default memo(InpupWrapper);
