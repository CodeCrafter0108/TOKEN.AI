import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import { Container, FirstBlur, PageContainer, SecondBlur } from '@/styles/global';

export const PageWrapper = ({ children, hasPaddingTop }: { children: React.ReactNode, hasPaddingTop?: boolean }) => {
  return (
    <Container style={{ position: 'relative' }} $hasPaddingTop={hasPaddingTop}>
      <FirstBlur />
      <SecondBlur />
      <AnimatedWrapper.Spring>
        <PageContainer>{children}</PageContainer>
      </AnimatedWrapper.Spring>
    </Container>
  );
};
