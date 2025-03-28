import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { memo, ReactNode } from 'react';
import { Check, Container, Error, InputContainer, Label, Badge } from './styles';
import { RuleSet } from 'styled-components';

interface InputWrapperProps {
  children: ReactNode;
  label?: string;
  htmlFor?: string;
  isActive: boolean;
  value?: string;
  textError?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  hasCheckIcon?: boolean;
  badgeText?: string;
  stylesContainer?: RuleSet<object>;
  stylesInputContainer?: RuleSet<object>;
}

const InputWrapper = ({
  children,
  label,
  htmlFor,
  isActive,
  textError,
  isRequired = true,
  value,
  isDisabled = false,
  hasCheckIcon = true,
  badgeText,
  stylesContainer,
  stylesInputContainer
}: InputWrapperProps) => {
  return (
    <Container $styles={stylesContainer}>
      <InputContainer $isError={!!textError} $isDisabled={isDisabled} $styles={stylesInputContainer}>
        {label && (
          <Label htmlFor={htmlFor} $isActive={isActive} $isRequired={isRequired}>
            {label}
          </Label>
        )}
        {children}
        <AnimatedWrapper.Opacity condition={Boolean(!textError && value && hasCheckIcon)}>
          <Check />
        </AnimatedWrapper.Opacity>
        {badgeText && <Badge>{badgeText}</Badge>}
      </InputContainer>

      <AnimatedWrapper.Opacity condition={!!textError}>
        <Error>{textError}</Error>
      </AnimatedWrapper.Opacity>
    </Container>
  );
};

export default memo(InputWrapper);
