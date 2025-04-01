'use client';
import { AgentCard } from '@/components/features/AgentCard';
import { NoResults } from '@/components/features/NoResults';
import { PageTitle } from '@/components/features/PageTitle';
import Search from '@/components/features/Search';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { GetAgents } from '@/graphql/queries/GetAgents';
import { useDebounce } from '@/hooks/useDebounce';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { IToken, ITokensData } from '@/types/common';
// import { RefetchInterval } from '@/types/enum';
import { useLazyQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ButtonFilters from './components/ButtonFilters';
import { FilterOption } from './components/ButtonFilters/types';
import DropDownFilter from './components/DropDownFilter';
import { cardStyles, CardsWrapper, FiltersWrapper } from './styles';
import { PageWrapper } from '@/components/features/PageWrapper';

export default function TopAgents() {
  const { width } = useWindowSize();
  // const router = useRouter();
  const searchParams = useSearchParams();
  // const [isFetchMoreResult, setIsFetchMoreResult] = useState<boolean>(false);

  // const setSearchParam = (key: string, value: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set(key, value);
  //   router.push(`?${params.toString()}`);
  // };

  const handleClear = () => {
    setSearchValue('');
    // setSearchParam('filter', 'all');
  };
  const countLoadAgents: number = 10;

  const filterFromUrl = useMemo(() => searchParams.get('filter') as FilterOption, [searchParams]);

  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const [fetchAgents, { data: agents, loading: agentsLoading }] =
    useLazyQuery<ITokensData>(GetAgents, {
      client,
      onError: (error) => console.error(error),
      // pollInterval: RefetchInterval.FAST
    });

  useEffect(() => {
    if (filterFromUrl) {
      if (filterFromUrl === 'all') {
        fetchAgents();
      }
      if (filterFromUrl === 'marketcap') {
        fetchAgents({ variables: { orderBy: 'marketCap', orderDirection: 'desc', first: countLoadAgents } });
      }
      if (filterFromUrl === 'latest') {
        fetchAgents({ variables: { orderBy: 'blockTimestamp', orderDirection: 'desc', first: countLoadAgents } });
      }
      if (filterFromUrl === 'top') {
        fetchAgents({ variables: { orderBy: 'marketCap', orderDirection: 'desc', first: countLoadAgents } });
      }
    }
  }, [filterFromUrl, fetchAgents]);

  const filteredAgents: IToken[] = useMemo(() => {
    if (!agents?.tokens) return [];

    return agents?.tokens?.filter(
      (agent) =>
        agent?.name?.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        agent?.symbol?.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        agent?.address?.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );
  }, [agents?.tokens, debouncedSearchValue]);

  // const handleLoadMore = () => {
  //   if (fetchMore && agents?.tokens) {
  //     setIsFetchMoreResult(true);
  //     fetchMore({
  //       variables: { first: countLoadAgents, skip: agents.tokens.length },
  //       updateQuery: (previousData, { fetchMoreResult, variables: { skip } }) => {
  //         const updatedTokens: IToken[] = previousData.tokens.slice(0);
  //         for (let i = 0; i < fetchMoreResult.tokens.length; ++i) {
  //           updatedTokens[skip + i] = fetchMoreResult.tokens[i];
  //         }
  //         setIsFetchMoreResult(false);
  //         return { ...previousData, tokens: updatedTokens };
  //       }

  //     });
  //   }
  // };

  return (
    <PageWrapper hasPaddingTop>
      <PageTitle title='Agents' subTitle='Explore an endless variety of tokens to suit every taste' />
      <FiltersWrapper>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        {width >= NumberBreakpoints.md ? <ButtonFilters /> : <DropDownFilter />}
      </FiltersWrapper>
      <AnimatedWrapper.Opacity duration={0.2} condition={!!filteredAgents.length}>
        <CardsWrapper>
          {filteredAgents.map((agent: IToken) => (
            <AgentCard key={agent.id} agent={agent} styles={cardStyles} />
          ))}
        </CardsWrapper>
      </AnimatedWrapper.Opacity>
      <AnimatedWrapper.Opacity duration={0.2} condition={!filteredAgents.length && !agentsLoading}>
        <NoResults handleClear={handleClear} />
      </AnimatedWrapper.Opacity>
      {/* <LoadMore variants={ButtonVariants.CLEAR}>
            <span>Load more agents</span>
            <ClipLoader color={'var(--accent-clr)'} size={14} speedMultiplier={0.7} />
          </LoadMore> */}
      {/* {(agents?.tokenCounters?.[0]?.totalCount ?? 0) > (agents?.tokens?.length ?? 0) && <button onClick={() => handleLoadMore()}>{`Load more${isFetchMoreResult ? '...' : ''}`}</button>} */}
    </PageWrapper>
  );
}
