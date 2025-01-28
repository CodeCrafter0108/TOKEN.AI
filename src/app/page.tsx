'use client';
import { HomeContent } from '@/components/HomeContent';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import { Container, PageContainer } from '@/styles/global';
import { Hero } from '@/components/HomeContent/components/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <AnimatedWrapper>
          <PageContainer>
            <HomeContent />
          </PageContainer>
        </AnimatedWrapper>
      </Container>
    </>
  );
}
