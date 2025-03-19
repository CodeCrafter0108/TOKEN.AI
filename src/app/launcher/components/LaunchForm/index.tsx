'use client';
import ConnectButton from '@/components/features/ConnectButton';
import { Accordion } from '@/components/shared/Accordion';
import Button from '@/components/shared/Button';
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
import InputWrapper from '../../../../components/features/InputWrapper';
import FileInputWrapper from '../FileInputWrapper';
import { BuyButtons } from './components/BuyButtons';
import { schema, TOTAL_SUPPLY } from './schema';
import {
  FieldPairContainer,
  Form,
  SectionTitle,
  SubTitle,
  Title,
  accordionStyles,
  BuyControls,
  TextArea,
  MetaTitle
} from './styles';
import { BuyFieldType, FieldsFocused, ImageFieldType, LauncherTypeData } from './types';
import { css } from 'styled-components';

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
      supply: TOTAL_SUPPLY.toString(),
      websiteUrl: '',
      socialUrl: '',
      chatUrl: '',
      description: '',
      imageUrl: undefined,
      buy: '',
      buyCustom: ''
    }
  });

  const randomBytes = useRef<Hex | null>(null);

  const nameValue: string = watch('name');
  const symbolValue: string = watch('symbol');
  const supplyValue: string = watch('supply');
  const websiteUrlValue: string | undefined = watch('websiteUrl');
  const socialUrlValue: string | undefined = watch('socialUrl');
  const chatUrlValue: string | undefined = watch('chatUrl');
  const descriptionValue: string = watch('description');
  const buyCustomValue: string | undefined = watch('buyCustom');

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [inputKey, setInputKey] = useState(0);

  const [fieldsFocused, setFieldsFocused] = useState<FieldsFocused>({
    name: false,
    symbol: false,
    supply: false,
    websiteUrl: false,
    socialUrl: false,
    chatUrl: false,
    description: false,
    buyCustom: false
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
      <SectionTitle>General information</SectionTitle>
      <FieldPairContainer>
        <InputWrapper
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
        </InputWrapper>
        <InputWrapper
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
        </InputWrapper>
      </FieldPairContainer>
      <InputWrapper
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
      </InputWrapper>
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
      <Accordion
        title={
          <Flex $gap={4} $align='center'>
            <Title>{'Token metadata'}</Title>
            <SubTitle>{'(Optional)'}</SubTitle>
          </Flex>
        }
      >
        <MetaTitle>Twitter</MetaTitle>
        <InputWrapper
          isActive={fieldsFocused.websiteUrl || !!websiteUrlValue}
          textError={formErrors.websiteUrl?.message}
          value={websiteUrlValue}
          isRequired={false}
          badgeText='x.com/'
        >
          <Input
            id='websiteUrl'
            style={{padding: '12px 28px 12px 117px'}}
            {...register('websiteUrl')}
            onFocus={() => handleFocus('websiteUrl')}
            onBlur={() => handleBlur('websiteUrl')}
          />
        </InputWrapper>
        <MetaTitle>Telegram</MetaTitle>
        <InputWrapper
          label='Social URL'
          htmlFor='socialUrl'
          isActive={fieldsFocused.socialUrl || !!socialUrlValue}
          textError={formErrors.socialUrl?.message}
          value={socialUrlValue}
          isRequired={false}
          badgeText='t.me/'
        >
          <Input
            id='socialUrl'
            {...register('socialUrl')}
            style={{padding: '12px 28px 12px 117px'}}
            onFocus={() => handleFocus('socialUrl')}
            onBlur={() => handleBlur('socialUrl')}
          />
        </InputWrapper>
        <MetaTitle>Discord</MetaTitle>
        <InputWrapper
          label='Chat URL'
          htmlFor='chatUrl'
          isActive={fieldsFocused.chatUrl || !!chatUrlValue}
          isRequired={false}
          textError={formErrors.chatUrl?.message}
          value={chatUrlValue ?? ''}
          badgeText='discord.gg/'
        >
          <Input
            id='chatUrl'
            style={{padding: '12px 28px 12px 117px'}}
            {...register('chatUrl')}
            onFocus={() => handleFocus('chatUrl')}
            onBlur={() => handleBlur('chatUrl')}
          />
        </InputWrapper>
        <InputWrapper
          label='Description'
          htmlFor='description'
          isActive={fieldsFocused.description || !!descriptionValue}
          textError={formErrors.description?.message}
          value={descriptionValue}
          stylesInputContainer={css`
            height: 85px;
          `}
          stylesContainer={css`
            height: 108px;
          `}
        >
          <TextArea
            rows={3}
            id='description'
            {...register('description', { required: true })}
            onFocus={() => handleFocus('description')}
            onBlur={() => handleBlur('description')}
          />
        </InputWrapper>
      </Accordion>
      <Accordion
        title={
          <Flex $gap={4} $align='center'>
            <Title>{'Prebuy'}</Title>
            <SubTitle>{'(Optional)'}</SubTitle>
          </Flex>
        }
        styles={accordionStyles}
      >
        <Flex $direction='column' $gap={5}>
          <Title>Buy</Title>
          <SubTitle>{'Pre-bought tokens can be sold at cost (minus fees)'}</SubTitle>
          <BuyControls>
            <Controller
              name='buy'
              control={control}
              defaultValue={undefined}
              render={({ field }: { field: BuyFieldType }) => (
                <BuyButtons field={field} setValue={setValue} fieldsFocused={fieldsFocused} />
              )}
            />
            <InputWrapper
              isActive={fieldsFocused.buyCustom || !!buyCustomValue}
              textError={formErrors.buyCustom?.message}
              value={buyCustomValue}
            >
              <Input
                {...register('buyCustom')}
                style={{ padding: '12px' }}
                placeholder='Custom (max 60%)'
                onFocus={() => handleFocus('buyCustom')}
                onBlur={() => handleBlur('buyCustom')}
                onChange={(e) => {
                  const value = validateNumberInputValue(e.target.value);
                  clearErrors('buyCustom');
                  setValue('buyCustom', value, { shouldValidate: true });
                }}
              />
            </InputWrapper>
          </BuyControls>
        </Flex>
        <Flex $justify='space-between'>
          <SubTitle>{'Buy cost'}</SubTitle>
          <Flex $direction='column' style={{ width: 'auto', textAlign: 'end' }}>
            <Title>0.00543ETH</Title>
            <SubTitle style={{ fontSize: '12px' }}>{'$11.05'}</SubTitle>
          </Flex>
        </Flex>
      </Accordion>
      {!isConnected && <ConnectButton />}
      {isConnected && DEFAULT_CHAIN_ID !== chainId && (
        <Button onClick={() => switchChain({ chainId: DEFAULT_CHAIN_ID })}>Switch network</Button>
      )}
      {isConnected && DEFAULT_CHAIN_ID === chainId && (
        <Button type='submit' disabled={isLoading || !isValid}>
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
