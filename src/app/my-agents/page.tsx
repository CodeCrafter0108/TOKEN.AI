'use client';

import { NoData } from '@/components/NoData';
import { PageTitle } from '@/components/PageTitle';
import { AppRoutes } from '@/constants/routes';
import { Container, PageContainer } from '@/styles/global';
import Stars from '@/assets/icons/stars.svg';
import { StyledNoDataIcon, StyledConnectWalletIcon, LinkContent, LinkText } from './styles';
import { LinkVariants } from '@/components/CommonLink/types';
import CommonLink from '@/components/CommonLink';
import ConnectButton from '@/components/ConnectButton';
import { useAccount } from 'wagmi';
import PageTransition from '@/components/PageTransition';

export default function MyAgents() {
  const { isConnected } = useAccount();
  return (
    <Container>
      <PageTransition>
        <PageContainer>
          <PageTitle
            title='My Agents'
            subTitle='Your personalized list of generated tokens'
            badgeDescription='powered by'
          />
          {isConnected ? (
            <NoData
              title='No agents have been created yet'
              description='You can create one in a few simple steps'
              icon={<StyledNoDataIcon />}
              styles={{ padding: '0', justifyContent: 'flex-start' }}
            >
              <CommonLink
                href={AppRoutes.LAUNCHER}
                variants={LinkVariants.SOLID}
                style={{ width: '100%', maxWidth: '270px' }}
              >
                <LinkContent>
                  <Stars />
                  <LinkText>Launch your agent now</LinkText>
                </LinkContent>
              </CommonLink>
            </NoData>
          ) : (
            <NoData
              title='No agents are available to display'
              description='To view your agents, please connect your wallet'
              icon={<StyledConnectWalletIcon />}
              styles={{ padding: '0', justifyContent: 'flex-start' }}
            >
              <ConnectButton styles={{ width: '100%', maxWidth: '270px' }} />
            </NoData>
          )}
        </PageContainer>
      </PageTransition>
    </Container>
  );
}
