'use client';
import { PageTitle } from '@/components/features/PageTitle';
import { PageWrapper } from '@/components/features/PageWrapper';
import { Flex } from '@/styles/global';
import { TradeForm } from '../../components/features/TradeForm';

export default function Trade() {
  return (
    <PageWrapper hasPaddingTop>
      <PageTitle title='Trade' subTitle='Easily trade your tokens' />
      <Flex $align='center' $direction='column' $justify='center' style={{ flex: 1 }}>
        <TradeForm />
      </Flex>
    </PageWrapper>
  );
}
