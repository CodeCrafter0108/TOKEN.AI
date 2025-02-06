import { CSSProperties, JSX, memo } from 'react';
import Input from '../../shared/Input';
import { Icon, InputWrapper } from './styles';

interface SearchProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  styles?: CSSProperties;
  placeholder?: string;
}

const Search = ({ placeholder = 'Search agents...', searchValue, setSearchValue, styles }: SearchProps): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value);
  return (
    <InputWrapper style={styles}>
      <Icon />
      <Input placeholder={placeholder} style={{padding: '12px 16px 12px 40px'}} value={searchValue} onChange={handleChange}/>
    </InputWrapper>
  );
};

export default memo(Search);
