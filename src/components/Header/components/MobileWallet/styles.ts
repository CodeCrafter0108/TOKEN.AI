import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: var(--box-bg-clr);
`;

export const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 8px;

  border-bottom: 1px solid rgba(137, 140, 144, 0.35);
`;

export const ButtonContent = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  font-weight: 600;
  line-height: 1.5;
`;
