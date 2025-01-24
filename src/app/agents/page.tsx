'use client';
import { AgentCard } from '@/components/AgentCard';
import { ButtonVariants } from '@/components/Button/types';
import { PageTitle } from '@/components/PageTitle';
import PageTransition from '@/components/PageTransition';
import Search from '@/components/Search';
import { Container, PageContainer } from '@/styles/global';
import ClipLoader from 'react-spinners/ClipLoader';
import ButtonFilters from './components/ButtonFilters';
import { cardStyles, CardsWrapper, FiltersWrapper, LoadMore } from './styles';
import DropDownFilter from './components/DropDownFilter';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';

export default function TopAgents() {
  const { width } = useWindowSize();
  return (
    <Container>
      <PageTransition>
        <PageContainer>
          <PageTitle
            title='Agents'
            subTitle='Explore an endless variety of tokens to suit every taste'
            badgeDescription='powered by'
          />
          <FiltersWrapper>
            <Search />
            {width >= NumberBreakpoints.md ? <ButtonFilters /> : <DropDownFilter />}
          </FiltersWrapper>
          <CardsWrapper>
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <AgentCard key={index} styles={cardStyles} />
              ))}
          </CardsWrapper>
          <LoadMore variants={ButtonVariants.CLEAR}>
            <span>Load more agents</span>
            <ClipLoader color={'var(--accent-clr)'} size={14} speedMultiplier={0.7} />
          </LoadMore>
        </PageContainer>
      </PageTransition>
    </Container>
  );
}
