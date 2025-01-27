import * as yup from 'yup';
import { MAX_DEADLINE, MAX_SLIPAGE, MIN_DEADLINE, MIN_SLIPAGE } from './constants';
import { SlippageType } from './types';

export const schema = yup
  .object({
    type: yup.mixed<SlippageType>().required('Field is required'),
    amount: yup
      .string()
      .required('Field is required')
      .test(
        'coorectSlippage',
        `Slippage must be a positive number between ${MIN_SLIPAGE}% and ${MAX_SLIPAGE}%`,
        (value) => +value >= MIN_SLIPAGE && +value <= MAX_SLIPAGE
      ),
    deadline: yup
      .string()
      .test('coorectDeadline', `Slippage must be between ${MIN_DEADLINE}m and ${MAX_DEADLINE}m`, (value) => {
        if (value === '') return true;
        return  value !== undefined ? +value >= MIN_DEADLINE && +value <= MAX_DEADLINE : false;
      })
  })
  .required();
