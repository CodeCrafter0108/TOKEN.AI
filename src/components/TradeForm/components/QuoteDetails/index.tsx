import { Flex } from '@/styles/global';
import { Text, Wrapper } from './styles';

export const QuoteDetails = () => {
  return (
    <Wrapper>
      <Flex $gap={3} style={{ width: 'auto' }}>
        <Text>1</Text>
        <Text>ETH</Text>
        <Text>=</Text>
        <Text>0.05049</Text>
        <Text>USDC</Text>
      </Flex>
      <Flex $gap={3} style={{ width: 'auto' }}>
        <Text>Fee ~$</Text>
        <Text>0.02</Text>
      </Flex>
    </Wrapper>
  );
};
