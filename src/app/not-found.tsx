'use client';
import NotFoundIcon from '@/assets/icons/not-found.svg';
import CommonLink from '@/components/shared/CommonLink';
import { LinkVariants } from '@/components/shared/CommonLink/types';
import { EmptyState } from '@/components/shared/EmptyState';
import { AppRoutes } from '@/constants/routes';
import { Container, PageContainer } from '@/styles/global';

export default function NotFound() {
  return (
    <Container>
      <PageContainer>
        <EmptyState
          title='Oops! Page Not Found'
          description='Looks like this page took a wrong turn near Area 51'
          icon={<NotFoundIcon />}
        >
          <CommonLink href={AppRoutes.HOME} variants={LinkVariants.SOLID} style={{ width: '100%', maxWidth: '270px' }}>
            Return back Home
          </CommonLink>
        </EmptyState>
      </PageContainer>
    </Container>
  );
}
