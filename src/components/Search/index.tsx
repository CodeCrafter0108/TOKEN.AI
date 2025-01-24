import { memo, JSX } from 'react';

import Input from '../Input';
import { Icon, InputWrapper } from './styles';

const Search = (): JSX.Element => {
  return (
    <InputWrapper>
      <Icon />
      <Input placeholder='Search agents...' />
    </InputWrapper>
  );
};

export default memo(Search);
