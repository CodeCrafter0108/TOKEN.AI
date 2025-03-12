'use client';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { sonic } from '@reown/appkit/networks';
import { fallback, http, injected } from '@wagmi/core';
import { cookieStorage, createStorage } from 'wagmi';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_API_KEY;

if (!projectId) throw new Error('Project ID is not defined');

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks: [sonic],
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
  pollingInterval: 6_000,
  connectors: [walletConnect({ projectId, showQrModal: false }), injected({ shimDisconnect: true }), coinbaseWallet()]
});

export const config = wagmiAdapter.wagmiConfig;
