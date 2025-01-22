import Discord from '@/assets/icons/discord.svg';
import Twitter from '@/assets/icons/x.svg';
import Telegram from '@/assets/icons/telegram.svg';
import Planet from '@/assets/icons/telegram.svg';
import { IconWrapper, TitleNetwork, StyledLink, Wrapper } from './styles';
import { RuleSet } from 'styled-components';

interface SocialNetworksProps {
  position?: 'card' | 'footer';
  styles?: RuleSet<object>;
}

export const SocialNetworks = ({ styles, position = 'footer' }: SocialNetworksProps) => {
  return (
    <Wrapper $styles={styles}>
      {position === 'footer' ? (
        <StyledLink href={'#'} target={'_blank'} rel={'noreferrer'}>
          <IconWrapper>
            <Discord />
          </IconWrapper>
          <TitleNetwork>Discord</TitleNetwork>
        </StyledLink>
      ) : (
        <StyledLink href={'#'} target={'_blank'} rel={'noreferrer'}>
          <IconWrapper>
            <Planet />
          </IconWrapper>
        </StyledLink>
      )}
      <StyledLink href={'#'} target={'_blank'} rel={'noreferrer'}>
        <IconWrapper>
          <Twitter />
        </IconWrapper>
        {position === 'footer' && <TitleNetwork>Twitter</TitleNetwork>}
      </StyledLink>
      <StyledLink href={'#'} target={'_blank'} rel={'noreferrer'}>
        <IconWrapper>
          <Telegram />
        </IconWrapper>
        {position === 'footer' && <TitleNetwork>Telegram</TitleNetwork>}
      </StyledLink>
    </Wrapper>
  );
};
