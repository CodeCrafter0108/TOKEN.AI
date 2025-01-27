import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled.div<{ $isDragging: boolean; $isError: boolean }>`
  position: relative;
  width: 100%;
  height: 120px;
  padding: 16px;
  border: 1px dashed ${({ $isDragging }) => ($isDragging ? 'var(--accent-clr)' : 'transparent')};
  outline: 1px solid ${({ $isError }) => ($isError ? 'var(--error-clr)' : 'transparent')};
  border-radius: 8px;
  background-color: var(--field-bg-clr);
  margin-bottom: 24px;
`;

export const Preview = styled(Image)`
  object-fit: cover;
  border-radius: 4px;
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
