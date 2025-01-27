import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 100%;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;

  padding: 12px 28px 0 12px;

  &[type='file'] {
    display: none;
  }

  &[type='radio'] {
    accent-color: var(--primary-clr);
  }

  &:disabled {
    color: var(--placeholder-clr);
    pointer-events: none;
  }

  &::placeholder {
    color: var(--placeholder-clr);
    font-weight: 500;
    line-height: 1.5;
  }

  background: none;
  border: none;
  outline: none;
`;
