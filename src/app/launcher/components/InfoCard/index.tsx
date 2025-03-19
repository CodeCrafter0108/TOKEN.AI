import { Description, Title, Card, StyledImage, ImageWrapper, Blur, Wrapper } from './styles';

export const InfoCard = () => {
  return (
    <Wrapper>
      <Card>
        <Title>Token submission</Title>
        <ImageWrapper>
          <StyledImage src='/images/launcher/launcher_card.png' alt='token-submission' width={280} height={280} />
        </ImageWrapper>
        <Description>
          Creating cryptocurrency enables decentralized financial systems, allowing users to exchange digital assets
          without intermediaries. It offers fast, low-fee transactions, enhances security, and supports smart contracts.
          With blockchain knowledge, anyone can launch a cryptocurrency, contributing to the expanding world of
          decentralized finance.
        </Description>
      </Card>
      <Blur />
    </Wrapper>
  );
};
