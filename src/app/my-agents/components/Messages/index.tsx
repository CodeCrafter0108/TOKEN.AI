import Stars from '@/assets/icons/stars.svg';
import { StyledNoDataIcon, StyledConnectWalletIcon, LinkContent, LinkText } from './styles';
import { AppRoutes } from '@/constants/routes';
import { LinkVariants } from '@/components/CommonLink/types';
import CommonLink from '@/components/CommonLink';
import ConnectButton from '@/components/ConnectButton';
import { useAccount } from 'wagmi';
import Button from '@/components/Button';
import { NoData } from '@/components/NoData';

export const Messages = () => {
  const { isConnected } = useAccount();
  return (
    <>
      {!isConnected ? (
        <NoData
          title='No agents are available to display'
          description='To view your agents, please connect your wallet'
          icon={<StyledConnectWalletIcon />}
          styles={{ padding: '0', justifyContent: 'flex-start' }}
        >
          <ConnectButton styles={{ width: '100%', maxWidth: '270px' }} />
        </NoData>
      ) : (
        <>
          <NoData
            title='No agents have been created yet'
            description='You can create one in a few simple steps'
            icon={<StyledNoDataIcon />}
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
          </NoData>

          <NoData
            title='No results found'
            description='Please try to adjust your search request'
            styles={{ padding: '0', justifyContent: 'flex-start' }}
          >
            <Button style={{ width: '100%', maxWidth: '270px' }}>Clear search results</Button>
          </NoData>
        </>
      )}
    </>
  );
};
