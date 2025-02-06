'use client';
import ConnectButton from '@/components/features/ConnectButton';
import Button from '@/components/shared/Button';
import { ButtonVariants } from '@/components/shared/Button/types';
import Input from '@/components/shared/Input';
import launcherAbi from '@/config/abi/launcher.json';
import { preSaveImage, saveImage } from '@/config/api/servises';
import { launcherContract } from '@/constants/blockchain/contracts';
import { DEFAULT_CHAIN_ID } from '@/constants/blockchain/networks';
import { useWrite } from '@/hooks/useWrite';
import { Flex } from '@/styles/global';
import { generateRandomBytes } from '@/utils/generateRandomBytes';
import { handleError } from '@/utils/handleError';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import { Hex } from 'viem';
import { useAccount, useSwitchChain } from 'wagmi';
import InpupWrapper from '../../../../components/features/InputWrapper';
import FileInputWrapper from '../FileInputWrapper';
import { schema } from './schema';
import { FieldPairContainer, Form, GeneralInfo, SectionTitle } from './styles';
import { FieldsFocused, ImageFieldType, LauncherTypeData } from './types';

// const MIN_NATIVE_BALANCE = 1;

export const LaunchForm = () => {
  const { isConnected, chainId, address } = useAccount();
  const { switchChain } = useSwitchChain();
  // const { data: userBalance, refetch: refetchBalance } = useBalance({ address, chainId, query: { enabled: false } });
  const {
    writeContract,
    isLoading: isLoadingWrite,
    isSuccess: isSuccessWrite,
    reset: resetWriteState,
    error: errorWrite
  } = useWrite();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset: resetForm,
    clearErrors,
    formState: { errors: formErrors, isValid, isSubmitting }
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

  const randomBytes = useRef<Hex | null>(null);

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

  const { mutateAsync: preSaveImageAsync, isPending: isPendingPreSave } = useMutation({
    mutationFn: preSaveImage
  });

  const { mutate: saveImg, isPending: isPendingSave } = useMutation({
    mutationFn: saveImage,
    onSuccess: () => {
      resetForm();
      toast.success('Agent created successfully');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error creating agent');
    }
  });

  const onSubmit = async (data: LauncherTypeData): Promise<void> => {
    console.log(data);
    if (!address || !chainId) return;

    // const balance = await refetchBalance();
    // if (Number(balance?.data?.formatted ?? 0) < MIN_NATIVE_BALANCE) {
    //   toast.error(`Balance too low, min balance is ${MIN_NATIVE_BALANCE}${balance?.data?.symbol}`);
    //   return;
    // }

    randomBytes.current = generateRandomBytes(address);

    const { name, symbol, supply, websiteUrl, socialUrl, chatUrl, description } = data;

    const formData = new FormData();
    formData.append('file', data.imageUrl[0] as Blob);

    let recivedImgUrl = '';
    try {
      const { data } = await preSaveImageAsync({
        chainId,
        userAddress: address,
        randomBytes: randomBytes.current,
        formData
      });

      if (data?.url) recivedImgUrl = data?.url;
    } catch (error) {
      console.error(error);
      toast.error('Error creating agent');
    }

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
    if (isSuccessWrite && randomBytes.current) {
      saveImg(randomBytes.current);
      resetWriteState();
    }
    if (errorWrite) {
      randomBytes.current = null;
      toast.error(handleError(errorWrite.message));
    }
  }, [isSuccessWrite, resetWriteState, errorWrite, saveImg]);

  const isLoading = isLoadingWrite || isPendingPreSave || isPendingSave || isSubmitting;

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
