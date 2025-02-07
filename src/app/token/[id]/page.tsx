'use client';
import Arrow from '@/assets/icons/right-arrow.svg';
import { AgentCard } from '@/components/features/AgentCard';
import { TradeForm } from '@/components/features/TradeForm';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { ButtonVariants } from '@/components/shared/Button/types';
import { Container, PageContainer } from '@/styles/global';
import { useRouter, useParams } from 'next/navigation';
// import { Chart } from './components/Chart';
import { TokenInfo } from './components/TokenInfo';
import TransactionTable from './components/TransactionTable';
import { BackButton, Content, LeftContent, RightContent, cardsStyles } from './styles';
import CoinGeckoChart from './components/CoinGeckoChart';
import { useMemo } from 'react';
import { getGraphClient } from '@/config/graph/config';
import { ChainId, CHAINS_NAME } from '@/constants/blockchain/networks';
import { useQuery } from '@apollo/client';
import { ITokenData } from '@/types/common';
import { GetOneAgent } from '@/graphql/queries/GetOneAgent';
import { RefetchInterval } from '@/types/enum';

export default function Token() {
  const router = useRouter();
  const { id } = useParams();
  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);
  const chainName: string = CHAINS_NAME[ChainId.SONIC].toLowerCase();

  const {
    data: agent,
    // loading: agentLoading,
    error: agentError
  } = useQuery<ITokenData>(GetOneAgent, {
    client,
    variables: { id: id },
    pollInterval: RefetchInterval.FAST,
    skip: !id
  });

  if (agentError) {
    console.error('Error fetching my agents:', agentError);
  }

  return (
    <Container>
      <AnimatedWrapper.Spring>
        <PageContainer>
          <BackButton onClick={() => router.back()} variants={ButtonVariants.CLEAR}>
            <Arrow />
            <span>Back to the list</span>
          </BackButton>
          <Content>
            <LeftContent>
              {/*@ts-expect-error not ckecked*/}
              <AgentCard hasMetrics agent={agent?.token} styles={cardsStyles} />
              {/* <Chart /> */}
              <CoinGeckoChart chainName={chainName} poolAddress={agent?.token?.pair?.id ?? ''} />
              <TransactionTable data={agent?.token?.pair?.swaps} />
            </LeftContent>
            <RightContent>
              <TradeForm styles={{ maxWidth: 'inherit' }} />
              <TokenInfo />
            </RightContent>
          </Content>
        </PageContainer>
      </AnimatedWrapper.Spring>
    </Container>
  );
}
//'0x18d6bdf4ec78e179513f5acc3ee243aecdb69968'
//agent?.token?.pair?.id ?? ''
