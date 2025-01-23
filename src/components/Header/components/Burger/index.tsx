import { BurgerProps } from '../../types';
import { BurgerWrapper } from './styles';

export const Burger = ({ isOpen, setIsOpen}: BurgerProps) => {
  return (
    <BurgerWrapper $isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
      <span></span>
      <span></span>
      <span></span>
    </BurgerWrapper>
  );
};
