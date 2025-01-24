import { Box } from '@/styles/global';
import Image from 'next/image';
import styled from 'styled-components';

export const Container = styled(Box)`
  min-width: 284px;
  max-width: 286px;
  margin: 4px 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out; 
  scale: 1;

  &:hover {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
  }
`;

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
  font-size: 14px;
`;

export const Description = styled.p`
  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
