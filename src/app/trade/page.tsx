'use client';
import { PageTitle } from '@/components/features/PageTitle';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { Container, Flex, PageContainer } from '@/styles/global';
import { TradeForm } from '../../components/features/TradeForm';

export default function Trade() {
  return (
    <Container>
      <AnimatedWrapper.Spring>
        <PageContainer>
          <PageTitle title='Trade' subTitle='Easily trade your tokens' />
          <Flex $align='center' $direction='column' $justify='center' style={{ flex: 1 }}>
            <TradeForm />
          </Flex>
        </PageContainer>
      </AnimatedWrapper.Spring>
    </Container>
  );
}
