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
import { LinkContent, LinkText, StyledConnectWalletIcon, StyledEmptyStateIcon } from './styles';

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
          icon={<StyledConnectWalletIcon />}
          styles={{ padding: '0', justifyContent: 'flex-start' }}
        >
          <ConnectButton styles={{ width: '100%', maxWidth: '270px' }} />
        </EmptyState>
      </AnimatedWrapper.Opacity>
    );

  if (agents?.length === 0 && !isLoading) { //TODO check it
    if (searchValue) {
      return (
        <NoResults handleClear={() => setSearchValue('')} />
      );
    }
    return (
      <AnimatedWrapper.Opacity duration={0.2} delay={0.2}>
        <EmptyState
          title='No agents have been created yet'
          description='You can create one in a few simple steps'
          icon={<StyledEmptyStateIcon />}
          styles={{ padding: '0', justifyContent: 'flex-start' }}
        >
          <CommonLink
            href={AppRoutes.LAUNCHER}
            variants={LinkVariants.SOLID}
            style={{ width: '100%', maxWidth: '270px' }}
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
