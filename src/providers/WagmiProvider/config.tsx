import { Config, createConfig, fallback, http, injected } from '@wagmi/core';
import { cookieStorage, createStorage } from 'wagmi';
import { sonic } from 'wagmi/chains';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_API_KEY;

if (!projectId) throw new Error('Project ID is not defined');

export const metadata = {
  name: 'Token.Ai',
  description: 'Token.Ai',
  url: 'https://web3modal.com', //TODO change
  icons: ['https://avatars.githubusercontent.com/u/37784886'] //TODO change
};

export const config: Config = createConfig({
  chains: [sonic],
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0]
    })
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [sonic.id]: fallback([
      http('https://rpc.soniclabs.com'),
      http('https://rpc.ankr.com/sonic_mainnet'),
      http('https://sonic.drpc.org'),
      http('https://sonic-rpc.publicnode.com')
    ])
  },
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16
    }
  },
  pollingInterval: 6_000
});
