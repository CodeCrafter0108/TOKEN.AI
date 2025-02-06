import Arrow from '@/assets/icons/right-arrow.svg';
import CommonLink from '@/components/shared/CommonLink';
import { LinkVariants } from '@/components/shared/CommonLink/types';
import { AppRoutes } from '@/constants/routes';
import { LinkContent, LinkText } from './styles';

interface LinkToTopAgentProps {
  title: string;
  params?: string;
}

export const LinkToTopAgent = ({params ='', title}: LinkToTopAgentProps) => {
  return (
    <CommonLink href={`${AppRoutes.AGENTS}?${params}`} variants={LinkVariants.CLEAR} style={{ padding: '12px 0' }}>
      <LinkContent>
        <LinkText>{title}</LinkText>
        <Arrow />
      </LinkContent>
    </CommonLink>
  );
};
