import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { GetAgents } from '@/graphql/queries/GetAgents';
import { H2, H3 } from '@/styles/global';
import { ITokenData } from '@/types/common';
import { RefetchInterval } from '@/types/enum';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { AgentsList } from '../AgentsList';
import { LinkToTopAgent } from './components/LinkToTopAgent';
import { TopAgents } from './components/TopAgents';
import { Content, ListWrapper, Wrapper } from './styles';

export const HomeContent = () => {
  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const {
    data: latestAgents,
    loading: latestAgentsLoading,
    error: latestAgentsError
  } = useQuery<ITokenData>(GetAgents, {
    client,
    variables: { orderBy: 'blockTimestamp', orderDirection: 'desc', first: 5 },
    pollInterval: RefetchInterval.FAST
  });
  
  if (latestAgentsError) {
    console.error('Error fetching latest agents:', latestAgentsError);
  }

  const {
    data: marketCapAgents,
    loading: marketCapAgentsLoading,
    error: marketCapAgentsError
  } = useQuery<ITokenData>(GetAgents, {
    client,
    variables: { orderBy: 'marketCap', orderDirection: 'desc', first: 5 },
    pollInterval: RefetchInterval.FAST
  });
  
  if (marketCapAgentsError) {
    console.error('Error fetching market cap agents:', marketCapAgentsError);
  }

  const {
    data: topAgents,
    loading: topAgentsLoading,
    error: topAgentsError
  } = useQuery<ITokenData>(GetAgents, {
    client,
    variables: { orderBy: 'marketCap', orderDirection: 'desc', first: 30 }, //TODO change query
    pollInterval: RefetchInterval.FAST
  });

  if (topAgentsError) {
    console.error('Error fetching top agents:', topAgentsError);
  }

  return (
    <>
      <Content>
        <H2>Available tokens</H2>
        <TopAgents agents={topAgents?.tokens} isLoading={topAgentsLoading} />
        <Wrapper>
          <ListWrapper>
            <H3>Latest</H3>
            <AgentsList agents={latestAgents?.tokens} isLoading={latestAgentsLoading} />
            <LinkToTopAgent title='View all Latest' params='filter=latest' />
          </ListWrapper>
          <ListWrapper>
            <H3>Top Market cap</H3>
            <AgentsList agents={marketCapAgents?.tokens} isLoading={marketCapAgentsLoading}/>
            <LinkToTopAgent title='View all Top cap' params='filter=marketcap' />
          </ListWrapper>
        </Wrapper>
      </Content>
    </>
  );
};
