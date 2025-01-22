import { memo, ReactNode, JSX, ButtonHTMLAttributes } from 'react';
import { StyledButton } from './styles';
import { ButtonVariants } from './types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variants?: ButtonVariants;
}

const Button = ({ children, variants = ButtonVariants.OUTLINE, style, ...rest }: ButtonProps): JSX.Element => {
  return (
    <StyledButton {...rest} $variants={variants} style={style}>
      {children}
    </StyledButton>
  );
};

export default memo(Button);
