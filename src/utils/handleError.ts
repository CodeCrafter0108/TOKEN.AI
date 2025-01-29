export const handleError = (message: string, defaultMessage?: string): string => {
  switch (true) {
    case message.includes('User rejected the request.'):
      return 'User rejected the request.';
    case message.includes('insufficient funds'):
      return 'Insufficient funds to complete the transaction.';

    default:
      return defaultMessage ?? 'Transaction failed';
  }
};