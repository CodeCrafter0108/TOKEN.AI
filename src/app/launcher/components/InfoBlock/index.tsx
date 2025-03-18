import { Box, Flex } from '@/styles/global';
import { Description, Title } from './styles';

export const InfoBlock = () => {
  return (
    <Flex $gap={12} $direction='column' $align='center'>
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
