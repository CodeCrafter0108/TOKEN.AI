'use client';

import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { useEffect } from 'react';

export const ConditionalScript = () => {
  const {width} = useWindowSize();
  useEffect(() => {

    if (width >= NumberBreakpoints.lg) {
      const script = document.createElement('script');
      script.src = '/scripts/animationCursor.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [width]);

  return null;
};