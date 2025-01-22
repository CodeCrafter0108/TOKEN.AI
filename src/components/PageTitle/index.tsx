import { DeFAI } from '../DeFAI';
import { Wrapper, TitleContainer, Title, SubTitle, Badge, BadgeDescription } from './styles';

interface PageTitleProps {
  title: string;
  subTitle: string;
  badgeDescription?: string;
}

export const PageTitle = ({ title, badgeDescription, subTitle }: PageTitleProps) => {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>{title}</Title>
        <Badge>
          {badgeDescription && <BadgeDescription>powered by</BadgeDescription>}
          <DeFAI />
        </Badge>
      </TitleContainer>
      <SubTitle>{subTitle}</SubTitle>
    </Wrapper>
  );
};
