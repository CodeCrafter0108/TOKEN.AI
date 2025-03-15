'use client';
import { PageTitle } from '@/components/features/PageTitle';
import { InfoBlock } from './components/InfoBlock';
import { LaunchForm } from './components/LaunchForm';
import { Description, SubTitle } from './styles';
import { PageWrapper } from '@/components/features/PageWrapper';

export default function Launcher() {
  return (
    <PageWrapper>
      <PageTitle title='Launcher' subTitle='Get ready for your new token submission' />
      <InfoBlock />
      <SubTitle>New token submission</SubTitle>
      <LaunchForm />
      <Description> - mandatory fields</Description>
    </PageWrapper>
  );
}
