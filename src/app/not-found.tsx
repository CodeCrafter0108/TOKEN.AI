'use client';
import { PageWrapper } from '@/components/features/PageWrapper';
import CommonLink from '@/components/shared/CommonLink';
import { LinkVariants } from '@/components/shared/CommonLink/types';
import { EmptyState } from '@/components/shared/EmptyState';
import { AppRoutes } from '@/constants/routes';
import Image from 'next/image';

export default function NotFound() {
  return (
    <PageWrapper>
      <EmptyState
        title='Oops! Page Not Found'
        description='Looks like this page took a wrong turn near Area 51'
        icon={
          <Image src={'/images/info/notFound.png'} alt='404' width={275} height={311} style={{ maxWidth: '100%' }} />
        }
      >
        <CommonLink href={AppRoutes.HOME} variants={LinkVariants.SOLID} style={{ width: '100%', maxWidth: '275px' }}>
          Return back Home
        </CommonLink>
      </EmptyState>
    </PageWrapper>
  );
}
