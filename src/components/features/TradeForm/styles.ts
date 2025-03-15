import Button from '@/components/shared/Button';
import { Breakpoints } from '@/styles/breakpoints';
import { Box } from '@/styles/global';
import styled from 'styled-components';
import SettingIcon from '@/assets/icons/settings.svg';

export const Wrapper = styled(Box)`
  width: 100%;
  max-width: 500px;
  justify-self: center;
  /* margin-top: 24px; */
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FormTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

export const SwapInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 32px;
  /* gap: 18px;
  padding: 0 40px;

  @media screen and (max-width: ${Breakpoints.md}) {
    padding: 0 20px;
  } */
`;

export const ChangeButton = styled(Button)`
  padding: 12px;
  border-radius: 50%;
  border: 1.5px solid var(--primary-clr);
  z-index: 10;

  background-color: var(--white-clr);

  box-shadow: var(--box-shadow);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--separator-clr);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  
`;

export const StyledSettingIcon = styled(SettingIcon)`
  color: #8E8E93;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    color: var(--accent-clr);
  }
`;