import LatestIcon from '@/assets/icons/latestIcon.svg';
import MarcketCupIcon from '@/assets/icons/marketCapIcon.svg';
import { FilterOption } from '@/app/agents/components/ButtonFilters/types';

export const options: { value: FilterOption; label: string; icon: React.ReactNode }[] = [
  { value: 'latest', label: 'Latest', icon: <LatestIcon /> },
  { value: 'marketcap', label: 'MarketCap', icon: <MarcketCupIcon /> }
];
