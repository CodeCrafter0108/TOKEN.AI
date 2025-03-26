import styled, { css } from 'styled-components';

export const Card = styled.li<{ $isNew: boolean; $isSell: boolean }>`
  border-radius: 76px;
  background-color: var(--header-bg-clr);
  padding: 8px 12px;
  width: 221px;
  min-width: 221px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  translate: 0;

  ${({ $isNew, $isSell }) =>
    $isNew &&
    css`
      box-shadow: ${$isSell
        ? '0px 0px 11.4px 0px #ff9500, 0px 2px 0px 0px rgba(0, 0, 0, 0.1)'
        : '0px 0px 11.4px 0px #7ec425, 0px 2px 0px 0px rgba(0, 0, 0, 0.1)'};
      transition: box-shadow 0.5s ease-in-out;
    `}

  &:hover {
    ${({ $isSell }) => css`
      box-shadow: ${$isSell
        ? '0px 0px 11.4px 0px #ff9500, 0px 2px 0px 0px rgba(0, 0, 0, 0.1)'
        : '0px 0px 11.4px 0px #7ec425, 0px 2px 0px 0px rgba(0, 0, 0, 0.1)'};
      transition: box-shadow 0.5s ease-in-out;
    `}
  }
`;

export const Title = styled.div`
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: -0.16px;
  font-weight: 600;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  font-size: 12px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.6);
`;
