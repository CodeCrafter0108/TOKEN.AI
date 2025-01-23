import Image from 'next/image';
import styled from 'styled-components';

export const AgentLogo = styled(Image)`
  border-radius: 4px;
  object-fit: cover;
`;

export const TokenLogo = styled(Image)``;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  font-feature-settings:
    'liga' off,
    'clig' off;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MarketCapValue = styled(Title)`
  font-weight: 700;
`;

export const Description = styled.p`
  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
