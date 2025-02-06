import { NavigationContent, StyledLink } from './styles';
import { AppRoutes } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import { BurgerProps } from '../../types';

export const Navigation = ({ setIsOpen }: Partial<BurgerProps>) => {
  const pathname = usePathname();
  const handleClosed = () => {
    if (setIsOpen) setIsOpen(false);
  };
  return (
    <NavigationContent>
      <StyledLink href={AppRoutes.TRADE} $isActive={pathname === AppRoutes.TRADE} onClick={handleClosed}>
        <span>Trade</span>
      </StyledLink>
      <StyledLink href={AppRoutes.MY_AGENTS} $isActive={pathname === AppRoutes.MY_AGENTS} onClick={handleClosed}>
        <span>My Agents</span>
      </StyledLink>
      <StyledLink href={AppRoutes.LAUNCHER} $isActive={pathname === AppRoutes.LAUNCHER} onClick={handleClosed}>
        <span>Launcher</span>
      </StyledLink>
    </NavigationContent>
  );
};
