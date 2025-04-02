'use client';
import Arrow from '@/assets/icons/right-arrow.svg';
import { AgentCard } from '@/components/features/AgentCard';
import { TradeForm } from '@/components/features/TradeForm';
import { ButtonVariants } from '@/components/shared/Button/types';
import { useParams, useRouter } from 'next/navigation';
// import { Chart } from './components/Chart';
import { PageWrapper } from '@/components/features/PageWrapper';
import { getGraphClient } from '@/config/graph/config';
import { ChainId, CHAINS_NAME } from '@/constants/blockchain/networks';
import { GetOneAgent } from '@/graphql/queries/GetOneAgent';
import { ITokenData } from '@/types/common';
import { RefetchInterval } from '@/types/enum';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import CoinGeckoChart from './components/CoinGeckoChart';
import { TokenInfo } from './components/TokenInfo';
import TransactionTable from './components/TransactionTable';
import { BackButton, cardsStyles, Content, LeftContent, RightContent } from './styles';

export default function Token() {
  const router = useRouter();
  const { id } = useParams();
  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);
  const chainName: string = CHAINS_NAME[ChainId.SONIC].toLowerCase();

  const {
    data: agent,
    // loading: agentLoading,
  } = useQuery<ITokenData>(GetOneAgent, {
    client,
    variables: { id: id, orderBy: 'blockTimestamp', orderDirection: 'desc' },
    pollInterval: RefetchInterval.MEDIUM,
    skip: !id,
    onError(error) {
      console.error(error);
    }
  });

  return (
    <PageWrapper hasPaddingTop>
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
          <TokenInfo agent={agent?.token} />
        </RightContent>
      </Content>
    </PageWrapper>
  );
}
