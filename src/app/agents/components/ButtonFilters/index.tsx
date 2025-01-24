import Button from '@/components/Button';
import { ButtonVariants } from '@/components/Button/types';
import { memo, JSX, useState, useEffect } from 'react';
import { FilterOption } from './types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Flex } from '@/styles/global';
import { options } from '../DropDownFilter/constants';

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
