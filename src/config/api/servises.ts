import { axiosInstance } from './config';
import { CloudinaryUploadResponse } from './types';

export const saveImage = async (formData: FormData): Promise<CloudinaryUploadResponse> => {
  try {
    const response = await axiosInstance.post<CloudinaryUploadResponse>('/image/upload', formData, {

    });
    return response.data;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image');
  }
};
