import Button from '@/components/shared/Button';
import { ButtonVariants } from '@/components/shared/Button/types';
import { Flex } from '@/styles/global';
import { useRouter, useSearchParams } from 'next/navigation';
import { JSX, memo, useEffect, useState } from 'react';
import { options } from '../DropDownFilter/constants';
import { FilterOption } from './types';

const ButtonFilters = (): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');

  useEffect(() => {
    const filterFromUrl = searchParams.get('filter') as FilterOption;
    if (filterFromUrl) {
      setSelectedFilter(filterFromUrl);
    }
  }, [searchParams]);

  const handleFilterChange = (filter: FilterOption) => {
    setSelectedFilter(filter);
    router.push(`?filter=${filter}`);
  };
  return (
    <Flex $gap={12} style={{ width: 'auto' }}>
      {options.map(({ value, label, icon }) => {
        return (
          <Button
            key={value}
            variants={ButtonVariants.FILTER}
            isSelected={selectedFilter === value}
            onClick={() => handleFilterChange(value)}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            {icon && <span>{icon}</span>}
            <span>{label}</span>
          </Button>
        );
      })}
    </Flex>
  );
};

export default memo(ButtonFilters);
