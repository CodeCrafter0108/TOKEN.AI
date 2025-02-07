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
import { Container, PageContainer } from '@/styles/global';
import { IToken, ITokensData } from '@/types/common';
import { RefetchInterval } from '@/types/enum';
import { useLazyQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ButtonFilters from './components/ButtonFilters';
import { FilterOption } from './components/ButtonFilters/types';
import DropDownFilter from './components/DropDownFilter';
import { cardStyles, CardsWrapper, FiltersWrapper } from './styles';

export default function TopAgents() {
  const { width } = useWindowSize();
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchParam('filter', 'all');
  };

  const filterFromUrl = useMemo(() => searchParams.get('filter') as FilterOption, [searchParams]);

  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const [fetchAgents, { data: agents, error: agentsError, loading: agentsLoading }] = useLazyQuery<ITokensData>(
    GetAgents,
    {
      client,
      pollInterval: RefetchInterval.FAST
    }
  );

  if (agentsError) {
    console.error('Error fetching top agents:', agentsError);
  }

  useEffect(() => {
    if (filterFromUrl) {
      if (filterFromUrl === 'all') {
        fetchAgents();
      }
      if (filterFromUrl === 'marketcap') {
        fetchAgents({ variables: { orderBy: 'marketCap', orderDirection: 'desc', first: 100 } });
      }
      if (filterFromUrl === 'latest') {
        fetchAgents({ variables: { orderBy: 'blockTimestamp', orderDirection: 'desc', first: 100 } });
      }
      if (filterFromUrl === 'top') {
        fetchAgents({ variables: { orderBy: 'marketCap', orderDirection: 'desc', first: 100 } });
      }
    }
  }, [filterFromUrl, fetchAgents]);

  const filteredAgents: IToken[] = useMemo(() => {
    if (!agents?.tokens) return [];

    return agents?.tokens?.filter(
      (agent) =>
        agent?.name.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        agent?.symbol.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        agent?.address.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );
  }, [agents?.tokens, debouncedSearchValue]);

  return (
    <Container>
      <AnimatedWrapper.Spring>
        <PageContainer>
          <PageTitle
            title='Agents'
            subTitle='Explore an endless variety of tokens to suit every taste'
            badgeDescription='powered by'
          />
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
        </PageContainer>
      </AnimatedWrapper.Spring>
    </Container>
  );
}
