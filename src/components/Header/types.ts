import { Dispatch, SetStateAction } from "react";

export interface BurgerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>> 
}