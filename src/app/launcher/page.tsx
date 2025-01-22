'use client';

import { PageContainer, Container } from '@/styles/global';
// import { LaunchForm } from './components/LaunchForm';
import { PageTitle } from '@/components/PageTitle';
import PageTransition from '@/components/PageTransition';

export default function Launcher() {
  return (
    <Container>
      <PageTransition>
        <PageContainer>
          <PageTitle title='Launcher' subTitle='Get ready for your new token submission' />
          {/* <LaunchForm /> */}
        </PageContainer>
      </PageTransition>
    </Container>
  );
}
