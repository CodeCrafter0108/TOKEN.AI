
import { Content, Description, Title, Wrapper } from "./styles";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  hasBgImage?: boolean
}

export const EmptyState = ({title, description, icon = null, styles, children, hasBgImage}: EmptyStateProps) => {
  return (
    <Wrapper style={styles} $hasBgImage={hasBgImage}>
      <Content $hasBgImage={hasBgImage}>
        {icon}
        <div>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
      </Content>
        {children}
    </Wrapper>
  );
};
