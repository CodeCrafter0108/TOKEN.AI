import styled from 'styled-components';
import { ButtonVariants } from './types';

export const StyledButton = styled.button<{ $variants: ButtonVariants; $isSelected?: boolean }>`
  cursor: pointer;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  background-color: transparent;
  border: 1.5px solid var(--primary-clr);
  transition: all 0.2s ease-in-out;
  box-shadow: var(--box-shadow);          

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  ${({ $variants, $isSelected }) => {
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
          
            &:hover {
              color: var(--accent-clr);
            }
            
            &:active {
              color: var(--white-clr);
              background-color: var(--accent-clr);
              border-color: var(--accent-clr);
            }
        `;
      case ButtonVariants.CLEAR:
        return `
          border: none;
          padding: 0; 
          box-shadow: none;
        `;
      case ButtonVariants.FILTER:
        return `
            background-color: var(--box-bg-clr);
            box-shadow: none; 
            border: ${$isSelected ? '1px solid var(--accent-clr)' : '1px solid transparent'};
              svg path {
                transition: all 0.2s ease-in-out;
                color: ${$isSelected ? 'var(--accent-clr)' : 'var(--primary-clr)'};
                  }
            }
          `;
    }
  }}
`;
