import { memo, ReactNode, JSX, ButtonHTMLAttributes } from 'react';
import { StyledButton } from './styles';
import { ButtonVariants } from './types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isSelected?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variants?: ButtonVariants;
}

const Button = ({ children, variants = ButtonVariants.OUTLINE, isSelected, type ='button', style, ...rest }: ButtonProps): JSX.Element => {
  return (
    <StyledButton {...rest} $variants={variants} $isSelected={isSelected} style={style} type={type}>
      {children}
    </StyledButton>
  );
};

export default memo(Button);
