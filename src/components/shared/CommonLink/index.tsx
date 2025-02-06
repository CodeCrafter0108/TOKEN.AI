import { memo, ReactNode, JSX,  AnchorHTMLAttributes } from 'react';
import { StyledLink } from './styles';
import { LinkVariants } from './types';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  isExternal?: boolean
  variants?: LinkVariants;
}

const CommonLink = ({ children, variants = LinkVariants.SOLID, href, isExternal = false, style, ...rest }: LinkProps): JSX.Element => {
  return (
    <StyledLink
    href={href}
    $variants={variants}
    style={style}
    target={isExternal ? '_blank' : undefined}
    rel={isExternal ? 'noopener noreferrer' : undefined}
    {...rest}
  >
      {children}
    </StyledLink>
  );
};

export default memo(CommonLink);