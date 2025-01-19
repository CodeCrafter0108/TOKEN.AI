import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
      return;
    }
    open();
  };

  return (
    <>
      <button onClick={() => handleClick()}>{isConnected ? `${address}` : 'Connect Wallet'}</button>
    </>
  );
}
