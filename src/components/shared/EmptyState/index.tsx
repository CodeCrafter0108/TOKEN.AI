
import { Content, Description, Title, Wrapper } from "./styles";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
}

export const EmptyState = ({title, description, icon = null, styles, children}: EmptyStateProps) => {
  return (
    <Wrapper style={styles}>
      <Content>
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
