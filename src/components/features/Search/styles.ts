import SearchIcon from '@/assets/icons/searchIcon.svg';
import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--primary-box-bg-clr);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  border: 1px solid rgba(255, 255, 255, 0.04);

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.12);

  }
`;

export const Icon = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
`;