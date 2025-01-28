import VerifiedIcon from '@/assets/icons/verified.svg';
import { Wrapper } from './styles';

export const VerifiedBadge = () => {
  return (
    <Wrapper>
      <VerifiedIcon/>
      <span>Verified</span>
    </Wrapper>
  )
}