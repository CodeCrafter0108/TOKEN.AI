'use client';
import { HomeContent } from '@/components/HomeContent';
import PageTransition from '@/components/PageTransition';
import { Container, PageContainer } from '@/styles/global';

export default function Home() {
  return (
    <Container>
      <PageTransition>
        <PageContainer>
          <HomeContent />
        </PageContainer>
      </PageTransition>
    </Container>
  );
}
