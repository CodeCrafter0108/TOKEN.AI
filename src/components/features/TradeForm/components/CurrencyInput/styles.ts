import Input from '@/components/shared/Input';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 80px;

  position: relative;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CurrencyWrapperBalance = styled.div`
  position: absolute;
  bottom: -3px;
  left: 0;
  font-size: 12px;
`;

export const CurrencyWrapperSelect = styled.div`
  position: absolute;
  top: 18px;
  right: 0;

  height: calc(100% - 16px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
`;

export const Label = styled.label`
  text-transform: capitalize;
  font-size: 12px;
  font-weight: 500;
  color: var(--placeholder-clr);
`;

export const StyledInput = styled(Input)`
  height: 44px;
  font-size: 24px;
  font-weight: 600;
  padding: 0 140px 0 0;

  &::placeholder {
    font-size: 24px;
    font-weight: 600;
  }
`;