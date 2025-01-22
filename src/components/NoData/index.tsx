
import { Wrapper, Content, Title, Description } from "./styles";

interface NoDataProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
}

export const NoData = ({title, description, icon, styles, children}: NoDataProps) => {
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
