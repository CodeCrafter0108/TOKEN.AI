import Link from 'next/link';
import styled from 'styled-components';
import { LinkVariants } from './types';

export const StyledLink = styled(Link)<{ $variants: LinkVariants }>`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  font-weight: 600;

  padding: 12px 24px;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  border: 1.5px solid transparent;
  transition: all 0.2s ease-in-out;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  ${({ $variants }) => {
    switch ($variants) {
      case LinkVariants.SOLID:
        return `
        color: var(--primary-text-clr);
        background-color: var(--primary-clr);
        border: 1.5px solid var(--black-clr);
        &::before {
            content: '';
            position: absolute;
            inset: -4px;
            background: linear-gradient( to right, #94e927 0%, #ea88ef80 100%);
            border-radius: 10px;
            z-index: -1;
            opacity: 0.3;
            transition: opacity 0.3s ease;
            mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            mask-composite: exclude;
            padding: 2px;
            box-sizing: border-box;
  }

  &:hover::before {
    opacity: 1;
  }
        `;
      case LinkVariants.CLEAR:
        return `
          color: var(var(--primary-text-clr));
          border: none;
          padding: 0;
          
            &:hover {
              color: var(--accent-clr);
            }
        `;

      case LinkVariants.SOLID_BUTTON:
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
    }
  }}
`;
