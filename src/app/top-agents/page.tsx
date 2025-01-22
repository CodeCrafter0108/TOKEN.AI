'use client';

import { PageContainer, Container } from '@/styles/global';
import { PageTitle } from '@/components/PageTitle';
import PageTransition from '@/components/PageTransition';

export default function TopAgents() {
  return (
    <Container>
      <PageTransition>
        <PageContainer>
          <PageTitle
            title='Top agents'
            subTitle='Explore an endless variety of tokens to suit every taste'
            badgeDescription='powered by'
          />
        </PageContainer>
      </PageTransition>
    </Container>
  );
}
