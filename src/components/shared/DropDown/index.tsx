import { RuleSet } from 'styled-components';
import { ButtonVariants } from '../Button/types';
import { DropdownButton, DropdownContainer, DropdownItem, DropdownList, Icon } from './styles';
import { useEffect, useRef } from 'react';

interface DropdownProps<T extends string> {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  selected: T;
  options: { value: T; label: string; icon?: React.ReactNode }[];
  handleSelect: (value: T) => void;
  styles?: RuleSet<object>;
}

export const DropDown = <T extends string>({
  setIsOpen,
  isOpen,
  selected,
  options,
  handleSelect,
  styles
}: DropdownProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);
  
  return (
    <DropdownContainer $styles={styles} ref={dropdownRef}>
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
