import CommonLink from '@/components/CommonLink';
import { LinkVariants } from '@/components/CommonLink/types';
import { AppRoutes } from '@/constants/routes';
import { Flex, H3 } from '@/styles/global';
import Arrow from '@/assets/icons/right-arrow.svg';
import { LinkText, LinkContent, TopAgentsHeader } from './styles';
import { AgentCard } from '@/components/AgentCard';

export const TopAgents = () => {
  return (
    <div>
      <Flex $justify='space-between' $align='center'>
        <H3>Top Agents</H3>
        <CommonLink href={AppRoutes.AGENTS} variants={LinkVariants.CLEAR} style={{ padding: '12px 0' }}>
          <LinkContent>
            <LinkText>View all top agents</LinkText>
            <Arrow />
          </LinkContent>
        </CommonLink>
      </Flex>

      <Flex $gap={16}>
        <AgentCard />
        <AgentCard />
        <AgentCard />
        <AgentCard />
      </Flex>
    </div>
  );
};
