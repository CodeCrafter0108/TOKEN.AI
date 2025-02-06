'use client';
import { PageTitle } from '@/components/features/PageTitle';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { Container, PageContainer } from '@/styles/global';
import { InfoBlock } from './components/InfoBlock';
import { LaunchForm } from './components/LaunchForm';
import { Description, SubTitle } from './styles';

export default function Launcher() {
  return (
    <Container>
      <AnimatedWrapper.Spring>
        <PageContainer>
          <PageTitle title='Launcher' subTitle='Get ready for your new token submission' />
          <InfoBlock />
          <SubTitle>New token submission</SubTitle>
          <LaunchForm />
          <Description> - mandatory fields</Description>
        </PageContainer>
      </AnimatedWrapper.Spring>
    </Container>
  );
}
