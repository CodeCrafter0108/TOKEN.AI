import { ReactElement } from 'react';
import { ExploreCard } from '../ExploreCard';
import { exploreAgentsStyles, List, TopAgentsIcon, AllAgentsIcon, NewAgentsIcon } from './styles';
import { ExploreListData, } from './types';

const exploreListData: ExploreListData[] = [
  {
    text: 'All Agents',
    icon: (
      <AllAgentsIcon
        src={'/images/homepage/all_coins.png'}
        width={239}
        height={97}
        alt='all agents'
      />
    ),
    filterParam: 'all',
    styles: exploreAgentsStyles
  },
  {
    text: 'New',
    icon: (
      <NewAgentsIcon
        src={'/images/homepage/new_coins.png'}
        width={128}
        height={126}
        alt='new agents'
      />
    ),
    filterParam: 'latest',
    styles: exploreAgentsStyles
  },
  {
    text: 'Top',
    icon: (
      <TopAgentsIcon
        src={'/images/homepage/top_coins.png'}
        width={132}
        height={130}
        alt='top agents'
      />
    ),
    filterParam: 'top',
    styles: exploreAgentsStyles
  }
];

export const ExploreList = (): ReactElement => {
  return (
    <List>
      {exploreListData.map(({ text, icon, filterParam, styles }: ExploreListData) => (
        <ExploreCard key={text} text={text} icon={icon} filterParam={filterParam} styles={styles} />
      ))}
    </List>
  );
};
