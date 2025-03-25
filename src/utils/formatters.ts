import { Address, formatEther } from "viem";
import { intervalToDuration } from "date-fns";

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

// export const  formatBalance = (num: number | string | undefined, digits = 2) => {
//   const _num = parseFloat(String(num));
//   if (!_num || _num === 0) return '0.00';
//   if (_num === 0) return '0.0';
//   return _num.toLocaleString('en-ES', {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: digits,
//   });
// };

  export const formatBalance = (amount?: bigint, digits: number = 4):string => {
    if (!amount) {
      return '0.00';
    }
    return  formatNumber(formatEther(amount), digits);
  }

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



export const formatTimeAgo = (timestamp: string, dateNow: number): string => {
  const duration: Duration = intervalToDuration({ start: Number(timestamp) * 1000, end: dateNow * 1000 });

  if (duration.years && duration.years > 0) {
    return `${duration.years}y ${duration.months}mo ago`; // "2y 3mo ago"
  } else if (duration.months && duration.months > 0) {
    return `${duration.months}mo ${duration.days}d ago`; // "3mo 12d ago"
  } else if (duration.days && duration.days > 0) {
    return `${duration.days}d ${duration.hours}h ago`; // "2d 5h ago"
  } else if (duration.hours && duration.hours > 0) {
    return `${duration.hours}h ${duration.minutes}m ago`; // "7h 3m ago"
  } else if (duration.minutes && duration.minutes > 0) {
    return `${duration.minutes}m ago`; // "25m ago"
  } else {
    return `${Math.max(0, Math.floor((dateNow - Number(timestamp))))}s ago`; // "10s ago"
  }
};