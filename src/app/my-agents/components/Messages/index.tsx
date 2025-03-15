import Stars from '@/assets/icons/stars.svg';
import ConnectButton from '@/components/features/ConnectButton';
import { NoResults } from '@/components/features/NoResults';
import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import CommonLink from '@/components/shared/CommonLink';
import { LinkVariants } from '@/components/shared/CommonLink/types';
import { EmptyState } from '@/components/shared/EmptyState';
import { AppRoutes } from '@/constants/routes';
import { IToken } from '@/types/common';
import { useAccount } from 'wagmi';
import { LinkContent, LinkText } from './styles';
import Image from 'next/image';
import { Flex } from '@/styles/global';

interface MessagesProps {
  agents?: IToken[];
  isLoading: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const Messages = ({ agents = [], isLoading, searchValue, setSearchValue }: MessagesProps) => {
  const { isConnected } = useAccount();

  if (!isConnected)
    return (
      <AnimatedWrapper.Opacity duration={0.2} delay={0.2}>
        <EmptyState
          title='No agents are available to display'
          description='To view your agents, please connect your wallet'
          icon={
            <Flex $align='flex-end' $justify='center' style={{ width: '320px', height: '200px' }}>
              <Image
                src={'/images/info/alien_sit.png'}
                alt='alien'
                width={309}
                height={185}
                style={{ maxWidth: '100%' }}
              />
            </Flex>
          }
          hasBgImage
          styles={{ paddingBottom: '70px', justifyContent: 'flex-start' }}
        >
          <ConnectButton styles={{ width: '100%', maxWidth: '275px' }} />
        </EmptyState>
      </AnimatedWrapper.Opacity>
    );

  if (agents?.length === 0 && !isLoading) {
    //TODO check it
    if (searchValue) {
      return <NoResults handleClear={() => setSearchValue('')} />;
    }
    return (
      <AnimatedWrapper.Opacity duration={0.2} delay={0.2}>
        <EmptyState
          title='No agents have been created yet'
          description='You can create one in a few simple steps'
          icon={
            <Flex $align='flex-end' $justify='center' style={{ width: '320px', height: '200px' }}>
              <Image
                src={'/images/info/alien_with_notebook.png'}
                alt='alien'
                width={309}
                height={196}
                style={{ maxWidth: '100%' }}
              />
            </Flex>
          }
          styles={{ paddingBottom: '70px', justifyContent: 'flex-start' }}
          hasBgImage
        >
          <CommonLink
            href={AppRoutes.LAUNCHER}
            variants={LinkVariants.SOLID}
            style={{ width: '100%', maxWidth: '275px' }}
          >
            <LinkContent>
              <Stars />
              <LinkText>Launch your agent now</LinkText>
            </LinkContent>
          </CommonLink>
        </EmptyState>
      </AnimatedWrapper.Opacity>
    );
  }

  return null;
};
