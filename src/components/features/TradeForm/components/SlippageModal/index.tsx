import InputWrapper from '@/components/features/InputWrapper';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Modal from '@/components/shared/Modal';
import { ModalHeader } from '@/components/shared/Modal/components/ModalHeader';
import { Flex } from '@/styles/global';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';
import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DEFOULT_DEADLINE, DEFOULT_SLIPAGE } from './constants';
import { schema } from './schema';
import { Form, RadioLabel, SubTitle } from './styles';
import { FieldsFocused, SlippageModalData, SlippageType } from './types';

interface SlippageModalProps {
  onClose: () => void;
  isOpen: boolean;
  slippage: number;
  setSlippage: (value: number) => void;
  deadLine: number;
  setDeadLine: (value: number) => void;
  slippageType: SlippageType;
  setSlippageType: (value: SlippageType) => void;
}

const SlippageModal = ({
  onClose,
  isOpen,
  setSlippage,
  slippage,
  deadLine,
  setDeadLine,
  slippageType,
  setSlippageType
}: SlippageModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<SlippageModalData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      type: SlippageType.AUTO,
      amount: String(slippage),
      deadline: String(deadLine)
    }
  });

  const selectedType = watch('type');
  const amountValue: string = watch('amount');
  const deadlineValue: string | undefined = watch('deadline');

  const onSubmit = (data: SlippageModalData) => {
    setSlippage(+data.amount);
    setSlippageType(data.type);
    if (data?.deadline) setDeadLine(+data.deadline);
    onClose();
  };

  const [fieldsFocused, setFieldsFocused] = useState<FieldsFocused>({
    amount: false,
    deadline: false
  });

  const handleClose = (): void => {
    setValue('type', slippageType);
    setValue('amount', slippage.toString());
    setValue('deadline', deadLine.toString());
    onClose();
  };

  const handleFocus = useCallback((fieldName: keyof SlippageModalData): void => {
    setFieldsFocused((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  const handleBlur = useCallback((fieldName: keyof SlippageModalData): void => {
    setFieldsFocused((prev) => ({ ...prev, [fieldName]: false }));
  }, []);

  useEffect(() => {
    if (selectedType === SlippageType.AUTO) {
      setValue('amount', DEFOULT_SLIPAGE.toString());
      setValue('deadline', DEFOULT_DEADLINE.toString());
    }
  }, [selectedType, setValue]);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <ModalHeader title='Settings' onClose={handleClose} />
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete='off' autoCorrect='off'>
        <SubTitle>Max slippage</SubTitle>
        <RadioLabel $isSelected={selectedType === SlippageType.AUTO}>
          <Input type='radio' value={SlippageType.AUTO} {...register('type', { required: true })} />
          Auto (5%)
        </RadioLabel>
        <RadioLabel $isSelected={selectedType === SlippageType.CUSTOM}>
          <Input type='radio' value={SlippageType.CUSTOM} {...register('type', { required: true })} />
          Custom
        </RadioLabel>
        <Flex $direction='column'>
          {selectedType === SlippageType.CUSTOM && (
            <AnimatedWrapper.Opacity duration={0.3}>
              <InputWrapper
                label='Amount %'
                htmlFor='amount'
                isActive={fieldsFocused.amount || !!amountValue}
                textError={errors.amount?.message}
                value={amountValue}
                hasCheckIcon={false}
              >
                <Input
                  id='amount'
                  {...register('amount', { required: true })}
                  onFocus={() => handleFocus('amount')}
                  onBlur={() => handleBlur('amount')}
                  onChange={(e) => {
                    const value = validateNumberInputValue(e.target.value);
                    setValue('amount', value, { shouldValidate: true });
                  }}
                />
              </InputWrapper>
            </AnimatedWrapper.Opacity>
          )}
          <SubTitle>Transaction deadline</SubTitle>
        </Flex>
        <InputWrapper
          label='Minutes'
          htmlFor='deadline'
          isActive={fieldsFocused.deadline || !!deadlineValue}
          textError={errors.deadline?.message}
          value={deadlineValue ?? ''}
          isRequired={false}
          isDisabled={selectedType === SlippageType.AUTO}
          hasCheckIcon={false}
        >
          <Input
            id='deadline'
            disabled={selectedType === SlippageType.AUTO}
            {...register('deadline', { required: true })}
            onFocus={() => handleFocus('deadline')}
            onBlur={() => handleBlur('deadline')}
            onChange={(e) => {
              const value = validateNumberInputValue(e.target.value);
              setValue('deadline', value, { shouldValidate: true });
            }}
          />
        </InputWrapper>
        <Button type='submit'>Apply</Button>
      </Form>
    </Modal>
  );
};

export default memo(SlippageModal);
