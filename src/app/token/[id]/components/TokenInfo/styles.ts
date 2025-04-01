import styled from 'styled-components';

export const Title = styled.span`
  color: var(--primary-text-clr);
  font-weight: 500;
  line-height: 1;
`;

export const Text = styled.span<{ $increased?: boolean, $decreased?: boolean }>`
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
  line-height: 1;

  ${({$increased}) => $increased && `color: var(--success-clr);`};
  ${({$decreased}) => $decreased && `color: var(--error-clr);`};
`;
