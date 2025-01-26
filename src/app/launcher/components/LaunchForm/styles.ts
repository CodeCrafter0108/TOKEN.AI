import { Breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
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
  line-height: 1.5;
  padding-bottom: 24px;
`;

export const FieldPairContainer = styled.div`
  @media screen and (min-width: ${Breakpoints.md}) {
    display: flex;
    gap: 8px;
  }
`;