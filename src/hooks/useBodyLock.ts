import { useEffect } from 'react';

export const useBodyLock = (shouldLock?: boolean): void => {
  useEffect(() => {
    if (typeof shouldLock === 'boolean') {
      document.body.style.overflow = shouldLock ? 'hidden' : 'visible';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return (): void => {
      document.body.style.overflow = 'visible';
    };
  }, [shouldLock]);
};