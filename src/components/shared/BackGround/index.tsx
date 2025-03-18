'use client';
import { BackgroundWrapper, BottomBgHomeIcon, LeftBgTradeIcon, RightBgHomeIcon, RightBgTradeIcon } from './styles';

import { AppRoutes } from '@/constants/routes';
import { usePathname } from 'next/navigation';

interface BackGroundProps {
  children: React.ReactNode;
}

export const BackGround = ({ children }: BackGroundProps) => {
  const pathname = usePathname();

  return (
    <BackgroundWrapper>
      {pathname === AppRoutes.HOME && (
        <>
          <BottomBgHomeIcon />
          <RightBgHomeIcon />
        </>
      )}

      {pathname === AppRoutes.TRADE && (
        <>
          <LeftBgTradeIcon />
          <RightBgTradeIcon />
        </>
      )}
      {children}
    </BackgroundWrapper>
  );
};
