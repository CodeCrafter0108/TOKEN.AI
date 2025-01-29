'use client';
import { PageTitle } from '@/components/PageTitle';
import { Container, Flex, PageContainer } from '@/styles/global';
import { AnimatedWrapper } from '@/components/AnimatedWrapper';
import { Messages } from './components/Messages';
import { AgentsList } from '@/components/AgentsList';
import Search from '@/components/Search';

export default function MyAgents() {
  return (
    <Container>
      <AnimatedWrapper.Spring>
        <PageContainer>
          <PageTitle
            title='My Agents'
            subTitle='Your personalized list of generated tokens'
            badgeDescription='powered by'
          />
          <Flex $direction='column' $gap={24}>
            <Search styles={{ maxWidth: '768px' }} />
            <AgentsList />
          </Flex>

          <Messages />
        </PageContainer>
      </AnimatedWrapper.Spring>
    </Container>
  );
}
