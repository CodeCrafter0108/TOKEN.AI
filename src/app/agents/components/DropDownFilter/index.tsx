import { memo, useEffect, useState } from 'react';
import { DropdownButton, DropdownContainer, DropdownItem, DropdownList, Icon } from './styles';
import { options } from './constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterOption } from '../ButtonFilters/types';
import { ButtonVariants } from '@/components/Button/types';

const DropdownFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<FilterOption>('all');
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
    <DropdownContainer>
      <DropdownButton variants={ButtonVariants.CLEAR} onClick={() => setIsOpen((prev) => !prev)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{options.find((option) => option.value === selected)?.icon}</span>
          <span>{options.find((option) => option.value === selected)?.label}</span>
        </span>
        <Icon $isOpen={isOpen} />
      </DropdownButton>
      <DropdownList $isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            $isSelected={option.value === selected}
            onClick={() => handleSelect(option.value)}
          >
            {option.icon && <span>{option.icon}</span>}
            <span>{option.label}</span>
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default memo(DropdownFilter);
