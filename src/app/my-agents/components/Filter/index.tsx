import { FilterOption } from '@/app/agents/components/ButtonFilters/types';
import { DropDown } from '@/components/shared/DropDown';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { options } from './constants';
import { filterStyles } from './styles';

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<FilterOption>('latest');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const filterFromQuery = searchParams.get('filter') as FilterOption;
    if (filterFromQuery && options.some((option) => option.value === filterFromQuery)) {
      setSelected(filterFromQuery);
    }
  }, [searchParams]);

  const handleSelect = (value: FilterOption) => {
    setSelected(value);
    setIsOpen(false);
    router.push(`?filter=${value}`);
  };

  return (
    <DropDown
      selected={selected}
      handleSelect={handleSelect}
      options={options}
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      styles={filterStyles}
    />
  );
};

export default memo(Filter);
