'use client';
import { AgentsList } from '@/components/features/AgentsList';
import { PageTitle } from '@/components/features/PageTitle';
import Search from '@/components/features/Search';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { GetMyAgents } from '@/graphql/queries/GetMyAgents';
import { useDebounce } from '@/hooks/useDebounce';
import { Container, Flex, PageContainer } from '@/styles/global';
import { IToken, ITokensData } from '@/types/common';
import { RefetchInterval } from '@/types/enum';
import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { Messages } from './components/Messages';

export default function MyAgents() {
  const { isConnected, address } = useAccount();
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const {
    data: myAgents,
    loading: myAgentsLoading,
    error: myAgentsError
  } = useQuery<ITokensData>(GetMyAgents, {
    client,
    variables: { orderBy: 'blockTimestamp', orderDirection: 'desc', tokenOwner: address },
    pollInterval: RefetchInterval.FAST,
    skip: !address
  });

  if (myAgentsError) {
    console.error('Error fetching my agents:', myAgentsError);
  }

  const filteredAgents: IToken[] = useMemo(() => {
    if (!myAgents?.tokens) return [];
    return myAgents?.tokens?.filter(
      (agent) =>
        agent?.name.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        agent?.symbol.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        agent?.address.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );
  }, [myAgents?.tokens, debouncedSearchValue]);

  return (
    <Container>
      <AnimatedWrapper.Spring>
        <PageContainer>
          <PageTitle
            title='My Agents'
            subTitle='Your personalized list of generated tokens'
            badgeDescription='powered by'
          />
          <AnimatedWrapper.Opacity condition={isConnected} duration={0.2}>
            <Flex $direction='column' $gap={24}>
              <Search styles={{ maxWidth: '768px' }} searchValue={searchValue} setSearchValue={setSearchValue} />
              <AnimatedWrapper.Opacity condition={!myAgentsLoading && filteredAgents.length > 0} duration={0.2}>
                <AgentsList agents={filteredAgents} isLoading={myAgentsLoading} />
              </AnimatedWrapper.Opacity>
            </Flex>
          </AnimatedWrapper.Opacity>
          <Messages
            agents={filteredAgents}
            isLoading={myAgentsLoading}
            searchValue={debouncedSearchValue}
            setSearchValue={setSearchValue}
          />
        </PageContainer>
      </AnimatedWrapper.Spring>
    </Container>
  );
}
