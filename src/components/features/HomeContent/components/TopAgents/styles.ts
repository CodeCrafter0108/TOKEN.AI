import Button from '@/components/shared/Button';
import styled, { css } from 'styled-components';

export const NextSlide = styled(Button)`
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  svg {
    transition: all 0.2s ease-in-out;
  }

  :disabled {
    opacity: 0.5;
  }

  :hover {
    color: var(--accent-clr);
  }
`;

export const PrevSlide = styled(Button)`
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);

  svg {
    transition: all 0.2s ease-in-out;
  }


  :disabled {
    opacity: 0.5;
  }

  :hover {
    color: var(--accent-clr);
  }
`;

export const agentCardStyles = css`
  background-color: var(--secondary-box-bg-clr);
`;