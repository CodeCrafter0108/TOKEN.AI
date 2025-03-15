'use client';
import { useAppKitState } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';
import { formatAddress } from '@/utils/formatters';
import { useCallback } from 'react';
import { useAppKit } from '@reown/appkit/react';
import { StyledConnectButton } from './styles';
import PulseLoader from 'react-spinners/PulseLoader';
import { ButtonVariants } from '@/components/shared/Button/types';

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
    <StyledConnectButton variants={ButtonVariants.SOLID} onClick={() => handleClick()} style={styles}>
      {isConnected ? (
        <>
          <span className='text-primary'>{formatAddress(address)}</span>
          <span className='text-secondary'>Disconnect</span>
        </>
      ) : (
        <span>
          {isOpen ? (
            <span>
              <span>Connecting</span>
              <PulseLoader
                color={'var(--black-text-cl)'}
                size={4}
                cssOverride={{ marginLeft: '4px' }}
                speedMultiplier={0.7}
              />
            </span>
          ) : (
            'Connect Wallet'
          )}
        </span>
      )}
    </StyledConnectButton>
  );
}
