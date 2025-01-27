import Link from 'next/link';
import styled from 'styled-components';

export const LogoLink = styled(Link)`
  font-size: 24px;
  font-weight: 600;

  :first-child {
    color: var(--primary-clr);
  }

  :last-child {
    color: var(--accent-clr);
  }
`;
