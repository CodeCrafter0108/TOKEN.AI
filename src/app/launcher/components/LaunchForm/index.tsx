'use client';
import launcherAbi from '@/abi/launcher.json';
import Button from '@/components/Button';
import { ButtonVariants } from '@/components/Button/types';
import ConnectButton from '@/components/ConnectButton';
import Input from '@/components/Input';
import { launcherContract } from '@/constants/blockchain/contracts';
import { DEFAULT_CHAIN_ID } from '@/constants/blockchain/networks';
import { useWrite } from '@/hooks/useWrite';
import { Flex } from '@/styles/global';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';
import { useAccount, useSwitchChain } from 'wagmi';
import InpupWrapper from '../../../../components/InputWrapper';
import FileInputWrapper from '../FileInputWrapper';
import { schema } from './schema';
import { FieldPairContainer, Form, GeneralInfo, SectionTitle } from './styles';
import { FieldsFocused, ImageFieldType, LauncherTypeData } from './types';
import { toast } from 'react-toastify';
import { handleError } from '@/utils/handleError';

export const LaunchForm = () => {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const {
    writeContract,
    isLoading: isLoadingCreate,
    isSuccess: isSuccessCreate,
    reset: resetWriteState,
    error: errorCreate
  } = useWrite();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset: resetForm,
    clearErrors,
    formState: { errors: formErrors, isValid }
  } = useForm<LauncherTypeData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      symbol: '',
      supply: '1000000000',
      websiteUrl: '',
      socialUrl: '',
      chatUrl: '',
      description: '',
      imageUrl: undefined
    }
  });

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

  const handleFocus = useCallback((fieldName: keyof LauncherTypeData): void => {
    setFieldsFocused((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  const handleBlur = useCallback((fieldName: keyof LauncherTypeData): void => {
    setFieldsFocused((prev) => ({ ...prev, [fieldName]: false }));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent): void => {
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

  const onSubmit = async (data: LauncherTypeData): Promise<void> => {
    console.log(data);
    const { name, symbol, supply, websiteUrl, socialUrl, chatUrl, description } = data;

    const recivedImgUrl: string =
      'https://raw.githubusercontent.com/YieldEnhancementLabs/token-logos/main/81457/0x4300000000000000000000000000000000000004/token-logo.png'; //Mockdata

    if (recivedImgUrl) {
      writeContract({
        abi: launcherAbi,
        address: launcherContract,
        functionName: 'pro_listing',
        chainId,
        args: [name, symbol, websiteUrl, recivedImgUrl, description, chatUrl, socialUrl, supply]
      });
    }
  };

  useEffect(() => {
    if (isSuccessCreate) {
      resetForm();
      resetWriteState();
      toast.success('Agent created successfully');
    }
    if (errorCreate) {
      toast.error(handleError(errorCreate.message));
    }
  }, [isSuccessCreate, resetForm, resetWriteState, errorCreate]);

  const isLoading = isLoadingCreate;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} autoComplete='off' autoCorrect='off'>
      <GeneralInfo>
        <SectionTitle>General information</SectionTitle>
        <FieldPairContainer>
          <InpupWrapper
            label='Name'
            htmlFor='name'
            isActive={fieldsFocused.name || !!nameValue}
            textError={formErrors.name?.message}
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
            textError={formErrors.symbol?.message}
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
          textError={formErrors.supply?.message}
          value={supplyValue}
          isDisabled
        >
          <Input
            id='supply'
            disabled={true}
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
          textError={formErrors.websiteUrl?.message}
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
          textError={formErrors.socialUrl?.message}
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
        textError={formErrors.chatUrl?.message}
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
        textError={formErrors.description?.message}
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
            textMessage={formErrors.imageUrl?.message}
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
      {!isConnected && <ConnectButton />}
      {isConnected && DEFAULT_CHAIN_ID !== chainId && (
        <Button variants={ButtonVariants.SOLID} onClick={() => switchChain({ chainId: DEFAULT_CHAIN_ID })}>
          Switch network
        </Button>
      )}
      {isConnected && DEFAULT_CHAIN_ID === chainId && (
        <Button type='submit' variants={ButtonVariants.SOLID} disabled={isLoading || !isValid}>
          {isLoading ? (
            <Flex $gap={8} $align='center' $justify='center'>
              <ClipLoader color={'var(--accent-clr)'} size={16} speedMultiplier={0.7} />
              <span>Creating</span>
            </Flex>
          ) : (
            'Create'
          )}
        </Button>
      )}
    </Form>
  );
};
