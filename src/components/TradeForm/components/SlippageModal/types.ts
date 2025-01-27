export enum SlippageType {
  AUTO = 'auto',
  CUSTOM = 'custom',
}

export type SlippageModalData = {
  type: SlippageType;
  amount: string;
  deadline?: string;
};

export type FieldsFocused = {
  amount: boolean;
  deadline: boolean;
}