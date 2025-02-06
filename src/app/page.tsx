'use client';
import { HomeContent } from '@/components/features/HomeContent';
import { Hero } from '@/components/features/HomeContent/components/Hero';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { Container, PageContainer } from '@/styles/global';

export default function Home() {
  return (
    <>
      <Hero />
      <Container>
        <AnimatedWrapper.Spring>
          <PageContainer>
            <HomeContent />
          </PageContainer>
        </AnimatedWrapper.Spring>
      </Container>
    </>
  );
}
