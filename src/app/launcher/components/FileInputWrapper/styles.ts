import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div<{ $isDragging: boolean; $isError: boolean }>`
  position: relative;
  width: 100%;
  height: 120px;
  padding: 16px;
  border: 1px  ${({ $isDragging }) => ($isDragging ? 'dashed var(--accent-clr)' : 'solid rgba(255, 255, 255, 0.04)')};
  outline: 1px solid ${({ $isError }) => ($isError ? 'var(--error-clr)' : 'transparent')};
  border-radius: 16px;
  background-color: rgba(19, 19, 19, 0.60);
  margin-bottom: 24px;
`;

export const Preview = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
`;

export const PreviewWrapper = styled.div`
  min-width: 80px;
  min-height: 80px;
  max-width: 80px;
  max-height: 80px;
  position: relative;
`;

export const Label = styled.label`
  display: inline-flex;
  color: var(--accent-clr);
  font-weight: 600;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  cursor: pointer;
`;

export const Text = styled.span`
  color: var(--placeholder-clr);
`;
