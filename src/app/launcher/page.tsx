'use client';
import { PageTitle } from '@/components/features/PageTitle';
import { InfoCard } from './components/InfoCard';
import { LaunchForm } from './components/LaunchForm';
import { PageWrapper } from '@/components/features/PageWrapper';
import { Flex } from '@/styles/global';
import { Content } from './styles';
import { css } from 'styled-components';

export default function Launcher() {
  return (
    <PageWrapper>
      <Content>
        <InfoCard />
        <Flex $direction='column' $gap={24} $justify='center' style={{ maxWidth: '666px' }}>
          <PageTitle
            styles={css`
              justify-content: flex-start !important;
            `}
            title='Launcher'
            subTitle='Get ready for your new token submission'
          />
          <LaunchForm />
        </Flex>
      </Content>
    </PageWrapper>
  );
}
