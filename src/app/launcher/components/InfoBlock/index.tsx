import { Box, Flex } from '@/styles/global';
import { Description, Title, Video, VideoWrapper, TextTop, TextBottom } from './styles';

export const InfoBlock = () => {
  return (
    <Flex $gap={12} $direction='column' $align='center'>
      <VideoWrapper>
        <Video autoPlay muted loop aria-hidden="true">
          <source src={'/videos/100k_low.mp4'} type='video/mp4' />
        </Video>
        <TextTop>
          <span>$</span>
          <div>Get Liquidity</div>
          <span>$</span>
        </TextTop>
        <TextBottom>For your token</TextBottom>
      </VideoWrapper>
      <Box style={{ padding: '8px 12px', maxWidth: '666px', borderRadius: '8px' }}>
        <Flex $gap={4} $direction='column'>
          <Title>Token submission</Title>
          <Description>
            Creating cryptocurrency enables decentralized financial systems, allowing users to exchange digital assets
            without intermediaries. It offers fast, low-fee transactions, enhances security, and supports smart
            contracts. With blockchain knowledge, anyone can launch a cryptocurrency, contributing to the expanding
            world of decentralized finance.
          </Description>
        </Flex>
      </Box>
    </Flex>
  );
};
