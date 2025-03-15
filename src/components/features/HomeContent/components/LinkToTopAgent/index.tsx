
import CommonLink from '@/components/shared/CommonLink';
import { LinkVariants } from '@/components/shared/CommonLink/types';
import { AppRoutes } from '@/constants/routes';
import { LinkContent, LinkText, StyledArrow } from './styles';
import { FilterOption } from '@/app/agents/components/ButtonFilters/types';

interface LinkToTopAgentProps {
  title: string;
  params?: FilterOption | '';
}

export const LinkToTopAgent = ({params = '', title}: LinkToTopAgentProps) => {
  return (
    <CommonLink href={`${AppRoutes.AGENTS}?filter=${params}`} variants={LinkVariants.CLEAR} style={{ padding: '12px 0' }}>
      <LinkContent>
        <LinkText>{title}</LinkText>
        <StyledArrow />
      </LinkContent>
    </CommonLink>
  );
};
