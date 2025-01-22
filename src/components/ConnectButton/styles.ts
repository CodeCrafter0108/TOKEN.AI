import styled from 'styled-components';
import Button from '../Button';

export const StyledConnectButton = styled(Button)`
  position: relative;

  span {
    :last-child {
      color: transparent;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    span {
      :first-child {
        color: transparent;
      }

      :last-child {
        color: var(--primary-clr);
      }
    }
  }
`;
