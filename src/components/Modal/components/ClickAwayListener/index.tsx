import React, { useEffect, useRef, ReactNode } from 'react';
import { Wrapper } from './styles';

interface ClickAwayListenerProps {
  onClickAway: () => void;
  children: ReactNode;
}

const ClickAwayListener = ({ onClickAway, children }: ClickAwayListenerProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClickAway();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickAway]);

  return <Wrapper ref={wrapperRef}>{children}</Wrapper>;
};

export default ClickAwayListener;
