import { Address, Hex } from 'viem';

export type PreSaveImageType = {
  chainId: number;
  userAddress: Address;
  randomBytes: Hex;
  formData: FormData;
};

export type SaveImageType = {
  data: { url: string };
};
