import styled from 'styled-components';

export const Description = styled.p`
  color: var(--placeholder-clr);
  line-height: 1.5;
  text-align: center;
  &::before {
    content: '*';
    color: var(--required-clr);
    margin-left: 4px;
  }
`;

export const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  padding: 16px 0;
  text-align: start;
  width: 100%;
  max-width: 666px;
  align-self: center;

  border-bottom: 1px solid var(--border-clr);
`;
