'use client';
import Arrow from '@/assets/icons/right-arrow.svg';
import { AgentCard } from '@/components/features/AgentCard';
import { TradeForm } from '@/components/features/TradeForm';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { ButtonVariants } from '@/components/shared/Button/types';
import { Container, PageContainer } from '@/styles/global';
import { useRouter } from 'next/navigation';
import { Chart } from './components/Chart';
import { TokenInfo } from './components/TokenInfo';
import TransactionTable from './components/TransactionTable';
import { BackButton, Content, LeftContent, RightContent } from './styles';

export default function Token() {
  const router = useRouter();
  return (
    <Container>
      <AnimatedWrapper.Spring>
        <PageContainer>
          <BackButton onClick={() => router.back()} variants={ButtonVariants.CLEAR}>
            <Arrow />
            <span>Back to the list</span>
          </BackButton>
          <Content>
            <LeftContent>
              {/*@ts-expect-error not ckecked*/}
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
      </AnimatedWrapper.Spring>
    </Container>
  );
}
