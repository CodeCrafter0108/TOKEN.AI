import styled from 'styled-components';
import { ButtonVariants } from './types';

export const StyledButton = styled.button<{ $variants: ButtonVariants }>`
  cursor: pointer;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  background-color: transparent;
  border: 1.5px solid var(--primary-clr);
  transition: all 0.1s ease;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1);

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  ${({ $variants }) => {
    switch ($variants) {
      case ButtonVariants.OUTLINE:
        return `
          color: var(--primary-clr);

            &:hover {
              border: 1.5px solid var(--accent-clr);
            }
            
            &:active {
              color: var(--white-clr);
              border: 1.5px solid var(--accent-clr);
              background-color: var(--accent-clr);
            }
        `;
      case ButtonVariants.SOLID:
        return `
          color: var(--white-clr);
          background-color: var(--primary-clr);  
        `;
      case ButtonVariants.CLEAR:
        return `
          border: none;
          padding: 0; 
          box-shadow: none;
        `;
    }
  }}
`;
