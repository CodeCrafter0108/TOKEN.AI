import { Address, keccak256, toHex } from 'viem';
export const generateRandomBytes = (address: Address) => {
  const blockTimestamp = Math.floor(Date.now() / 1000).toString();
  return keccak256(toHex(address + blockTimestamp));
};
