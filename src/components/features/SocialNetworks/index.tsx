import Discord from '@/assets/icons/discord.svg';
import Twitter from '@/assets/icons/x.svg';
import Telegram from '@/assets/icons/telegram.svg';
import Planet from '@/assets/icons/planet.svg';
import { Wrapper } from './styles';
import React from 'react';
import LinkWrapper from './components/LinkWrapper';

interface SocialNetworksProps {
  siteUrl?: string;
  socialUrl?: string;
  chatUrl?: string;
  position?: 'card' | 'footer';
  styles?: React.CSSProperties;
}

export const SocialNetworks = ({ styles, position = 'footer', siteUrl, socialUrl, chatUrl }: SocialNetworksProps) => {
  return (
      <Wrapper style={styles} onClick={(e) => e.stopPropagation()}>
        {position === 'footer' ? (
          <LinkWrapper
            href='#'
            target='_blank'
            rel='noreferrer'
            ariaLabel='Discord'
            icon={<Discord />}
            title='Discord'
            position={position}
          />
        ) : (
          siteUrl && (
            <LinkWrapper
              href={siteUrl}
              target='_blank'
              rel='noreferrer'
              ariaLabel='website'
              icon={<Planet />}
              position={position}
            />
          )
        )}
        {socialUrl && (
          <LinkWrapper
            href={socialUrl}
            target='_blank'
            rel='noreferrer'
            ariaLabel='twitter'
            icon={<Twitter />}
            title='Twitter'
            position={position}
          />
        )}
        {chatUrl && (
          <LinkWrapper
            href={chatUrl}
            target='_blank'
            rel='noreferrer'
            ariaLabel='telegram'
            icon={<Telegram />}
            title='Telegram'
            position={position}
          />
        )}
      </Wrapper>
  );
};
