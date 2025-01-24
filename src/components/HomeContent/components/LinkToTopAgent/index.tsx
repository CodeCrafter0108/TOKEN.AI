import Arrow from '@/assets/icons/right-arrow.svg';
import { LinkText, LinkContent } from './styles';
import CommonLink from '@/components/CommonLink';
import { LinkVariants } from '@/components/CommonLink/types';
import { AppRoutes } from '@/constants/routes';

interface LinkToTopAgentProps {
  title: string;
  params?: string;
}

export const LinkToTopAgent = ({params ='', title}: LinkToTopAgentProps) => {
  return (
    <CommonLink href={`${AppRoutes.AGENTS}/${params}`} variants={LinkVariants.CLEAR} style={{ padding: '12px 0' }}>
      <LinkContent>
        <LinkText>{title}</LinkText>
        <Arrow />
      </LinkContent>
    </CommonLink>
  );
};
