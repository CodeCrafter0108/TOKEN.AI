'use client';

import { ReactNode } from 'react';
import { projectId, wagmiAdapter } from './config';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createAppKit } from '@reown/appkit/react';
import { sonic } from '@reown/appkit/networks';
import { Config, cookieToInitialState, WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const metadata = {
  name: 'Token.Ai',
  description: 'Token.Ai',
  url: 'https://web3modal.com', //TODO change
  icons: ['https://avatars.githubusercontent.com/u/37784886'] //TODO change
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [sonic],
  defaultNetwork: sonic,
  metadata: metadata,
  features: {
    analytics: true,
    email: false,
    socials: [],
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-font-family': 'Montserrat, sans-serif'
  }
});

export default function Web3ModalProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
