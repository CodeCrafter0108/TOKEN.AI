import React from 'react';
import { StyledLink, IconWrapper, TitleNetwork } from '../styles';

interface LinkWrapperProps {
  href: string;
  target?: string;
  rel?: string;
  ariaLabel: string;
  icon: React.ReactNode;
  title?: string;
  position?: 'card' | 'footer';
}

const LinkWrapper = ({ href, target, rel, ariaLabel, icon, title, position }: LinkWrapperProps) => (
  <StyledLink href={href} target={target} rel={rel} aria-label={ariaLabel}>
    <IconWrapper>
      {icon}
    </IconWrapper>
    {position === 'footer' && title && <TitleNetwork>{title}</TitleNetwork>}
  </StyledLink>
);

export default LinkWrapper;