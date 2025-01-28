import { Flex } from '@/styles/global';
import { Title, Text } from '../../styles';

export const TimeframeAnalytics = () => {
  return (
    <Flex $gap={8} $justify='space-between' style={{ padding: '8px 0' }}>
      <Flex $gap={8} $direction='column' style={{ borderRight: '1px solid var(--border-clr)' }}>
        <Title>5m</Title>
        <Text style={{ color: 'var(--error-clr)' }}>-0.32%</Text>
      </Flex>
      <Flex $gap={8} $direction='column' $align='center' style={{ borderRight: '1px solid var(--border-clr)' }}>
        <Title>1h</Title>
        <Text style={{ color: 'var(--accent-clr)' }}>0.52%</Text>
      </Flex>
      <Flex $gap={8} $direction='column' $align='center' style={{ borderRight: '1px solid var(--border-clr)' }}>
        <Title>6h</Title>
        <Text style={{ color: 'var(--error-clr)' }}>-2.32%</Text>
      </Flex>
      <Flex $gap={8} $direction='column' $align='flex-end'>
        <Title>24h</Title>
        <Text style={{ color: 'var(--accent-clr)' }}>1.96%</Text>
      </Flex>
    </Flex>
  );
};
