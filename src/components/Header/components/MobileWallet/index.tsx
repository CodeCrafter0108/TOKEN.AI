import { useAccount, useDisconnect } from 'wagmi';
import { Wrapper, WalletInfo, ButtonContent } from './styles';
import { formatAddress } from '@/utils/formatters';
import DisonectIcon from '@/assets/icons/disconnect.svg';
import Button from '@/components/Button';
import { ButtonVariants } from '@/components/Button/types';

export const MobileWallet = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <Wrapper>
      <WalletInfo>
        <span style={{color: 'var(--border-clr)', fontWeight: 600}}>Wallet</span>
        <span>{formatAddress(address)}</span>
      </WalletInfo>
      <Button variants={ButtonVariants.CLEAR} style={{ width: '100%' }} onClick={() => disconnect()}>
        <ButtonContent>
          <span>
            Disconnect
          </span>
          <DisonectIcon />
        </ButtonContent>
      </Button>
    </Wrapper>
  );
};
