import { memo, ReactNode, JSX, ButtonHTMLAttributes } from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...rest }: ButtonProps): JSX.Element => {
  return (
    <StyledButton {...rest}>
      {children}
    </StyledButton>
  );
};

export default memo(Button);
