
import CommonLink from '@/components/shared/CommonLink';
import { LinkVariants } from '@/components/shared/CommonLink/types';
import { AppRoutes } from '@/constants/routes';
import { LinkContent, LinkText, StyledArrow } from './styles';
import { FilterOption } from '@/app/agents/components/ButtonFilters/types';
import React from 'react';

interface LinkToTopAgentProps {
  title: string;
  params?: FilterOption | '';
  styles?: React.CSSProperties;
}

export const LinkToTopAgent = ({params = '', title, styles}: LinkToTopAgentProps) => {
  return (
    <CommonLink href={`${AppRoutes.AGENTS}?filter=${params}`} variants={LinkVariants.CLEAR} style={styles}>
      <LinkContent>
        <LinkText>{title}</LinkText>
        <StyledArrow />
      </LinkContent>
    </CommonLink>
  );
};
