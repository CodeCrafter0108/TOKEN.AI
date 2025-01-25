'use client';
import { PageTitle } from '@/components/PageTitle';
import { Container, Flex, PageContainer } from '@/styles/global';
import PageTransition from '@/components/PageTransition';
import { Messages } from './components/Messages';
import { AgentsList } from '@/components/AgentsList';
import Search from '@/components/Search';

export default function MyAgents() {
  return (
    <Container>
      <PageTransition>
        <PageContainer>
          <PageTitle
            title='My Agents'
            subTitle='Your personalized list of generated tokens'
            badgeDescription='powered by'
          />
          <Flex $direction='column' $gap={24}>
            <Search styles={{ maxWidth: '450px' }}/>
            <AgentsList />
          </Flex>

          <Messages />
        </PageContainer>
      </PageTransition>
    </Container>
  );
}
