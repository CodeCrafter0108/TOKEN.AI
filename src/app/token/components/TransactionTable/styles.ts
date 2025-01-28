import styled from 'styled-components';
import { Breakpoints } from '@/styles/breakpoints';

export const TableWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
`;

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: ${Breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const TableBody = styled.div`
  display: grid;
  position: relative;
  overflow-y: auto;
  max-height: 550px;
  padding-right: 10px;
`;

export const TableItem = styled(TableHead)`
  border-bottom: 1px solid var(--border-clr);
  padding: 16px 0;
`;

export const Title = styled.span`
  font-weight: 700;
`;

export const Text = styled.span`
  font-weight: 500;
  color: var(--placeholder-clr);
`;

export const TableTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
