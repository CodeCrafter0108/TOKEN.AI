import { NavigationContent, StyledLink } from './styles';
import { AppRoutes } from '@/constants/routes';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <NavigationContent>
      <StyledLink href={AppRoutes.TRADE} $isActive={pathname === AppRoutes.TRADE}>
        <span>Trade</span>
      </StyledLink>
      <StyledLink href={AppRoutes.MY_AGENTS} $isActive={pathname === AppRoutes.MY_AGENTS}>
        <span>My Agents</span>
      </StyledLink>
      <StyledLink href={AppRoutes.LAUNCHER} $isActive={pathname === AppRoutes.LAUNCHER}>
        <span>Launcher</span>
      </StyledLink>
    </NavigationContent>
  );
};
