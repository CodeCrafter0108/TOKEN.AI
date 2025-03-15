import { DeFAI } from "@/components/shared/DeFAI";
import { Wrapper, TitleContainer, Title, SubTitle, Badge, BadgeDescription } from './styles';

interface PageTitleProps {
  title: string;
  subTitle: string;
  badgeDescription?: boolean;
}

export const PageTitle = ({ title, badgeDescription = true, subTitle }: PageTitleProps) => {
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
