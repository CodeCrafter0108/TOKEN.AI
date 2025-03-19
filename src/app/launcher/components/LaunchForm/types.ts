import { ControllerRenderProps } from 'react-hook-form';

export type LauncherTypeData = {
  name: string;
  symbol: string;
  supply: string;
  websiteUrl?: string;
  socialUrl?: string;
  chatUrl?: string;
  description: string;
  imageUrl: FileList;
  buy?: string;
  buyCustom?: string;
};

export type FieldsFocused = {
  name: boolean;
  symbol: boolean;
  supply: boolean;
  websiteUrl: boolean;
  socialUrl: boolean;
  chatUrl: boolean;
  description: boolean;
  buyCustom: boolean;
};

export type ImageFieldType = ControllerRenderProps<LauncherTypeData, 'imageUrl'>;

export type BuyFieldType = ControllerRenderProps<LauncherTypeData, 'buy'>;
