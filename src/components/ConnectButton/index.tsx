import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { formatAddress } from '@/utils/formatters';
import { useCallback } from 'react';
import { StyledConnectButton } from './styles';

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const handleClick = useCallback(() => {
    if (isConnected) {
      disconnect();
      return;
    }
    open();
  }, [isConnected, disconnect, open]);

  return (
    <StyledConnectButton onClick={() => handleClick()}>
      {isConnected ? (
        <span>
          <span>{formatAddress(address)}</span>
          <span>Disconnect</span>
        </span>
      ) : (
        <span>Connect Wallet</span>
      )}
    </StyledConnectButton>
  );
}
