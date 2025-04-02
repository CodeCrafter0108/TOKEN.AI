import { Flex } from '@/styles/global';
import { Bar } from './styles';
import { Text } from '../../styles';

interface ProgressBarProps {
  firstParam: number;
  secondParam: number;
  titleFirstParam: string;
  titleSecondParam: string;
  textFirstParam: string;
  textSecondParam: string;
}

export const ProgressBar = ({
  secondParam,
  firstParam,
  titleFirstParam,
  titleSecondParam,
  textFirstParam,
  textSecondParam
}: ProgressBarProps) => {
  const total = secondParam + firstParam;

  const secondParamPercentage = firstParam === 0 && secondParam === 0 ? 50 : (secondParam / total) * 100;
  const firstParamPercentage = firstParam === 0 && secondParam === 0 ? 50 : (firstParam / total) * 100;

  return (
    <Flex $direction={'column'} $gap={4}>
      <Flex style={{ height: '6px', margin: '8px 0', borderRadius: '4px', overflow: 'hidden' }}>
        <Bar
          width={firstParamPercentage}
          style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', backgroundColor: '#94E927' }}
        />
        <Bar
          width={secondParamPercentage}
          style={{
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            backgroundColor: '#F79D00'
          }}
        />
      </Flex>
      <Flex $justify={'space-between'}>
        <Text>
          {titleFirstParam} {textFirstParam}
        </Text>
        <Text>
          {titleSecondParam} {textSecondParam}
        </Text>
      </Flex>
    </Flex>
  );
};
