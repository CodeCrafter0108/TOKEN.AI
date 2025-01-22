import styled from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 40px 0;

  border-radius: 16px;
  background: var(--box-bg-clr);
  width: 100%;
  max-width: 600px;
`;

export const Title = styled.p`
  font-size: 18px;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
`;

export const Description = styled.p`
  font-size: 14px;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
`;