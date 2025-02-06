import { Address } from "viem";

export const formatAddress = (address: Address | string | undefined) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const  formatNumber = (num: number | string | undefined, digits = 2) => {
  const _num = parseFloat(String(num));
  if (!_num || _num === 0) return '0.00';
  if (_num === 0) return '0.0';
  if (_num < 0.001) return '<0.001';
  return _num.toLocaleString('en-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
  });
};

export const  formatBalance = (num: number | string | undefined, digits = 2) => {
  const _num = parseFloat(String(num));
  if (!_num || _num === 0) return '0.00';
  if (_num === 0) return '0.0';
  return _num.toLocaleString('en-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
  });
};

export const  abbreviateNumber = (num: number | string | undefined, digits = 2) => {
  const _num = parseFloat(String(num));
  if (!_num || _num === 0) return '0';
  return new Intl.NumberFormat('en', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumSignificantDigits: digits,
  }).format(_num);
};

export const  formatFileSize = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let formattedSize = size;

  while (formattedSize >= 1024 && unitIndex < units.length - 1) {
      formattedSize /= 1024;
      unitIndex++;
  }

  return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
};

export const shortNumber = (number: number): string => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(number);
};