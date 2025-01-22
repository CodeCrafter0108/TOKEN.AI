'use client';
import { Container, PageContainer } from '@/styles/global';
import NotFoundIcon from '@/assets/icons/not-found.svg';
import { NoData } from '@/components/NoData';
import { AppRoutes } from '@/constants/routes';
import { LinkVariants } from '@/components/CommonLink/types';
import CommonLink from '@/components/CommonLink';

export default function NotFound() {
  return (
    <Container>
      <PageContainer>
        <NoData
          title='Oops! Page Not Found'
          description='Looks like this page took a wrong turn near Area 51'
          icon={<NotFoundIcon />}
        >
          <CommonLink href={AppRoutes.HOME} variants={LinkVariants.SOLID} style={{ width: '100%', maxWidth: '270px' }}>
            Return back Home
          </CommonLink>
        </NoData>
      </PageContainer>
    </Container>
  );
}
