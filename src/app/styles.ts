import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  padding: 3.75rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2.5rem 0;

  border-radius: 16px;
  background: var(--not-found-bd-clr);
  width: 100%;
  max-width: 600px;
`;

export const Title = styled.h1`
  font-size: 1.125rem;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 0.875rem;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
`;
