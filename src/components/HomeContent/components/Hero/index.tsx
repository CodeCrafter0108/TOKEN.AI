import CommonLink from '@/components/CommonLink';
import { Container, StyledImage, InfoWrapper, ImageWrapper, Title, List, ListItem, Dot, ListItemTitle } from './styles';
import { AppRoutes } from '@/constants/routes';
import { LinkVariants } from '@/components/CommonLink/types';
import { LinkContent, LinkText } from '@/app/my-agents/components/Messages/styles';
import Stars from '@/assets/icons/stars.svg';

export const Hero = () => {
  return (
    <Container>
      <ImageWrapper>
        <StyledImage src={'/images/hero-img.png'} alt='Hero image' width={272} height={201} />
      </ImageWrapper>
      <InfoWrapper>
        <Title>
          <span>Create and Tokenize your AI Agents</span> <span>in under 1 minute</span>
        </Title>
        <List>
          <ListItem>
            <Dot />
            <ListItemTitle>Own</ListItemTitle> <span>a customizable person</span>
          </ListItem>
          <ListItem>
            <Dot />
            <ListItemTitle>Create</ListItemTitle> <span>and share content autonomously / collaboratively</span>
          </ListItem>
          <ListItem>
            <Dot />
            <ListItemTitle>Deploy</ListItemTitle> <span>{`membership tokens ("Agent Keys") on Base`}</span>
          </ListItem>
          <ListItem>
            <Dot />
            <ListItemTitle>Collect</ListItemTitle> <span>{`creator fees in Agent's Safe wallet`}</span>
          </ListItem>
        </List>
        <CommonLink
          href={AppRoutes.LAUNCHER}
          variants={LinkVariants.SOLID}
          style={{ width: '100%', maxWidth: '270px' }}
        >
          <LinkContent>
            <Stars />
            <LinkText>Launch your agent now</LinkText>
          </LinkContent>
        </CommonLink>
      </InfoWrapper>
    </Container>
  );
};
