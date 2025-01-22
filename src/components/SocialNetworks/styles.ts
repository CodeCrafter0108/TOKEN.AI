import Link from 'next/link';
import styled, { RuleSet } from 'styled-components';

export const Wrapper = styled.div<{ $styles?: RuleSet<object> }>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  ${({ $styles }) => $styles && $styles};
`;

export const IconWrapper = styled.div`
  padding: 4px;
  border-radius: 4px;
  background: var(--primary-clr);
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;

  transition: all 0.2s ease;

  &:hover {
    color: var(--accent-clr);
  }
`;

export const TitleNetwork = styled.span`
  font-size: 14px;
  line-height: 1.5;
`;
