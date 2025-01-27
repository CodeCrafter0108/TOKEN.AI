import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { ModalHeader } from '@/components/Modal/components/ModalHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
import { FieldsFocused, SlippageModalData, SlippageType } from './types';
import { memo, useCallback, useState } from 'react';
import InputWrapper from '@/components/InputWrapper';
import { AUTO_SLIPAGE, DEFOULT_DEADLINE } from './constants';
import Input from '@/components/Input';
import { Form, RadioLabel, SubTitle } from './styles';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';
import { Flex } from '@/styles/global';
import { ButtonVariants } from '@/components/Button/types';
import { AnimatePresence } from 'framer-motion';
import AnimatedWrapper from '@/components/AnimatedWrapper';

interface SlippageModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const SlippageModal = ({ onClose, isOpen }: SlippageModalProps) => {
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
      amount: String(AUTO_SLIPAGE),
      deadline: String(DEFOULT_DEADLINE)
    }
  });

  const selectedType = watch('type');
  const amountValue: string = watch('amount');
  const deadlineValue: string | undefined = watch('deadline');

  const onSubmit = (data: SlippageModalData) => {
    console.log(data);
  };

  const [fieldsFocused, setFieldsFocused] = useState<FieldsFocused>({
    amount: false,
    deadline: false
  });

  const handleFocus = useCallback((fieldName: keyof SlippageModalData) => {
    setFieldsFocused((prev) => ({ ...prev, [fieldName]: true }));
  }, []);

  const handleBlur = useCallback((fieldName: keyof SlippageModalData) => {
    setFieldsFocused((prev) => ({ ...prev, [fieldName]: false }));
  }, []);

  return (
    <Modal isOpen={isOpen} handleClose={onClose}>
      <ModalHeader title='Settings' onClose={onClose} />
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
          <AnimatePresence>
            {selectedType === SlippageType.CUSTOM && (
              <AnimatedWrapper duration={0.2}>
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
              </AnimatedWrapper>
            )}
          </AnimatePresence>
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
        <Button variants={ButtonVariants.SOLID} type='submit'>
          Apply
        </Button>
      </Form>
    </Modal>
  );
};

export default memo(SlippageModal);
