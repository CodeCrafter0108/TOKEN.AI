import { H2, H3 } from '@/styles/global';
import { Hero } from './components/Hero';
import { TopAgents } from './components/TopAgents';
import { AgentsList } from '../AgentsList';
import { LinkToTopAgent } from './components/LinkToTopAgent';
import { Content, ListWrapper, Wrapper } from './styles';

export const HomeContent = () => {
  return (
    <>
      <Hero />
      <Content>
        <H2>Available tokens</H2>
        <TopAgents />
        <Wrapper>
          <ListWrapper>
            <H3>Latest</H3>
            <AgentsList />
            <LinkToTopAgent title='View all Latest' params='filter=latest'/>
          </ListWrapper>
          <ListWrapper>
            <H3>Top Market cap</H3>
            <AgentsList />
            <LinkToTopAgent title='View all Top cap' params='filter=marketcap'/>
          </ListWrapper>
        </Wrapper>
      </Content>
    </>
  );
};
