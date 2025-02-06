import ConnectWalletIcon from '@/assets/icons/connect-wallet.svg';
import EmptyStateIcon from '@/assets/icons/no-data.svg';
import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const StyledEmptyStateIcon = styled(EmptyStateIcon)`
  max-width: 304px;
  max-height: 200px;
  width: 100%;

  @media screen and (min-width: ${Breakpoints.md}) {
    width: 372px;
    height: 243px;

    max-width: 372px;
    max-height: 243px;
  }
`;

export const StyledConnectWalletIcon = styled(ConnectWalletIcon)`
  max-width: 304px;
  max-height: 200px;
  width: 100%;

  @media screen and (min-width: ${Breakpoints.md}) {
    width: 372px;
    height: 243px;

    max-width: 372px;
    max-height: 243px;
  }
`;

export const LinkContent = styled.span`
display: flex;
align-items: center;
gap: 8px;
`;

export const LinkText = styled.span``;
