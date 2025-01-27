'use client';
import { useForm, Controller } from 'react-hook-form';
import { FieldsFocused, ImageFieldType, LauncherTypeData } from './types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InpupWrapper from '../../../../components/InputWrapper';
import { useCallback, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';
import { useAccount } from 'wagmi';
import ConnectButton from '@/components/ConnectButton';
import { FieldPairContainer, Form, GeneralInfo, SectionTitle } from './styles';
import FileInputWrapper from '../FileInputWrapper';

export const LaunchForm = () => {
  const { isConnected } = useAccount();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    clearErrors,
    formState: { errors }
  } = useForm<LauncherTypeData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const onSubmit = (data: LauncherTypeData) => {
    console.log(data);
    reset();
  };
  const nameValue: string = watch('name');
  const symbolValue: string = watch('symbol');
  const supplyValue: string = watch('supply');
  const websiteUrlValue = watch('websiteUrl');
  const socialUrlValue: string = watch('socialUrl');
  const chatUrlValue: string | undefined = watch('chatUrl');
  const descriptionValue: string = watch('description');

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [inputKey, setInputKey] = useState(0);

  const [fieldsFocused, setFieldsFocused] = useState<FieldsFocused>({
    name: false,
    symbol: false,
    supply: false,
    websiteUrl: false,
    socialUrl: false,
    chatUrl: false,
    description: false
  });

  const handleFocus = useCallback((fieldName: keyof LauncherTypeData) => {
    setFieldsFocused((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  const handleBlur = useCallback((fieldName: keyof LauncherTypeData) => {
    setFieldsFocused((prev) => ({ ...prev, [fieldName]: false }));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const droppedFiles: FileList = e.dataTransfer.files;
      if (droppedFiles) {
        clearErrors('imageUrl');
        setValue('imageUrl', droppedFiles, { shouldValidate: true });
        setIsDragging(false);
      }
    },
    [setValue, clearErrors]
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)} autoComplete='off' autoCorrect='off'>
      <GeneralInfo>
        <SectionTitle>General information</SectionTitle>
        <FieldPairContainer>
          <InpupWrapper
            label='Name'
            htmlFor='name'
            isActive={fieldsFocused.name || !!nameValue}
            textError={errors.name?.message}
            value={nameValue}
          >
            <Input
              id='name'
              {...register('name', { required: true })}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name')}
            />
          </InpupWrapper>
          <InpupWrapper
            label='Symbol'
            htmlFor='symbol'
            isActive={fieldsFocused.symbol || !!symbolValue}
            textError={errors.symbol?.message}
            value={symbolValue}
          >
            <Input
              id='symbol'
              {...register('symbol', { required: true })}
              onFocus={() => handleFocus('symbol')}
              onBlur={() => handleBlur('symbol')}
            />
          </InpupWrapper>
        </FieldPairContainer>
        <InpupWrapper
          label='Supply'
          htmlFor='supply'
          isActive={fieldsFocused.supply || !!supplyValue}
          textError={errors.supply?.message}
          value={supplyValue}
        >
          <Input
            id='supply'
            {...register('supply', { required: true })}
            onFocus={() => handleFocus('supply')}
            onBlur={() => handleBlur('supply')}
            onChange={(e) => {
              const value = validateNumberInputValue(e.target.value);
              setValue('supply', value, { shouldValidate: true });
            }}
          />
        </InpupWrapper>
      </GeneralInfo>
      <SectionTitle>Token metadata</SectionTitle>
      <FieldPairContainer>
        <InpupWrapper
          label='Website Url'
          htmlFor='websiteUrl'
          isActive={fieldsFocused.websiteUrl || !!websiteUrlValue}
          textError={errors.websiteUrl?.message}
          value={websiteUrlValue}
        >
          <Input
            id='websiteUrl'
            {...register('websiteUrl', { required: true })}
            onFocus={() => handleFocus('websiteUrl')}
            onBlur={() => handleBlur('websiteUrl')}
          />
        </InpupWrapper>
        <InpupWrapper
          label='Social URL'
          htmlFor='socialUrl'
          isActive={fieldsFocused.socialUrl || !!socialUrlValue}
          textError={errors.socialUrl?.message}
          value={socialUrlValue}
        >
          <Input
            id='socialUrl'
            {...register('socialUrl', { required: true })}
            onFocus={() => handleFocus('socialUrl')}
            onBlur={() => handleBlur('socialUrl')}
          />
        </InpupWrapper>
      </FieldPairContainer>
      <InpupWrapper
        label='Chat URL'
        htmlFor='chatUrl'
        isActive={fieldsFocused.chatUrl || !!chatUrlValue}
        isRequired={false}
        textError={errors.chatUrl?.message}
        value={chatUrlValue ?? ''}
      >
        <Input
          id='chatUrl'
          {...register('chatUrl')}
          onFocus={() => handleFocus('chatUrl')}
          onBlur={() => handleBlur('chatUrl')}
        />
      </InpupWrapper>
      <InpupWrapper
        label='Description'
        htmlFor='description'
        isActive={fieldsFocused.description || !!descriptionValue}
        textError={errors.description?.message}
        value={descriptionValue}
      >
        <Input
          id='description'
          {...register('description', { required: true })}
          onFocus={() => handleFocus('description')}
          onBlur={() => handleBlur('description')}
        />
      </InpupWrapper>

      <Controller
        name='imageUrl'
        control={control}
        defaultValue={undefined}
        render={({ field }: { field: ImageFieldType }) => (
          <FileInputWrapper
            textMessage={errors.imageUrl?.message}
            htmlFor='imageUrl'
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            field={field}
            isDragging={isDragging}
            setValue={setValue}
          >
            <Input
              key={inputKey}
              id='imageUrl'
              type='file'
              onChange={(e) => {
                if (e.target.files) {
                  clearErrors('imageUrl');
                  setValue('imageUrl', e.target.files, { shouldValidate: true });
                  setInputKey((prevKey) => prevKey + 1);
                }
              }}
            />
          </FileInputWrapper>
        )}
      />
      {isConnected ? <Button type='submit'>Create</Button> : <ConnectButton />}
    </Form>
  );
};
