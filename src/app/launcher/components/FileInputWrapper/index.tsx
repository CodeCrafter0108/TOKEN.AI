import DeleteIcon from '@/assets/icons/delete.svg';
import UploadIcon from '@/assets/icons/upload.svg';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import Button from '@/components/shared/Button';
import { ButtonVariants } from '@/components/shared/Button/types';
import { Flex } from '@/styles/global';
import { formatFileSize } from '@/utils/formatters';
import { AnimatePresence } from 'framer-motion';
import { memo, useMemo } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { SUPPORTED_FORMATS } from '../LaunchForm/schema';
import { ImageFieldType, LauncherTypeData } from '../LaunchForm/types';
import { Container, Label, Preview, PreviewWrapper, Text } from './styles';

interface FileInputWrapperProps {
  children: React.ReactNode;
  htmlFor: string;
  field: ImageFieldType;
  isDragging: boolean;
  setValue: UseFormSetValue<LauncherTypeData>;
  textMessage?: string;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: () => void;
}

const FileInputWrapper = ({
  children,
  textMessage,
  htmlFor,
  onDrop,
  onDragOver,
  onDragLeave,
  isDragging,
  field,
  setValue
}: FileInputWrapperProps) => {
  const file: File | undefined = field.value?.[0];

  const previewUrl: string | null = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  return (
    <Container
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      $isDragging={isDragging}
      $isError={!!textMessage}
    >
      {children}
      <AnimatePresence>
        {previewUrl && SUPPORTED_FORMATS.includes(file?.type ?? '') && !textMessage ? (
          <AnimatedWrapper.Opacity key='preview' duration={0.3}>
            <Flex
              $gap={8}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '0 16px'
              }}
            >
              <PreviewWrapper>
                <Preview fill alt='Prreview file' src={previewUrl} sizes='100%' />
              </PreviewWrapper>
              <Flex $align='center' $justify='space-between'>
                <Flex $gap={4} $direction='column'>
                  <Text>{file?.name}</Text>
                  <Text>{file?.size ? `${formatFileSize(file?.size)}` : '0'}</Text>
                </Flex>

                <Button
                  variants={ButtonVariants.CLEAR}
                  onClick={() => {
                    {/*@ts-expect-error* type field*/}
                    setValue(field.name, undefined, { shouldValidate: true });
                  }}
                >
                  <Flex $gap={4} $align='center' style={{ color: 'var(--error-clr)' }}>
                    <span>Delete</span>
                    <DeleteIcon />
                  </Flex>
                </Button>
              </Flex>
            </Flex>
          </AnimatedWrapper.Opacity>
        ) : (
          <AnimatedWrapper.Opacity key={'upload'} duration={0.3}>
            <Flex
              $align='center'
              $justify='center'
              $direction='column'
              $gap={8}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <UploadIcon />
              <Flex $gap={8} $justify='center'>
                <span>Drag file here or</span> <Label htmlFor={htmlFor}>browser</Label>
              </Flex>
              {textMessage ? <Text>{textMessage}</Text> : <Text>Images (.png, jpg, jpeg less 250KB)</Text>}
            </Flex>
          </AnimatedWrapper.Opacity>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default memo(FileInputWrapper);
