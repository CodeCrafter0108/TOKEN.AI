import styled, { css } from 'styled-components';
import { TransactionType } from 'viem';

export const Card = styled.li<{ $isNew: boolean; $type: TransactionType }>`
  border-radius: 76px;
  background-color: var(--header-bg-clr);
  padding: 8px 12px;
  width: 221px;
  min-width: 221px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  translate: 0;

  ${({ $isNew, $type }) => css`
    ${$isNew && $type === 'sell' && `box-shadow: 0px 0px 11.4px 0px #ff9500, 0px 2px 0px 0px rgba(0, 0, 0, 0.1);`}

    ${$isNew && $type === 'buy' && `box-shadow: 0px 0px 11.4px 0px #7ec425, 0px 2px 0px 0px rgba(0, 0, 0, 0.1);`}

  ${$isNew && $type === 'launch' && `box-shadow: 0px 0px 11.4px 0px #f064c6, 0px 2px 0px 0px rgba(0, 0, 0, 0.1);`}
  `}

  &:hover {
    ${({ $type }) => css`
      ${$type === 'sell' && `box-shadow: 0px 0px 11.4px 0px #ff9500, 0px 2px 0px 0px rgba(0, 0, 0, 0.1);`}

      ${$type === 'buy' && `box-shadow: 0px 0px 11.4px 0px #7ec425, 0px 2px 0px 0px rgba(0, 0, 0, 0.1);`}

  ${$type === 'launch' && `box-shadow: 0px 0px 11.4px 0px #f064c6, 0px 2px 0px 0px rgba(0, 0, 0, 0.1);`}
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
