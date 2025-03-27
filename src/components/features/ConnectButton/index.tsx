'use client';
import { ButtonLoader } from '@/components/shared/ButtonLoader';
import { formatAddress } from '@/utils/formatters';
import { useAppKit, useAppKitState } from '@reown/appkit/react';
import { useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { StyledConnectButton } from './styles';

interface ConnectButtonProps {
  styles?: React.CSSProperties;
}

export default function ConnectButton({ styles }: ConnectButtonProps) {
  const { open } = useAppKit();
  const { open: isOpen } = useAppKitState();
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
    <StyledConnectButton onClick={() => handleClick()} style={styles}>
      {isConnected ? (
        <>
          <span className='text-primary'>{formatAddress(address)}</span>
          <span className='text-secondary'>Disconnect</span>
        </>
      ) : (
        <span style={{ whiteSpace: 'nowrap' }}>{isOpen ? <ButtonLoader text='Connecting' /> : 'Connect Wallet'}</span>
      )}
    </StyledConnectButton>
  );
}
