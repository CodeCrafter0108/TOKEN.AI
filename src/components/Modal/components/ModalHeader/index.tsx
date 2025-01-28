import { ButtonVariants } from '@/components/Button/types';
import CrossIcon from '@/assets/icons/cross.svg';
import { CloseButton, Title, Wrapper } from './styles';

interface ModalWrapperProps {
  title: string;
  onClose: () => void;
}

export const ModalHeader = ({ title, onClose }: ModalWrapperProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <CloseButton variants={ButtonVariants.CLEAR} onClick={() => onClose()} aria-label='Close modal'>
        <CrossIcon />
      </CloseButton>
    </Wrapper>
  );
};
