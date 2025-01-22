'use client';
import { Container } from '@/styles/global';
import NotFoundIcon from '@/assets/icons/not-found.svg';
import { Wrapper, Content, Title, Description } from './styles';
import CommonLink from '@/components/CommonLink';
import { LinkVariants } from '@/components/CommonLink/types';

export default function NotFound() {
  return (
    <Container>
      <Wrapper>
        <Content>
          <NotFoundIcon />
          <div>
            <Title>Oops! Page Not Found</Title>
            <Description>Looks like this page took a wrong turn near Area 51</Description>
          </div>
        </Content>
        <CommonLink href='/' variants={LinkVariants.SOLID} style={{ width: '100%', maxWidth: '270px' }}>
          Return back Home
        </CommonLink>
      </Wrapper>
    </Container>
  );
}
