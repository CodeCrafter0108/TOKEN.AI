import styled from 'styled-components';
import Button from '../../shared/Button';

export const StyledConnectButton = styled(Button)`

  .text-secondary {
    color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    .text-primary {
      color: transparent;
    }

    .text-secondary {
      color: var(--black-text-clr);
    }
  }
`;
