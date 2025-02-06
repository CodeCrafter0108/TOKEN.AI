import styled from 'styled-components';
import Button from '../../shared/Button';

export const StyledConnectButton = styled(Button)`
  position: relative;

  .text-primary {
    color: inherit;
    transition: color 0.3s ease-in-out;
  }

  .text-secondary {
    color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: color 0.3s ease-in-out;
  }

  &:hover {
    .text-primary {
      color: transparent;
    }

    .text-secondary {
      color: var(--primary-clr);
    }
  }
`;
