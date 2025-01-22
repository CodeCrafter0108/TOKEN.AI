'use client';
import { useForm } from 'react-hook-form';
import { FieldsFocused, LauncherTypeData } from './types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import  InpupWrapper  from '../InputWrapper';
import { useCallback, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, SUPPORTED_FORMATS } from './schema';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';

export const LaunchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors }
  } = useForm<LauncherTypeData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const onSubmit = (data: LauncherTypeData) => console.log(data);

  const files = watch('imageUrl');
  const previewUrl = useMemo(() => {
    return files?.length ? URL.createObjectURL(files[0]) : null;
  }, [files]);

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
        setValue('imageUrl', droppedFiles);
      }
    },
    [setValue]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' autoCorrect='off'>
      <InpupWrapper
        label='Name'
        htmlFor='name'
        isActive={fieldsFocused.name || !!watch('name')}
        textError={errors.name?.message}
      >
        <Input
          {...register('name', { required: true })}
          onFocus={() => handleFocus('name')}
          onBlur={() => handleBlur('name')}
        />
      </InpupWrapper>
      <InpupWrapper
        label='Symbol'
        htmlFor='symbol'
        isActive={fieldsFocused.symbol || !!watch('symbol')}
        textError={errors.symbol?.message}
      >
        <Input
          {...register('symbol', { required: true })}
          onFocus={() => handleFocus('symbol')}
          onBlur={() => handleBlur('symbol')}
        />
      </InpupWrapper>
      <InpupWrapper
        label='Supply'
        htmlFor='supply'
        isActive={fieldsFocused.supply || !!watch('supply')}
        textError={errors.supply?.message}
      >
        <Input
          {...register('supply', { required: true })}
          onFocus={() => handleFocus('supply')}
          onBlur={() => handleBlur('supply')}
          onChange={(e) => {
            const value = validateNumberInputValue(e.target.value);
            setValue('supply', value, { shouldValidate: true });
          }}
        />
      </InpupWrapper>
      <InpupWrapper
        label='Website Url'
        htmlFor='websiteUrl'
        isActive={fieldsFocused.websiteUrl || !!watch('websiteUrl')}
        textError={errors.websiteUrl?.message}
      >
        <Input
          {...register('websiteUrl', { required: true })}
          onFocus={() => handleFocus('websiteUrl')}
          onBlur={() => handleBlur('websiteUrl')}
        />
      </InpupWrapper>
      <InpupWrapper
        label='Social URL'
        htmlFor='socialUrl'
        isActive={fieldsFocused.socialUrl || !!watch('socialUrl')}
        textError={errors.socialUrl?.message}
      >
        <Input
          {...register('socialUrl', { required: true })}
          onFocus={() => handleFocus('socialUrl')}
          onBlur={() => handleBlur('socialUrl')}
        />
      </InpupWrapper>
      <InpupWrapper
        label='Chat URL'
        htmlFor='chatUrl'
        isActive={fieldsFocused.chatUrl || !!watch('chatUrl')}
        isRequired={false}
        textError={errors.chatUrl?.message}
      >
        <Input {...register('chatUrl')} onFocus={() => handleFocus('chatUrl')} onBlur={() => handleBlur('chatUrl')} />
      </InpupWrapper>
      <InpupWrapper
        label='Description'
        htmlFor='description'
        isActive={fieldsFocused.description || !!watch('description')}
        textError={errors.description?.message}
      >
        <Input
          {...register('description', { required: true })}
          onFocus={() => handleFocus('description')}
          onBlur={() => handleBlur('description')}
        />
      </InpupWrapper>

      <Input type='file' {...register('imageUrl', { required: true })} onDrop={handleDrop} />
      {errors.imageUrl && <span>{errors.imageUrl.message}</span>}
      {previewUrl && SUPPORTED_FORMATS.includes(files?.[0]?.type) && (
        <div
          style={{
            width: '200px',
            height: '200px',
            marginTop: '10px',
            backgroundImage: `url(${previewUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        ></div>
      )}
      <Button>Submit</Button>
    </form>
  );
};
