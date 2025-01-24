import TopIcon from '@/assets/icons/topIcon.svg';
import LatestIcon from '@/assets/icons/latestIcon.svg';
import MarcketCupIcon from '@/assets/icons/marketCapIcon.svg';
import { FilterOption } from '../ButtonFilters/types';

export const options: { value: FilterOption; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'All', icon: '' },
  { value: 'top', label: 'Top', icon: <TopIcon /> },
  { value: 'latest', label: 'Latest',  icon: <LatestIcon /> },
  { value: 'marketcap', label: 'MarketCap', icon: <MarcketCupIcon /> }
];
