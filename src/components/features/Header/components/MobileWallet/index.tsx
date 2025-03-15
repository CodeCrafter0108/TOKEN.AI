import DisonectIcon from '@/assets/icons/disconnect.svg';
import Button from '@/components/shared/Button';
import { ButtonVariants } from '@/components/shared/Button/types';
import { formatAddress } from '@/utils/formatters';
import { useAccount, useDisconnect } from 'wagmi';
import { ButtonContent, WalletInfo, Wrapper } from './styles';

export const MobileWallet = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <Wrapper>
      <WalletInfo>
        <span style={{color: 'var(--placeholder-clr)', fontWeight: 600}}>Wallet</span>
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
