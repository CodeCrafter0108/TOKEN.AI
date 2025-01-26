import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;

  &[type='file'] {
    display: none; 
  }

  ::placeholder {
    color: var(--placeholder-clr);
    font-weight: 500;
    line-height: 1.5;
  }

  background: none;
  border: none;
  outline: none;
`;
