import { FilterOption } from '@/app/agents/components/ButtonFilters/types';
import CommonLink from '@/components/shared/CommonLink';
import { LinkVariants } from '@/components/shared/CommonLink/types';
import { AppRoutes } from '@/constants/routes';
import { Box } from '@/styles/global';
import { StyledArrow } from '../LinkToTopAgent/styles';
import { Text, TextWrapper, Card } from './styles';
import { RuleSet } from 'styled-components';

interface ExploreCardProps {
  filterParam: FilterOption | '';
  icon: React.ReactNode;
  text: string;
  styles: RuleSet<object>;
}

export const ExploreCard = ({ filterParam, icon, text, styles }: ExploreCardProps) => {
  return (
    <Card>
      <CommonLink href={`${AppRoutes.AGENTS}?filter=${filterParam}`} variants={LinkVariants.CLEAR}>
        <Box $styles={styles}>
          {icon}
          <TextWrapper>
            <Text>{text}</Text>
            <StyledArrow />
          </TextWrapper>
        </Box>
      </CommonLink>
    </Card>
  );
};
