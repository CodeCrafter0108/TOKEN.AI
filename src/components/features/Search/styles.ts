import styled from "styled-components";
import SearchIcon from '@/assets/icons/searchIcon.svg';

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--box-bg-clr);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  border: 1px solid transparent;

  &:hover {
    border: 1px solid var(--accent-clr);

  }
`;

export const Icon = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`;