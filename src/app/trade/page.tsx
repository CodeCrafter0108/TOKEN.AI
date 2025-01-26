'use client';
import { PageTitle } from '@/components/PageTitle';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import { Container, PageContainer } from '@/styles/global';

export default function Trade() {
  return (
    <Container>
      <PageContainer>
        <AnimatedWrapper>
          <PageTitle title='Trade' subTitle='Easily trade your tokens' />
        </AnimatedWrapper>
      </PageContainer>
    </Container>
  );
}
