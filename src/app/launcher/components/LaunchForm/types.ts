import { ControllerRenderProps } from 'react-hook-form';

export type LauncherTypeData = {
  name: string;
  symbol: string;
  supply: string;
  websiteUrl: string;
  socialUrl: string;
  chatUrl?: string;
  description: string;
  imageUrl: FileList;
};

export type FieldsFocused = {
  name: boolean;
  symbol: boolean;
  supply: boolean;
  websiteUrl: boolean;
  socialUrl: boolean;
  chatUrl: boolean;
  description: boolean;
};

export type ImageFieldType = ControllerRenderProps<LauncherTypeData, 'imageUrl'>;
