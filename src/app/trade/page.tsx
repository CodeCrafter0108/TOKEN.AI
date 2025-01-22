'use client';

import { PageTitle } from '@/components/PageTitle';
import PageTransition from '@/components/PageTransition';
import { Container, PageContainer } from '@/styles/global';

export default function Trade() {
  return (
    <Container>
      <PageContainer>
        <PageTransition>
          <PageTitle title='Trade' subTitle='Easily trade your tokens' />
        </PageTransition>
      </PageContainer>
    </Container>
  );
}
