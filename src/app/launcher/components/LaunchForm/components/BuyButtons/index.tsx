import { ButtonVariants } from '@/components/shared/Button/types';
import { Flex } from '@/styles/global';
import { UseFormSetValue } from 'react-hook-form';
import { FieldsFocused, LauncherTypeData } from '../../types';
import { StyledButton } from './styles';

const percents: number[] = [0.1, 1, 5, 10];

interface BuyButtonsProps {
  setValue: UseFormSetValue<LauncherTypeData>;
  fieldsFocused: FieldsFocused;
  value?: string;
}

export const BuyButtons = ({ value, setValue, fieldsFocused}: BuyButtonsProps) => {
  const handleClickButton = (percent: number): void => {
    setValue('buy', percent.toString());
  };

  return (
    <Flex $gap={8}>
      {percents.map((percent) => {
        return (
          <StyledButton
            key={percent}
            variants={ButtonVariants.CLEAR}
            onClick={() => handleClickButton(percent)}
            $isActive={value === percent.toString() && !fieldsFocused.buy}
          >{`${percent}%`}</StyledButton>
        );
      })}
    </Flex>
  );
};
