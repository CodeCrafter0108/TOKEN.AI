import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  box-shadow: 2px 2px 7.2px 0px rgba(0, 0, 0, 0.50);
  background-color: var(--secondary-box-bg-clr);

  padding: 4px;
  border-radius: 4px;

  transition: all 0.2s ease-in-out;

  &:hover {
    color: var(--accent-clr);
  }
`;

export const TitleNetwork = styled.span`
`;
