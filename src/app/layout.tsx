import { BackGround } from '@/components/shared/BackGround';
import { Footer } from '@/components/features/Footer';
import { Header } from '@/components/features/Header';
import { Toast } from '@/components/shared/Toast';
import StyledComponentsProvider from '@/config/providers/StyledComponentsProvider/provider';
import Web3ModalProvider from '@/config/providers/WagmiProvider/provider';
import { montserrat } from '@/styles/fonts';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import 'react-toastify/dist/ReactToastify.css';
import { LatestTransactions } from '@/components/features/LatestTransactions';
import { ConditionalScript } from '@/components/features/ConditionalScript';

export const metadata: Metadata = {
  title: 'TOKIO.AI',
  description: 'TOKIO.AI is a decentralized token launch and trading platform built on blockchain technology. It enables permissionless creation of digital assets, instant trading, and transparent smart contract execution in a fully decentralized ecosystem.'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <Script src='/scripts/jquery-3.6.4.min.js' strategy='beforeInteractive' />
        <ConditionalScript />
        <StyledComponentsProvider>
          <Web3ModalProvider cookies={cookies}>
            <Header />
            <LatestTransactions />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <BackGround>{children}</BackGround>
            </main>
            <Footer />
            <Toast />
          </Web3ModalProvider>
        </StyledComponentsProvider>
      </body>
    </html>
  );
}
