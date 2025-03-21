import styled from 'styled-components';
import { ButtonVariants } from './types';

export const StyledButton = styled.button<{ $variants: ButtonVariants; $isSelected?: boolean }>`
  cursor: pointer;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  background-color: transparent;
  /* border: 2px solid transparent; */
  transition: all 0.3s ease-in-out;
  outline: none;

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

          position: relative;
          z-index: 1;
          

          &::before {
            content: '';
            position: absolute;
            inset: -5px;
            background: linear-gradient( to right, #94e927 0%, #ea88ef80 100%);
            border-radius: 8px;
            z-index: -1;
            opacity: 0.3;
            mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            mask-composite: exclude;
            padding: 2px;
            box-sizing: border-box;
        }
          
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 8px;
            background-image: var(--gradient);
            transition: opacity 0.3s ease-in-out;
            background-position: 100% 0%;
            z-index: -1;
            opacity: 0;
        }

      &:hover::after {
        opacity: 1;
      }
          color: var(--black-text-clr);
          border: 2px solid var(--black-clr);
          background-color: var(--accent-clr);
          box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.10);
        `;
      case ButtonVariants.CLEAR:
        return `
          border: none;
          padding: 0; 
          box-shadow: none;
        `;
      case ButtonVariants.FILTER:
        return `
            border-radius: 62px;
            color: ${$isSelected ? 'var(--black-clr)' : 'var(--accent-clr)'};
            box-shadow: none;
            border: 1px solid var(--accent-clr);
            background-color: ${$isSelected ? 'var(--accent-clr)' : 'transparent'};

            &:hover {
              background: rgba(126, 196, 37, 0.08);
            }

              svg path {
                transition: all 0.3s ease-in-out;
                color: ${$isSelected ? 'var(--black-clr)' : 'var(--accent-clr)'};
                  }
            }
          `;
    }
  }}
`;
