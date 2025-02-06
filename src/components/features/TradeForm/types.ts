export enum AmountType {
  IN,
  OUT,
  NONE
}

export interface TokenSwapProps {
  tokens?: { id: string; name: string }[]; //TODO : change type; //IToken[];
  nativeToken?: { id: string; name: string }[]; //TODO : change type; //IToken;
  onSwap: () => void;
  onApprove: () => void;
}
