import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { Container, FirstBlur, PageContainer, SecondBlur } from '@/styles/global';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container style={{ position: 'relative' }}>
      <FirstBlur />
      <SecondBlur />
      <AnimatedWrapper.Spring>
        <PageContainer>{children}</PageContainer>
      </AnimatedWrapper.Spring>
    </Container>
  );
};
