import Link from 'next/link';
import styled from 'styled-components';

export const LogoLink = styled(Link)`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.5;

  :first-child {
    color: var(--primary-clr);
  }

  :last-child {
    color: var(--accent-clr);
  }
`;
