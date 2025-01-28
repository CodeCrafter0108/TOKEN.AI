import { Flex } from '@/styles/global';
import { Bar } from './styles';
import { Text, Title } from '../../styles';

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

  const secondParamPercentage = (secondParam / total) * 100;
  const firstParamPercentage = (firstParam / total) * 100;

  return (
    <Flex $direction={'column'} $gap={4}>
      <Flex $justify={'space-between'}>
        <Flex $gap={2} $direction={'column'}>
          <Title>{titleFirstParam}</Title>
          <Text>{textFirstParam}</Text>
        </Flex>
        <Flex $gap={2} $direction={'column'} $align='flex-end'>
          <Title>{titleSecondParam}</Title>
          <Text>{textSecondParam}</Text>
        </Flex>
      </Flex>
      <Flex style={{ height: '6px', marginTop: '4px' }}>
        <Bar
          width={firstParamPercentage}
          style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', backgroundColor: 'var(--badge-bg-clr)' }}
        />
        <Bar
          width={secondParamPercentage}
          style={{
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            backgroundColor: 'var(--field-bg-clr)'
          }}
        />
      </Flex>
    </Flex>
  );
};
