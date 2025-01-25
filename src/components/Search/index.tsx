import { memo, JSX, CSSProperties } from 'react';
import Input from '../Input';
import { Icon, InputWrapper } from './styles';

interface SearchProps {
  styles?: CSSProperties;
  placeholder?: string;
}

const Search = ({ placeholder = 'Search agents...', styles }: SearchProps): JSX.Element => {
  return (
    <InputWrapper style={styles}>
      <Icon />
      <Input placeholder={placeholder} />
    </InputWrapper>
  );
};

export default memo(Search);
