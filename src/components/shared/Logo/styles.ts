import Link from 'next/link';
import styled from 'styled-components';

export const LogoLink = styled(Link)`
  font-size: 24px;
  font-weight: 600;

  :first-child {
    color: var(--accent-clr);
  }

  :last-child {
    color: #3E3E3E;
  }
`;
