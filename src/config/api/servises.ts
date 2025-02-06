import { Hex } from 'viem';
import { axiosInstance } from './config';
import { PreSaveImageType, SaveImageType } from './types';

export const preSaveImage = async ({
  chainId,
  userAddress,
  randomBytes,
  formData
}: PreSaveImageType): Promise<SaveImageType> => {
  const url = `/static/tokens/create/${chainId}/${userAddress}/${randomBytes}/0`;
  try {
    const response = await axiosInstance.post<SaveImageType>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
  });

    return response.data;
  } catch (error) {
    console.error('Error  presave image:', error);
    throw new Error('Failed to presave image');
  }
};

export const saveImage = async (randomBytes: Hex): Promise<{ message: string }> => {
  try {
    const response = await axiosInstance.put<{ message: string }>(`/static/tokens/save/${randomBytes}`);
    return response.data;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image');
  }
};
