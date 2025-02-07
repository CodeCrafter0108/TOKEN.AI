import { Title } from '@/app/token/[id]/components/TransactionTable/styles';
import { Flex } from '@/styles/global';
import { memo } from 'react';
import { SortSelectorProps, SortType } from './types';

const SortSelector = ({ text, value = SortType.NONE, disabled = false, onChange, id }: SortSelectorProps) => {
  const handleClick = () => {
    let newValue = SortType.ASC;

    if (value === SortType.ASC) {
      newValue = SortType.DESC;
    } else if (value === SortType.DESC) {
      newValue = SortType.NONE;
    }

    if (onChange) onChange(newValue);
  };

  return (
    <Flex
      $align='center'
      style={{ cursor: disabled ? 'default' : 'pointer' }}
      onClick={handleClick}
      role='columnheader'
      $gap={8}
      id={id}
    >
      {!disabled && (
        <Flex $direction='column' $gap={2} aria-label='Sort selector' role='button' style={{ width: 'auto' }}>
          <svg width='9' height='6' viewBox='0 0 9 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M7.53385 4.50033L4.20052 1.16699L0.867188 4.50033'
              stroke={value === SortType.ASC ? '#7ec425' : '#262626'}
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          <svg width='9' height='6' viewBox='0 0 9 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M0.867188 1.5L4.20052 4.83333L7.53385 1.5'
              stroke={value === SortType.DESC ? '#7ec425' : '#262626'}
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Flex>
      )}

      <Title>{text}</Title>
    </Flex>
  );
};

export default memo(SortSelector);
