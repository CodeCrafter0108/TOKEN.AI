import { Flex } from '@/styles/global';
import { Description, AgentLogo, TokenLogo, MarketCapValue, Title, Container } from './styles';
import { SocialNetworks } from '../SocialNetworks';
import { RuleSet } from 'styled-components';

interface AgentCardProps {
  // onClick: () => void;
  styles?: RuleSet<object>;
}

export const AgentCard = ({ styles }: AgentCardProps) => {
  return (
    <Container onClick={() => console.log('click BOX')} $styles={styles}>
      <Flex $gap={12} $align='center'>
        <div style={{ minWidth: '100px', minHeight: '100px', position: 'relative' }}>
          <AgentLogo
            fill
            alt='Agent logo'
            src={'/temp/agent.png'}
            priority
            style={{ objectFit: 'cover' }}
            sizes='100%'
          />
        </div>
        <Flex $direction={'column'} $gap={6}>
          <Title>Token name</Title>
          <Flex $gap={4} $align='center'>
            <div style={{ minWidth: '16px', minHeight: '16px', position: 'relative' }}>
              <TokenLogo
                src={'/temp/token.png'}
                alt='Token logo'
                fill
                sizes='100%'
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span>Token name</span>
          </Flex>
          <Flex $gap={4}>
            <span>Market cap:</span>
            <MarketCapValue>$31M</MarketCapValue>
          </Flex>
          <SocialNetworks position='card' styles={{ flexDirection: 'row' }} />
        </Flex>
      </Flex>
      <Description>
        Creating cryptocurrency enables decentralized financial systems, allowing users to exchange
      </Description>
    </Container>
  );
};
