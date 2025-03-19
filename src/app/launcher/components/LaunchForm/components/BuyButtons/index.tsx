import { ButtonVariants } from '@/components/shared/Button/types';
import { Flex } from '@/styles/global';
import { UseFormSetValue } from 'react-hook-form';
import { BuyFieldType, FieldsFocused, LauncherTypeData } from '../../types';
import { StyledButton } from './styles';
import { useEffect } from 'react';

const percents: number[] = [0.1, 1, 5, 10];

interface BuyButtonsProps {
  field: BuyFieldType;
  setValue: UseFormSetValue<LauncherTypeData>;
  fieldsFocused: FieldsFocused;
}

export const BuyButtons = ({ field, setValue, fieldsFocused }: BuyButtonsProps) => {
  const handleClickButton = (percent: number): void => {
    setValue('buy', percent.toString());
    setValue('buyCustom', '');
  };

  useEffect(() => {
    if (fieldsFocused.buyCustom) {
      setValue('buy', '');
    }
  }, [fieldsFocused.buyCustom]);

  return (
    <Flex $gap={8}>
      {percents.map((percent) => {
        return (
          <StyledButton
            key={percent}
            variants={ButtonVariants.CLEAR}
            onClick={() => handleClickButton(percent)}
            $isActive={field.value === percent.toString() && !fieldsFocused.buyCustom}
          >{`${percent}%`}</StyledButton>
        );
      })}
    </Flex>
  );
};
