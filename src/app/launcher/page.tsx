'use client';
import { PageContainer, Container } from '@/styles/global';
import { LaunchForm } from './components/LaunchForm';
import { PageTitle } from '@/components/PageTitle';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import { Description, SubTitle } from './styles';
import { InfoBlock } from './components/InfoBlock';

export default function Launcher() {
  return (
    <Container>
      <AnimatedWrapper>
        <PageContainer>
          <PageTitle title='Launcher' subTitle='Get ready for your new token submission' />
          <InfoBlock />
          <SubTitle>New token submission</SubTitle>
          <LaunchForm />
          <Description> - mandatory fields</Description>
        </PageContainer>
      </AnimatedWrapper>
    </Container>
  );
}
