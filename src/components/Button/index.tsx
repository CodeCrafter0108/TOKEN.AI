import { memo, ReactNode, JSX, ButtonHTMLAttributes } from 'react';
import { StyledButton } from './styles';
import { ButtonVariants } from './types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isSelected?: boolean;
  variants?: ButtonVariants;
}

const Button = ({ children, variants = ButtonVariants.OUTLINE, isSelected, style, ...rest }: ButtonProps): JSX.Element => {
  return (
    <StyledButton {...rest} $variants={variants} $isSelected={isSelected} style={style}>
      {children}
    </StyledButton>
  );
};

export default memo(Button);
