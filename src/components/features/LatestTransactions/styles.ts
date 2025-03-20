import styled from 'styled-components';

export const CardList = styled.ul`
  position: absolute;
  top: 60px;
  left: 0;
  display: flex;
  gap: 12px;
  overflow: hidden;
  width: 100%;
  padding: 8px 0 8px 24px;
  z-index: 5;

  margin-top: 16px;

  &::after {
    content: '';
    top: 0;
    right: 0;
    position: absolute;
    height: 100%;
    width: 10%;
    background: linear-gradient(to left, var(--background-clr), rgba(0, 0, 0, 0));
    pointer-events: none;
  }
`;
