import { Breakpoints } from '@/styles/breakpoints';
import styled, { css } from 'styled-components';

export const Form = styled.form`
  width: 100%;
  max-width: 666px;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

export const GeneralInfo = styled.div`
  border-bottom: 1px solid var(--border-clr);
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h4`
  font-weight: 600;
  padding-bottom: 24px;
`;

export const FieldPairContainer = styled.div`
  @media screen and (min-width: ${Breakpoints.md}) {
    display: flex;
    gap: 8px;
  }
`;

export const Title = styled.div`
  font-weight: 600;
`;

export const MetaTitle = styled(Title)`
  margin-bottom: 4px;
`;

export const SubTitle = styled.div`
  font-weight: 500;
  color: var(--placeholder-clr);
`;

export const accordionStyles = css`
  margin-bottom: 12px;

  @media screen and (min-width: ${Breakpoints.md}) {
    margin-bottom: 24px;
  }
`;

export const BuyControls = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;

  @media screen and (min-width: ${Breakpoints.sm}) {
    flex-direction: row;
  }
`;

export const TextArea = styled.textarea`
  background-color: transparent;
  border-radius: 16px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  color: var(--primary-text-clr);

  padding: 14px 28px 0 12px;
  width: 100%;
  resize: none;

  background-color: transparent;
  border: none;

  font-family: var(--font-montserrat);
`;

export const SupplyStub = styled.span`
  color: var(--placeholder-clr);
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;

  position: absolute;
  bottom: 0;
  left: 12px;
`;