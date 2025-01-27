'use client';
import { HomeContent } from '@/components/HomeContent';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import { Container, PageContainer } from '@/styles/global';

export default function Home() {
  return (
    <Container>
      <AnimatedWrapper>
        <PageContainer>
          <HomeContent />
        </PageContainer>
      </AnimatedWrapper>
    </Container>
  );
}
