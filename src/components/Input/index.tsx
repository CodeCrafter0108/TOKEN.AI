'use client';
import { memo, InputHTMLAttributes, ChangeEvent } from 'react';
import { StyledInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input = ({ onChange, value, ...rest }: InputProps) => {
  return <StyledInput value={value} onChange={onChange} {...rest} />;
};

export default memo(Input);
