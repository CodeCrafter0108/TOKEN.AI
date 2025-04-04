'use client'
import { DeFAI } from "@/components/shared/DeFAI";
import { Wrapper, TitleContainer, Title, SubTitle, Badge, BadgeDescription } from './styles';
import { RuleSet } from "styled-components";

interface PageTitleProps {
  title: string;
  subTitle: string;
  badgeDescription?: boolean;
  styles?: RuleSet<object>;
}

export const PageTitle = ({ title, badgeDescription = true, subTitle, styles }: PageTitleProps) => {
  return (
    <Wrapper>
      <TitleContainer $styles={styles}>
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

