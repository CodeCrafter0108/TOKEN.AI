'use client';
import { PageContainer, Container } from '@/styles/global';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import { AgentCard } from '@/components/AgentCard';
import Arrow from '@/assets/icons/right-arrow.svg';
import { ButtonVariants } from '@/components/Button/types';
import { useRouter } from 'next/navigation';
import { BackButton, Content, LeftContent, RightContent } from './styles';
import { TradeForm } from '@/components/TradeForm';
import { Chart } from './components/Chart';
import TransactionTable from './components/TransactionTable';
import { TokenInfo } from './components/TokenInfo';

export default function Token() {
  const router = useRouter();
  return (
    <Container>
      <AnimatedWrapper>
        <PageContainer>
          <BackButton onClick={() => router.back()} variants={ButtonVariants.CLEAR}>
            <Arrow />
            <span>Back to the list</span>
          </BackButton>
          <Content>
          <LeftContent>
            <AgentCard hasMetrics />
            <Chart />
            <TransactionTable />
          </LeftContent>
          <RightContent>
            <TradeForm styles={{ maxWidth: 'inherit' }} />
            <TokenInfo />
          </RightContent>
          </Content>
        </PageContainer>
      </AnimatedWrapper>
    </Container>
  );
}
