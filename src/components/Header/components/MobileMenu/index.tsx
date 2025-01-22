import { useBodyLock } from '@/hooks/useBodyLock';
import { ButtonWrapper, Menu } from './styles';
import { Navigation } from '../Navigation';
import { useAccount } from 'wagmi';
import ConnectButton from '@/components/ConnectButton';
import { AnimatePresence } from 'framer-motion';
import { MobileWallet } from '../MobileWallet';

export const MobileMenu = ({ isOpen }: { isOpen: boolean }) => {
  useBodyLock(isOpen);
  const { isConnected } = useAccount();
  return (
    <AnimatePresence>
      {isOpen && (
        <Menu
          initial={{ x: '100%' }}
          animate={{ x: '0' }}
          exit={{ x: '100%' }}
          transition={{
            type: 'linear',
            duration: 0.5
          }}
        >
          <Navigation />
          <ButtonWrapper>{isConnected ? <MobileWallet /> : <ConnectButton styles={{ width: '100%' }} />}</ButtonWrapper>
        </Menu>
      )}
    </AnimatePresence>
  );
};
