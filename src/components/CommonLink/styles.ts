import Link from 'next/link';
import styled from 'styled-components';
import { LinkVariants } from './types';

export const StyledLink = styled(Link)<{ $variants: LinkVariants }>`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background-color: transparent;
  transition: all 0.1s ease;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  ${({ $variants }) => {
    switch ($variants) {
      case LinkVariants.SOLID:
        return `
          color: var(--white-clr);
          background-color: var(--primary-clr);
          padding: 12px 24px; 
          box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1); 

          &:hover {
              color: var(--accent-clr);
            }
            
            &:active {
              color: var(--white-clr);
              background-color: var(--accent-clr);
            }
        `;
      case LinkVariants.CLEAR:
        return `
          color: var(--primary-clr);
          border: none;
          padding: 0;
          
            &:hover {
              color: var(--accent-clr);
            }
        `;
    }
  }}
`;
