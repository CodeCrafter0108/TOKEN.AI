import React from 'react';
import { StyledLink, IconWrapper, TitleNetwork } from '../styles';
import { RuleSet } from 'styled-components';

interface LinkWrapperProps {
  href: string;
  target?: string;
  rel?: string;
  ariaLabel: string;
  icon: React.ReactNode;
  title?: string;
  position?: 'card' | 'footer';
  styles?: RuleSet<object>;
}

const LinkWrapper = ({ href, target, rel, ariaLabel, icon, title, position, styles }: LinkWrapperProps) => (
  <StyledLink href={href} target={target} rel={rel} aria-label={ariaLabel} styles={styles}>
    <IconWrapper>
      {icon}
    </IconWrapper>
    {position === 'footer' && title && <TitleNetwork>{title}</TitleNetwork>}
  </StyledLink>
);

export default LinkWrapper;