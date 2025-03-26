'use client';
import { AgentsList } from '@/components/features/AgentsList';
import { PageTitle } from '@/components/features/PageTitle';
import { PageWrapper } from '@/components/features/PageWrapper';
import Search from '@/components/features/Search';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { GetMyAgents } from '@/graphql/queries/GetMyAgents';
import { useDebounce } from '@/hooks/useDebounce';
import { Flex } from '@/styles/global';
import { IToken, ITokensData } from '@/types/common';
// import { RefetchInterval } from '@/types/enum';
import { useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { Messages } from './components/Messages';
import Filter from './components/Filter';
import { FilterWrapper } from './styles';
import { useSearchParams } from 'next/navigation';
import { FilterOption } from '../agents/components/ButtonFilters/types';

export default function MyAgents() {
  const { isConnected, address } = useAccount();
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const searchParams = useSearchParams();

  const handleClear = useCallback(() => {
    setSearchValue('');
  }, []);

  const filterFromUrl = useMemo(() => searchParams.get('filter') as FilterOption, [searchParams]);

  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const [fetchMyAgents, { data: myAgents, error: myAgentsError, loading: myAgentsLoading }] = useLazyQuery<ITokensData>(
    GetMyAgents,
    {
      client
      // pollInterval: RefetchInterval.FAST
    }
  );


  if (myAgentsError) {
    console.error('Error fetching my agents:', myAgentsError);
  }

  useEffect(() => {
    if (filterFromUrl) {
      if (filterFromUrl === 'marketcap') {
        fetchMyAgents({ variables: { orderBy: 'marketCap', orderDirection: 'desc', tokenOwner: address } });
      }
      if (filterFromUrl === 'latest') {
        fetchMyAgents({ variables: { orderBy: 'blockTimestamp', orderDirection: 'desc', tokenOwner: address } });
      }
    }
  }, [filterFromUrl, fetchMyAgents, address]);

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
    <PageWrapper hasPaddingTop>
      <PageTitle title='My Agents' subTitle='Your personalized list of generated tokens' badgeDescription={true} />
      <Flex $direction='column' $gap={24}>
        <FilterWrapper>
          <Search styles={{ width: '100%' }} searchValue={searchValue} setSearchValue={setSearchValue} />
          <Filter />
        </FilterWrapper>
        <AnimatedWrapper.Opacity
          condition={isConnected && !myAgentsLoading && filteredAgents.length > 0}
          duration={0.2}
        >
          <AgentsList agents={filteredAgents} isLoading={myAgentsLoading} hasButton />
        </AnimatedWrapper.Opacity>
      </Flex>
      <Messages
        agents={filteredAgents}
        isLoading={myAgentsLoading}
        searchValue={debouncedSearchValue}
        handleClear={handleClear}
      />
    </PageWrapper>
  );
}
