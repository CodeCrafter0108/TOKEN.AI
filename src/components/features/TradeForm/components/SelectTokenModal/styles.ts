import styled from 'styled-components';

export const TokenList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 350px;
  max-height: 350px;
  overflow-y: auto;
  padding-right: 4px;
`;

export const TokenListItem = styled.li<{$isSelected: boolean}>`
  display: flex;
  gap: 12px;
  justify-content: space-between;

  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  cursor: pointer;

  pointer-events: ${({ $isSelected }) => ($isSelected ? 'none' : 'auto')};;
  opacity: ${({ $isSelected }) => ($isSelected ? 0.5 : 1)};

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const TokenName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const TokenSymbol = styled.div`
  font-size: 12px;
  color: var(--placeholder-clr);
`;

export const NotFound = styled.div`
  height: 350px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;