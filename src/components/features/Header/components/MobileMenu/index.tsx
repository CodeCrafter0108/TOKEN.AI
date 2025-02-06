import ConnectButton from '@/components/features/ConnectButton';
import { useBodyLock } from '@/hooks/useBodyLock';
import { AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { BurgerProps } from '../../types';
import { MobileWallet } from '../MobileWallet';
import { Navigation } from '../Navigation';
import { ButtonWrapper, Menu } from './styles';

export const MobileMenu = ({ isOpen, setIsOpen }: BurgerProps) => {
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
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.5
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Navigation setIsOpen={setIsOpen} />
          <ButtonWrapper>{isConnected ? <MobileWallet /> : <ConnectButton styles={{ width: '100%' }} />}</ButtonWrapper>
        </Menu>
      )}
    </AnimatePresence>
  );
};
